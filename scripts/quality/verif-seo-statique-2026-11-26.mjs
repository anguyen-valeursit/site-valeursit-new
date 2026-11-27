#!/usr/bin/env node
/**
 * verif-seo-statique.mjs   —   version du 26/11/2026
 * Controles SEO sur le HTML reellement servi, sans navigateur.
 *
 * Verifie ce qu'un robot qui n'execute pas JavaScript peut voir, plus le
 * sitemap, le robots.txt et l'empreinte du bundle deploye.
 *
 * Prerequis : Node 18+ (fetch global). Aucune dependance.
 *
 * Usage :
 *   node verif-seo-statique.mjs
 *   node verif-seo-statique.mjs --site https://valeurs-it-site-vitrine.ai.studio
 *   node verif-seo-statique.mjs --site http://127.0.0.1:4173   (previsualisation du build)
 *   node verif-seo-statique.mjs --json          (sortie machine)
 *   node verif-seo-statique.mjs --bundle ancien-nom.js   (compare l'empreinte)
 *
 * IMPORTANT — cible locale :
 *   ce script doit viser la PREVISUALISATION du build (`vite preview`, qui sert dist/),
 *   jamais le serveur de developpement (`vite dev`). Le serveur de developpement ne
 *   produit pas de bundle `/assets/index-*.js` et sert un HTML different de celui
 *   publie : les controles S8, S10, S11 et S12 y seraient faux. Le script detecte ce
 *   cas et s'arrete avec le code 2 plutot que de rendre un resultat trompeur.
 *
 * Codes de sortie : 0 tout passe · 1 au moins un controle echoue · 2 cible invalide.
 */

const args = process.argv.slice(2);
const opt = (nom, defaut = null) => {
  const i = args.indexOf(`--${nom}`);
  return i !== -1 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : defaut;
};
const flag = (nom) => args.includes(`--${nom}`);

const SITE = (opt('site', 'https://valeurs-it.com')).replace(/\/$/, '');
const CANONIQUE = 'https://valeurs-it.com';
const BUNDLE_PRECEDENT = opt('bundle');
const JSON_OUT = flag('json');

// Les 10 URL attendues dans le sitemap, dans n'importe quel ordre.
// A completer a chaque article publie (chroniques 2 et 3 ajoutees le 26/11).
const SITEMAP_ATTENDU = [
  `${CANONIQUE}/`,
  `${CANONIQUE}/cv`,
  `${CANONIQUE}/livre-blanc`,
  `${CANONIQUE}/actualites/maitrise-dependances-01`,
  `${CANONIQUE}/actualites/maitrise-dependances-02`,
  `${CANONIQUE}/actualites/maitrise-dependances-03`,
  `${CANONIQUE}/actualites/transformation-equipes`,
  `${CANONIQUE}/actualites/dsi-business-partner`,
  `${CANONIQUE}/actualites/souverainete-numerique`,
  `${CANONIQUE}/actualites/paris-2024`,
];

// URL qui ne doivent JAMAIS figurer dans le sitemap.
const SITEMAP_INTERDIT = ['/admin', '/temoignage', '/mentions-legales', '/politique-confidentialite'];

const resultats = [];
const ok = (code, msg, detail) => resultats.push({ code, statut: 'OK', msg, detail });
const ko = (code, msg, detail) => resultats.push({ code, statut: 'ECHEC', msg, detail });
const info = (code, msg, detail) => resultats.push({ code, statut: 'INFO', msg, detail });

async function recuperer(chemin) {
  const url = `${SITE}${chemin}${chemin.includes('?') ? '&' : '?'}_cb=${Date.now()}`;
  const r = await fetch(url, { cache: 'no-store', redirect: 'follow' });
  return { statut: r.status, texte: await r.text(), urlFinale: r.url };
}

// ------------------------------------------------------- S0 cible joignable
/**
 * Avant tout controle, on verifie que la cible repond ET qu'il s'agit bien d'un
 * build servi, pas d'un serveur de developpement. Ces deux echecs ont des causes
 * et des correctifs completement differents ; les confondre fait perdre du temps.
 */
