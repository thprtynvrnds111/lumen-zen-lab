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
  Science: "text-[#0E7A54]",
  Research: "text-[#0E7A54]",
  Ritual: "text-[#0E7A54]",
  Wellness: "text-[#0E7A54]",
};

interface Props {
  currentSlug: string;
}

export function JournalRelatedArticles({ currentSlug }: Props) {
  const related = ALL_ARTICLES.filter(a => a.slug !== currentSlug).slice(0, 3);

  return (
    <section className="bg-white px-6 md:px-12 lg:px-20 py-16 border-t border-[rgba(20,20,20,0.10)]">
      <div className="max-w-3xl mx-auto">
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#8E8E8E] mb-8">Continue Reading</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {related.map(article => (
            <Link
              key={article.slug}
              to={article.slug}
              className="group block rounded-none border border-[rgba(20,20,20,0.10)] bg-white p-5 hover:shadow-sm transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className={`text-[10px] tracking-[0.2em] uppercase font-medium ${categoryColor[article.category] || "text-[#8E8E8E]"}`}>
                {article.category}
              </span>
              <h3 className="text-sm font-medium text-[#141414] mt-2 mb-3 leading-snug group-hover:text-[#0E7A54] transition-colors">
                {article.title}
              </h3>
              <span className="text-[10px] text-[#8E8E8E]">{article.readTime} →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
