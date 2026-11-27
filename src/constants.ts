// URL canonique du site, sans "www".
// Toujours utiliser cette constante plutot que window.location.origin :
// l'origine varie selon que le visiteur arrive par valeurs-it.com ou par
// www.valeurs-it.com, ce qui fait declarer deux URL canoniques differentes
// pour une meme page et divise le signal transmis aux moteurs.
export const SITE_URL = "https://valeurs-it.com";

export const SITE_CONTENT = {
  company: {
    name: "Valeurs IT",
    logo: "/logo-valeurs-it.png", // Logo Valeurs IT — servi depuis public/
    tagline: "Conseiller. Transformer. Innover.",
    history: "Valeurs IT accompagne les organisations dans la définition et la mise en œuvre de leur stratégie SI. L’expérience acquise dans des contextes exigeants, notamment à Paris 2024, nourrit une approche multisectorielle : relier les choix technologiques aux enjeux métiers, à la performance collective et à la continuité d’activité.",
    sectors: ["Sport", "Événementiel", "Services numériques", "Banque", "Distribution", "Télécommunications"],
    mission: "Valeurs IT met une expérience de direction des systèmes d’information au service des organisations : définir un cap, structurer la gouvernance, sécuriser les opérations et faire progresser les équipes. La technologie devient un levier de valeur lorsqu’elle répond aux priorités de l’entreprise.",
    interventionPoints: [
      "Clarifier la stratégie numérique et aligner la technologie sur les enjeux métier.",
      "Accélérer la transformation IT et renforcer l’efficacité opérationnelle.",
      "Favoriser une culture d’innovation durable et partagée."
    ]
  },
  bio: {
    name: "Alain Nguyen",
    title: "Fondateur · Direction des systèmes d’information",
    description: "Fort de 25 ans d’expérience dans les systèmes d’information, Alain Nguyen a piloté des projets critiques, dirigé des fonctions SI et managé des équipes pluridisciplinaires. Son parcours chez DXC Technology (ex CSC), au Comité d’organisation des Jeux de Paris 2024 et au Groupe Luminess lui a permis d’exercer l’ensemble des responsabilités d’une direction SI : stratégie, budget, opérations, transformation, cybersécurité, partenaires et management. Il accompagne aujourd’hui les organisations avec une approche pragmatique, collective et orientée résultats.",
  },
  services: [
    {
      title: "Conseil Stratégique",
      description: "Accompagnement dans la définition de votre feuille de route technologique.",
      icon: "Lightbulb"
    },
    {
      title: "Transformation Digitale",
      description: "Modernisation de vos processus et outils pour une meilleure efficacité.",
      icon: "Zap"
    },
    {
      title: "Expertise IT",
      description: "Audit du SI, gouvernance, gestion des risques et accompagnement de la cybersécurité et des transformations technologiques.",
      icon: "ShieldCheck"
    },
    {
      title: "DSI de Transition",
      description: "Intérim management, montée en compétences de vos équipes, pilotage de programmes complexes",
      icon: "Users"
    }
  ],
  links: {
    linkedin: "https://www.linkedin.com/in/vnguye27",
    testimony: "https://www.linkedin.com/pulse/les-jeux-de-paris-2024-une-exp%C3%A9rience-unique-viet-hung-alain-nguyen-volze",
    charter: "https://drive.google.com/file/d/1LLOfzW5wRMKHUagrfXTABpX1d5h9yzNe/view?usp=drive_link"
  },
  news: [
  {
    id: "maitrise-dependances-02",
    title: "Dépendances technologiques : savez-vous vraiment de qui vous dépendez ?",
    seoTitle: "Dépendances IT : identifier les risques",
    excerpt: "Cartographiez les dépendances IT qui menacent la continuité, évaluez les preuves de réversibilité et priorisez les actions sur vos services critiques.",
    date: "17 novembre 2026",
    category: "Stratégie & cybersécurité",
    image: "/aiguillages-dependances.svg",
    shareImage: "/aiguillages-dependances-social.png",
    imageAlt: "Aiguillages stylisés représentant des dépendances convergeant vers un service essentiel.",
    content: `Vous connaissez peut-être les fournisseurs inscrits dans vos contrats. Pourtant, lorsqu’il faut envisager une alternative, un connecteur oublié, un accès d’administration détenu par un prestataire ou une compétence devenue rare peut ralentir le changement. La liste des fournisseurs décrit une partie du paysage ; elle n’explique pas toujours ce qui maintient réellement un service en fonctionnement.

Pour établir un diagnostic exploitable, partez d’une activité essentielle et remontez sa chaîne de dépendances. L’objectif n’est pas de tout cartographier au même niveau. Il est de repérer les quelques dépendances qui pourraient interrompre l’activité ou réduire votre capacité à agir.

## Partir du service rendu

Choisissez un service concret : traiter une commande, payer les salariés, produire ou accéder aux dossiers clients. Avec son responsable, précisez ce qui doit continuer en cas d’incident, pendant combien de temps une interruption est acceptable et quelles données sont indispensables.

Suivez ensuite les éléments qui rendent ce service possible : application, base de données, hébergement, identité, sauvegarde, interfaces, support et intervenants. Cette lecture par service donne un périmètre commun aux équipes métier et IT. Elle évite de confondre une cartographie très fournie avec une compréhension utile des conséquences.

## Regarder au-delà du contrat direct

Un fournisseur peut s’appuyer sur une plateforme tierce. Deux produits différents peuvent partager un hébergeur, un service d’identité ou un composant logiciel. Une solution développée en interne peut dépendre d’une équipe externe pour ses mises à jour.

Pour les services prioritaires, demandez qui opère chaque brique, qui détient les accès, qui sait restaurer le service et qui peut changer les conditions d’utilisation. Signalez les liens que vous ne pouvez pas encore confirmer : une inconnue documentée devient une action d’enquête, tandis qu’une hypothèse tenue pour un fait fausse les décisions.

## Chercher des preuves de dépendance

Le guide du Do Tank Alliancy propose d’examiner plusieurs dimensions complémentaires : technologie, conditions commerciales et contractuelles, données, contraintes juridiques et compétences. Pour chacune, cherchez une preuve adaptée. Un export documenté ne prouve pas que les données pourront être réutilisées ; un test de reprise apporte une réponse plus concrète. Une clause de réversibilité ne chiffre pas à elle seule l’effort nécessaire pour sortir.

Examinez aussi les usages qui rendent une solution difficile à remplacer. Quelle fonction est réellement indispensable ? À quels utilisateurs ? Un besoin spécifique et limité peut parfois être traité séparément au lieu de verrouiller toute une population.

## Relier coût, criticité et options

Le montant d’un contrat ne suffit pas à classer le risque. Une brique peu coûteuse peut conditionner plusieurs services ; un contrat important peut être remplaçable si une option a été éprouvée. Décomposez une hausse entre prix, volume, périmètre et remise arrivant à échéance. Ajoutez au coût de sortie la reprise des données, l’adaptation des interfaces, les tests, la formation et la période de coexistence.

L’étude Asterès réalisée pour le Cigref en 2026 rapporte que 47 % des organisations interrogées réduisent d’autres dépenses numériques pour absorber les hausses de logiciels et de cloud. Ce résultat décrit les réponses déclarées par les répondants ; il ne prédit pas la situation de chaque entreprise. Il rappelle toutefois qu’une dépendance peut aussi peser sur les projets qui ne seront pas financés.

## Prioriser sans attendre une cartographie parfaite

Pour trois à cinq services critiques, tenez une fiche courte : responsable métier, composants et prestataires, impact d’une interruption, prochaine échéance, option connue, coût et délai de sortie estimés, preuves acquises et incertitudes restantes. Croisez les regards : les achats connaissent les contrats, les équipes IT les dépendances techniques, les métiers les effets opérationnels.

> **Premier pas :** choisissez les dépendances où l’impact serait fort et où les options de réponse restent faibles. Attribuez à chaque incertitude importante un responsable, une preuve à obtenir et une date de revue.

Le retour d’expérience de la CNAM présenté dans les travaux du Do Tank distingue plusieurs périmètres, dont la bureautique et la collaboration, le socle technique et la cybersécurité. Cette segmentation aide à adapter le rythme et les moyens plutôt qu’à imposer une sortie générale.

**Question à poser en comité :** sur quel service essentiel dépendons-nous d’un fournisseur sans alternative que nous ayons réellement évaluée ?

**Sources** : [chronique originale sur Alliancy](https://alliancy.fr/les-faiseurs/dependances-technologiques-savez-vous-vraiment-de-qui-vous-dependez-14edc48b-f99f-4dd4-b9fc-6cf92e470c0e) · étude Asterès/Cigref de mai 2026 · guide du Do Tank Alliancy, autodiagnostics et retour d’expérience CNAM (disponible sur demande auprès d’Alliancy).`
  },
  {
    id: "maitrise-dependances-03",
    title: "Pourquoi la maîtrise des dépendances technologiques doit devenir un sujet de direction générale",
    seoTitle: "Dépendances IT : un enjeu de direction",
    excerpt: "Dépendances IT : traduisez les risques en arbitrages de continuité, de budget et de gouvernance pour donner à la direction un mandat d’action clair.",
    date: "24 novembre 2026",
    category: "Stratégie & cybersécurité",
    image: "/salle-direction-arbitrage.svg",
    shareImage: "/salle-direction-arbitrage-social.png",
    imageAlt: "Salle de direction où les responsables métier, finance et IT examinent un arbitrage de dépendance.",
    content: `Un contrat informatique important arrive à échéance. La DSI veut préparer une autre option, les équipes métier souhaitent conserver leurs habitudes et la direction financière cherche des économies rapides. Ces objectifs peuvent tous être légitimes. La question de gouvernance est ailleurs : qui décide du niveau de risque accepté lorsque ces priorités se rencontrent ?

La maîtrise des dépendances relève de la direction générale dès qu’elle touche la continuité d’activité, la capacité d’investir ou la liberté de modifier une trajectoire. La DSI apporte les scénarios et les éléments techniques ; l’arbitrage engage l’entreprise.

## Traduire le risque en conséquences d’entreprise

Un nom de produit ou de fournisseur ne suffit pas à éclairer une décision exécutive. Présentez ce qui pourrait changer pour l’activité : accès à des dossiers, capacité de livraison, délai de reprise, coût engagé ou projet reporté. Distinguez le fait vérifié de l’hypothèse, puis formulez la décision attendue.

Les travaux publics récents sur les dépendances des logiciels supports et la gouvernance des outils bureautiques donnent un contexte au débat. Ils ne fixent pas les priorités d’une entreprise. À chaque organisation d’identifier les services dont l’interruption ou le renchérissement pèserait réellement sur sa stratégie.

## Rendre visibles les arbitrages budgétaires

Une dépense contrainte peut absorber les moyens prévus pour un projet métier, un recrutement ou la formation. L’étude Asterès/Cigref rapporte une hausse moyenne déclarée de 8,7 % par an des coûts du cloud et des logiciels sur les trois années précédentes ; les répondants anticipaient 12 % pour les cinq suivantes. Ce sont des résultats et des anticipations d’enquête, pas une prévision garantie pour chaque organisation.

La direction peut comparer des trajectoires si la DSI rend visibles leurs coûts complets : maintien en l’état, réduction ciblée du risque, diversification ou remplacement. Pour chacune, indiquez le coût initial, la période de coexistence, les bénéfices attendus, les risques résiduels et les capacités que l’entreprise devra mobiliser.

## Définir le niveau de continuité attendu

La redondance protège contre certaines pannes, mais elle ne garantit pas à elle seule le fonctionnement après la perte d’un fournisseur commun aux identités, aux licences ou au support. Les métiers et la direction doivent définir les activités prioritaires et le mode dégradé acceptable. L’IT peut ensuite proposer des réponses proportionnées et les tester.

Le risque ne doit pas être accepté implicitement par l’équipe d’exploitation. Il doit être explicite, attribué à un décideur et assorti de mesures compensatoires ainsi que d’une date de réexamen.

## Donner à chaque fonction un rôle précis

La DSI décrit l’architecture, les dépendances et les options. Les métiers précisent le service attendu et les usages à préserver. Les achats suivent les échéances et les alternatives du marché ; le juridique examine les engagements et les droits ; la finance compare les trajectoires ; les ressources humaines identifient les compétences à conserver ou à acquérir.

Un sponsor exécutif tranche lorsque ces objectifs entrent en tension. Il n’est pas toujours nécessaire de créer un nouveau comité : une instance existante peut suivre les dépendances prioritaires si elle possède le mandat, les informations et le pouvoir de décision.

## Formaliser un mandat, puis le financer

Un mandat utile précise le périmètre, le résultat attendu, les responsables, les moyens et la première échéance. Il nomme aussi les dépendances que l’entreprise choisit de conserver, les compensations associées et la date à laquelle cette décision sera réexaminée.

Le cas Urssaf présenté dans le guide Alliancy illustre une transformation portée au niveau exécutif. Le guide rapporte une migration d’environ 90 % du parc Oracle vers PostgreSQL, un investissement supérieur à 4 millions d’euros et près de 3 millions d’euros d’économies annuelles de souscription. Ces chiffres décrivent ce cas et ne constituent pas un rendement à extrapoler. Le projet montre plutôt l’intérêt d’une trajectoire préparée, financée et éprouvée par des tests de non-régression. Certains progiciels sont traités séparément au lieu d’exiger une sortie totale immédiate.

La trajectoire CNAM décrite par le même guide souligne aussi l’importance d’une équipe dédiée et du financement de la coexistence. La transition peut augmenter temporairement les dépenses ; sans arbitrage préalable sur ces moyens, une équipe peut rester bloquée malgré un objectif partagé.

## Préparer une décision courte

Pour faire avancer le sujet, présentez à la direction un dossier sur une dépendance critique : activité exposée, options étudiées, coûts, délais, compétences nécessaires, risque résiduel et arbitrage attendu. Une page peut suffire si elle relie les faits, les choix et les conséquences.

**Question à poser en comité :** qui décide du niveau de dépendance que notre organisation accepte, et quand cette décision sera-t-elle revue ?

**Sources** : [chronique originale sur Alliancy](https://alliancy.fr/pourquoi-la-maitrise-des-dependances-technologiques-doit-devenir-un-sujet-de-direction-generale-c3ff8dee-3816-42be-bdfe-ce8aab1fe34a) · [rapport parlementaire (Assemblée nationale)](https://www.assemblee-nationale.fr/dyn/17/rapports/cenum/l17b3054_rapport-enquete) · étude Asterès/Cigref, mai 2026 · guide du Do Tank Alliancy, retours d’expérience Urssaf et CNAM (disponible sur demande auprès d’Alliancy).`
  },
  {
    "id": "maitrise-dependances-01",
    "title": "Souveraineté numérique : et si vous commenciez par reprendre la maîtrise de vos choix ?",
    "seoTitle": "Souveraineté numérique : reprendre la main",
    "excerpt": "Comment préserver sa liberté de choisir, de faire évoluer une solution et d’en sortir à des conditions soutenables ? Première chronique d’une série sur la maîtrise des dépendances technologiques.",
    "date": "10 novembre 2026",
    "category": "Stratégie & cybersécurité",
    "image": "/cover-souverainete-numerique.jpg",
    "content": "## Une série de six chroniques sur la maîtrise des dépendances numériques\n\nIl y a quelques mois, j’ai eu l’occasion d’animer pour Alliancy des travaux de fond sur la maîtrise des dépendances numériques des organisations privées et publiques. Ce premier Do Tank a permis de produire une méthode pour aider les entreprises et les administrations à aborder ces questions et à passer à l’action.\n\nCette chronique ouvre une série de six textes consacrés à certains enseignements de ces échanges, pour préparer une année 2027 qui ne manquera pas d’être mouvementée sur le front technologique.\n\n## Comment reprendre la maîtrise ?\n\nVotre messagerie fonctionne. Vos équipes collaborent. Les applications répondent. Puis un renouvellement de contrat arrive, une règle change, un service devient inaccessible. La question se pose alors : quelles décisions êtes-vous encore en mesure de prendre ?\n\nReprendre la maîtrise signifie conserver la possibilité de choisir, de faire évoluer une solution et d’en sortir à des conditions soutenables. Cela commence par les décisions que votre organisation veut garder ouvertes. Les rapports publiés en 2026 rendent plus observable un risque longtemps abordé en termes généraux : l’accumulation de choix raisonnables peut finir par réduire fortement la liberté de l’organisation.\n\n## Quand une décision extérieure réduit votre liberté d’action\n\nLe [rapport de la commission d’enquête de l’Assemblée nationale](https://www.assemblee-nationale.fr/dyn/17/rapports/cenum/l17b3054_rapport-enquete), déposé le 8 juillet 2026, examine les restrictions de services numériques liées aux sanctions visant des personnalités de la Cour pénale internationale. Il distingue ces restrictions ciblées du scénario d’une interruption générale.\n\nCette distinction est essentielle. Une coupure généralisée demeure un scénario de risque ; les restrictions ciblées montrent déjà qu’une décision extérieure à la relation commerciale peut affecter l’accès à des services. Le « kill switch » peut aussi prendre la forme d’une dégradation progressive : suspension de la maintenance, impossibilité de renouveler un droit d’usage ou arrêt des correctifs.\n\nPour une entreprise, le premier travail consiste à identifier les services dont l’interruption empêcherait de communiquer, de produire ou de servir les clients.\n\n## Nommer le risque, éditeur par éditeur\n\nUne simple liste de fournisseurs ne suffit pas. Un même acteur peut fournir l’annuaire, la messagerie, l’hébergement et les outils de sécurité. La dépendance tient aussi à leur combinaison. Un incident sur l’identité peut rendre plusieurs solutions indisponibles, y compris celles achetées à d’autres entreprises.\n\nPartez d’un service métier. Pour émettre une facture, de quels logiciels, accès, données et compétences avez-vous besoin ? Qui peut modifier leurs conditions d’utilisation ? Cette lecture relie le risque technologique à une activité que la direction générale comprend.\n\n## Une concentration désormais documentée\n\nDans son rapport d’octobre 2026, la [Cour des comptes](https://www.ccomptes.fr/sites/default/files/2026-10/20261022_Outils-bureautiques-et-collaboratifs-des-minist%C3%A8res.pdf) estime à environ 100 millions d’euros les dépenses de 2025 consacrées aux outils bureautiques et collaboratifs des administrations centrales et des services déconcentrés étudiés. Plus de la moitié relève de licences et de prestations Microsoft.\n\nLe périmètre représente environ 860 000 postes et exclut notamment les opérateurs de l’État, les hôpitaux et les collectivités. Ce chiffre ne décrit donc ni toute la dépense numérique publique ni tout le marché français. Il montre une concentration sur des outils qui organisent le travail quotidien.\n\nLa Cour relève l’usage de logiciels bureautiques libres à la gendarmerie et à la DGFiP, ainsi que les progrès de La Suite portée par la DINUM. Les niveaux de satisfaction rapportés ne dessinent pas une opposition simple entre outils libres et propriétaires.\n\nLa [note du Cigref de juin 2026](https://www.cigref.fr/souverainete-et-resilience-numeriques-note-de-position-doctrinale-du-cigref) propose une clarification utile : la souveraineté relève de l’État ; la résilience constitue la responsabilité opérationnelle des organisations. Une entreprise doit identifier les perturbations qu’elle peut absorber et entretenir sa capacité d’adaptation. Elle ne peut résoudre seule les dépendances industrielles d’un continent.\n\n## Des alternatives à examiner dans leur contexte\n\nToutes les solutions ne sont pas interchangeables. Un tableur avec des macros, une chaîne documentaire et un outil de visioconférence ne posent pas les mêmes difficultés. Une alternative devient crédible lorsqu’elle assure le service attendu dans le contexte de l’organisation, avec un support et un accompagnement adaptés.\n\nUne PME, un groupe industriel et un ministère n’ont ni les mêmes moyens ni les mêmes contraintes. Ils peuvent rencontrer le même mécanisme : le coût, le délai ou le risque d’un changement deviennent tels que la décision n’est plus réellement ouverte.\n\nLe signal à rechercher est concret : si votre fournisseur modifiait demain ses conditions, pourriez-vous choisir une autre trajectoire avant la prochaine échéance métier ?\n\n## Démonter le narratif de l’absence d’alternative\n\n« Il n’y a pas d’alternative » peut signifier qu’aucune offre n’a été identifiée, qu’aucune offre n’a été testée, qu’aucune solution n’est équivalente sur tout le périmètre ou qu’il n’existe pas de financement pour changer. Ces constats appellent des réponses différentes.\n\nDans le Do Tank que j’ai animé avec Alliancy, la confrontation des expériences de neuf entreprises a permis de travailler ces distinctions. Elle a débouché sur un guide méthodologique pour passer d’une conviction générale à un diagnostic et à une trajectoire. Le travail entre pairs rend discutables des choix que chaque organisation finit parfois par considérer comme imposés.\n\n## Un premier exercice à mener\n\nChoisissez un service indispensable et réunissez ceux qui le font fonctionner : métier, IT, achats et juridique. Demandez-leur de décrire une interruption, ses effets et les moyens de reprise disponibles. Les désaccords révéleront souvent les premières zones à instruire.\n\nQuels choix technologiques votre organisation ne serait-elle plus réellement libre de faire demain ?\n\n## Pour aller plus loin\n\nLe guide pratique du Do Tank Alliancy propose six autodiagnostics de dix critères. Chaque pratique non cochée ajoute un point de dépendance, pour un total sur 60. Examinez surtout le profil par dimension : un total modéré peut cacher une vulnérabilité critique. Le guide complet est disponible sur demande auprès d’Alliancy. [Découvrir le Do Tank Alliancy](https://alliancy.fr/communaute/defis/7cba4493-9d56-4d06-8141-5fd455b4c8b4).\n\n*Chronique 1/6 de la série « Garder la main sur ses choix technologiques », publiée avec Alliancy. Lire [la version originale sur Alliancy](https://alliancy.fr/souverainete-numerique-et-si-vous-commenciez-par-reprendre-la-maitrise-de-vos-choix-2e913822-3790-41b5-8b61-38983fe4de62).*"
  },
  {
    "id": "dsi-business-partner",
    "title": "Le DSI, partenaire des métiers et acteur de la transformation",
    "seoTitle": "Le DSI, partenaire des métiers",
    "excerpt": "La continuité de service reste un socle. La contribution du DSI s’étend aussi à la stratégie, à l’évolution des processus et aux transformations qui mobilisent l’ensemble de l’entreprise.",
    "date": "Avril 2026",
    "category": "Stratégie",
    "image": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070",
    "content": "\n## De la continuité à la contribution stratégique\n\nLa disponibilité des services, la sécurité et la qualité du support restent des responsabilités centrales de la direction des systèmes d’information. Elles construisent la confiance nécessaire pour que les métiers puissent s’appuyer sur le numérique.\n\nMais le rôle du DSI ne s’arrête pas au bon fonctionnement des outils. Dans une organisation où les processus, les données et l’expérience client dépendent du numérique, la direction SI contribue aussi aux choix de transformation et à leur mise en œuvre.\n\n## Travailler avec les métiers, dès la définition du besoin\n\nÊtre partenaire des métiers suppose d’en comprendre les objectifs, les contraintes opérationnelles et les indicateurs de réussite. Le DSI apporte une lecture des possibilités technologiques, des risques, des dépendances et des coûts complets. Les décisions se construisent avec les responsables métiers, qui restent propriétaires de leurs priorités et de leurs processus.\n\nCette coopération permet de formuler les besoins plus tôt, d’arbitrer les investissements et de concevoir des solutions adaptées aux usages. Elle évite de réduire la discussion à une demande d’outil ou à une réponse technique.\n\n## Faire converger stratégie et exécution\n\nPour tenir cette place, la DSI doit associer feuille de route, gouvernance et qualité d’exécution. Elle clarifie les priorités, rend visibles les arbitrages, suit les résultats et ajuste les trajectoires lorsque le contexte évolue.\n\nLa cybersécurité, la maîtrise des données, la résilience et l’accompagnement du changement traversent ces décisions. Elles doivent être intégrées dès la conception des projets, en lien avec les métiers et les fonctions concernées.\n\nLe DSI est ainsi à la fois garant d’un socle fiable et acteur des évolutions de l’entreprise. Sa contribution se mesure à sa capacité à rapprocher les enjeux métiers et technologiques, à faire travailler les équipes ensemble et à produire des résultats durables.\n      "
  },
  {
    "id": "it-preneur",
    "title": "ITPreneur : un leadership numérique orienté valeur",
    "excerpt": "Une réflexion issue de la communauté Atout DSI sur la posture du dirigeant IT : relier stratégie, initiative et création de valeur avec les métiers.",
    "date": "Mars 2026",
    "category": "Leadership",
    "image": "/cover-it-preneur.jpg",
    "link": "https://www.atout-dsi.com/ressources/trajectoire-itpreneur/"
  },
  {
    "id": "souverainete-numerique",
    "title": "Souveraineté Numérique : Pourquoi il est temps d'agir (et 5 pistes pour pivoter)",
    "seoTitle": "Dépendance technologique : 5 pistes d’action",
    "excerpt": "Vous avez parfois le sentiment d’être pieds et poings liés à vos fournisseurs technologiques ? La dépendance technologique est devenue l’un des risques les plus sous-estimés pour la stratégie des entreprises.",
    "date": "17 novembre 2025",
    "category": "Stratégie & cybersécurité",
    "image": "/article-souverainete-linkedin.png",
    "content": "Vous avez parfois le sentiment d’être pieds et poings liés à vos fournisseurs technologiques ? Cette impression que votre organisation devient progressivement captive d’un écosystème cloud ou logiciel qui dicte son rythme, ses prix et ses règles ? Ce constat n’est pas isolé. Et il est temps d’admettre une chose : la dépendance technologique est devenue l’un des risques les plus sous-estimés pour la stratégie des entreprises.\n\nUn collectif d’experts, animé par le Do Tank Alliancy “Maîtriser ses dépendances technologiques” – rassemblant de grands acteurs publics et privés, a mené pendant plusieurs mois un travail approfondi. Leurs conclusions bousculent les idées reçues. Voici les cinq recommandations à connaître pour transformer ce sujet en avantage stratégique.\n\n## 1. Le chiffre choc : la dépendance est devenue un enjeu macro-économique et géopolitique\n\nSelon Asteres, les entreprises européennes dépensent 264 milliards d’euros par an dans des services cloud et logiciels américains. Cela représente 83 % des dépenses des grandes entreprises européennes dans ce domaine. Ce niveau de concentration dépasse l’enjeu technologique : il révèle une dépendance structurelle qui fragilise l’économie européenne dans son ensemble.\n\nLes signaux d’alerte se multiplient. L’un des plus parlants est le cas VMware depuis son rachat par Broadcom. En moins d’un an, hausses tarifaires massives, modification unilatérale des offres, refonte des licences et suppression de produits ont déstabilisé des milliers d’entreprises et d’administrations. Résultat : des organisations auparavant considérées comme “stables” se retrouvent avec des coûts multipliés, des trajectoires techniques bouleversées et, dans certains cas, des migrations d’urgence à planifier.\n\nCe type d’événement n’est pas une anomalie. Il met en lumière un risque systémique : lorsqu’un fournisseur dominant modifie ses règles du jour au lendemain, c’est l’entreprise cliente qui subit, parfois sans aucun recours ni alternative immédiate.\n\nLa conclusion est brutale mais factuelle : maîtriser ses dépendances technologiques n’est plus un sujet réservé à la DSI. C’est une question de résilience organisationnelle, de continuité d’activité et de souveraineté économique.\n\n## 2. La “souveraineté” n’est pas votre objectif : ce que vous devez viser, c’est l’autonomie stratégique\n\nLa souveraineté totale est un objectif étatique. Pour une entreprise, c’est un mirage coûteux.\n\nLe Do Tank propose un cap plus réaliste : l’autonomie stratégique. Elle repose sur un principe simple : ne plus subir ses dépendances, mais les choisir, les encadrer et les rendre réversibles.\n\nL’enjeu n’est pas de tout remplacer, mais de regagner de la liberté de mouvement : capacité à changer, à négocier, à basculer si besoin. La résilience numérique commence ici.\n\n## 3. Changer les mentalités passe souvent par un “électrochoc”\n\nAucune transformation ne démarre par hasard. Dans de nombreuses organisations, la prise de conscience s’est produite lorsqu’un événement dur est survenu.\n\nUn grand acteur public a raconté au Do Tank son déclencheur : un audit de conformité d’un éditeur américain, suivi d’une demande de plusieurs dizaines de millions d’euros de régularisation.\n\nCet épisode a entraîné l’ouverture d’un programme interne dédié à la réduction des dépendances, et permis de bâtir une feuille de route de sortie progressive.\n\nTant que le risque n’est pas incarné, il est ignoré. Sensibiliser les dirigeants n’est pas une option : c’est la première brique du changement.\n\n## 4. L’Open Source est une clé… à condition d’éviter les pièges\n\nOui, l’Open Source est un levier majeur d’autonomie. Mais tout ce qui est “open” n’est pas souverain.\n\nIl existe 3 modèles d'Open Source :\n\n- **Le Commun Numérique (ex PostgreSQL, Kubernetes)** : gouvernance communautaire, aucun acteur dominant : c’est le modèle le plus protecteur.\n- **Le modèle Packagé (ex Red Hat, SUSE)** : 100 % open source, mais un éditeur assure le support. Il existe un risque de dépendance commerciale, mais la réversibilité reste possible.\n- **L’Open Core** : modèle considéré comme risqué : un noyau ouvert, mais les fonctionnalités stratégiques sont propriétaires. Résultat : un verrouillage déguisé sous une couche d’“open washing”.\n\nLe critère clé n’est donc pas la licence, mais la gouvernance.\n\n## 5. Le futur n’est plus “Make or Buy” : il est “Make, Buy And Contribute”\n\nL’option la plus stratégique pour réduire durablement les dépendances n’est plus uniquement de choisir entre développer ou acheter.\n\nLa troisième voie consiste à contribuer activement aux briques open source critiques pour votre activité.\n\nUn grand organisme national en a fait la démonstration : pour réussir sa transition vers des solutions souveraines, il a dédié une équipe de cinq personnes chargée de contribuer directement aux communs numériques utilisés.\n\nC’est un changement profond de posture : ne plus consommer passivement, mais influencer, stabiliser et sécuriser les technologies dont on dépend.\n\nC’est aussi le sens des initiatives émergentes autour du “Make Together”.\n\n## Conclusion\n\nLa dépendance technologique n’est pas un sujet défensif. C’est un chantier stratégique permettant de regagner de la liberté, de renforcer sa résilience et d’améliorer sa capacité à négocier. Les travaux du Do Tank le prouvent : on peut reprendre la main sans renoncer à la performance.\n\nLa véritable question n’est donc plus “Sommes-nous dépendants ?” La vraie question est :\n\n**Quelle est la dépendance la plus critique que votre organisation doit commencer à questionner dès aujourd’hui ?**"
  },
  {
    "id": "paris-2024",
    "title": "Les Jeux de Paris 2024, une expérience unique",
    "excerpt": "Il m'aura fallu un peu de temps pour commencer à digérer mon expérience au sein de Paris 2024. Après plus de cinq années consacrées à la réussite du projet, voici ce que cette expérience m'a apporté.",
    "date": "11 mars 2025",
    "category": "Sport & événementiel",
    "image": "/article-paris-2024-linkedin.jpeg",
    "content": "Il m'aura fallu un peu de temps pour commencer à \"digérer\" mon expérience au sein de Paris 2024 - Comité d'organisation des Jeux Olympiques et Paralympiques de 2024. Lorsque je discutais avec mes pairs, mes anciennes équipes, mes proches, il m'était difficile de pouvoir expliquer ce que cette expérience a pu m'apporter. La majorité des personnes me disait : \"Cela a dû être assez intense et stressant, non ?\"\n\nCe sont en effet les premiers mots qui viennent à l'esprit de chacun, tant les deux évènements (les Jeux Olympiques et Paralympiques) sont mondialement connus. Je crois qu'après plus de 5 années consacrées à la réussite de ce projet, une des difficultés est de valoriser cette expérience et de pouvoir en parler concrètement au delà de l'aspect sportif et du bonheur engendré pour l'ensemble des participants.\n\nAprès plus de deux mois à me ressourcer et prendre du recul, il me semblait important de partager avec vous ce que cette expérience m'a apporté, en choisissant quelques mots clés. Ce n'est qu'un début de réflexion, tant j'ai appris au travers de ce projet et évolué dans ma fonction de senior manager, dédié aux systèmes d'information des Jeux.\n\n## 🚀 Vision stratégique\n\nIl y a eu la vision du projet, établie par la direction de Paris 2024, avec ses principaux piliers. D'un point de vue technologie, il nous aura fallu travailler sur ce que pouvaient être nos propres valeurs et ainsi définir en quoi la Technologie pouvait contribuer à un tel projet. Cela a été le point de départ de notre culture interne avec une ambition claire de devenir une référence pour les grands événements.\n\n👉 Créer une Direction de la Technologie et des SI en quelques mois et avoir le niveau de maturité d'une DSI de plus de 10 ans nécessitent de se poser et de définir nos propres critères de succès ainsi que des processus de mise en œuvre le plus standardisés.\n\n## ❤ Authenticité\n\nUn élément important qui vient non seulement compléter une attitude, une posture en tant que senior manager, mais aussi créer / maintenir un état d'esprit dans les équipes. Un tel projet, de part ses interactions entre les différentes directions / départements, ne peut avoir de succès que si nous travaillons tous dans le même sens et avec le plus de transparence et d'honnêteté possible.\n\n👉 Rester soi même, fidèle à ses principes, tout en sachant évoluer parfois même changer pour fédérer les équipes, trouver les bons consensus et être en support pour accomplir ses objectifs.\n\n## 💬 Liens\n\nUne absolue nécessité de pouvoir créer des connexions fortes avec toutes les équipes : les miennes, celles des directions avec lesquelles j'ai été le plus proche, les partenaires, les prestataires. Il est ici question d'embarquer les équipes autour du même état d'esprit, de faire tomber les barrières et de travailler toujours dans la même direction avec le plus d'objectivité.\n\n👉 Le dialogue a été un des facteurs les plus importants pour que chacun puisse aller dans le bon sens et nous savons tous que ce projet n'a jamais été un long fleuve tranquille 😉\n\n## 🥇 Exigence\n\nLe plus grand évènement sportif mondial a été piloté par d'anciens sportifs de haut niveau. Leur exigence est sans commune mesure avec ce que j'ai pu connaitre par le passé. Les efforts produits, les répétitions, l'amélioration continue ont été clés dans la réussite des Jeux, à l'image de nos grands champions français.\n\n👉 Amener l'excellence opérationnelle au sein des équipes aura été une grand accomplissement. Pour la première fois dans l'histoire des Jeux, il n'y a pas eu d'incident technologique majeur, du moins visible de l'extérieur ☺.\n\n## 🤩 Unique\n\nC'est le projet d'une vie qui restera gravé dans ma vie professionnelle et personnelle avec une rôle de direction, des expériences uniques comme remettre les cadeaux protocolaires aux médaillés durant les Jeux Paralympiques, ou bien côtoyer au quotidien ces sportifs qui ont su se reconvertir pour réussir professionnellement. J'ai eu plusieurs rôles différents qui m'ont amené à sortir de ma zone de confort voire de développer des compétences insoupçonnées !\n\n👉 Quand je revois le succès populaire et incontestable des Jeux l'été dernier, je ne peux qu'être fier d'y avoir contribué !\n\n## 🤝 Résilience\n\nC'est un mot qui revient beaucoup, dans beaucoup de métiers. Le contexte politique (voire géo politique), les enjeux nationaux et sportifs, le JO \"bashing\", le management des équipes, les injustices sociales … Ce sont autant de situations qui sont venues renforcer ma capacité à m'adapter et trouver des solutions.\n\n👉 L'expérience des Jeux a été tellement enrichissante sur ce plan avec beaucoup d'aléas et de conséquences sur nos feuilles de route respectives. Il aura fallu trouver des solutions à chaque étage et de toute nature : informatique, organisationnelle, opérationnelle, contractuelle tout en restant frugal et respectant nos propres contraintes.\n\n## Et maintenant, quelle serait la Suite ?\n\nL'envie de transmettre et de partager cette expérience est juste une évidence, complétée de mes idées et convictions pour qu'un département IT puisse se transformer et apporter sa valeur au service de son entreprise. Je saurai mettre à profit mes connaissances acquises depuis plus de 20 ans et apporter mon expérience \"terrain\" auprès de votre organisation.\n\nAussi si vous êtes intéressés et que vous avez envie d'en savoir plus, discutons-en : [anguyen@valeurs-it.com](mailto:anguyen@valeurs-it.com)"
  },
  {
    "id": "transformation-equipes",
    "title": "Transformation IT : comment faire équipe quand tout change",
    "seoTitle": "Transformation IT : faire équipe",
    "excerpt": "Un retour d’expérience de Paris 2024, confronté à la réalité d’une direction IT en transformation, fait ressortir trois leviers : donner du sens, préparer l’action et construire la confiance.",
    "category": "Leadership & transformation",
    "image": "/cover-paris-2024.jpg",
    "content": "\nJ’ai encore parlé des Jeux. Mais cette fois, il ne s’agissait pas de parler des Jeux.\n\nRécemment, j’intervenais au séminaire d’une direction IT en pleine transformation. Deux équipes à réunir, une organisation à installer, de nouvelles méthodes à partager et, surtout, un collectif à construire autour d’une ambition commune.\n\nLa question posée était simple : **comment faire équipe quand tout change, tout en continuant à délivrer ?** L’expérience de Paris 2024 m’a conduit à partager trois enseignements. Ils ne constituent pas une recette universelle ; ils donnent des repères à adapter à chaque organisation.\n\n## 1. Donner du sens : créer l’alignement autour d’une ambition commune\n\nEn mars 2020, à Lausanne, nous avons écrit collectivement la raison d’être de notre DSI. Cette phrase nous a accompagnés pendant quatre ans, jusque dans nos recrutements.\n\nFaire équipe ne signifie pas penser pareil. Les personnes n’ont pas besoin d’avoir les mêmes réflexes ou les mêmes opinions pour travailler ensemble. Elles doivent comprendre ce qu’elles cherchent à accomplir et comment leur contribution s’inscrit dans cet objectif.\n\n## 2. Préparer l’action : faire de l’excellence opérationnelle une discipline collective\n\nAux Jeux, la date ne pouvait pas être déplacée. Il fallait arbitrer et simplifier : distinguer l’obligatoire du nécessaire, de l’optionnel et de l’obsolète. Cette discipline aide les équipes à concentrer leurs efforts sur ce qui doit réellement fonctionner.\n\nIl fallait aussi répéter. Tester les systèmes et leurs intégrations, bien sûr, mais également les organisations et les décisions : qui décide, qui agit, qui prend le relais en cas d’imprévu ? L’excellence opérationnelle ne se décrète pas. Elle se prépare collectivement.\n\n## 3. Construire la confiance : donner aux équipes les moyens d’agir\n\nNous avons fait évoluer la DSI d’une logique de guichet vers une posture de partenaire des métiers. Cela suppose de comprendre leurs enjeux, de questionner les besoins et de construire les solutions avec eux.\n\nLa confiance se construit aussi en donnant aux équipes les moyens de décider au plus près du terrain. Former, responsabiliser et accepter le droit à l’erreur ne signifie pas renoncer à l’exigence : l’objectif reste partagé, et chacun peut contribuer à l’atteindre.\n\n## Passer du témoignage à l’action\n\nL’après-midi, huit groupes ont identifié les irritants entre l’IT et les métiers, partagé leurs difficultés et formulé des engagements concrets. Le retour d’expérience a pris de la valeur au moment où les participants ont pu le traduire dans leur propre contexte.\n\nUne transformation ne réussit pas seulement parce qu’une organisation est définie ou que des méthodes sont en place. Elle réussit lorsque les équipes comprennent où elles vont, se font confiance et savent agir ensemble.\n\n**Trois repères pour une transformation IT :** donner un cap que les équipes peuvent s’approprier ; répéter les décisions et les relais autant que les tests techniques ; associer les métiers et responsabiliser les équipes au plus près du terrain.\n      "
  }
]
};