async function controlePrealable() {
  let rep;
  try {
    rep = await recuperer('/');
  } catch (e) {
    const hote = new URL(SITE).host;
    const cause = /ECONNREFUSED|fetch failed|ConnectionRefused/i.test(String(e.message) + String(e.cause?.code || ''))
      ? `rien n'ecoute sur ${hote}`
      : String(e.message);
    console.error(`\nCIBLE INJOIGNABLE — ${SITE}`);
    console.error(`  ${cause}`);
    console.error(`\n  Pour une cible locale, demarrer la previsualisation du build :`);
    console.error(`    npm run build`);
    console.error(`    npx vite preview --port 4173`);
    console.error(`  puis verifier que la page repond avant de relancer (PowerShell) :`);
    console.error(`    (Invoke-WebRequest http://127.0.0.1:4173/sitemap.xml -UseBasicParsing).StatusCode`);
    console.error(`\n  Attention : \`vite preview\` s'arrete avec le terminal qui l'a lance.`);
    console.error(`  Le lancer dans un terminal dedie, et le laisser ouvert pendant les controles.\n`);
    process.exit(2);
  }

  if (/\/@vite\/client/.test(rep.texte)) {
    console.error(`\nCIBLE INVALIDE — ${SITE} est un serveur de DEVELOPPEMENT (\`vite dev\`).`);
    console.error(`  Le HTML servi n'est pas celui qui sera publie : pas de bundle /assets/index-*.js,`);
    console.error(`  head et sitemap potentiellement differents. Les controles S8, S10, S11 et S12`);
    console.error(`  rendraient des echecs faux.`);
    console.error(`\n  Viser la previsualisation du build :`);
    console.error(`    npm run build && npx vite preview --port 4173`);
    console.error(`    node verif-seo-statique.mjs --site http://127.0.0.1:4173\n`);
    process.exit(2);
  }

  if (rep.statut !== 200) {
    console.error(`\nCIBLE INJOIGNABLE — ${SITE}/ renvoie HTTP ${rep.statut}.\n`);
    process.exit(2);
  }
}

