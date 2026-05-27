import { PageShell } from "@/components/zential/v2/PageShell";
import { Link } from "react-router-dom";

interface Article {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
  featured?: boolean;
}

const articles: Article[] = [
  {
    category: "Ritual",
    title: "The Night My Frequency Shifted",
    excerpt:
      "A sacred reflection on what happens when microcurrent becomes more than skincare, when it becomes a conversation with the nervous system, a vote for slowness, and a return to self-trust.",
    date: "February 16, 2026",
    readTime: "12 min read",
    featured: true,
    slug: "/journal/frequency-shift",
  },
  {
    category: "Science",
    title: "How Microcurrent Rebuilds Collagen",
    excerpt:
      "Understanding the biophysics behind electrical stimulation and its effects on fibroblast activity, ATP production, and dermal remodeling.",
    date: "February 12, 2026",
    readTime: "8 min read",
    slug: "/journal/microcurrent-collagen",
  },
  {
    category: "Ritual",
    title: "The 5-Minute Evening Protocol",
    excerpt:
      "A structured guide to integrating microcurrent into your nightly wind-down. Designed for consistency, not perfection.",
    date: "February 5, 2026",
    readTime: "5 min read",
    slug: "/journal/evening-protocol",
  },
  {
    category: "Research",
    title: "660nm Red Light: What the Data Shows",
    excerpt:
      "A transparent review of peer-reviewed studies on red light therapy for skin rejuvenation, wound healing, and inflammation.",
    date: "January 28, 2026",
    readTime: "10 min read",
    slug: "/journal/red-light-clinical",
  },
  {
    category: "Wellness",
    title: "Lymphatic Drainage and Facial Sculpting",
    excerpt:
      "Why gentle electrical stimulation supports the body's natural detoxification pathways.",
    date: "January 20, 2026",
    readTime: "6 min read",
    slug: "/journal/lymphatic-drainage",
  },
  {
    category: "Science",
    title: "EMS vs. Microcurrent",
    excerpt:
      "Not all electrical stimulation is equal. A clinical breakdown of frequency ranges, muscle response types, and ideal use cases.",
    date: "January 14, 2026",
    readTime: "7 min read",
    slug: "/journal/ems-vs-microcurrent",
  },
  {
    category: "Ritual",
    title: "Building a Skin Ritual That Lasts",
    excerpt:
      "Consistency over intensity. How to design a personal protocol that adapts to your life, without burnout or guilt.",
    date: "January 7, 2026",
    readTime: "4 min read",
    slug: "/journal/ritual-that-lasts",
  },
];

const Journal = () => {
  const featured = articles.find((a) => a.featured) || articles[0];
  const rest = articles.filter((a) => a !== featured);

  return (
    <PageShell
      title="Journal — Zential Pure"
      description="Field notes from the lab. Mechanism, ritual, science."
      canonical="https://zentialpure.com/journal"
      eyebrow="Zential Pure  ·  Journal  ·  Edition 2026"
      displayTitle="Field notes."
      displaySubtitle="Mechanism. Ritual. Science. Notes from the lab in Rotterdam."
      stickyTag="Journal 2026"
    >
      {/* Featured article — full-bleed band */}
      <section className="px-6 md:pl-32 pb-24 max-w-6xl">
        <Link to={featured.slug} className="group block">
          <div className="bg-[#1A1714] text-[#F7F4F0] p-10 md:p-16 hover:bg-[#0d2620] transition-colors">
            <div className="flex items-baseline justify-between mb-8">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#F7F4F0]/55">
                Featured  ·  {featured.category}
              </p>
              <p className="font-mono text-[10px] tracking-[0.18em] text-[#F7F4F0]/40">
                {featured.readTime}
              </p>
            </div>
            <h2
              className="font-[Lora] italic leading-[0.95] text-[#2ED8A8] mb-8 max-w-3xl"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
            >
              {featured.title}.
            </h2>
            <p className="text-base md:text-lg text-[#F7F4F0]/75 max-w-2xl leading-relaxed mb-10">
              {featured.excerpt}
            </p>
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#F7F4F0]/55">
                {featured.date}
              </span>
              <span className="text-xs tracking-[0.18em] uppercase text-[#2ED8A8] border-b border-[#2ED8A8] pb-1 group-hover:translate-x-1 transition-transform">
                Read  →
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Section label */}
      <section className="px-6 md:pl-32 pb-12 max-w-6xl">
        <div className="flex items-baseline justify-between border-b border-[#1A1714]/15 pb-6">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#6B5A4A]">
            Section ( 02 )  ·  Recent
          </p>
          <p className="font-mono text-[10px] tracking-[0.18em] text-[#6B5A4A] tabular-nums">
            {rest.length.toString().padStart(2, "0")} entries
          </p>
        </div>
      </section>

      {/* Article list — editorial rows */}
      <section className="px-6 md:pl-32 pb-32 max-w-6xl">
        <div className="space-y-12 md:space-y-16">
          {rest.map((article, idx) => (
            <Link
              key={article.slug}
              to={article.slug}
              className="group block border-b border-[#1A1714]/10 pb-12 hover:border-[#2ED8A8] transition-colors"
            >
              <div className="grid grid-cols-12 gap-6 md:gap-10 items-baseline">
                <div className="col-span-2 md:col-span-1">
                  <p className="font-mono text-xs text-[#6B5A4A] tabular-nums">
                    {String(idx + 2).padStart(2, "0")}
                  </p>
                </div>
                <div className="col-span-10 md:col-span-2">
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#2ED8A8]">
                    {article.category}
                  </p>
                  <p className="font-mono text-[10px] tracking-[0.18em] text-[#6B5A4A] mt-2">
                    {article.readTime}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-7">
                  <h3 className="font-[Lora] italic text-3xl md:text-5xl leading-tight text-[#1A1714] group-hover:text-[#2ED8A8] transition-colors mb-3">
                    {article.title}.
                  </h3>
                  <p className="text-sm md:text-base text-[#1A1714]/70 max-w-xl">
                    {article.excerpt}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-2 md:text-right">
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#6B5A4A]">
                    {article.date}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Closer */}
      <section className="px-6 py-32 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 mb-10">
          <span className="block w-12 h-px bg-[#1A1714]/20" />
          <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#6B5A4A]">
            Zential Pure
          </span>
          <span className="block w-12 h-px bg-[#1A1714]/20" />
        </div>
        <p className="font-[Lora] italic text-2xl md:text-4xl leading-[1.35] text-[#1A1714]">
          The lab posts what it learns.
          <br />
          <span className="text-[#1A1714]/65">Slowly, in full sentences.</span>
        </p>
      </section>
    </PageShell>
  );
};

export default Journal;
