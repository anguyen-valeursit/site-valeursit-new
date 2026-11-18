import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SITE_URL } from "../constants";
import { ArrowLeft, Download, ExternalLink, Mail, Phone, MapPin, Linkedin, Printer } from "lucide-react";

export default function CVPage() {
  const pdfUrl = "/cv-alain-nguyen.pdf";

  // Metadonnees propres a la page CV
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}/cv`;
    const previousTitle = document.title;
    document.title = "CV — Viet Hung Alain Nguyen, Directeur des Systèmes d'Information | Valeurs IT";

    const restoreMeta: Array<() => void> = [];
    const updateMeta = (selector: string, content: string) => {
      const el = document.head.querySelector(selector);
      if (!el) return;
      const previous = el.getAttribute("content");
      el.setAttribute("content", content);
      restoreMeta.push(() => {
        if (previous === null) el.removeAttribute("content");
        else el.setAttribute("content", previous);
      });
    };

    const description = "Parcours de Viet Hung Alain Nguyen, Directeur des Systèmes d'Information : stratégie SI, transformation numérique, cybersécurité et management de transition. 25 ans d'expérience, dont les Jeux de Paris 2024.";

    updateMeta('meta[name="description"]', description);
    updateMeta('meta[property="og:type"]', "profile");
    updateMeta('meta[property="og:title"]', "CV — Viet Hung Alain Nguyen, DSI de transition");
    updateMeta('meta[property="og:description"]', description);
    updateMeta('meta[property="og:url"]', canonicalUrl);

    const canonical = document.head.querySelector('link[rel="canonical"]');
    const previousCanonical = canonical?.getAttribute("href") ?? null;
    canonical?.setAttribute("href", canonicalUrl);

    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Viet Hung Alain Nguyen",
      alternateName: "Alain Nguyen",
      jobTitle: "Directeur des Systèmes d'Information",
      url: canonicalUrl,
      sameAs: ["https://www.linkedin.com/in/vnguye27"],
      worksFor: { "@type": "Organization", name: "Valeurs IT", url: SITE_URL },
      knowsAbout: [
        "Direction des systèmes d'information",
        "DSI de transition",
        "Stratégie SI",
        "Gouvernance IT",
        "Transformation numérique",
        "Cybersécurité",
        "Continuité d'activité"
      ]
    });
    document.head.appendChild(schema);

    return () => {
      document.title = previousTitle;
      restoreMeta.forEach(restore => restore());
      if (canonical) {
        if (previousCanonical === null) canonical.removeAttribute("href");
        else canonical.setAttribute("href", previousCanonical);
      }
      schema.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 print:bg-white print:text-black">
      {/* Top action bar - hidden during print */}
      <header className="sticky top-0 z-50 bg-primary text-white shadow-md print:hidden">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au site
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-xs md:text-sm font-medium transition-colors"
              title="Imprimer le CV"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Imprimer</span>
            </button>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-xs md:text-sm font-medium transition-colors"
              title="Ouvrir le fichier PDF dans un nouvel onglet"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ouvrir PDF</span>
            </a>
            <a
              href={pdfUrl}
              download="CV_Alain_Nguyen_DSI.pdf"
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent text-white hover:bg-accent/90 rounded-full text-xs md:text-sm font-medium transition-colors shadow-sm"
              title="Télécharger le fichier PDF officiel"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Télécharger le PDF</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main CV Document Container */}
      <main className="max-w-4xl mx-auto my-8 p-6 md:p-12 bg-white rounded-2xl shadow-xl print:shadow-none print:m-0 print:p-0 print:rounded-none">
        {/* Header / Identity */}
        <section className="border-b border-gray-200 pb-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary tracking-tight">
                VIET HUNG ALAIN NGUYEN
              </h1>
              <h2 className="text-lg md:text-xl font-bold text-accent mt-1 tracking-wide uppercase">
                Directeur des Systèmes d'Information (DSI)
              </h2>
              <p className="text-sm font-medium text-gray-600 mt-1">
                Stratégie SI, transformation numérique, cybersécurité, management de transition
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-xs md:text-sm text-gray-600">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              Colombes (92)
            </span>
            <a href="tel:0695932515" className="inline-flex items-center gap-1.5 hover:text-accent transition-colors">
              <Phone className="w-3.5 h-3.5 text-accent" />
              06 95 93 25 15
            </a>
            <a href="mailto:anguyen@valeurs-it.com" className="inline-flex items-center gap-1.5 hover:text-accent transition-colors">
              <Mail className="w-3.5 h-3.5 text-accent" />
              anguyen@valeurs-it.com
            </a>
            <a
              href="https://www.linkedin.com/in/vnguye27"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-accent" />
              linkedin.com/in/vnguye27
            </a>
          </div>
        </section>

        {/* Profil */}
        <section className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
            Profil
          </h3>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed text-justify">
            Directeur des systèmes d'information, 25 ans d'expérience, membre de comité de direction. Alignement du SI sur la stratégie de l'entreprise, schéma directeur, gouvernance et urbanisation du système d'information, pilotage de portefeuilles de projets, gestion budgétaire, cybersécurité et conformité, continuité de service en environnement critique. Création de fonction SI, DSI de transition, management d'équipes internes et de prestataires, pilotage d'éditeurs, d'intégrateurs et d'infogérants.
          </p>
          <div className="mt-3 p-3 bg-paper rounded-xl border border-gray-100 text-xs md:text-sm text-gray-600 flex flex-wrap gap-x-6 gap-y-1">
            <span><strong>Secteurs :</strong> événementiel, sport, spectacle vivant, services numériques, bancaire, santé, secteur public, grande distribution, télécoms.</span>
            <span><strong>Langues :</strong> Français (maternelle), Anglais courant.</span>
            <span><strong>Mobilité :</strong> Île-de-France, France entière et international.</span>
            <span className="text-accent font-semibold">Disponible à temps plein.</span>
          </div>
        </section>

        {/* Compétences Clés */}
        <section className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-4">
            Compétences Clés
          </h3>
          <div className="space-y-3 text-xs md:text-sm">
            <div>
              <strong className="text-primary font-bold">Stratégie et gouvernance des SI : </strong>
              <span className="text-gray-700">alignement stratégique du SI, politique SI, schéma directeur, plan directeur, feuille de route, gouvernance des systèmes d'information, arbitrage des moyens de la DSI (ressources, budgets, investissements), maîtrise des coûts, ROI des projets, conseil et reporting à la direction générale.</span>
            </div>
            <div>
              <strong className="text-primary font-bold">Architecture et transformation numérique : </strong>
              <span className="text-gray-700">urbanisation, architecture SI, rationalisation du parc applicatif, modernisation, cloud souverain et hybridation, centres de données, API, intégration ERP (SAP S/4HANA, interfaces), CRM (Salesforce), décommissionnement, Green IT.</span>
            </div>
            <div>
              <strong className="text-primary font-bold">Innovation, data et IA : </strong>
              <span className="text-gray-700">données et reporting, Power BI, apprentissage automatique (machine learning), modèles de langage (LLM) appliqués à la reconnaissance documentaire.</span>
            </div>
            <div>
              <strong className="text-primary font-bold">Sécurité et gestion des risques : </strong>
              <span className="text-gray-700">politique de gestion des risques informatiques, fiabilité, confidentialité des données, intégrité du SI, cybersécurité, ISO 27001, HDS, RGPD, PCI DSS, PCA/PRA, continuité d'activité, gestion de crise, résilience opérationnelle, souveraineté numérique.</span>
            </div>
            <div>
              <strong className="text-primary font-bold">Services et méthodes : </strong>
              <span className="text-gray-700">maintien en conditions opérationnelles (MCO), processus de type ITIL (comité consultatif des changements, gestion des incidents majeurs), accords de niveaux de service (SLA), indicateurs (KPI) ; projets agiles et en cascade, gouvernance de la qualité ; industrialisation des livraisons, gestion des environnements, recette, Jira ; TMA.</span>
            </div>
            <div>
              <strong className="text-primary font-bold">Faire ou faire-faire et sous-traitance : </strong>
              <span className="text-gray-700">politique de « faire ou faire-faire », appels d'offres, marchés publics, contrats-cadres et contrats de service, négociation, qualité et performance de la sous-traitance, réversibilité, pilotage d'ESN, d'éditeurs, d'intégrateurs et d'infogérants.</span>
            </div>
            <div>
              <strong className="text-primary font-bold">Management : </strong>
              <span className="text-gray-700">organisation de la DSI, management de managers, recrutement, organisations multi-sites, projets pluridisciplinaires, identification des besoins et accompagnement des directions métiers, accompagnement du changement, management de transition.</span>
            </div>
          </div>
        </section>

        {/* Missions et Expériences */}
        <section className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-6">
            Missions et Expériences
          </h3>

          <div className="space-y-6">
            {/* Mission 1 */}
            <div className="border-l-2 border-accent/40 pl-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-1">
                <h4 className="text-sm md:text-base font-bold text-primary">
                  CONSULTANT EN STRATÉGIE DES SYSTÈMES D'INFORMATION
                </h4>
                <span className="text-xs font-bold text-accent uppercase tracking-wider">depuis 03/2025</span>
              </div>
              <p className="text-xs md:text-sm font-semibold text-gray-500 mb-2">Valeurs IT — conseil aux directions générales et aux DSI</p>
              <ul className="list-disc list-outside ml-4 space-y-1.5 text-xs md:text-sm text-gray-700">
                <li><strong>Audit de la direction technique de l'Opéra national de Paris :</strong> audit de processus auprès d'équipes peu familiarisées avec la digitalisation ; 18 entretiens, une trentaine de personnes, 25 heures de recueil des besoins ; 4 livrables (cartographie des processus, description des postes par métier, note de synthèse, restitution).</li>
                <li><strong>Conseil à la direction générale</strong> sur l'organisation du système d'information (COJOP Alpes Françaises 2030).</li>
                <li><strong>Animation du premier Do Tank d'Alliancy</strong> sur les dépendances technologiques et la souveraineté numérique (9 organisations dont Urssaf et CNAM, 10 ateliers, plan directeur en 4 axes, autodiagnostic).</li>
              </ul>
            </div>

            {/* Mission 2 */}
            <div className="border-l-2 border-accent/40 pl-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-1">
                <h4 className="text-sm md:text-base font-bold text-primary">
                  DIRECTEUR DES SYSTÈMES D'INFORMATION DE TRANSITION
                </h4>
                <span className="text-xs font-bold text-accent uppercase tracking-wider">12/2025 – 06/2026 (6 mois)</span>
              </div>
              <p className="text-xs md:text-sm font-semibold text-gray-500 mb-2">Groupe Luminess — services numériques et édition de logiciels, multi-sites ; rattachement direct au PDG</p>
              <ul className="list-disc list-outside ml-4 space-y-1.5 text-xs md:text-sm text-gray-700">
                <li><strong>Contexte :</strong> remplacement du directeur technique, sortie de plan social, parc applicatif hérité, retour à la croissance ; rapport d'étonnement remis au président.</li>
                <li><strong>Équipes :</strong> direction de 60 collaborateurs (études, production, architecture, sécurité) ; ligne managériale reconstituée de 2 à 5 responsables ; gestion de crise sur perte électrique d'un data center.</li>
                <li><strong>Gouvernance et sécurité :</strong> instances de décision, comités consultatifs, incidents majeurs, SLA contractuels ; feuille de route cybersécurité avec le RSSI, certifications ISO 27001 et HDS maintenues.</li>
                <li><strong>Transformation :</strong> trajectoire reconstruite avec la DG (rationalisation applicative et data centers, cloud souverain) ; modèles de langage (LLM) intégrés à la reconnaissance documentaire.</li>
              </ul>
            </div>

            {/* Mission 3 */}
            <div className="border-l-2 border-accent/40 pl-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-1">
                <h4 className="text-sm md:text-base font-bold text-primary">
                  DIRECTEUR DÉLÉGUÉ EN CHARGE DU SI DES JEUX (DEPUTY CIO)
                </h4>
                <span className="text-xs font-bold text-accent uppercase tracking-wider">07/2019 – 12/2024</span>
              </div>
              <p className="text-xs md:text-sm font-semibold text-gray-500 mb-2">Comité d'organisation des Jeux Olympiques et Paralympiques de Paris 2024 — Membre du comité de direction du COJOP</p>
              <ul className="list-disc list-outside ml-4 space-y-1.5 text-xs md:text-sm text-gray-700">
                <li><strong>Création du pôle SI :</strong> aucune fonction SI au démarrage ; 50 collaborateurs recrutés, plus de 200 prestataires, 6 managers directs, jusqu'à 5 000 personnes pilotées pendant les Jeux.</li>
                <li><strong>Portefeuille et budget :</strong> plus de 200 systèmes livrés, coordination de 45 directions métiers (300 besoins recensés), budget de 230 M€ ; projets agiles et cascade ; interfaces SAP S/4HANA et systèmes de revenus.</li>
                <li><strong>Gouvernance des données :</strong> gouvernance globale des données des Jeux auprès des directions Revenu, Digital, Opérations, DAF et Environnement.</li>
                <li><strong>Exploitation et fin de vie :</strong> direction du centre des opérations technologiques 24/7 (100 experts, équipes IT sur plus de 200 sites) ; aucun incident majeur ; décommissionnement et transfert de connaissances vers Milan et Los Angeles.</li>
                <li><strong>Innovations impactantes :</strong> billet 100 % digital ; présélection de 45 000 volontaires parmi 200 000 candidats par machine learning.</li>
              </ul>
            </div>

            {/* Mission 4 */}
            <div className="border-l-2 border-accent/40 pl-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-1">
                <h4 className="text-sm md:text-base font-bold text-primary">
                  RESPONSABLE DES SYSTÈMES D'INFORMATION
                </h4>
                <span className="text-xs font-bold text-accent uppercase tracking-wider">04/2014 – 07/2019</span>
              </div>
              <p className="text-xs md:text-sm font-semibold text-gray-500 mb-2">Paris La Défense Arena (2016-2019) — Accor Arena, SAE POPB (2014-2016)</p>
              <ul className="list-disc list-outside ml-4 space-y-1.5 text-xs md:text-sm text-gray-700">
                <li><strong>Paris La Défense Arena :</strong> pilotage du SI marketing client et prestataires (CRM Salesforce, billetterie, contrôle d'accès, site web, app mobile, paiement, 200 points d'encaissement, IPTV, Wi-Fi haute densité, support).</li>
                <li><strong>Accor Arena :</strong> refonte du SI événementiel (billetterie, hospitalités, contrôle d'accès) pour 1,6 million de visiteurs/an ; cœur de réseau, IPTV, site internet, GED ; marchés publics.</li>
              </ul>
            </div>

            {/* Mission 5 */}
            <div className="border-l-2 border-accent/40 pl-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-1">
                <h4 className="text-sm md:text-base font-bold text-primary">
                  DIRECTEUR DE PROJETS
                </h4>
                <span className="text-xs font-bold text-accent uppercase tracking-wider">09/2001 – 04/2014</span>
              </div>
              <p className="text-xs md:text-sm font-semibold text-gray-500 mb-2">CSC, devenu DXC Technology — projets au forfait avec engagement de résultat, TMA</p>
              <ul className="list-disc list-outside ml-4 space-y-1.5 text-xs md:text-sm text-gray-700">
                <li><strong>Monétique :</strong> directeur de projets sur programme de refonte de 50 personnes (Crédit Agricole Cards & Payments) : industrialisation, haute disponibilité, PCI DSS, exercices PCA.</li>
                <li><strong>Conseil SI :</strong> plan directeur et rationalisation du SI grande distribution en 3 mois (Franprix Leader Price) ; responsable chantier environnements et support bancaire (Fortis).</li>
                <li><strong>Billetterie et télécoms :</strong> intégration du système de réservation FNAC, Carrefour, France Billet (Chairman's Award for Excellence 2008) ; TMA et MCO système fidélisation (Cegetel-SFR).</li>
              </ul>
            </div>

            {/* Mission 6 */}
            <div className="border-l-2 border-accent/40 pl-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-1">
                <h4 className="text-sm md:text-base font-bold text-primary">
                  INGÉNIEUR ÉTUDES ET DÉVELOPPEMENT
                </h4>
                <span className="text-xs font-bold text-accent uppercase tracking-wider">07/2000 – 09/2001</span>
              </div>
              <p className="text-xs md:text-sm font-semibold text-gray-500">Operacom puis Synetics (Soft Computing)</p>
            </div>
          </div>
        </section>

        {/* Formation et Langues */}
        <section className="border-t border-gray-200 pt-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
            Formation & Langues
          </h3>
          <div className="text-xs md:text-sm space-y-1 text-gray-700">
            <p><strong>Master (Bac+5)</strong> en informatique et communications numériques — ESIEE Management (2000).</p>
            <p><strong>Bachelor</strong> spécialité microélectronique — ESTE (1997).</p>
            <p><strong>Français :</strong> langue maternelle. <strong>Anglais :</strong> courant, pratiqué quotidiennement en environnement international.</p>
          </div>
        </section>

        {/* Bottom Download CTA */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap justify-between items-center gap-4 print:hidden">
          <p className="text-xs text-gray-500">
            Document officiel — Viet Hung Alain Nguyen
          </p>
          <div className="flex items-center gap-3">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-paper hover:bg-gray-200 text-primary rounded-full text-xs md:text-sm font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Ouvrir dans un nouvel onglet
            </a>
            <a
              href={pdfUrl}
              download="CV_Alain_Nguyen_DSI.pdf"
              className="inline-flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary/90 text-white rounded-full text-xs md:text-sm font-medium transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              Télécharger le PDF
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
