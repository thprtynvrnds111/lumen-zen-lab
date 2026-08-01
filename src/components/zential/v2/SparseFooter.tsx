import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ZenMascot } from "@/components/zential/ZenMascot";
import { SOCIALS } from "@/lib/socials";

const sections = [
  {
    label: "Shop",
    items: [
      { name: "Protocols", to: "/protocols" },
      { name: "All Devices", to: "/#devices" },
      { name: "Journal", to: "/journal" },
      { name: "Our origin", to: "/origin" },
      { name: "The Breath", to: "/breath" },
    ],
  },
  {
    label: "Technology",
    items: [
      { name: "EMS", to: "/technology/ems" },
      { name: "Microcurrent", to: "/technology/microcurrent" },
      { name: "Red Light", to: "/technology/red-light" },
      { name: "Thermal", to: "/technology/thermal" },
    ],
  },
  {
    label: "Support",
    items: [
      { name: "Contact", to: "/support" },
      { name: "Shipping", to: "/shipping" },
      { name: "Returns", to: "/returns" },
      { name: "FAQ", to: "/faq" },
    ],
  },
  {
    label: "Legal",
    items: [
      { name: "Privacy", to: "/privacy" },
      { name: "Terms", to: "/terms" },
    ],
  },
];

function FlowerMark({ size = 38, color = "#2ED8A8" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden>
      <g transform="translate(50 50)">
        {[0, 45, 90, 135].map((r) => (
          <ellipse key={r} rx="18" ry="32" fill={color} transform={`rotate(${r})`} />
        ))}
      </g>
    </svg>
  );
}

