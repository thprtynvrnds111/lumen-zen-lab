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
        <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-20 overflow-hidden">
          {/* Ambient background */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, hsl(30 27% 95%) 0%, hsl(30 20% 92%) 40%, hsl(340 15% 93%) 70%, hsl(30 27% 95%) 100%)' }} />

          {/* Soft radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, hsl(var(--accent) / 0.06) 0%, transparent 70%)' }}
          />

          {/* Floating rings */}
          <div className="absolute top-12 left-[10%] w-32 h-32 md:w-48 md:h-48 rounded-full border border-accent/10 pointer-events-none animate-[spin_40s_linear_infinite]" />
          <div className="absolute bottom-16 right-[8%] w-24 h-24 md:w-36 md:h-36 rounded-full border border-primary/8 pointer-events-none animate-[spin_55s_linear_infinite_reverse]" />
          <div className="absolute top-1/3 right-[15%] w-16 h-16 md:w-24 md:h-24 rounded-full border border-muted-foreground/5 pointer-events-none animate-[spin_30s_linear_infinite]" />

          {/* Soft dots */}
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-accent/[0.07]"
              style={{
                width: 3 + Math.random() * 4,
                height: 3 + Math.random() * 4,
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                animation: `pulse ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent rounded-full px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase mb-6">The Journal</div>
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
