import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ZenMascot } from "@/components/zential/ZenMascot";
import { BrandLockup } from "@/components/zential/BrandLockup";
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
      { name: "Warranty", to: "/warranty" },
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
    <footer className="relative border-t border-[rgba(20,20,20,0.10)] bg-white text-[#141414] overflow-hidden">
      {/* Top hairline accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2ED8A8]/60 to-transparent" aria-hidden />

      <div className="px-6 md:px-14 pt-24 pb-12 max-w-7xl">
        {/* Big italic wordmark band */}
        <div className="border-b border-[rgba(20,20,20,0.10)] pb-16 mb-16">
          <div className="flex items-baseline justify-between mb-8 gap-4">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#141414]/45">
              Zential Pure  ·  Rotterdam
            </p>
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#141414]/45 tabular-nums">
              {clock}  ·  CET
            </p>
          </div>

          <h2
            className="font-sans font-light leading-[0.94] tracking-[-0.03em] text-[#141414]"
            style={{ fontSize: "clamp(3.5rem, 11vw, 11rem)" }}
          >
            Clinic precision,
            <br />
            <span className="text-[#0E7A54]">daily ritual.</span>
          </h2>

          <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3 font-mono text-[10px] tracking-[0.22em] uppercase text-[#141414]/45">
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
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#141414]/45 mb-5">
                {s.label}
              </p>
              <ul className="space-y-3">
                {s.items.map((it) => (
                  <li key={it.to}>
                    <Link
                      to={it.to}
                      className="text-sm text-[#141414]/75 hover:text-[#0E7A54] transition-colors"
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
        <div className="border-t border-[rgba(20,20,20,0.10)] pt-10 mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-md">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#141414]/45 mb-4">
              Primer
            </p>
            <p className="font-sans font-light text-2xl md:text-3xl tracking-[-0.02em] text-[#141414] leading-tight">
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
                className="flex-1 bg-transparent border border-[rgba(20,20,20,0.22)] px-4 py-3 text-sm text-[#141414] placeholder:text-[#141414]/35 focus:border-[#0E7A54] focus:outline-none transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 bg-[#141414] text-white text-xs tracking-[0.16em] uppercase hover:bg-[#0E7A54] transition-colors disabled:opacity-50 disabled:hover:bg-[#141414]"
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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-10 border-t border-[rgba(20,20,20,0.10)]">
          <div className="flex items-center gap-4">
            <BrandLockup size={16} />
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#141414]/45">
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
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-[#141414]/45 hover:text-[#0E7A54] transition-colors"
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
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#141414]/35 text-right">
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

            The trader's name is here on the operator's instruction 2026-08-01, reversing
            the 2026-07-11 brand-only decision: Art. 3:15d BW expects a sole proprietorship
            to name the natural person behind the trade name. Initials form, as registered
            with the Belastingdienst. BTW NL004192654B60 is the btw-identificatienummer
            (VIES-confirmed valid 2026-08-01) — never publish the BSN-derived
            omzetbelastingnummer, and never the VAT registration's own address, which
            is in a different town and looks private.

            Mirrored in public/entity.html's Organization schema — change both. */}
        <p className="mt-6 font-mono text-[10px] tracking-[0.18em] uppercase text-[#141414]/35">
          Zential Pure  ·  M.G. Young-On  ·  3e Westewagenhof 78, 3011 AR Rotterdam, the Netherlands  ·  KvK 96597569  ·  BTW NL004192654B60  ·{" "}
          <a href="mailto:info@zentialpure.com" className="hover:text-[#0E7A54] transition-colors normal-case tracking-normal">
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
