import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import panelRedlight from "@/assets/panel-redlight.jpg";
import panelMicrocurrent from "@/assets/panel-microcurrent.jpg";
import panelEms from "@/assets/panel-ems.jpg";
import panelBluelight from "@/assets/panel-bluelight.jpg";

interface PanelData {
  id: string;
  eyebrow: string;
  headline: string;
  bullets: string[];
  cta: string;
  image: string;
  glowColor: string;
}

const panels: PanelData[] = [
  {
    id: "redlight",
    eyebrow: "Red Light Therapy",
    headline: "Stimulate Collagen at the Source.",
    bullets: [
      "Boosts natural collagen",
      "Reduces fine lines",
      "Enhances skin density",
    ],
    cta: "Explore Red Light →",
    image: panelRedlight,
    glowColor: "rgba(200, 60, 60, 0.3)",
  },
  {
    id: "microcurrent",
    eyebrow: "Microcurrent Technology",
    headline: "Lift. Tone. Re-educate Muscle Memory.",
    bullets: [
      "Visible lifting effect",
      "Facial muscle toning",
      "Contour refinement",
    ],
    cta: "Discover Microcurrent →",
    image: panelMicrocurrent,
    glowColor: "rgba(100, 180, 255, 0.25)",
  },
  {
    id: "ems",
    eyebrow: "EMS Activation",
    headline: "Sculpt Through Intelligent Stimulation.",
    bullets: [
      "Activates deep muscle fibers",
      "Improves tone",
      "Enhances circulation",
    ],
    cta: "See Body Activation →",
    image: panelEms,
    glowColor: "rgba(210, 190, 160, 0.3)",
  },
  {
    id: "bluelight",
    eyebrow: "Blue Light Precision",
    headline: "Refine. Clarify. Balance.",
    bullets: [
      "Targets acne bacteria",
      "Reduces redness",
      "Improves texture",
    ],
    cta: "Reveal Clear Skin →",
    image: panelBluelight,
    glowColor: "rgba(40, 100, 220, 0.3)",
  },
];

