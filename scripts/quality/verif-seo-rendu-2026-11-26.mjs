#!/usr/bin/env node
/**
 * verif-seo-rendu.mjs   —   version du 26/11/2026
 * Controles SEO sur les pages rendues (apres execution du JavaScript).
 *
 * Verifie les metadonnees posees dynamiquement : titre, description, canonical,
 * og:*, JSON-LD, et la restauration des metadonnees en navigation interne.
 *
 * Prerequis :
 *   npm install -D playwright
 *   npx playwright install chromium
 *
 * Usage :
 *   node verif-seo-rendu.mjs
 *   node verif-seo-rendu.mjs --site https://www.valeurs-it.com   (visite en www : cas piege)
 *   node verif-seo-rendu.mjs --site http://127.0.0.1:3000        (serveur de dev : accepte ici)
 *   node verif-seo-rendu.mjs --site http://127.0.0.1:4173        (previsualisation du build)
 *   node verif-seo-rendu.mjs --timeout 45000 --attente 1500      (machine lente)
 *   node verif-seo-rendu.mjs --json
 *
 * Cible locale : contrairement a verif-seo-statique.mjs, ce script accepte le
 * serveur de developpement (`vite dev`, port 3000). L'application React s'y execute
 * a l'identique, donc les metadonnees posees en JavaScript sont les memes. Seuls
 * les controles portant sur le HTML servi et le bundle exigent `vite preview`.
 *
 * Codes de sortie : 0 tout passe · 1 au moins un controle echoue · 2 cible injoignable.
 */

import { chromium } from 'playwright';

const args = process.argv.slice(2);
const opt = (n, d = null) => { const i = args.indexOf(`--${n}`); return i !== -1 && args[i+1] && !args[i+1].startsWith('--') ? args[i+1] : d; };
const JSON_OUT = args.includes('--json');

// On visite volontairement en www : c'est le cas qui revelait le bug du canonical.
const SITE = (opt('site', 'https://www.valeurs-it.com')).replace(/\/$/, '');

// L'URL canonique attendue ne depend JAMAIS de l'hote visite.
const CANONIQUE = 'https://valeurs-it.com';

const DELAI = Number(opt('timeout', '30000'));   // ms, par page
const ATTENTE = Number(opt('attente', '900'));   // ms de stabilisation apres rendu

// Longueur utile d'une balise <title> dans les resultats Google (~600 px).
const TITRE_MAX = 60;

/**
 * Navigation vers une page de l'application.
 *
 * On N'UTILISE PAS waitUntil:'networkidle' : la page d'accueil monte News.tsx,
 * qui ouvre un abonnement Firestore (onSnapshot). Cette connexion reste ouverte
 * en permanence, le reseau n'est donc jamais "idle" et l'attente expire.
 * On attend a la place que l'application ait rendu son premier <h1>, signal
 * fiable sur toutes les pages du site, puis un court delai de stabilisation
 * pour laisser les useEffect poser les metadonnees.
 */
async function allerA(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: DELAI });
  await page.waitForSelector('h1', { timeout: DELAI });
  await page.waitForTimeout(ATTENTE);
}

/**
 * Attendus par type de page.
 * Ajouter ici chaque nouvel article publie.
 * Chroniques 2 et 3 ajoutees le 26/11/2026 — la liste couvre desormais 10 routes.
 */
const PAGES = [
  { chemin: '/',             type: 'accueil',     titre: /^Valeurs IT \|/,            ogType: 'website', jsonLd: ['ProfessionalService'] },
  { chemin: '/cv',           type: 'cv',          titre: /^CV\b|Nguyen/i,             ogType: 'profile', jsonLd: ['ProfessionalService', 'Person'] },
  { chemin: '/livre-blanc',  type: 'livre-blanc', titre: /Livre Blanc/i,              jsonLd: ['ProfessionalService'] },
  { chemin: '/actualites/maitrise-dependances-01', type: 'article', titre: /\| Valeurs IT$/, ogType: 'article', jsonLd: ['ProfessionalService', 'Article'] },
  { chemin: '/actualites/maitrise-dependances-02', type: 'article', titre: /\| Valeurs IT$/, ogType: 'article', jsonLd: ['ProfessionalService', 'Article'] },
  { chemin: '/actualites/maitrise-dependances-03', type: 'article', titre: /\| Valeurs IT$/, ogType: 'article', jsonLd: ['ProfessionalService', 'Article'] },
  { chemin: '/actualites/transformation-equipes',  type: 'article', titre: /\| Valeurs IT$/, ogType: 'article', jsonLd: ['ProfessionalService', 'Article'] },
  { chemin: '/actualites/dsi-business-partner',    type: 'article', titre: /\| Valeurs IT$/, ogType: 'article', jsonLd: ['ProfessionalService', 'Article'] },
  { chemin: '/actualites/souverainete-numerique',  type: 'article', titre: /\| Valeurs IT$/, ogType: 'article', jsonLd: ['ProfessionalService', 'Article'] },
  { chemin: '/actualites/paris-2024',              type: 'article', titre: /\| Valeurs IT$/, ogType: 'article', jsonLd: ['ProfessionalService', 'Article'] },
];

