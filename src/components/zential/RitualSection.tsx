import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    num: "01",
    title: "Load",
    desc: "Apply conduction medium to target zone. Skin hydration determines signal depth.",
    color: "#4080FF",
  },
  {
    num: "02",
    title: "Activate",
    desc: "Initiate frequency protocol. Device reads tissue impedance and calibrates output.",
    color: "#E87040",
  },
  {
    num: "03",
    title: "Penetrate",
    desc: "Microcurrent drives actives past the stratum corneum. Collagen fibroblasts respond.",
    color: "#C840E8",
  },
  {
    num: "04",
    title: "Recover",
    desc: "Signal delivered. ATP synthesis elevated. Tissue remodels over 48–72 hours.",
    color: "#40D080",
  },
];

export function RitualSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="ritual"
      className="relative px-6 md:px-12 lg:px-20 py-20 md:py-28"
      style={{ backgroundColor: "#070A0E" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="text-[10px] tracking-[0.3em] uppercase mb-3"
            style={{ color: "#E87040" }}
          >
            — The Protocol —
          </p>
          <h2
            className="font-serif italic text-3xl md:text-4xl"
            style={{ color: "#EAE7E0" }}
          >
            5 Minutes. Every Day.
          </h2>
          <p
            className="text-sm mt-3 max-w-sm mx-auto"
            style={{ color: "rgba(234,231,224,0.45)" }}
          >
            Precision over intensity. Frequency over force.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: "#111820",
                border: `1px solid ${step.color}30`,
                borderTop: `2px solid ${step.color}`,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-[10px] font-mono tracking-[0.2em]"
                  style={{ color: step.color }}
                >
                  {step.num}
                </span>
                <h3
                  className="font-serif italic text-lg"
                  style={{ color: "#EAE7E0" }}
                >
                  {step.title}
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(234,231,224,0.6)" }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p
            className="font-serif italic text-base max-w-md mx-auto"
            style={{ color: "rgba(234,231,224,0.5)" }}
          >
            "Transformation comes from repetition, not force."
          </p>
        </div>
      </div>
    </section>
  );
}