// ---------------------------------------------------------------- S1 sitemap
async function controleSitemap() {
  let rep;
  try { rep = await recuperer('/sitemap.xml'); }
  catch (e) { return ko('S1', 'sitemap.xml inaccessible', String(e.message)); }

  if (rep.statut !== 200) return ko('S1', `sitemap.xml renvoie HTTP ${rep.statut}`);

  const urls = [...rep.texte.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map(m => m[1]);

  const manquantes = SITEMAP_ATTENDU.filter(u => !urls.includes(u));
  const enTrop = urls.filter(u => !SITEMAP_ATTENDU.includes(u));
  const avecWww = urls.filter(u => /\/\/www\./.test(u));
  const interdites = urls.filter(u => SITEMAP_INTERDIT.some(i => u.includes(i)));
  const doublons = urls.filter((u, i) => urls.indexOf(u) !== i);

  if (manquantes.length) ko('S1', `${manquantes.length} URL manquante(s) dans le sitemap`, manquantes);
  else ok('S1', `les ${SITEMAP_ATTENDU.length} URL attendues sont presentes`);

  if (avecWww.length) ko('S2', 'URL en www dans le sitemap (doit etre sans www)', avecWww);
  else ok('S2', 'aucune URL en www');

  if (interdites.length) ko('S3', 'URL qui ne doivent pas etre indexees', interdites);
  else ok('S3', '/admin, /temoignage et les modales sont bien exclus');

  if (doublons.length) ko('S4', 'doublons dans le sitemap', [...new Set(doublons)]);
  else ok('S4', 'aucun doublon');

  if (enTrop.length) info('S5', 'URL supplementaires (normal apres ajout d articles — mettre a jour SITEMAP_ATTENDU)', enTrop);
}

// ---------------------------------------------------------- S6 XML bien forme
async function controleXml() {
  const rep = await recuperer('/sitemap.xml');
  const nbUrl = (rep.texte.match(/<url>/g) || []).length;
  const nbUrlFin = (rep.texte.match(/<\/url>/g) || []).length;
  if (!/<urlset[^>]*xmlns=/.test(rep.texte)) ko('S6', 'namespace xmlns absent de <urlset>');
  else if (nbUrl !== nbUrlFin) ko('S6', `balises <url> desequilibrees : ${nbUrl} ouvertes, ${nbUrlFin} fermees`);
  else ok('S6', `XML bien forme (${nbUrl} entrees)`);
}

// ---------------------------------------------------------------- S7 robots
async function controleRobots() {
  try {
    const rep = await recuperer('/robots.txt');
    if (rep.statut !== 200) return ko('S7', `robots.txt renvoie HTTP ${rep.statut}`);
    const declareSitemap = /Sitemap:\s*https?:\/\/\S*sitemap\.xml/i.test(rep.texte);
    const bloqueTout = /^\s*Disallow:\s*\/\s*$/mi.test(rep.texte);
    if (bloqueTout) ko('S7', 'robots.txt bloque tout le site (Disallow: /)');
    else if (!declareSitemap) ko('S7', 'robots.txt ne declare pas le sitemap');
    else ok('S7', 'robots.txt autorise et declare le sitemap');
  } catch (e) { ko('S7', 'robots.txt inaccessible', String(e.message)); }
}

// ------------------------------------------------- S8 head statique accueil
async function controleHeadStatique() {
  let rep;
  try { rep = await recuperer('/'); }
  catch (e) { return ko('S8', 'page d accueil inaccessible', String(e.message)); }

  const h = rep.texte;
  const attendus = [
    [/<html[^>]+lang="fr"/i, 'lang="fr"'],
    [/rel="canonical"[^>]+href="https:\/\/valeurs-it\.com\/"/i, 'canonical sans www'],
    [/property="og:image"[^>]+content="https:\/\/valeurs-it\.com\//i, 'og:image en absolu'],
    [/name="twitter:card"/i, 'twitter:card en name= (et non property=)'],
    [/application\/ld\+json/i, 'JSON-LD present'],
    [/rel="icon"/i, 'favicon declare'],
  ];
  const manquants = attendus.filter(([re]) => !re.test(h)).map(([, nom]) => nom);
  if (manquants.length) ko('S8', 'head statique incomplet', manquants);
  else ok('S8', 'head statique conforme');

  if (/picsum\.photos|i\.pravatar\.cc/.test(h)) ko('S9', 'image de remplacement aleatoire detectee dans le HTML servi');
  else ok('S9', 'aucune image de remplacement aleatoire');

  // S14 — og:image du head statique exploitable par les reseaux sociaux.
  // LinkedIn, Facebook et X ne rendent pas le SVG dans les apercus de lien.
  const og = (h.match(/property="og:image"[^>]+content="([^"]+)"/i) || [])[1];
  if (!og) ko('S14', 'og:image absent du head statique');
  else if (/\.svg(\?|$)/i.test(og)) ko('S14', 'og:image au format SVG — non rendu par LinkedIn, Facebook et X', og);
  else ok('S14', `og:image exploitable (${og.split('/').pop()})`);
}

// ---------------------------------- S10 lisibilite par les moteurs generatifs
async function controlePreRendu() {
  const accueil = await recuperer('/');
  const cv = await recuperer('/cv');

  const corps = (accueil.texte.match(/<body[\s\S]*<\/body>/i) || [''])[0];
  const texte = corps.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

  if (texte.length === 0) {
    info('S10', 'HTML servi sans texte : contenu invisible pour les moteurs generatifs (pre-rendu non encore en place)');
  } else {
    ok('S10', `HTML servi avec ${texte.length} caracteres de texte — pre-rendu actif`);
  }

  if (cv.texte === accueil.texte) {
    info('S11', '/cv renvoie un HTML identique a l accueil (attendu tant que le pre-rendu n est pas fait)');
  } else {
    ok('S11', '/cv renvoie un HTML distinct de l accueil');
  }
}

// --------------------------------------------------- S12 empreinte du bundle
async function controleBundle() {
  const rep = await recuperer('/');
  const m = rep.texte.match(/src="(\/assets\/index-[^"]+\.js)"/);
  if (!m) return ko('S12', 'bundle JavaScript introuvable dans le HTML');
  const bundle = m[1];

  if (BUNDLE_PRECEDENT) {
    if (bundle.includes(BUNDLE_PRECEDENT)) {
      ko('S12', `bundle INCHANGE (${bundle}) : le deploiement n a pas eu lieu`);
    } else {
      ok('S12', `bundle change : ${bundle} (precedent : ${BUNDLE_PRECEDENT})`);
    }
  } else {
    info('S12', `bundle deploye : ${bundle}`, 'relancer avec --bundle <ce nom> apres publication pour confirmer le changement');
  }
}

// --------------------------------------------------- S13 toutes les URL repondent
async function controleUrls() {
  const echecs = [];
  for (const u of SITEMAP_ATTENDU) {
    const chemin = u.replace(CANONIQUE, '') || '/';
    try {
      const rep = await recuperer(chemin);
      if (rep.statut !== 200) echecs.push(`${chemin} → HTTP ${rep.statut}`);
    } catch (e) { echecs.push(`${chemin} → ${e.message}`); }
  }
  if (echecs.length) ko('S13', 'URL du sitemap qui ne repondent pas', echecs);
  else ok('S13', `les ${SITEMAP_ATTENDU.length} URL du sitemap repondent en 200`);
}

// ------------------------------------------------------------------- main
(async () => {
  await controlePrealable();

  await controleSitemap();
  await controleXml();
  await controleRobots();
  await controleHeadStatique();
  await controlePreRendu();
  await controleBundle();
  await controleUrls();

  const echecs = resultats.filter(r => r.statut === 'ECHEC');

  if (JSON_OUT) {
    console.log(JSON.stringify({ site: SITE, resultats, echecs: echecs.length }, null, 2));
  } else {
    console.log(`\nControles SEO statiques — ${SITE}\n${'='.repeat(50)}`);
    for (const r of resultats) {
      const marque = r.statut === 'OK' ? '  OK  ' : r.statut === 'ECHEC' ? 'ECHEC ' : ' INFO ';
      console.log(`[${marque}] ${r.code}  ${r.msg}`);
      if (r.detail) {
        const d = Array.isArray(r.detail) ? r.detail : [r.detail];
        d.forEach(x => console.log(`            ${x}`));
      }
    }
    console.log(`${'='.repeat(50)}`);
    console.log(echecs.length === 0 ? 'Aucune regression detectee.\n' : `${echecs.length} controle(s) en echec.\n`);
  }

  process.exit(echecs.length === 0 ? 0 : 1);
})();
