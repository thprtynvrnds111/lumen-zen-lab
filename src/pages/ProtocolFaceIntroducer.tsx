import { SEO } from "@/components/SEO";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { SparseFooter } from "@/components/zential/v2/SparseFooter";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const bg = "#FFFFFF";
const surface = "#FFFFFF";
const accent = "#0E7A54";
const textPrimary = "#141414";
const textMuted = "#5A5A5A";
const divider = "rgba(20,20,20,0.10)";

function Section({
 children,
 className = "",
}: {
 children: React.ReactNode;
 className?: string;
}) {
 const ref = useScrollReveal<HTMLElement>();
 return (
  <section ref={ref} className={className}>
   {children}
  </section>
 );
}

interface ModalityBlock {
 number: string;
 name: string;
 param: string;
 body: string;
}

const modalities: ModalityBlock[] = [
 {
  number: "01",
  name: "Thermal",
  param: "40–42°C controlled heat",
  body:
   "Thermal is the opening step. Controlled warmth at 40–42°C relaxes fascial tissue, increases local circulation, and prepares the skin for the current-based modalities that follow. Applying Thermal first means subsequent inputs encounter more receptive, pliable tissue, the sequence depends on this preparation.",
 },
 {
  number: "02",
  name: "EMS",
  param: "250μs pulse width",
  body:
   "Electrical Muscle Stimulation delivers targeted pulses that trigger contraction and release cycles in facial muscles. The 250-microsecond pulse width is calibrated to recruit motor units efficiently without discomfort. Over consistent sessions, EMS re-educates muscle memory and supports structural tone across the midface and jawline.",
 },
 {
  number: "03",
  name: "Microcurrent",
  param: "200–400μA sub-sensory frequency",
  body:
   "Microcurrent operates at sub-sensory amperage, below the threshold of conscious sensation. These gentle currents mirror the body's own bioelectric signals, supporting ATP production and muscle re-education at a finer level than EMS. Microcurrent follows EMS in the sequence because muscles are already engaged and responsive.",
 },
];

const ProtocolFaceIntroducer = () => (
 <div
  className="min-h-screen"
  style={{ backgroundColor: bg, color: textPrimary }}
 >
  <SEO
   title="Face Introducer Protocol, Three Modalities, One Sequence | Zential Pure"
   description="The Face Introducer protocol: Thermal, EMS and Microcurrent in a ten-minute daily sequence. Understand each modality and why sequence order matters."
   canonical="https://zentialpure.com/protocol/face-introducer"
  />
  <AnnouncementBar />
  <Header />

  {/* Hero */}
  <Section>
   <div
    className="max-w-3xl mx-auto px-6 pt-24 pb-16"
    style={{ borderBottom: `1px solid ${divider}` }}
   >
    <p
     className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase mb-6"
     style={{ color: accent }}
    >
     Protocol
    </p>
    <h1
     className="text-4xl md:text-5xl font-light tracking-[-0.025em] leading-tight mb-6"
     style={{ color: textPrimary }}
    >
     Face Introducer Protocol
    </h1>
    <p
     className="text-lg md:text-xl font-light leading-relaxed"
     style={{ color: textMuted }}
    >
     Three modalities. One sequence. Ten minutes.
    </p>
    <p
     className="mt-4 text-base font-light leading-relaxed max-w-xl"
     style={{ color: textMuted }}
    >
     The Face Introducer combines EMS, Microcurrent and Thermal into a single
     daily session. Each modality has a defined role. The order is not
     arbitrary, each step conditions tissue for the one that follows.
    </p>
   </div>
  </Section>

  {/* Modality sections */}
  {modalities.map((m, i) => (
   <Section key={m.number}>
    <div
     className="max-w-3xl mx-auto px-6 py-14"
     style={{
      borderBottom: `1px solid ${divider}`,
      backgroundColor: i % 2 === 1 ? surface : bg,
     }}
    >
     <div className="flex items-baseline gap-4 mb-3">
      <span
       className="font-sans text-[11px] font-medium tracking-[0.22em]"
       style={{ color: accent }}
      >
       {m.number}
      </span>
      <h2
       className="text-2xl md:text-3xl font-light tracking-[-0.02em]"
       style={{ color: textPrimary }}
      >
       {m.name}
      </h2>
     </div>
     <p
      className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase mb-5"
      style={{ color: "#8E8E8E" }}
     >
      {m.param}
     </p>
     <p
      className="text-base font-light leading-relaxed max-w-xl"
      style={{ color: textMuted }}
     >
      {m.body}
     </p>
    </div>
   </Section>
  ))}

  {/* Running the sequence */}
  <Section>
   <div className="max-w-3xl mx-auto px-6 py-16">
    <h2
     className="text-2xl md:text-3xl font-light tracking-[-0.02em] mb-6"
     style={{ color: textPrimary }}
    >
     Running the sequence
    </h2>
    <p
     className="text-base font-light leading-relaxed max-w-xl mb-8"
     style={{ color: textMuted }}
    >
     The recommended order is: Thermal, then EMS, then Microcurrent.
    </p>
    <div className="flex flex-col gap-4 max-w-xl">
     {[
      {
       step: "Thermal first",
       reason:
        "Warmth opens circulation and softens tissue. Current-based modalities perform differently on warmed skin than cold, starting here means the rest of the session works with prepared tissue.",
      },
      {
       step: "EMS second",
       reason:
        "EMS recruits motor units and engages larger muscle groups. Running it early in the session, while energy is fresh, allows full contraction cycles without fatigue interfering with intensity.",
      },
      {
       step: "Microcurrent third",
       reason:
        "Microcurrent works at a finer, sub-sensory level. Placing it after EMS takes advantage of already-activated muscle tissue. The muscles are engaged; microcurrent refines that engagement.",
      },
     ].map((item) => (
      <div
       key={item.step}
       className="flex gap-4 p-4 rounded-none border"
       style={{ borderColor: divider }}
      >
       <div
        className="w-2 flex-shrink-0 rounded-full mt-1"
        style={{ backgroundColor: accent, minHeight: "1.5rem" }}
       />
       <div>
        <p
         className="text-sm font-medium mb-1"
         style={{ color: textPrimary }}
        >
         {item.step}
        </p>
        <p
         className="text-sm font-light leading-relaxed"
         style={{ color: textMuted }}
        >
         {item.reason}
        </p>
       </div>
      </div>
     ))}
    </div>
   </div>
  </Section>

  <SparseFooter />
 </div>
);

export default ProtocolFaceIntroducer;
