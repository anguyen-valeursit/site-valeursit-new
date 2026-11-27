// SPA de test reproduisant le comportement du site : metadonnees posees en JS,
// restaurees au demontage, canonical construit depuis une constante SITE_URL.
// Usage : node spa.mjs [port] [mode]   mode = sain | casse | dev
//   sain  : tout conforme, 10 routes, og:image bitmap par article
//   casse : canonical depuis location.origin, pas de restauration, /cv sans meta,
//           og:image en SVG, titre de l article 03 trop long
//   dev   : comme sain, mais sert /@vite/client (simule `vite dev`)
import { createServer } from 'node:http';

const port = Number(process.argv[2] || 8899);
const mode = process.argv[3] || 'sain';

const page = (casse, dev) => `<!doctype html>
<html lang="fr"><head>
<meta charset="utf-8">
<title>Valeurs IT | DSI de transition, strategie SI &amp; cybersecurite</title>
<meta name="description" content="Valeurs IT accompagne les organisations en strategie et gouvernance SI, transformation numerique et cybersecurite.">
<link rel="canonical" href="https://valeurs-it.com/">
<link rel="icon" href="/favicon.ico">
<meta property="og:url" content="https://valeurs-it.com/">
<meta property="og:title" content="Valeurs IT">
<meta property="og:type" content="website">
<meta property="og:image" content="https://valeurs-it.com/og-accueil${casse ? '.svg' : '.jpg'}">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"ProfessionalService"}</script>
</head><body>
<div id="app"></div>
${dev ? '<script type="module" src="/@vite/client"></script>' : '<script type="module" src="/assets/index-TESTHASH.js"></script>'}
<script>
const CASSE = ${casse};
const SITE_URL = "https://valeurs-it.com";
const base = () => CASSE ? location.origin : SITE_URL;
const EXT = CASSE ? '.svg' : '.jpg';

const ARTICLES = {
 'maitrise-dependances-01':{t:'Souverainete numerique : et si vous commenciez',e:'Reperes pour renforcer la resilience et comprendre les dependances de son ecosysteme numerique.',i:'/aiguillages-01'},
 'maitrise-dependances-02':{t:'Dependances technologiques : de qui dependez-vous ?',e:'Une lecture des dependances reelles d un systeme d information et de ce qu elles impliquent.',i:'/aiguillages-dependances'},
 'maitrise-dependances-03':{t:${casse
   ? "'Pourquoi la maitrise des dependances technologiques doit devenir un sujet de direction generale'"
   : "'Dependances IT : un sujet de direction generale'"},e:'Pourquoi l arbitrage des dependances releve du comite de direction et non de la seule DSI.',i:'/salle-direction-arbitrage'},
 'transformation-equipes':{t:'Transformation IT : comment faire equipe quand tout change',e:'Un retour d experience de Paris 2024 confronte a la realite d une direction IT en transformation.',i:'/transformation'},
 'dsi-business-partner':{t:'Le DSI, partenaire des metiers et acteur de la transformation',e:'La continuite de service reste un socle, la contribution du DSI s etend a la strategie.',i:'/dsi-bp'},
 'souverainete-numerique':{t:'Souverainete Numerique : Pourquoi il est temps d agir',e:'Analyse de la dependance technologique et de l importance de l autonomie strategique.',i:'/souverainete'},
 'paris-2024':{t:'Les Jeux de Paris 2024, une experience unique',e:'Partage d experience sur la vision strategique, l exigence et la resilience.',i:'/paris-2024'}
};
const ACCUEIL = {titre:document.title, desc:document.querySelector('meta[name=description]').content,
                 can:'https://valeurs-it.com/', ogType:'website'};
let nettoyer = null;

function poser(o){
  const q = s => document.querySelector(s);
  const prec={titre:document.title, desc:q('meta[name=description]').content,
              can:q('link[rel=canonical]').getAttribute('href'),
              ogType:q('meta[property="og:type"]').content,
              ogImage:q('meta[property="og:image"]').content};
  document.title=o.titre;
  q('meta[name=description]').content=o.desc;
  q('link[rel=canonical]').setAttribute('href',o.can);
  q('meta[property="og:url"]').content=o.can;
  q('meta[property="og:type"]').content=o.ogType;
  if(o.ogImage) q('meta[property="og:image"]').content=o.ogImage;
  let s=null;
  if(o.ld){ s=document.createElement('script'); s.type='application/ld+json';
    s.textContent=JSON.stringify(o.ld); document.head.appendChild(s); }
  return ()=>{ if(CASSE) { if(s) s.remove(); return; }   // mode casse : pas de restauration des meta
    document.title=prec.titre;
    q('meta[name=description]').content=prec.desc;
    q('link[rel=canonical]').setAttribute('href',prec.can);
    q('meta[property="og:type"]').content=prec.ogType;
    q('meta[property="og:image"]').content=prec.ogImage;
    if(s) s.remove(); };
}

function rendre(){
  if(nettoyer){ nettoyer(); nettoyer=null; }
  const p=location.pathname, app=document.getElementById('app');
  if(p==='/cv'){
    if(!CASSE) nettoyer=poser({titre:"CV — Viet Hung Alain Nguyen, DSI | Valeurs IT",
      desc:"Parcours de Viet Hung Alain Nguyen, Directeur des Systemes d Information : strategie SI, cybersecurite, management de transition.",
      can:base()+'/cv', ogType:'profile', ogImage:SITE_URL+'/og-cv'+EXT,
      ld:{"@context":"https://schema.org","@type":"Person",name:"Viet Hung Alain Nguyen"}});
    app.innerHTML='<h1>VIET HUNG ALAIN NGUYEN</h1><a href="/">Retour au site</a>';
  } else if(p==='/livre-blanc'){
    nettoyer=poser({titre:"Livre Blanc : une aventure humaine et technique | Valeurs IT",
      desc:"Telechargez le livre blanc exclusif sur les coulisses technologiques et humaines des Jeux de Paris 2024.",
      can:base()+'/livre-blanc', ogType:'website', ogImage:SITE_URL+'/og-livre-blanc'+EXT});
    app.innerHTML='<h1>Livre Blanc</h1><a href="/">Retour</a>';
  } else if(p.startsWith('/actualites/')){
    const id=p.split('/')[2], a=ARTICLES[id];
    if(a){ nettoyer=poser({titre:a.t+' | Valeurs IT', desc:a.e, can:base()+'/actualites/'+id, ogType:'article',
      ogImage:SITE_URL+a.i+EXT,
      ld:{"@context":"https://schema.org","@type":"Article",headline:a.t,mainEntityOfPage:base()+'/actualites/'+id}});
      app.innerHTML='<h1>'+a.t+'</h1><a href="/">Retour</a>'; }
  } else {
    app.innerHTML='<h1>Valeurs IT</h1><a href="/cv">CV</a>';
    if(!window.__flux){ window.__flux=setInterval(()=>fetch('/flux?t='+Date.now()).catch(()=>{}),250); }  // long-polling continu, comme Firestore
  }
}
document.addEventListener('click',e=>{const a=e.target.closest('a');
  if(a&&a.getAttribute('href')?.startsWith('/')){e.preventDefault();history.pushState({},'',a.getAttribute('href'));rendre();}});
rendre();
</script></body></html>`;

