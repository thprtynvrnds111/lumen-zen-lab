import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";

interface Study {
  title: string;
  source: string;
  year: string;
  url: string;
}

interface TechSection {
  heading: string;
  body: string;
}

interface TechnologyPageProps {
  title: string;
  metaDescription: string;
  tagline: string;
  headline: string;
  paramLabel: string;
  paramValue: string;
  intro: string;
  mechanism: TechSection;
  biology: TechSection;
  usage: { heading: string; points: string[] };
  studies: Study[];
  deviceHandle: string;
  deviceName: string;
}

export function TechnologyPage({
  title, metaDescription, tagline, headline, paramLabel, paramValue,
  intro, mechanism, biology, usage, studies, deviceHandle, deviceName,
}: TechnologyPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <SEO title={title} description={metaDescription} />
      <AnnouncementBar />
      <Header />
      <main>
        {/* Hero */}
        <section className="px-6 md:px-12 lg:px-20 py-24 md:py-36 text-center" style={{ backgroundColor: '#F7F4F0' }}>
          <p className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: '#9B5A2E' }}>{tagline}</p>
          <h1 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 tracking-tight leading-[1.1]">
            {headline}
          </h1>
          <p className="text-sm font-medium mb-2" style={{ color: '#C6A07C' }}>{paramLabel}: {paramValue}</p>
          <p className="text-sm text-foreground/60 max-w-xl mx-auto leading-relaxed mt-6">{intro}</p>
        </section>

        {/* Mechanism */}
        <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ backgroundColor: '#EDE9E3' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif italic text-2xl md:text-3xl text-foreground mb-6">{mechanism.heading}</h2>
            <p className="text-sm text-foreground/70 leading-[1.9]">{mechanism.body}</p>
          </div>
        </section>

        {/* Biology */}
        <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ backgroundColor: '#F7F4F0' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif italic text-2xl md:text-3xl text-foreground mb-6">{biology.heading}</h2>
            <p className="text-sm text-foreground/70 leading-[1.9]">{biology.body}</p>
          </div>
        </section>

        {/* Usage */}
        <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ backgroundColor: '#EDE9E3' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif italic text-2xl md:text-3xl text-foreground mb-8">{usage.heading}</h2>
            <ul className="space-y-4">
              {usage.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground/70 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#C6A07C' }} />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Studies */}
        <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ backgroundColor: '#F7F4F0' }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif italic text-2xl md:text-3xl text-foreground mb-8">Referenced Studies</h2>
            <div className="space-y-5">
              {studies.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg p-5 transition-shadow duration-300 hover:shadow-md"
                  style={{ backgroundColor: '#EFEBE5', border: '1px solid #E4DFD8' }}
                >
                  <p className="text-sm font-medium text-foreground mb-1">{s.title}</p>
                  <p className="text-xs text-foreground/50">{s.source} · {s.year}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 text-center" style={{ backgroundColor: '#EDE9E3' }}>
          <p className="font-serif italic text-2xl md:text-3xl text-foreground mb-4">
            Experience it yourself.
          </p>
          <p className="text-sm text-foreground/60 mb-8 max-w-md mx-auto">
            30-day return. No questions. The technology works or you get your money back.
          </p>
          <Link
            to={`/product/${deviceHandle}`}
            className="inline-block px-8 py-3 text-sm font-medium text-white rounded-md transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#C6A07C' }}
          >
            View {deviceName} →
          </Link>
        </section>
      </main>
      <ZentialFooter />
    </div>
  );
}
