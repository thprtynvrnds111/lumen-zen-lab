import { Link } from "react-router-dom";
import { getProtocolForHandle } from "@/data/protocols";

// "Part of a Protocol", routes a single-device PDP into its parent Protocol.
// The system story made concrete: a device is one input; the protocol is the sequence.
export function ProtocolCrossSell({ handle, purchaseHandle }: { handle: string; purchaseHandle?: string }) {
 const protocol = getProtocolForHandle(handle, purchaseHandle);
 if (!protocol) return null;

 const isDark = protocol.cardBg === "#1A1714";
 const ink = isDark ? "#F7F4F0" : "#1A1714";
 const muted = isDark ? "rgba(247,244,240,0.6)" : "#6B5A4A";
 const accent = "#2ED8A8";

 return (
  <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ backgroundColor: protocol.cardBg }}>
   <div className="max-w-5xl mx-auto">
    <p className="font-mono text-[11px] tracking-[0.2em] uppercase mb-5" style={{ color: muted }}>
     Part of a system
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
     <div>
      <h2
       className="font-[Lora] italic leading-[1.05] mb-5"
       style={{ color: ink, fontSize: "clamp(2.2rem, 5vw, 3.4rem)" }}
      >
       A device is one input.
       <br />
       <span style={{ color: accent }}>The protocol is the sequence.</span>
      </h2>
      <p className="text-base md:text-lg mb-8 max-w-md" style={{ color: muted }}>
       This device belongs to the {protocol.title} Protocol, {protocol.modalities.toLowerCase()}.
       {" "}One {protocol.sessionMinutes}-minute sequence, run in order.
      </p>
      <Link
       to={`/protocols/${protocol.slug}`}
       className="inline-flex items-center gap-2 px-8 py-4 text-xs tracking-[0.18em] uppercase transition-colors"
       style={{ backgroundColor: accent, color: "#0F0E0D" }}
      >
       See the {protocol.title} Protocol →
      </Link>
     </div>

     {/* The sequence, compact */}
     <div className="flex flex-col gap-3">
      {protocol.devices.map((d, i) => {
       const active = d.handle === handle || d.handle === purchaseHandle;
       return (
        <div
         key={d.handle}
         className="flex items-center gap-4 rounded-2xl p-3 pr-5"
         style={{
          backgroundColor: active ? "rgba(46,216,168,0.12)" : isDark ? "rgba(247,244,240,0.05)" : "rgba(26,23,20,0.04)",
          border: active ? `1px solid ${accent}` : "1px solid transparent",
         }}
        >
         <div className="shrink-0 w-14 h-14 rounded-xl bg-white overflow-hidden grid place-items-center">
          <img src={`${d.imageUrl}&width=160`} alt={d.name} loading="lazy" className="w-[80%] h-[80%] object-contain" />
         </div>
         <div className="flex-1 min-w-0">
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: muted }}>
           {d.role}
          </div>
          <div className="text-sm md:text-base font-medium" style={{ color: ink }}>
           {d.name}
           {active && <span style={{ color: accent }}> · you're here</span>}
          </div>
         </div>
        </div>
       );
      })}
     </div>
    </div>
   </div>
  </section>
 );
}
