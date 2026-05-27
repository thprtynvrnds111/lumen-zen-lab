import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { SparseFooter } from "@/components/zential/v2/SparseFooter";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { protocols } from "@/data/protocols";
import { useEffect, useState } from "react";

const Protocols = () => {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      setScrollPct(pct);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F4F0] text-[#1A1714]">
      <SEO
        title="Protocols — Zential Pure"
        description="Three Protocols. Three sequences. The system, not the list."
        canonical="https://zentialpure.com/protocols"
      />
      <AnnouncementBar />
      <Header />

      {/* Sticky left indicator — fades out as user reaches footer */}
      <div
        className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col items-start gap-3 pointer-events-none transition-opacity duration-300"
        style={{ opacity: scrollPct > 0.85 ? 0 : 1 }}
        aria-hidden
      >
        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#6B5A4A]">
          Protocols
        </div>
        <div
          className="font-[Lora] italic leading-none"
          style={{ fontSize: "4rem", color: "#1A1714" }}
        >
          ( 01—03 )
        </div>
        <div className="mt-4 w-1 h-32 bg-[#1A1714]/10 overflow-hidden">
          <div
            className="w-full bg-[#2ED8A8]"
            style={{
              height: "100%",
              transform: `scaleY(${scrollPct})`,
              transformOrigin: "top",
              transition: "transform 0.1s linear",
            }}
          />
        </div>
      </div>

      {/* Hero band */}
      <section className="px-6 md:pl-32 pt-20 pb-24 md:pt-36 md:pb-32 max-w-6xl">
        <p className="font-mono text-xs tracking-[0.22em] uppercase text-[#6B5A4A] mb-10">
          Zential Pure  ·  Protocols  ·  Edition 2026
        </p>
        <h1
          className="font-[Lora] italic leading-[0.95] mb-10 max-w-4xl text-[#1A1714]"
          style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
        >
          Three Protocols.
          <br />
          <span className="text-[#1A1714]/40">One system.</span>
        </h1>
        <p className="text-base md:text-xl text-[#1A1714]/75 max-w-xl leading-relaxed">
          Bundles are not discounts. They are sequences.
          A device works because of its mechanism.
          A protocol works because of its order.
        </p>
      </section>

      {/* Protocol grid */}
      <section className="px-6 md:pl-32 pb-32 max-w-6xl">
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {protocols.map((p, idx) => {
            const isDark = p.cardBg === "#1A1714";
            const headColor = isDark ? "#2ED8A8" : "#1A1714";
            const bodyColor = isDark ? "#F7F4F0" : "#1A1714";
            const mutedColor = isDark ? "rgba(247,244,240,0.55)" : "#6B5A4A";
            const dim = isDark ? "rgba(247,244,240,0.15)" : "rgba(26,23,20,0.15)";
            return (
              <Link
                key={p.slug}
                to={`/protocols/${p.slug}`}
                className="group block transition-transform duration-500 hover:translate-y-[-2px]"
              >
                <article
                  style={{ backgroundColor: p.cardBg }}
                  className="relative overflow-hidden p-10 md:p-16 min-h-[440px] flex flex-col justify-between"
                >
                  <div className="flex items-baseline justify-between">
                    <span
                      className="font-mono text-xs tracking-[0.18em]"
                      style={{ color: mutedColor }}
                    >
                      Protocol ( {p.number} )
                    </span>
                    <span
                      className="font-mono text-[10px] tracking-[0.16em] tabular-nums"
                      style={{ color: mutedColor }}
                    >
                      {String(idx + 1).padStart(2, "0")} / {protocols.length.toString().padStart(2, "0")}
                    </span>
                  </div>

                  <div>
                    <h2
                      className="font-[Lora] italic leading-none mb-6"
                      style={{ color: headColor, fontSize: "clamp(4rem, 10vw, 8rem)" }}
                    >
                      {p.title}.
                    </h2>

                    <div className="mb-5 h-px w-32" style={{ backgroundColor: headColor }} />

                    <p
                      className="text-sm md:text-base tracking-wide mb-3"
                      style={{ color: bodyColor }}
                    >
                      {p.modalities}
                    </p>
                    <p
                      className="font-mono text-xs md:text-sm"
                      style={{ color: bodyColor }}
                    >
                      {p.devices.length} devices  ·  {p.sessionMinutes}-minute sequence  ·  €{p.totalPrice}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-12">
                    <span
                      className="text-xs tracking-[0.18em] uppercase border-b pb-1 transition-all duration-300 group-hover:translate-x-1"
                      style={{ color: headColor, borderColor: headColor }}
                    >
                      See Protocol  →
                    </span>
                    <span
                      className="font-mono text-[10px] tracking-[0.16em] uppercase"
                      style={{ color: mutedColor }}
                    >
                      A6 card included
                    </span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Philosophy band — quiet closer */}
      <section className="px-6 py-32 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 mb-10">
          <span className="block w-12 h-px bg-[#1A1714]/20" />
          <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#6B5A4A]">
            Discipline
          </span>
          <span className="block w-12 h-px bg-[#1A1714]/20" />
        </div>
        <p className="font-[Lora] italic text-2xl md:text-4xl leading-[1.35] text-[#1A1714]">
          A device works because of its mechanism.
          <br />
          <span className="text-[#1A1714]/65">
            A protocol works because of its order.
          </span>
        </p>
      </section>

      <SparseFooter />
    </div>
  );
};

export default Protocols;
