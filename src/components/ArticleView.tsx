import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, Tag, Share2, Clock, Copy, Check, Linkedin } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { SITE_CONTENT, SITE_URL } from "../constants";
import Header from "./Header";
import Footer from "./Footer";

export default function ArticleView() {
  const { id } = useParams();
  const article = SITE_CONTENT.news.find(item => item.id === id);
  const articleMeta = article as (typeof article & { imageAlt?: string; seoTitle?: string; shareImage?: string }) | undefined;
  const articleImageAlt = articleMeta?.imageAlt || article?.title || "Valeurs IT";
  const articleSeoTitle = articleMeta?.seoTitle || article?.title || "Valeurs IT";
  const articleShareImage = articleMeta?.shareImage || article?.image || "";
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [id]);

  useEffect(() => {
    if (!article) return;
    const canonicalUrl = `${SITE_URL}/actualites/${article.id}`;
    const shareImageUrl = articleShareImage.startsWith("http") ? articleShareImage : `${SITE_URL}${articleShareImage}`;
    const shareImageType = articleShareImage.toLowerCase().endsWith(".png") ? "image/png" : articleShareImage.toLowerCase().endsWith(".svg") ? "image/svg+xml" : "image/jpeg";
    const previousTitle = document.title;
    document.title = `${articleSeoTitle} | Valeurs IT`;

    const restoreMeta: Array<() => void> = [];
    const updateMeta = (selector: string, content: string) => {
      const element = document.head.querySelector(selector);
      if (!element) return;
      const previous = element.getAttribute("content");
      element.setAttribute("content", content);
      restoreMeta.push(() => {
        if (previous === null) element.removeAttribute("content");
        else element.setAttribute("content", previous);
      });
    };

    updateMeta('meta[name="description"]', article.excerpt);
    updateMeta('meta[property="og:type"]', "article");
    updateMeta('meta[property="og:title"]', article.title);
    updateMeta('meta[property="og:description"]', article.excerpt);
    updateMeta('meta[property="og:url"]', canonicalUrl);
    updateMeta('meta[property="og:image"]', shareImageUrl);
    updateMeta('meta[property="og:image:secure_url"]', shareImageUrl);
    updateMeta('meta[property="og:image:type"]', shareImageType);
    updateMeta('meta[property="og:image:alt"]', articleImageAlt);
    updateMeta('meta[name="twitter:title"]', article.title);
    updateMeta('meta[name="twitter:description"]', article.excerpt);
    updateMeta('meta[name="twitter:image"]', shareImageUrl);
    updateMeta('meta[name="twitter:image:alt"]', articleImageAlt);

    const canonical = document.head.querySelector('link[rel="canonical"]');
    const previousCanonical = canonical?.getAttribute("href") ?? null;
    canonical?.setAttribute("href", canonicalUrl);

    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.excerpt,
      datePublished: article.id === "maitrise-dependances-01" ? "2026-11-10" : article.id === "maitrise-dependances-02" ? "2026-11-17" : article.id === "maitrise-dependances-03" ? "2026-11-24" : article.id === "souverainete-numerique" ? "2025-11-17" : article.id === "paris-2024" ? "2024-10-17" : undefined,
      author: { "@type": "Person", name: "Alain Nguyen" },
      publisher: { "@type": "Organization", name: "Valeurs IT" },
      mainEntityOfPage: canonicalUrl,
      image: shareImageUrl
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
  }, [article, articleSeoTitle, articleShareImage]);

  if (!article) {
    return <Navigate to="/" replace />;
  }

  // Estimate reading time
  const wordCount = article.content ? article.content.split(/\s+/).length : 0;
  const readingTime = Math.ceil(wordCount / 200);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: `${article.title} | Valeurs IT`,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch {
        // User cancelled or aborted sharing
      }
    } else {
      handleCopyLink();
    }
  };

  const currentUrl = typeof window !== "undefined" ? window.location.href : `https://valeurs-it.com/actualites/${article.id}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-24">
        <article className="max-w-4xl mx-auto px-6">
          {/* Breadcrumbs */}
          <nav className="mb-12">
            <Link 
              to="/#actualites" 
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour aux actualités
            </Link>
          </nav>

          {/* Header */}
          <header className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="px-4 py-1.5 bg-accent/10 text-accent rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <Tag className="w-3 h-3" />
                  {article.category}
                </div>
                {article.date && <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  {article.date}
                </div>}
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  {readingTime} min de lecture
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-10 leading-tight text-primary">
                {article.title}
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed italic border-l-4 border-accent pl-8 mb-12">
                {article.excerpt}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="aspect-[21/9] rounded-[40px] overflow-hidden shadow-2xl mb-16"
            >
              <img 
                src={article.image} 
                alt={articleImageAlt}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </header>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-none"
          >
            <div className="markdown-body">
              <ReactMarkdown>{article.content || ""}</ReactMarkdown>
            </div>
          </motion.div>

          {/* Footer of article */}
          <footer className="mt-24 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <img 
                src="/photo-alain-nguyen.jpg"
                alt="Alain Nguyen"
                className="w-16 h-16 rounded-2xl object-cover"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/logo-valeurs-it.png"; }}
              />
              <div>
                <div className="font-bold text-primary">Alain Nguyen</div>
                <div className="text-sm text-gray-400">Fondateur Valeurs IT</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-bold uppercase tracking-widest text-gray-400 mr-1">Partager</span>
              
              {/* Partage LinkedIn */}
              <a
                href={linkedinShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Partager cet article sur LinkedIn"
                title="Partager sur LinkedIn"
                className="w-11 h-11 rounded-full bg-paper flex items-center justify-center text-primary hover:bg-[#0077b5] hover:text-white transition-all shadow-sm"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              {/* Copier le lien */}
              <button
                type="button"
                onClick={handleCopyLink}
                aria-label="Copier le lien de l'article"
                title={copied ? "Lien copié !" : "Copier le lien de l'article"}
                className={`h-11 px-4 rounded-full flex items-center gap-2 text-sm font-medium transition-all shadow-sm ${
                  copied 
                    ? "bg-emerald-600 text-white" 
                    : "bg-paper text-primary hover:bg-primary hover:text-white"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Lien copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copier le lien</span>
                  </>
                )}
              </button>

              {/* Partage natif de l'appareil (mobile / navigateurs compatibles) */}
              <button
                type="button"
                onClick={handleNativeShare}
                aria-label="Partager via le système"
                title="Partager via votre appareil"
                className="w-11 h-11 rounded-full bg-paper flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all shadow-sm"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}