const resultats = [];
const ok  = (code, msg, detail) => resultats.push({ code, statut: 'OK', msg, detail });
const ko  = (code, msg, detail) => resultats.push({ code, statut: 'ECHEC', msg, detail });
// Avertissement : signale sans faire echouer le lot. Sert aux points connus et
// en attente d'arbitrage (longueur des titres au 26/11).
const avertir = (code, msg, detail) => resultats.push({ code, statut: 'ALERTE', msg, detail });

async function lireMeta(page) {
  return page.evaluate(() => {
    const m = s => document.head.querySelector(s)?.getAttribute('content') ?? null;
    const ld = [...document.head.querySelectorAll('script[type="application/ld+json"]')]
      .map(s => { try { return JSON.parse(s.textContent)['@type']; } catch { return 'ILLISIBLE'; } });
    return {
      titre: document.title,
      description: m('meta[name="description"]'),
      canonical: document.head.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null,
      ogUrl: m('meta[property="og:url"]'),
      ogTitre: m('meta[property="og:title"]'),
      ogType: m('meta[property="og:type"]'),
      ogImage: m('meta[property="og:image"]'),
      jsonLd: ld,
      h1: document.querySelector('h1')?.innerText?.slice(0, 80) ?? null,
    };
  });
}

(async () => {
  const navigateur = await chromium.launch();
  const page = await navigateur.newPage();

  // Cible joignable ? Un echec reseau ici n'est pas une regression SEO : on sort en 2.
  try {
    await page.goto(`${SITE}/`, { waitUntil: 'domcontentloaded', timeout: DELAI });
  } catch (e) {
    await navigateur.close();
    console.error(`\nCIBLE INJOIGNABLE — ${SITE}`);
    console.error(`  ${String(e.message).split('\n')[0]}`);
    console.error(`\n  Cible locale : demarrer un serveur dans un terminal dedie, le laisser ouvert,`);
    console.error(`  et verifier qu'il repond avant de lancer les controles :`);
    console.error(`    npm run dev                   -> http://127.0.0.1:3000  (suffisant pour ce script)`);
    console.error(`    npm run build && npx vite preview --port 4173  -> http://127.0.0.1:4173\n`);
    process.exit(2);
  }

  let metaAccueil = null;

  for (const attendu of PAGES) {
    const url = `${SITE}${attendu.chemin}`;
    const code = `R-${attendu.chemin}`;
    try {
      await allerA(page, url);
      const meta = await lireMeta(page);
      if (attendu.chemin === '/') metaAccueil = meta;

      const attenduCanonique = `${CANONIQUE}${attendu.chemin}`;
      const erreurs = [];

      // C1 — canonical : toujours sans www, toujours l URL de la page
      if (meta.canonical !== attenduCanonique)
        erreurs.push(`canonical = ${meta.canonical} (attendu ${attenduCanonique})`);
      if (meta.canonical && /\/\/www\./.test(meta.canonical))
        erreurs.push(`canonical en www alors que la visite se fait en ${new URL(SITE).host}`);

      // C2 — og:url aligne sur le canonical
      if (meta.ogUrl && meta.ogUrl !== attenduCanonique)
        erreurs.push(`og:url = ${meta.ogUrl} (attendu ${attenduCanonique})`);

      // C3 — titre propre a la page
      if (attendu.titre && !attendu.titre.test(meta.titre))
        erreurs.push(`titre inattendu : "${meta.titre}"`);
      if (attendu.chemin !== '/' && metaAccueil && meta.titre === metaAccueil.titre)
        erreurs.push('titre identique a celui de l accueil (metadonnees non posees)');

      // C4 — description presente et specifique
      if (!meta.description || meta.description.length < 40)
        erreurs.push('description absente ou trop courte');
      if (attendu.chemin !== '/' && metaAccueil && meta.description === metaAccueil.description)
        erreurs.push('description identique a celle de l accueil');

      // C5 — og:type
      if (attendu.ogType && meta.ogType !== attendu.ogType)
        erreurs.push(`og:type = ${meta.ogType} (attendu ${attendu.ogType})`);

      // C6 — donnees structurees
      for (const t of (attendu.jsonLd || [])) {
        if (!meta.jsonLd.includes(t)) erreurs.push(`JSON-LD "${t}" absent (trouve : ${meta.jsonLd.join(', ') || 'aucun'})`);
      }

      // C8 — og:image exploitable par les apercus de lien.
      // LinkedIn, Facebook et X ne rendent pas le SVG. L URL doit etre absolue
      // et pointer un bitmap (jpg, jpeg, png ou webp).
      if (!meta.ogImage) {
        erreurs.push('og:image absent');
      } else {
        if (!/^https:\/\//.test(meta.ogImage))
          erreurs.push(`og:image non absolu : ${meta.ogImage}`);
        if (/\.svg(\?|$)/i.test(meta.ogImage))
          erreurs.push(`og:image au format SVG (${meta.ogImage.split('/').pop()}) — non rendu par LinkedIn, Facebook et X`);
      }

      if (erreurs.length) ko(code, `${attendu.type} : ${erreurs.length} anomalie(s)`, erreurs);
      else ok(code, `${attendu.type} conforme — "${meta.titre.slice(0, 55)}"`);

      // C9 — longueur de la balise <title>.
      // Avertissement et non echec : les titres des chroniques 2 et 3 sont connus
      // trop longs et en attente d arbitrage. A passer en `ko` une fois arbitres.
      if (meta.titre && meta.titre.length > TITRE_MAX)
        avertir(`C9${attendu.chemin}`, `titre de ${meta.titre.length} caracteres (limite utile ${TITRE_MAX})`, meta.titre);

    } catch (e) {
      ko(code, `${attendu.type} : page inaccessible`, String(e.message).split('\n')[0]);
    }
  }

  // C7 — restauration des metadonnees en navigation interne
  try {
    if (!metaAccueil) {
      throw new Error('REFERENCE_ACCUEIL_INDISPONIBLE');
    }
    await allerA(page, `${SITE}/cv`);
    const avant = await lireMeta(page);

    const lien = page.locator('a[href="/"]').first();
    if (await lien.count() === 0) {
      ko('C7', 'restauration : aucun lien interne vers l accueil trouve sur /cv');
    } else {
      await lien.click();
      await page.waitForTimeout(1500);
      const apres = await lireMeta(page);
      const erreurs = [];

      // Si /cv n a pose aucune metadonnee, le test de restauration n a pas de sens :
      // le diagnostic porte alors sur la pose, pas sur la restauration.
      const cvAvaitSesMeta = metaAccueil && avant.titre !== metaAccueil.titre;
      if (!cvAvaitSesMeta) {
        erreurs.push('/cv ne pose pas ses propres metadonnees : restauration non testable (voir R-/cv)');
      } else if (apres.titre === avant.titre) {
        erreurs.push('le titre du CV persiste sur l accueil apres navigation interne');
      }

      if (metaAccueil) {
        if (apres.titre !== metaAccueil.titre) erreurs.push(`titre non restaure : "${apres.titre}"`);
        if (apres.canonical !== metaAccueil.canonical) erreurs.push(`canonical non restaure : ${apres.canonical}`);
        if (apres.description !== metaAccueil.description) erreurs.push('description non restauree');
        if (apres.ogType !== metaAccueil.ogType) erreurs.push(`og:type non restaure : ${apres.ogType}`);
        if (apres.jsonLd.length !== metaAccueil.jsonLd.length)
          erreurs.push(`JSON-LD residuel : ${apres.jsonLd.join(', ')} (attendu ${metaAccueil.jsonLd.join(', ')})`);
      }
      if (erreurs.length) ko('C7', 'restauration des metadonnees en navigation interne', erreurs);
      else ok('C7', 'metadonnees correctement restaurees apres navigation interne');
    }
  } catch (e) {
    if (String(e.message).includes('REFERENCE_ACCUEIL_INDISPONIBLE')) {
      ko('C7', 'restauration non testable : la reference de l accueil n a pas pu etre lue',
         'cause en amont — corriger l echec sur R-/ ; ce resultat ne dit rien de /cv');
    } else {
      ko('C7', 'restauration : test impossible', String(e.message).split('\n')[0]);
    }
  }

  await navigateur.close();

  const echecs = resultats.filter(r => r.statut === 'ECHEC');
  const alertes = resultats.filter(r => r.statut === 'ALERTE');

  if (JSON_OUT) {
    console.log(JSON.stringify({ site: SITE, resultats, echecs: echecs.length, alertes: alertes.length }, null, 2));
  } else {
    console.log(`\nControles SEO sur page rendue — visite via ${SITE}\n${'='.repeat(60)}`);
    for (const r of resultats) {
      const marque = r.statut === 'OK' ? '  OK  ' : r.statut === 'ECHEC' ? 'ECHEC ' : 'ALERTE';
      console.log(`[${marque}] ${r.code}  ${r.msg}`);
      if (r.detail) (Array.isArray(r.detail) ? r.detail : [r.detail]).forEach(d => console.log(`            ${d}`));
    }
    console.log('='.repeat(60));
    console.log(echecs.length === 0 ? 'Aucune regression detectee.' : `${echecs.length} controle(s) en echec.`);
    if (alertes.length) console.log(`${alertes.length} avertissement(s) — sans effet sur le code de sortie.`);
    console.log('');
  }
  process.exit(echecs.length === 0 ? 0 : 1);
})();