export function SparseFooter() {
  const [year] = useState(() => new Date().getFullYear());
  const [clock, setClock] = useState(() => formatClock(new Date()));
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const id = setInterval(() => setClock(formatClock(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    setMessage(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "footer-primer" }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.success) {
        setMessage({ type: "success", text: "Welcome. Check your inbox." });
        setEmail("");
      } else {
        setMessage({ type: "error", text: data?.error || "Try again." });
      }
    } catch {
      setMessage({ type: "error", text: "Network issue. Try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-[#1A1714] text-[#F7F4F0] overflow-hidden">
      {/* Top hairline accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2ED8A8]/50 to-transparent" aria-hidden />

      <div className="px-6 md:px-14 pt-24 pb-12 max-w-7xl">
        {/* Big italic wordmark band */}
        <div className="border-b border-[#F7F4F0]/10 pb-16 mb-16">
          <div className="flex items-baseline justify-between mb-8 gap-4">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#F7F4F0]/40">
              Zential Pure  ·  Rotterdam
            </p>
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#F7F4F0]/40 tabular-nums">
              {clock}  ·  CET
            </p>
          </div>

          <h2
            className="font-[Lora] italic leading-[0.9] text-[#F7F4F0]"
            style={{ fontSize: "clamp(3.5rem, 11vw, 11rem)" }}
          >
            Clinic precision,
            <br />
            <span className="text-[#2ED8A8]">daily ritual.</span>
          </h2>

          <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3 font-mono text-[10px] tracking-[0.22em] uppercase text-[#F7F4F0]/40">
            <span>Edition ( {year} )</span>
            <span>·</span>
            <span>EMS  ·  Microcurrent  ·  Thermal</span>
            <span>·</span>
            <span>Free EU shipping</span>
          </div>
        </div>

        {/* Sitemap grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {sections.map((s) => (
            <div key={s.label}>
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#F7F4F0]/40 mb-5">
                {s.label}
              </p>
              <ul className="space-y-3">
                {s.items.map((it) => (
                  <li key={it.to}>
                    <Link
                      to={it.to}
                      className="text-sm text-[#F7F4F0]/75 hover:text-[#2ED8A8] transition-colors"
                    >
                      {it.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter band */}
        <div className="border-t border-[#F7F4F0]/10 pt-10 mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-md">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#F7F4F0]/40 mb-4">
              Primer
            </p>
            <p className="font-[Lora] italic text-2xl md:text-3xl text-[#F7F4F0] leading-tight">
              The ten-minute Face Protocol,
              <br />
              by email.
            </p>
          </div>
          <div className="w-full md:w-auto md:min-w-[400px]">
            <form className="flex gap-3" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@email.com"
                disabled={submitting}
                className="flex-1 bg-transparent border border-[#F7F4F0]/20 px-4 py-3 text-sm text-[#F7F4F0] placeholder:text-[#F7F4F0]/30 focus:border-[#2ED8A8] focus:outline-none transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 bg-[#F7F4F0] text-[#1A1714] text-xs tracking-[0.16em] uppercase hover:bg-[#2ED8A8] transition-colors disabled:opacity-50 disabled:hover:bg-[#F7F4F0]"
              >
                {submitting ? "Sending…" : "Subscribe"}
              </button>
            </form>
            {message && (
              <p
                className={`mt-3 font-mono text-[10px] tracking-[0.16em] uppercase ${
                  message.type === "success"
                    ? "text-[#2ED8A8]"
                    : "text-[#e87040]"
                }`}
              >
                {message.text}
              </p>
            )}
          </div>
        </div>

        {/* Bottom credit row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-10 border-t border-[#F7F4F0]/10">
          <div className="flex items-center gap-4">
            <FlowerMark />
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#F7F4F0]/40">
              Edition {year}  ·  zentialpure.com
            </p>
          </div>
          {/* Profile links. rel="me" is the machine-readable half of the same
              claim the Organization JSON-LD makes with sameAs — both are needed
              for search and AI answer engines to bind these accounts to the
              brand entity rather than treat them as unrelated pages. */}
          <ul className="flex items-center gap-1 order-first md:order-none">
            {SOCIALS.map((s) => (
              <li key={s.platform}>
                <a
                  href={s.href}
                  rel="me noopener noreferrer"
                  target="_blank"
                  aria-label={`Zential Pure on ${s.label} — ${s.handle}`}
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-[#F7F4F0]/40 hover:text-[#2ED8A8] transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          {/* No geographic provenance claim. LIVE-CATALOG-TRUTH.md:146-148:
              "Never state a Rotterdam origin in copy" — the origin claim was
              falsified 2026-07-14. The instruments are supplier SKUs shipped
              from China and a US warehouse; nothing is designed, specified or
              calibrated in Rotterdam. Rotterdam belongs only to the registered
              company line below, which is a company fact, not a product one. */}
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#F7F4F0]/30 text-right">
            Shipped EU-wide.
          </p>
        </div>

        {/* Legal identity, read live from the Handelsregister 2026-08-01:
            handelsnaam Zential Pure, KvK 96597569, vestigingsnummer 000061913421,
            3e Westewagenhof 78, 3011 AR Rotterdam.

            NO "B.V." — the rechtsvorm is an EENMANSZAAK. This line said
            "Zential Pure B.V." from 2026-08-01 until the register was actually
            read the same day; the name had been taken from the engine repo's
            docs rather than from the register, and four other surfaces repeated
            it, one of them inviting customers to look us up. Do not reintroduce
            it. Guarded by src/test/entitySchema.test.ts.

            Still pending and deliberately NOT placeholdered: the VAT number.
            Mirrored in public/entity.html's Organization schema — change both. */}
        <p className="mt-6 font-mono text-[10px] tracking-[0.18em] uppercase text-[#F7F4F0]/30">
          Zential Pure  ·  3e Westewagenhof 78, 3011 AR Rotterdam, the Netherlands  ·  KvK 96597569  ·{" "}
          <a href="mailto:info@zentialpure.com" className="hover:text-[#2ED8A8] transition-colors normal-case tracking-normal">
            info@zentialpure.com
          </a>
        </p>
      </div>

      {/* Zen easter egg: peeks up from the bottom edge, clipped by the footer's overflow-hidden */}
      <div aria-hidden className="absolute bottom-0 right-8 translate-y-[35%] pointer-events-none hidden md:block">
        <ZenMascot size={64} />
      </div>
    </footer>
  );
}

function formatClock(d: Date) {
  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Europe/Amsterdam",
  });
}
