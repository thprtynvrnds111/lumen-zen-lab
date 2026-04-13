import { Link } from "react-router-dom";

const ALL_ARTICLES = [
  {
    slug: "/journal/frequency-shift",
    category: "Ritual",
    title: "The Night My Frequency Shifted",
    readTime: "12 min read",
  },
  {
    slug: "/journal/microcurrent-collagen",
    category: "Science",
    title: "How Microcurrent Rebuilds Collagen at the Cellular Level",
    readTime: "8 min read",
  },
  {
    slug: "/journal/evening-protocol",
    category: "Ritual",
    title: "The 5-Minute Evening Protocol",
    readTime: "5 min read",
  },
  {
    slug: "/journal/red-light-clinical",
    category: "Research",
    title: "660nm Red Light: What the Clinical Data Actually Shows",
    readTime: "10 min read",
  },
  {
    slug: "/journal/lymphatic-drainage",
    category: "Wellness",
    title: "Lymphatic Drainage and Facial Sculpting",
    readTime: "6 min read",
  },
  {
    slug: "/journal/ems-vs-microcurrent",
    category: "Science",
    title: "EMS vs. Microcurrent: Understanding the Spectrum",
    readTime: "7 min read",
  },
  {
    slug: "/journal/ritual-that-lasts",
    category: "Ritual",
    title: "Building a Skin Ritual That Lasts",
    readTime: "4 min read",
  },
];

const categoryColor: Record<string, string> = {
  Science: "text-teal-600",
  Research: "text-teal-600",
  Ritual: "text-primary",
  Wellness: "text-primary",
};

interface Props {
  currentSlug: string;
}

export function JournalRelatedArticles({ currentSlug }: Props) {
  const related = ALL_ARTICLES.filter(a => a.slug !== currentSlug).slice(0, 3);

  return (
    <section className="px-6 md:px-12 lg:px-20 py-16 border-t border-border/20">
      <div className="max-w-3xl mx-auto">
        <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-8">Continue Reading</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {related.map(article => (
            <Link
              key={article.slug}
              to={article.slug}
              className="group block rounded-xl border border-border/30 bg-card/60 p-5 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className={`text-[10px] tracking-[0.2em] uppercase font-medium ${categoryColor[article.category] || "text-muted-foreground"}`}>
                {article.category}
              </span>
              <h3 className="text-sm font-semibold text-foreground mt-2 mb-3 leading-snug group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <span className="text-[10px] text-muted-foreground">{article.readTime} →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
