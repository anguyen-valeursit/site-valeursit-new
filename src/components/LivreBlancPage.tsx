import { useState, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Download, 
  CheckCircle2, 
  Loader2, 
  ArrowRight, 
  ArrowLeft, 
  BookOpen, 
  ShieldCheck, 
  Users, 
  Award, 
  Sparkles,
  ExternalLink
} from "lucide-react";
import { SITE_CONTENT } from "../constants";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Header from "./Header";
import Footer from "./Footer";

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  };
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default function LivreBlancPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: ""
  });

  // Dynamic SEO title & description
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Livre Blanc : Une aventure humaine et technique | Valeurs IT";

    const updateMeta = (selector: string, content: string) => {
      const el = document.head.querySelector(selector);
      if (el) el.setAttribute("content", content);
    };

    updateMeta('meta[name="description"]', "Téléchargez le livre blanc exclusif sur les coulisses technologiques et humaines des Jeux de Paris 2024 par Alain Nguyen, DSI délégué.");
    updateMeta('meta[property="og:title"]', "Livre Blanc : Paris 2024 — Une aventure humaine et technique | Valeurs IT");
    updateMeta('meta[property="og:description"]', "Retour d'expérience exclusif sur la feuille de route technologique, la résilience et le management d'équipes lors de Paris 2024.");
    updateMeta('meta[property="og:url"]', `${window.location.origin}/livre-blanc`);

    return () => {
      document.title = previousTitle;
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const path = 'downloads';
    try {
      await addDoc(collection(db, path), {
        ...formData,
        source: 'landing_page_livre_blanc',
        createdAt: serverTimestamp()
      });
      setIsSubmitted(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    } finally {
      setIsLoading(false);
    }
  };

  const keyPoints = [
    {
      icon: Award,
      title: "Construire une DSI de rang mondial ex-nihilo",
      description: "Recruter, animer et faire grandir une organisation de 50 collaborateurs et coordonner plus de 5 000 intervenants mobilisés sur le terrain."
    },
    {
      icon: ShieldCheck,
      title: "200 systèmes & zéro incident majeur",
      description: "Gestion d'un budget de 230 M€ et alignement avec 45 directions métiers. Une disponibilité sans faille lors des épreuves olympiques et paralympiques."
    },
    {
      icon: Users,
      title: "Culture d'équipe & leadership d'impact",
      description: "Comment fédérer les équipes autour d'une raison d'être claire, cultiver l'authenticité et faire converger exigence et résilience."
    },
    {
      icon: BookOpen,
      title: "Enseignements transposables à votre entreprise",
      description: "Des méthodes concrètes pour que votre direction informatique devienne un véritable levier de création de valeur et d'autonomie stratégique."
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-grow pt-28 pb-20">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
        </div>

        {/* Hero Section */}
        <section className="px-6 mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="bg-primary rounded-[40px] p-8 md:p-16 lg:p-20 text-white relative overflow-hidden shadow-2xl">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-2/3 h-full bg-accent/10 -skew-x-12 transform translate-x-1/4 pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                
                {/* Left: Presentation Content */}
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/20 border border-accent/30 text-accent rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                    <Sparkles className="w-3.5 h-3.5" />
                    Contenu Exclusif · Retour d'Expérience
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-[1.08] tracking-tight">
                    Livre Blanc : Une aventure humaine et technique
                  </h1>

                  <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed font-light">
                    Plongez dans les coulisses technologiques et humaines des Jeux de Paris 2024. 
                    Un témoignage authentique rédigé par <strong className="text-white font-semibold">Alain Nguyen</strong>, 
                    Directeur délégué en charge des systèmes d'information des Jeux et fondateur de Valeurs IT.
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {keyPoints.map((point, index) => {
                      const Icon = point.icon;
                      return (
                        <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                          <Icon className="w-5 h-5 text-accent mb-2" />
                          <h2 className="text-sm font-bold text-white mb-1">{point.title}</h2>
                          <p className="text-xs text-gray-300 leading-relaxed">{point.description}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5 text-accent font-semibold">
                      <ShieldCheck className="w-4 h-4" /> Document PDF offert
                    </span>
                    <span>•</span>
                    <span>Lecture en ~15 minutes</span>
                    <span>•</span>
                    <span>Transmission immédiate</span>
                  </div>
                </div>

                {/* Right: Download Form Box */}
                <div className="lg:col-span-5">
                  <div className="bg-white rounded-3xl p-8 md:p-10 text-primary shadow-2xl relative">
                    <AnimatePresence mode="wait">
                      {!isSubmitted ? (
                        <motion.div
                          key="form"
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="mb-6">
                            <span className="text-xs font-bold uppercase tracking-wider text-accent">Accès gratuit</span>
                            <h2 className="text-2xl font-serif font-bold text-primary mt-1">
                              Recevoir le livre blanc
                            </h2>
                            <p className="text-xs text-gray-500 mt-1">
                              Remplissez ce formulaire pour accéder instantanément au document.
                            </p>
                          </div>

                          <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                                Nom & Prénom *
                              </label>
                              <input
                                required
                                type="text"
                                placeholder="ex. Jean Dupont"
                                className="w-full px-4 py-3 bg-paper rounded-xl border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none text-sm transition-all"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                                E-mail professionnel *
                              </label>
                              <input
                                required
                                type="email"
                                placeholder="ex. j.dupont@entreprise.com"
                                className="w-full px-4 py-3 bg-paper rounded-xl border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none text-sm transition-all"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                                Entreprise / Organisation *
                              </label>
                              <input
                                required
                                type="text"
                                placeholder="ex. Groupe & Co"
                                className="w-full px-4 py-3 bg-paper rounded-xl border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none text-sm transition-all"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                                Fonction / Rôle (optionnel)
                              </label>
                              <input
                                type="text"
                                placeholder="ex. DSI, CTO, DG, Responsable IT"
                                className="w-full px-4 py-3 bg-paper rounded-xl border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none text-sm transition-all"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                              />
                            </div>

                            <button
                              disabled={isLoading}
                              type="submit"
                              className="w-full py-4 mt-2 bg-accent text-white rounded-xl font-bold uppercase tracking-widest hover:bg-accent/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-md text-xs md:text-sm"
                            >
                              {isLoading ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  Traitement en cours...
                                </>
                              ) : (
                                <>
                                  Accéder au livre blanc
                                  <Download className="w-4 h-4" />
                                </>
                              )}
                            </button>
                          </form>

                          <p className="text-[10px] text-gray-400 mt-4 text-center leading-relaxed">
                            Vos données sont strictement confidentielles et ne seront jamais partagées à des tiers.
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center py-6"
                        >
                          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-8 h-8" />
                          </div>

                          <span className="text-xs font-bold uppercase tracking-widest text-accent">Demande validée</span>
                          <h3 className="text-2xl font-serif font-bold mb-3 mt-1 text-primary">
                            Merci, {formData.name.split(' ')[0]} !
                          </h3>

                          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                            Votre accès au livre blanc est débloqué. Cliquez sur le bouton ci-dessous pour ouvrir et consulter le document.
                          </p>

                          <div className="space-y-3">
                            <a
                              href={SITE_CONTENT.links.testimony}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-4 px-6 bg-primary text-white rounded-xl font-bold uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-xs md:text-sm shadow-md"
                            >
                              Consulter le Livre Blanc
                              <ExternalLink className="w-4 h-4" />
                            </a>

                            <Link
                              to="/actualites/paris-2024"
                              className="w-full py-3 px-6 bg-paper hover:bg-gray-200 text-primary rounded-xl font-medium text-xs transition-colors inline-flex items-center justify-center gap-2"
                            >
                              Lire également l'article de retour d'expérience
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition / Context Section */}
        <section className="px-6 py-12 max-w-5xl mx-auto">
          <div className="border-t border-gray-100 pt-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-accent mb-4 text-center">
              Pourquoi lire ce retour d'expérience ?
            </h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-center mb-10 text-primary">
              Des défis hors normes, des méthodes applicables à vos projets
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-paper p-6 rounded-2xl border border-gray-100">
                <div className="text-accent font-serif text-3xl font-bold mb-2">230 M€</div>
                <h4 className="font-bold text-primary mb-2">Budget SI maîtrisé</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Pilotage d'investissements majeurs avec un arbitrage rigoureux entre urgence opérationnelle et frugalité technologique.
                </p>
              </div>

              <div className="bg-paper p-6 rounded-2xl border border-gray-100">
                <div className="text-accent font-serif text-3xl font-bold mb-2">45</div>
                <h4 className="font-bold text-primary mb-2">Directions métiers unies</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Plus de 300 besoins traduits en solutions opérationnelles en reliant la DAF, les Opérations, le Digital et le Revenu.
                </p>
              </div>

              <div className="bg-paper p-6 rounded-2xl border border-gray-100">
                <div className="text-accent font-serif text-3xl font-bold mb-2">24/7</div>
                <h4 className="font-bold text-primary mb-2">Excellence continue</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Un centre des opérations technologiques mobilisé sur plus de 200 sites sans aucune interruption majeure visible.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
