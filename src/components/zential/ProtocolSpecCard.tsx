import { type Protocol } from "@/data/protocols";

// R2 "spec card", a white boarding-pass / data-card rendition of the printed
// Protocol Card that ships with each protocol. Pure markup, no external assets.
export function ProtocolSpecCard({ protocol }: { protocol: Protocol }) {
 const ink = "#141414";
 const accent = "#0E7A54";
 const muted = "#8E8E8E";

 return (
  <div className="relative w-full max-w-md mx-auto">
   <div
    className="relative overflow-hidden rounded-none border border-[rgba(20,20,20,0.10)] shadow-[0_18px_50px_rgba(20,20,20,0.08)]"
    style={{ backgroundColor: "#FFFFFF", color: ink }}
   >
    {/* perforation stub line */}
    <div
     className="absolute top-0 bottom-0 hidden sm:block"
     style={{
      right: 84,
      borderLeft: "1px dashed rgba(20,20,20,0.18)",
     }}
     aria-hidden
    />

    <div className="p-7 md:p-9">
     {/* header */}
     <div className="flex items-start justify-between">
      <h3
       className="font-sans font-light tracking-[-0.025em] leading-none"
       style={{ fontSize: "clamp(2.2rem, 6vw, 3rem)" }}
      >
       {protocol.title}.
      </h3>
      <span
       className="font-sans text-[10px] font-medium tracking-[0.18em] uppercase"
       style={{ color: accent }}
      >
       Protocol {protocol.number}
      </span>
     </div>

     {/* spec grid */}
     <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
      {[
       ["Devices", String(protocol.devices.length)],
       ["Session", `${protocol.sessionMinutes} min`],
       ["Modalities", String(protocol.modalities.split(" · ").length)],
       ["Sum of parts", `€${protocol.totalPrice}`],
      ].map(([k, v]) => (
       <div key={k}>
        <div
         className="font-sans text-[9px] font-medium tracking-[0.16em] uppercase mb-1"
         style={{ color: muted }}
        >
         {k}
        </div>
        <div className="text-base font-medium">{v}</div>
       </div>
      ))}
     </div>

     {/* sequence row */}
     <div
      className="mt-8 pt-6 flex items-end justify-between"
      style={{ borderTop: "1px solid rgba(20,20,20,0.10)" }}
     >
      <div>
       <div
        className="font-sans text-[9px] font-medium tracking-[0.16em] uppercase mb-1"
        style={{ color: muted }}
       >
        Sequence
       </div>
       <div className="text-sm">
        {protocol.devices.map((d) => d.role.split(" ·")[0]).join(" → ")}
       </div>
      </div>
      <div
       className="font-sans tabular-nums leading-none"
       style={{ color: accent, fontSize: "1.6rem" }}
      >
       {String(protocol.sessionMinutes).padStart(2, "0")}:00
      </div>
     </div>
    </div>
   </div>

   <p
    className="text-center font-sans text-[10px] font-medium tracking-[0.16em] uppercase mt-6"
    style={{ color: "#8E8E8E" }}
   >
    Printed insert · ships with every Protocol · A6 · 300gsm
   </p>
  </div>
 );
}
