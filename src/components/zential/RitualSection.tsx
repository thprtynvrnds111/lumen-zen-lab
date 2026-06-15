import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
 { num: "01", title: "Load", desc: "Apply conduction medium to target zone. Skin hydration determines signal depth." },
 { num: "02", title: "Activate", desc: "Initiate frequency protocol. Device reads tissue impedance and calibrates output." },
 { num: "03", title: "Penetrate", desc: "Microcurrent drives actives past the stratum corneum. Collagen fibroblasts respond." },
 { num: "04", title: "Recover", desc: "Signal delivered. ATP synthesis elevated. Tissue remodels over 48–72 hours." },
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
   <div className="max-w-3xl mx-auto">
    <div className="text-center mb-14">
     <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "#E87040" }}>
     , The Protocol 
     </p>
     <h2 className="font-serif italic text-3xl md:text-4xl" style={{ color: "#EAE7E0" }}>
      5 Minutes. Every Day.
     </h2>
     <p className="text-sm mt-3 max-w-sm mx-auto" style={{ color: "rgba(234,231,224,0.45)" }}>
      Precision over intensity. Frequency over force.
     </p>
    </div>

    <div className="space-y-0">
     {steps.map((step, i) => (
      <div key={step.num} className="flex gap-6 items-start group cursor-default">
       <div className="flex flex-col items-center flex-shrink-0">
        <div
         className="w-11 h-11 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 group-hover:scale-110"
         style={{
          border: "2px solid #E87040",
          color: "#EAE7E0",
          backgroundColor: "transparent",
         }}
         onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "#E87040";
          (e.currentTarget as HTMLElement).style.color = "#fff";
         }}
         onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
          (e.currentTarget as HTMLElement).style.color = "#EAE7E0";
         }}
        >
         {step.num}
        </div>
        {i < steps.length - 1 && (
         <div className="w-px h-10" style={{ backgroundColor: "rgba(255,255,255,0.12)" }} />
        )}
       </div>
       <div className="pb-6 pt-2.5 transition-transform duration-300 group-hover:translate-x-1">
        <h3
         className="font-serif text-base font-bold mb-0.5 transition-colors duration-300 group-hover:text-[#E87040]"
         style={{ color: "#EAE7E0" }}
        >
         {step.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(234,231,224,0.6)" }}>
         {step.desc}
        </p>
       </div>
      </div>
     ))}
    </div>

    <div className="text-center mt-12">
     <p className="font-serif italic text-base max-w-md mx-auto" style={{ color: "rgba(234,231,224,0.5)" }}>
      "Transformation comes from repetition, not force."
     </p>
    </div>
   </div>
  </section>
 );
}
