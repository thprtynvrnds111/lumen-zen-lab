import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
import { NewsletterSection } from "@/components/zential/NewsletterSection";
import { Link } from "react-router-dom";

const articles = [
  {
    category: "Ritual",
    title: "The Night My Frequency Shifted, and I Finally Trusted the Stillness",
    excerpt: "A sacred reflection on what happens when microcurrent becomes more than skincare, when it becomes a conversation with the nervous system, a vote for slowness, and a return to self-trust.",
    date: "February 16, 2026",
    readTime: "12 min read",
    featured: true,
    slug: "/journal/frequency-shift",
  },
  {
    category: "Science",
    title: "How Microcurrent Therapy Rebuilds Collagen at the Cellular Level",
    excerpt: "Understanding the biophysics behind electrical stimulation and its proven effects on fibroblast activity, ATP production, and dermal remodeling.",
    date: "February 12, 2026",
    readTime: "8 min read",
    slug: "/journal/microcurrent-collagen",
  },
  {
    category: "Ritual",
    title: "The 5-Minute Evening Protocol",
    excerpt: "A structured guide to integrating microcurrent therapy into your nightly wind-down, designed for consistency, not perfection.",
    date: "February 5, 2026",
    readTime: "5 min read",
    slug: "/journal/evening-protocol",
  },
  {
    category: "Research",
    title: "660nm Red Light: What the Clinical Data Actually Shows",
    excerpt: "A transparent review of peer-reviewed studies on red light therapy for skin rejuvenation, wound healing, and inflammation reduction.",
    date: "January 28, 2026",
    readTime: "10 min read",
    slug: "/journal/red-light-clinical",
  },
  {
    category: "Wellness",
    title: "Lymphatic Drainage and Facial Sculpting: The Connection",
    excerpt: "Why gentle electrical stimulation supports the body's natural detoxification pathways, and what that means for facial contour.",
    date: "January 20, 2026",
    readTime: "6 min read",
    slug: "/journal/lymphatic-drainage",
  },
  {
    category: "Science",
    title: "EMS vs. Microcurrent: Understanding the Spectrum",
    excerpt: "Not all electrical stimulation is equal. A clinical breakdown of frequency ranges, muscle response types, and ideal use cases.",
    date: "January 14, 2026",
    readTime: "7 min read",
    slug: "/journal/ems-vs-microcurrent",
  },
  {
    category: "Ritual",
    title: "Building a Skin Ritual That Lasts",
    excerpt: "Consistency over intensity. How to design a personal protocol that adapts to your life, without burnout or guilt.",
    date: "January 7, 2026",
    readTime: "4 min read",
    slug: "/journal/ritual-that-lasts",
  },
];

const categoryColors: Record<string, string> = {
  Science: "text-teal",
  Ritual: "text-primary",
  Research: "text-teal",
  Wellness: "text-primary",
};

const Journal = () => {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <main>
        {/* Hero */}
        <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs tracking-[0.25em] uppercase text-teal mb-4">The Journal</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Science. Ritual. Clarity.
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Evidence based insights on skin science, device technology, and the art of daily transformation.
            </p>
          </div>
        </section>

        {/* Featured Article */}
        <section className="px-6 md:px-12 lg:px-20 pb-16">
          <div className="max-w-6xl mx-auto">
            <Link to={featured.slug || "#"} className="block bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-8 md:p-12 hover:shadow-lg transition-shadow duration-500 cursor-pointer group">
              <span className={`text-xs tracking-[0.2em] uppercase ${categoryColors[featured.category] || "text-muted-foreground"}`}>
                {featured.category} · Featured
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mt-4 mb-4 group-hover:text-primary transition-colors duration-300">
                {featured.title}
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mb-6 leading-relaxed">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{featured.date}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                <span>{featured.readTime}</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Article Grid */}
        <section className="px-6 md:px-12 lg:px-20 pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((article, i) => {
                const CardTag = article.slug ? Link : "article";
                const cardProps = article.slug ? { to: article.slug } : {};
                return (
                  <CardTag
                    key={i}
                    {...(cardProps as any)}
                    className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-6 hover:shadow-lg transition-all duration-500 cursor-pointer group flex flex-col"
                  >
                    <span className={`text-xs tracking-[0.2em] uppercase ${categoryColors[article.category] || "text-muted-foreground"}`}>
                      {article.category}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground mt-3 mb-3 group-hover:text-primary transition-colors duration-300 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-5 pt-4 border-t border-border/20">
                      <span>{article.date}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                      <span>{article.readTime}</span>
                    </div>
                  </CardTag>
                );
              })}
            </div>
          </div>
        </section>

        {/* Editorial Quote */}
        <section className="px-6 md:px-12 lg:px-20 pb-24">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-serif italic text-2xl md:text-3xl text-foreground/80 leading-relaxed">
              "The skin remembers what the mind forgets. Consistency is the only protocol that works."
            </p>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-6">
              The Zential Philosophy
            </p>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <ZentialFooter />
    </div>
  );
};

export default Journal;
