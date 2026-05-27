import { type Protocol } from "@/data/protocols";

// Visual mockup of the A6 printed Protocol Card that ships with each bundle.
// Pure SVG. No images, no fonts external.
export function ProtocolCardPreview({ protocol }: { protocol: Protocol }) {
  const isDark = protocol.cardBg === "#1A1714";
  const bg = "#F7F4F0";
  const ink = "#1A1714";
  const teal = "#2ED8A8";
  const muted = "#6B5A4A";

  return (
    <div className="relative">
      <div
        className="aspect-[105/148] w-full max-w-md mx-auto shadow-2xl"
        style={{ backgroundColor: bg, border: `1px solid ${ink}10` }}
      >
        <div className="h-full w-full p-8 md:p-10 flex flex-col justify-between">
          {/* Top */}
          <div>
            <p
              className="font-mono text-[10px] tracking-[0.2em] uppercase mb-1"
              style={{ color: muted }}
            >
              Zential Pure  ·  Protocol Card ( {protocol.number} )
            </p>
            <h3
              className="font-[Lora] italic leading-none mt-6"
              style={{ color: ink, fontSize: "clamp(2.5rem, 6vw, 3.5rem)" }}
            >
              {protocol.title}.
            </h3>
            <p
              className="text-[10px] md:text-xs tracking-wide mt-3"
              style={{ color: muted }}
            >
              {protocol.modalities}
            </p>
          </div>

          {/* Sequence diagram */}
          <div className="flex-1 flex flex-col justify-center gap-4 my-6">
            {protocol.devices.map((d, i) => (
              <div key={d.handle} className="flex items-baseline gap-3">
                <span
                  className="font-mono text-[10px] tracking-[0.16em]"
                  style={{ color: teal, minWidth: 30 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-xs md:text-sm tracking-wide flex-1"
                  style={{ color: ink }}
                >
                  {d.name}
                </span>
                <span
                  className="font-mono text-[10px] tracking-wide"
                  style={{ color: muted }}
                >
                  {d.minutes} min
                </span>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="flex items-end justify-between">
            <div>
              <p
                className="font-mono text-[10px] tracking-[0.16em] mb-1"
                style={{ color: muted }}
              >
                Total
              </p>
              <p
                className="font-mono text-sm tracking-wide"
                style={{ color: ink }}
              >
                {protocol.sessionMinutes} minutes
              </p>
            </div>
            <FlowerMarkSmall color={teal} size={28} />
          </div>
        </div>
      </div>
      <p
        className="text-center font-mono text-[10px] tracking-[0.16em] uppercase mt-6"
        style={{ color: muted }}
      >
        Printed insert  ·  ships with every Protocol  ·  A6  ·  300gsm
      </p>
    </div>
  );
}

function FlowerMarkSmall({ color, size = 28 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <g transform="translate(50 50)">
        {[0, 45, 90, 135].map((r) => (
          <ellipse
            key={r}
            rx="18"
            ry="32"
            fill={color}
            transform={`rotate(${r})`}
          />
        ))}
      </g>
    </svg>
  );
}