const ARTICLES_SITEMAP = ['maitrise-dependances-01','maitrise-dependances-02','maitrise-dependances-03',
  'transformation-equipes','dsi-business-partner','souverainete-numerique','paris-2024'];

const sitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${['/', '/cv', '/livre-blanc', ...ARTICLES_SITEMAP.map(a => '/actualites/' + a)]
  .map(c => `  <url><loc>https://valeurs-it.com${c}</loc><lastmod>2026-11-24</lastmod><priority>0.8</priority></url>`)
  .join('\n')}
</urlset>`;

const robots = `User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: https://valeurs-it.com/sitemap.xml\n`;

const html = page(mode === 'casse', mode === 'dev');
createServer((req, res) => {
  const chemin = req.url.split('?')[0];
  if (chemin.startsWith('/flux')) { setTimeout(() => { try { res.writeHead(200, {'Content-Type':'text/plain'}); res.end('x'); } catch(e){} }, 400); return; }
  if (chemin === '/sitemap.xml') { res.writeHead(200, {'Content-Type':'application/xml','Cache-Control':'no-store'}); return res.end(sitemap()); }
  if (chemin === '/robots.txt')  { res.writeHead(200, {'Content-Type':'text/plain','Cache-Control':'no-store'}); return res.end(robots); }
  res.writeHead(200, {'Content-Type':'text/html','Cache-Control':'no-store'}); res.end(html);
}).listen(port, () => console.log(`spa ${mode} sur http://127.0.0.1:${port}`));