/* ── Floating dust particles ── */
function DustParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {Array.from({ length: 30 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-foreground/[0.04]"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float-dust ${8 + Math.random() * 12}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Desktop Panel ── */
function DesktopPanel({
  panel,
  isActive,
  onHover,
  onLeave,
}: {
  panel: PanelData;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative overflow-hidden rounded-3xl cursor-pointer"
      style={{
        flex: isActive ? "1.8 1 0%" : "1 1 0%",
        aspectRatio: "3 / 4",
        transition: "flex 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: isActive
          ? `0 20px 60px -15px ${panel.glowColor}`
          : "0 4px 20px -5px rgba(0,0,0,0.1)",
      }}
    >
      {/* Background image */}
      <img
        src={panel.image}
        alt={panel.eyebrow}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: isActive ? "scale(1.05)" : "scale(1)",
          filter: isActive ? "brightness(1)" : "brightness(0.85) saturate(0.8)",
          transition: "transform 0.7s ease, filter 0.6s ease",
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: isActive
            ? "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)",
          transition: "background 0.6s ease",
        }}
      />

      {/* Subtle glow pulse */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center bottom, ${panel.glowColor}, transparent 70%)`,
          opacity: isActive ? 0.5 : 0,
          transition: "opacity 0.6s ease",
        }}
      />

      {/* Always-visible eyebrow at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 p-6 z-10"
        style={{
          opacity: isActive ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      >
        <p className="text-[10px] tracking-[0.25em] uppercase text-white/80 font-medium">
          {panel.eyebrow}
        </p>
      </div>

      {/* Hover content */}
      <div
        className="absolute bottom-0 left-0 right-0 p-8 z-10 flex flex-col"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
        }}
      >
        <p className="text-[10px] tracking-[0.25em] uppercase text-white/70 font-medium mb-2">
          {panel.eyebrow}
        </p>
        <h3 className="text-xl font-semibold text-white leading-tight mb-4">
          {panel.headline}
        </h3>
        <ul className="space-y-1.5 mb-6">
          {panel.bullets.map((b) => (
            <li key={b} className="text-[13px] text-white/75 flex items-start gap-2">
              <span className="text-white/40 mt-0.5">•</span>
              {b}
            </li>
          ))}
        </ul>
        <button
          className="self-start text-[11px] tracking-[0.15em] uppercase font-medium px-5 py-2.5 rounded-full border border-white/25 text-white/90 hover:bg-white/10 transition-colors duration-300"
          style={{
            opacity: isActive ? 1 : 0,
            transition: "opacity 0.4s ease 0.3s",
          }}
        >
          {panel.cta}
        </button>
      </div>
    </div>
  );
}

/* ── Mobile Panel ── */
function MobilePanel({
  panel,
  isActive,
  onToggle,
}: {
  panel: PanelData;
  isActive: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      onClick={onToggle}
      className="relative overflow-hidden rounded-3xl cursor-pointer"
      style={{
        height: isActive ? 420 : 120,
        transition: "height 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: isActive
          ? `0 12px 40px -10px ${panel.glowColor}`
          : "0 2px 12px -3px rgba(0,0,0,0.08)",
      }}
    >
      <img
        src={panel.image}
        alt={panel.eyebrow}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: isActive ? "scale(1.05)" : "scale(1)",
          filter: isActive ? "brightness(1)" : "brightness(0.8) saturate(0.7)",
          transition: "transform 0.6s ease, filter 0.5s ease",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: isActive
            ? "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)"
            : "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 70%, transparent 100%)",
          transition: "background 0.5s ease",
        }}
      />

      {/* Collapsed state label */}
      <div
        className="absolute inset-0 flex items-center px-6 z-10"
        style={{
          opacity: isActive ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        <p className="text-[11px] tracking-[0.25em] uppercase text-white font-medium">
          {panel.eyebrow}
        </p>
      </div>

      {/* Expanded content */}
      <div
        className="absolute bottom-0 left-0 right-0 p-6 z-10"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s",
          pointerEvents: isActive ? "auto" : "none",
        }}
      >
        <p className="text-[10px] tracking-[0.25em] uppercase text-white/70 font-medium mb-2">
          {panel.eyebrow}
        </p>
        <h3 className="text-lg font-semibold text-white leading-tight mb-3">
          {panel.headline}
        </h3>
        <ul className="space-y-1 mb-5">
          {panel.bullets.map((b) => (
            <li key={b} className="text-[13px] text-white/75 flex items-start gap-2">
              <span className="text-white/40 mt-0.5">•</span>
              {b}
            </li>
          ))}
        </ul>
        <button className="text-[11px] tracking-[0.15em] uppercase font-medium px-5 py-2.5 rounded-full border border-white/25 text-white/90 active:bg-white/10 transition-colors duration-300">
          {panel.cta}
        </button>
      </div>
    </div>
  );
}

/* ── Main Export ── */
export function TechnologyPanels() {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      style={{ background: "hsl(30 27% 95%)" }}
    >
      <DustParticles />

      <div className="text-center mb-12 relative z-10">
        <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
          The Science
        </p>
        <h2 className="text-2xl md:text-4xl font-light tracking-wide text-foreground">
          Precision Technology
        </h2>
      </div>

      {isMobile ? (
        <div className="flex flex-col gap-4 relative z-10">
          {panels.map((panel, i) => (
            <MobilePanel
              key={panel.id}
              panel={panel}
              isActive={activeIndex === i}
              onToggle={() => setActiveIndex(activeIndex === i ? null : i)}
            />
          ))}
        </div>
      ) : (
        <div className="flex gap-4 relative z-10" style={{ height: "clamp(400px, 55vh, 600px)" }}>
          {panels.map((panel, i) => (
            <DesktopPanel
              key={panel.id}
              panel={panel}
              isActive={activeIndex === i}
              onHover={() => setActiveIndex(i)}
              onLeave={() => setActiveIndex(null)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
