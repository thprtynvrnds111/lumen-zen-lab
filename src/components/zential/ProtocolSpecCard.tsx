import { type Protocol } from "@/data/protocols";

// R2 "spec card" — a dark boarding-pass / data-card rendition of the printed
// Protocol Card that ships with each protocol. Pure markup, no external assets.
export function ProtocolSpecCard({ protocol }: { protocol: Protocol }) {
  const ink = "#1A1714";
  const cream = "#F7F4F0";
  const teal = "#2ED8A8";
  const muted = "rgba(247,244,240,0.45)";

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div
        className="relative overflow-hidden rounded-2xl shadow-2xl"
        style={{ backgroundColor: ink, color: cream }}
      >
        {/* perforation stub line */}
        <div
          className="absolute top-0 bottom-0 hidden sm:block"
          style={{
            right: 84,
            borderLeft: "1px dashed rgba(247,244,240,0.18)",
          }}
          aria-hidden
        />

        <div className="p-7 md:p-9">
          {/* header */}
          <div className="flex items-start justify-between">
            <h3
              className="font-[Lora] italic leading-none"
              style={{ fontSize: "clamp(2.2rem, 6vw, 3rem)" }}
            >
              {protocol.title}.
            </h3>
            <span
              className="font-mono text-[10px] tracking-[0.18em] uppercase"
              style={{ color: teal }}
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
                  className="font-mono text-[9px] tracking-[0.16em] uppercase mb-1"
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
            style={{ borderTop: "1px solid rgba(247,244,240,0.12)" }}
          >
            <div>
              <div
                className="font-mono text-[9px] tracking-[0.16em] uppercase mb-1"
                style={{ color: muted }}
              >
                Sequence
              </div>
              <div className="text-sm">
                {protocol.devices.map((d) => d.role.split(" ·")[0]).join(" → ")}
              </div>
            </div>
            <div
              className="font-mono leading-none"
              style={{ color: teal, fontSize: "1.6rem" }}
            >
              {String(protocol.sessionMinutes).padStart(2, "0")}:00
            </div>
          </div>
        </div>
      </div>

      <p
        className="text-center font-mono text-[10px] tracking-[0.16em] uppercase mt-6"
        style={{ color: "#6B5A4A" }}
      >
        Printed insert · ships with every Protocol · A6 · 300gsm
      </p>
    </div>
  );
}
