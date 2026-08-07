import { Link } from "react-router-dom";
import { getProtocolForHandle } from "@/data/protocols";

// "Part of a Protocol", routes a single-device PDP into its parent Protocol.
// The system story made concrete: a device is one input; the protocol is the sequence.
export function ProtocolCrossSell({ handle, purchaseHandle }: { handle: string; purchaseHandle?: string }) {
 const protocol = getProtocolForHandle(handle, purchaseHandle);
 if (!protocol) return null;

 const ink = "#141414";
 const muted = "#5A5A5A";
 const accent = "#2ED8A8";
 const emerald = "#0E7A54";

 return (
  <section className="border-y border-[rgba(20,20,20,0.10)] bg-white px-6 md:px-12 lg:px-20 py-20 md:py-28">
   <div className="max-w-5xl mx-auto">
    <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase mb-5" style={{ color: "#8E8E8E" }}>
     Part of a system
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
     <div>
      <h2
       className="font-sans font-light tracking-[-0.025em] leading-[1.05] mb-5"
       style={{ color: ink, fontSize: "clamp(2.2rem, 5vw, 3.4rem)" }}
      >
       A device is one input.
       <br />
       <span style={{ color: emerald }}>The protocol is the sequence.</span>
      </h2>
      <p className="text-base md:text-lg mb-8 max-w-md" style={{ color: muted }}>
       This device belongs to the {protocol.title} Protocol, {protocol.modalities.toLowerCase()}.
       {" "}One {protocol.sessionMinutes}-minute sequence, run in order.
      </p>
      <Link
       to={`/protocols/${protocol.slug}`}
       className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs font-semibold tracking-[0.18em] uppercase transition-colors"
       style={{ backgroundColor: accent, color: "#141414" }}
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
         className="flex items-center gap-4 rounded-none p-3 pr-5"
         style={{
          backgroundColor: active ? "rgba(46,216,168,0.12)" : "rgba(20,20,20,0.04)",
          border: active ? `1px solid ${accent}` : "1px solid transparent",
         }}
        >
         <div className="shrink-0 w-14 h-14 rounded-none bg-white overflow-hidden grid place-items-center">
          <img src={`${d.imageUrl}&width=160`} alt={d.name} loading="lazy" className="w-[80%] h-[80%] object-contain" />
         </div>
         <div className="flex-1 min-w-0">
          <div className="font-sans text-[10px] font-medium tracking-[0.14em] uppercase" style={{ color: "#8E8E8E" }}>
           {d.role}
          </div>
          <div className="text-sm md:text-base font-medium" style={{ color: ink }}>
           {d.name}
           {active && <span style={{ color: emerald }}> · you're here</span>}
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
