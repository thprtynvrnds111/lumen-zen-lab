import { useState, useEffect } from "react";
import { PageShell } from "@/components/zential/v2/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createFoundingCustomer, createShopifyCart } from "@/lib/shopify";
import { trackMovementJoin, trackDepositIntent } from "@/lib/movement-tracking";
import { FoundingWall } from "@/components/movement/FoundingWall";
import { captureRef, getRef } from "@/lib/movement-practice";
import edThreshold from "@/assets/editorial/threshold.webp";
import edSeatedCalm from "@/assets/editorial/seated-calm.webp";

/**
 * /movement — "Reclaim your own frequency". Dark editorial design ported from the
 * Claude Design movement/index.html (flower-breathe motif, grain, scanline, mech
 * cards, the-line band, founding offer). Real wiring preserved from the prior
 * build: JoinForm = Storefront customerCreate email capture; handleDeposit =
 * real founding checkout (createShopifyCart); FoundingWall = live count.
 */
const FOUNDING_DEPOSIT_VARIANT_ID = "gid://shopify/ProductVariant/53812317454679";

const WRAP = "mx-auto max-w-[1180px] px-6 md:px-10";
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const FLOWER = (
  <svg viewBox="0 0 100 100" className="h-full w-full">
    <g fill="currentColor">
      <circle cx="77" cy="50" r="20" /><circle cx="69.1" cy="69.1" r="20" /><circle cx="50" cy="77" r="20" />
      <circle cx="30.9" cy="69.1" r="20" /><circle cx="23" cy="50" r="20" /><circle cx="30.9" cy="30.9" r="20" />
      <circle cx="50" cy="23" r="20" /><circle cx="69.1" cy="30.9" r="20" /><circle cx="50" cy="50" r="26" />
    </g>
  </svg>
);

function Eyebrow({ num, children, tone = "meta" }: { num?: string; children: React.ReactNode; tone?: "meta" | "dark" | "brand" | "gold" }) {
  const color = tone === "dark" ? "text-[#2ED8A8]" : tone === "brand" ? "text-[#157A5C]" : tone === "gold" ? "text-[#C6A07C]" : "text-[#6B5A4A]";
  return (
    <p className={`inline-flex items-center gap-3.5 font-sans text-[11px] tracking-[0.28em] uppercase ${color}`}>
      {num && <span className="tabular-nums opacity-55">{num}</span>}
      <span className="inline-block h-px w-[26px] bg-current opacity-40" />
      {children}
    </p>
  );
}

/** Owned email capture — Storefront customerCreate, marketing consent on. (real) */
function JoinForm({ source, cta = "Join the movement", placeholder = "you@domain.com" }: { source: string; cta?: string; placeholder?: string }) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    setMessage(null);
    const addr = email.trim();
    try {
      const result = await createFoundingCustomer(addr);
      if (result.success || result.error === "already_exists") {
        setMessage({ type: "success", text: "You are in. Your reset is ready." });
        setEmail("");
        trackMovementJoin(addr, source);
      } else {
        setMessage({ type: "error", text: "Something went wrong. Please try again." });
      }
    } catch {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <Input type="email" placeholder={placeholder} value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-full border-white/15 bg-white/5 px-5 text-[#F7F4F0] placeholder:text-white/40" aria-label="Email address" required />
        <Button variant="ritual" size="lg" type="submit" disabled={submitting} className="shrink-0">{submitting ? "Sending" : cta}</Button>
      </form>
      {message && <p className={`mt-3 text-sm ${message.type === "success" ? "text-[#2ED8A8]" : "text-[#B4472A]"}`}>{message.text}</p>}
      {message?.type === "success" && <a href="/reset" className="cta-pill mt-4">Open the 6-Minute Reset</a>}
      <p className="mt-3 text-xs text-white/40">One reset, one truth per week. No noise. Leave anytime.</p>
    </div>
  );
}

const TruthMovement = () => {
  const [depositMsg, setDepositMsg] = useState<string | null>(null);
  const [depositLoading, setDepositLoading] = useState(false);

  useEffect(() => { captureRef(); }, []);

  const handleDeposit = async () => {
    trackDepositIntent();
    if (!FOUNDING_DEPOSIT_VARIANT_ID) {
      document.getElementById("reset")?.scrollIntoView({ behavior: "smooth" });
      setDepositMsg("The Founding Circle opens shortly. Join below and you go first in line.");
      return;
    }
    setDepositLoading(true);
    setDepositMsg(null);
    try {
      const ref = getRef();
      const attrs = [{ key: "movement_source", value: "truth-movement" }];
      if (ref) attrs.push({ key: "referred_by", value: ref });
      const cart = await createShopifyCart(FOUNDING_DEPOSIT_VARIANT_ID, 1, attrs);
      if (cart?.checkoutUrl) window.location.href = cart.checkoutUrl;
      else setDepositMsg("Could not open checkout. Please try again.");
    } catch {
      setDepositMsg("Could not open checkout. Please try again.");
    } finally {
      setDepositLoading(false);
    }
  };

  const STACK: [string, string, string][] = [
    ["The 30-Day Nervous-System Reset", "Lands today. The full week-by-week guided programme, yours the moment you join.", "47"],
    ["The Daily Reset Library", "Lands today. Four resets for the day: morning, midday, pre-sleep, pre-training.", "29"],
    ["Your named place in the Founding 100", "Lands today. First in, building the movement from day one.", "—"],
    ["A seat in the first guided cohort", "When it runs. A live 30-day cohort with the founding hundred.", "90"],
    ["Founding price on the device", "Locked to your email, honoured when the device is your next step.", "save"],
    ["Lifetime founding membership rate", "Locked lower for good, if and when the membership opens.", "120"],
  ];

  return (
    <PageShell
      title="The Movement · Reclaim your own frequency | Zential Pure"
      description="Modern life keeps your system switched on. Sports, stress, skin are downstream. Join the people taking the controls back, six minutes at a time."
      canonical="https://zentialpure.com/movement"
      hideHero
    >
      <style>{`
        @keyframes mv-breathe{0%,100%{transform:scale(1);opacity:var(--bo,.05)}50%{transform:scale(1.06);opacity:calc(var(--bo,.05)*1.8)}}
        @keyframes mv-scan{0%{transform:translateY(0);opacity:0}5%{opacity:.9}92%{opacity:.5}100%{transform:translateY(660px);opacity:0}}
        @keyframes mv-pulse{0%{box-shadow:0 0 0 0 rgba(46,216,168,.45)}70%{box-shadow:0 0 0 10px rgba(46,216,168,0)}100%{box-shadow:0 0 0 0 rgba(46,216,168,0)}}
        .mv-breathe{animation:mv-breathe 12s ease-in-out infinite;transform-origin:center;will-change:transform,opacity}
        .mv-scan{animation:mv-scan 9s ease-in-out 2s infinite}
        .mv-dot{animation:mv-pulse 2.4s infinite}
        @media(prefers-reduced-motion:reduce){.mv-breathe,.mv-scan,.mv-dot{animation:none}}
      `}</style>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#1A1714] text-[#F7F4F0]">
        <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: GRAIN, backgroundSize: "170px 170px" }} aria-hidden />
        <div className="pointer-events-none absolute right-[28%] top-1/2 z-[1] aspect-square w-[min(40vw,440px)] -translate-y-1/2 text-[#2ED8A8]" aria-hidden>
          <div className="mv-breathe h-full w-full" style={{ ["--bo" as string]: 0.05 }}>{FLOWER}</div>
        </div>
        <div className={`relative z-[3] ${WRAP}`}>
          <div className="grid items-center md:grid-cols-[1.05fr_0.95fr] md:min-h-[660px]">
            <div className="py-12 md:py-[72px] md:pr-10">
              <Eyebrow num="( 01 )" tone="dark">Zential Pure · The Movement</Eyebrow>
              <h1 className="my-[26px] font-serif italic font-normal tracking-[-0.02em] leading-[1.02] text-[#F7F4F0] text-[clamp(46px,6vw,92px)]">
                Reclaim your<br />own <span className="text-[#2ED8A8]">frequency.</span>
              </h1>
              <p className="mb-[34px] max-w-[500px] text-[17px] leading-[1.75] text-[#F7F4F0]/[0.66]">
                You were not built for a world that never lets your system power down. The cost shows up everywhere. Your sleep. Your training. Your stress. Your skin. This is the place where we take the controls back.
              </p>
              <div className="mb-[34px] flex flex-wrap gap-3.5">
                <a href="#reset" className="cta-pill">Get the 6-Minute Reset</a>
                <a href="#diagnosis" className="ghost-pill">Read the manifesto</a>
              </div>
              <div className="inline-flex items-center gap-3.5 rounded-full border border-white/10 bg-[#2ED8A8]/5 px-[18px] py-[11px]">
                <span className="mv-dot h-[7px] w-[7px] rounded-full bg-[#2ED8A8]" />
                <span className="font-sans text-[11px] text-[#F7F4F0]/[0.78]">The <b className="font-semibold text-[#2ED8A8]">Founding 100</b> is open now</span>
              </div>
              <div className="mt-[30px] flex items-center gap-3.5 font-sans text-[10px] tracking-[0.3em] uppercase text-[#C6A07C]">
                <span>Issue 001</span><span className="h-px flex-1 bg-gradient-to-r from-[#C6A07C]/50 to-white/10" />
                <span>Resonance Series</span><span className="h-px flex-1 bg-gradient-to-r from-[#C6A07C]/50 to-white/10" />
                <span className="text-white/40">Edition 2026</span>
              </div>
            </div>
            <div className="relative order-first min-h-[42vh] overflow-hidden md:order-none md:min-h-[660px]">
              <img src={edThreshold} alt="Bare feet stepping across a sunlit threshold" className="absolute inset-0 h-full w-full object-cover [filter:saturate(0.9)_brightness(0.92)]" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,#1A1714_0%,transparent_22%),linear-gradient(180deg,transparent_50%,rgba(26,23,20,0.55)_100%)]" />
              <div className="absolute inset-x-0 top-0 mv-scan h-px bg-[linear-gradient(90deg,transparent,rgba(46,216,168,0.7),transparent)]" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 01 DIAGNOSIS ── */}
      <section id="diagnosis" className="bg-[#F7F4F0] py-[clamp(80px,11vw,128px)] text-[#1A1714]">
        <div className={WRAP}>
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <Eyebrow num="01">Diagnosis</Eyebrow>
              <h2 className="mb-7 mt-[18px] font-serif italic font-normal text-[clamp(32px,4.4vw,56px)] leading-[1.05] text-[#1A1714]">Notice your breath.<br />Right now.</h2>
              <div className="space-y-6 text-[17px] leading-[1.75] text-[#1A1714]/[0.66]">
                <p>Most people reading this are holding their breath. Shallow. Frozen. A body braced against a screen that never stops asking for more.</p>
                <p>Modern life is an interference engine. It keeps your nervous system switched on when it was built to switch off. You feel it before you can name it. The shallow breath at the desk. The sleep that does not restore. The training that stops working. The face that looks tired after a full night.</p>
              </div>
              <p className="mt-6 font-serif italic text-[21px] text-[#1A1714]">This is not who you are. It is what the noise does to you.</p>
            </div>
            <div className="order-first aspect-[16/10] overflow-hidden rounded-[14px] bg-white md:order-none md:aspect-[4/5]">
              <img src={edSeatedCalm} alt="A moment of stillness" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 REFRAME ── */}
      <section className="bg-[#EDEAE6] py-[clamp(80px,11vw,128px)] text-[#1A1714]">
        <div className={WRAP}>
          <Eyebrow num="02">Reframe</Eyebrow>
          <h2 className="my-5 max-w-[18ch] font-serif italic font-normal text-[clamp(32px,4.4vw,58px)] leading-[1.05] text-[#1A1714]">One nerve is a gadget. The whole system is a practice.</h2>
          <p className="max-w-[620px] text-[17px] leading-[1.75] text-[#1A1714]/[0.66]">The market sells you a single nerve, a single fix, a single mode. Regulation does not work that way. The body is one connected system. Calm the signal, then feed the tissue. That is the whole point.</p>
          <div className="mt-[54px] grid gap-px border border-[rgba(26,23,20,0.12)] bg-[rgba(26,23,20,0.12)] md:grid-cols-3">
            {[
              ["i", "Sports", "Recovery is a nervous-system event before it is a muscle event."],
              ["ii", "Stress", "A system that never down-regulates never fully repairs."],
              ["iii", "Skin", "The face keeps the score. Tension and cortisol show up there first."],
            ].map(([n, k, v]) => (
              <div key={k} className="flex min-h-[230px] flex-col justify-between bg-[#F7F4F0] px-[34px] py-10">
                <div className="font-sans text-[11px] tracking-[0.2em] text-[#6B5A4A]">{n}</div>
                <div>
                  <h3 className="mb-3.5 font-serif italic font-normal text-[30px] text-[#1A1714]">{k}</h3>
                  <p className="text-[14px] leading-[1.6] text-[#1A1714]/[0.62]">{v}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 SCIENCE ── */}
      <section className="relative overflow-hidden bg-[#070A0E] py-[clamp(80px,11vw,128px)] text-[#F7F4F0]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: GRAIN, backgroundSize: "170px 170px" }} aria-hidden />
        <div className={`relative ${WRAP}`}>
          <Eyebrow num="03" tone="dark">Science, made human</Eyebrow>
          <h2 className="my-5 font-serif italic font-normal text-[clamp(32px,4.4vw,58px)] text-[#F7F4F0]">Mechanism over marketing.</h2>
          <div className="mt-[54px] grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
            {[
              ["01 · Cortisol", "The long-term project", "Cortisol tells the body to stop investing in long-term projects. Collagen synthesis is a long-term project. Under chronic load the system reads it as not now."],
              ["02 · Microcurrent", "It mirrors the signal", "Microcurrent works because your face already runs on electricity. It does not override the signal. It mirrors it. That is why it works with the body over time, not against it."],
              ["03 · Red light", "A process they know", "Red light at 630 to 660 nanometres does not add anything to your cells. It supports a process they already know. The mitochondria respond. The renewal cycle that slowed starts moving again."],
            ].map(([num, h, p]) => (
              <div key={num} className="bg-[#070A0E] px-8 py-[38px]">
                <div className="mb-[22px] font-sans text-[11px] tracking-[0.2em] text-white/40">{num}</div>
                <h3 className="mb-3.5 font-serif italic font-normal text-[23px] text-[#2ED8A8]">{h}</h3>
                <p className="text-[14px] leading-[1.7] text-white/[0.66]">{p}</p>
              </div>
            ))}
          </div>
          <p className="mt-[34px] max-w-[620px] text-xs leading-[1.6] text-white/40">We name mechanisms, not outcomes. This is education, not medical advice, and not a promise of any specific result.</p>
        </div>
      </section>

      {/* ── 04 RITUAL ── */}
      <section className="bg-[#F7F4F0] py-[clamp(80px,11vw,128px)] text-[#1A1714]">
        <div className={`${WRAP} mx-auto max-w-[760px] text-center`}>
          <div className="flex justify-center"><Eyebrow num="04">Ritual</Eyebrow></div>
          <h2 className="my-5 font-serif italic font-normal text-[clamp(32px,4.4vw,58px)] leading-[1.05] text-[#1A1714]">Six minutes, before the world asks anything of you.</h2>
          <p className="mx-auto max-w-[620px] text-[17px] leading-[1.75] text-[#1A1714]/[0.66]">The most radical thing you can do right now is be unreachable for six minutes while you bring your own system back online. Before the emails. Before the noise. Six minutes that belong to no one but you.</p>
          <p className="mt-6 font-serif italic text-[24px] text-[#1A1714]">The ritual is the result.</p>
        </div>
      </section>

      {/* ── THE LINE ── */}
      <section className="relative overflow-hidden bg-[#1A1714] py-[clamp(96px,14vw,168px)] text-center">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: GRAIN, backgroundSize: "170px 170px" }} aria-hidden />
        <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(72vw,740px)] -translate-x-1/2 -translate-y-1/2 text-[#2ED8A8]" aria-hidden>
          <div className="mv-breathe h-full w-full" style={{ ["--bo" as string]: 0.055 }}>{FLOWER}</div>
        </div>
        <div className={`relative z-[2] ${WRAP}`}>
          <p className="mb-[30px] font-sans text-[11px] tracking-[0.3em] uppercase text-[#C6A07C]">The line we live by</p>
          <p className="font-serif italic font-normal text-[clamp(40px,7vw,104px)] leading-none text-[#F7F4F0]">The body remembers<br />its <span className="text-[#2ED8A8]">frequency.</span></p>
        </div>
      </section>

      {/* ── 05 RESET (real email capture) ── */}
      <section id="reset" className="bg-[#EDEAE6] py-[clamp(80px,11vw,128px)] text-[#1A1714]">
        <div className={WRAP}>
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <Eyebrow num="05" tone="brand">The Reset</Eyebrow>
              <h2 className="my-5 font-serif italic font-normal text-[clamp(32px,4.4vw,58px)] text-[#1A1714]">Get the 6-Minute Reset.</h2>
              <p className="max-w-[440px] text-[17px] leading-[1.75] text-[#1A1714]/[0.66]">A simple down-regulation practice you can run anywhere, plus one true finding each week on how your system actually works. This is the door into the movement.</p>
            </div>
            <div className="relative overflow-hidden rounded-[14px] border border-white/10 bg-[#1A1714] p-11">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_circle_at_80%_0%,rgba(46,216,168,0.12),transparent_65%)]" />
              <div className="relative z-[2]">
                <Eyebrow tone="dark">Free · Arrives instantly</Eyebrow>
                <h3 className="mb-6 mt-3.5 font-serif italic font-normal text-[30px] text-[#F7F4F0]">One reset. One truth per week.</h3>
                <JoinForm source="movement-reset" cta="Send me the reset" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06 FOUNDING 100 (real checkout) ── */}
      <section className="bg-[#1A1714] py-[clamp(80px,11vw,128px)] text-[#F7F4F0]">
        <div className={WRAP}>
          <Eyebrow num="06" tone="dark">Founding Circle</Eyebrow>
          <h2 className="my-5 font-serif italic font-normal text-[clamp(32px,4.4vw,58px)] text-[#F7F4F0]">First one hundred.</h2>
          <p className="max-w-[560px] text-[17px] leading-[1.75] text-[#F7F4F0]/[0.66]">One hundred people start this together. You get the whole system, a guided month, and a rate that never comes back. Not a token. A real head start.</p>
          <div className="mt-12 grid items-start gap-14 md:grid-cols-[1.15fr_0.85fr]">
            <ul className="list-none">
              {STACK.map(([title, body, val]) => (
                <li key={title} className="flex justify-between gap-5 border-b border-white/10 py-[18px] first:border-t first:border-white/10">
                  <div>
                    <div className="text-[15px] text-[#F7F4F0]">{title}</div>
                    <div className="mt-1.5 max-w-[380px] text-[13px] leading-[1.5] text-white/50">{body}</div>
                  </div>
                  <div className="whitespace-nowrap pt-0.5 font-sans text-[11px] tracking-[0.14em] uppercase text-[#C6A07C]">{val === "save" ? "founding price" : val === "—" ? "lands today" : `€${val} value`}</div>
                </li>
              ))}
            </ul>
            <aside className="rounded-[14px] bg-[#F7F4F0] p-10 text-[#1A1714] md:sticky md:top-[88px]">
              <p className="font-sans text-[11px] tracking-[0.16em] uppercase text-[#6B5A4A]">Over €285 in value</p>
              <p className="my-1.5 font-serif italic text-[64px] leading-none text-[#1A1714]">€29</p>
              <p className="mb-6 text-[13px] text-[#1A1714]/60">once · founding rate</p>
              <button type="button" onClick={handleDeposit} disabled={depositLoading} className="cta-pill mb-3 w-full justify-center">{depositLoading ? "Opening" : "Claim your founding place"}</button>
              <a href="#reset" className="ghost-pill w-full justify-center">Just send the reset first</a>
              <p className="mt-[18px] border-t border-[rgba(26,23,20,0.12)] pt-[18px] text-xs leading-[1.6] text-[#1A1714]/60">The 30-Day Reset Guarantee. Run it. If your system does not feel more your own, full refund and you keep the protocol. <a href="/founding-terms" className="underline hover:text-[#1A1714]">Founding terms</a>.</p>
              {depositMsg && <p className="mt-3 text-sm text-[#1A1714]/70">{depositMsg}</p>}
            </aside>
          </div>
        </div>
      </section>

      {/* ── FOUNDING WALL — live proof ── */}
      <FoundingWall />

      {/* ── CLOSING ── */}
      <section className="bg-[#F7F4F0] py-[clamp(80px,11vw,128px)] text-[#1A1714]">
        <div className={`${WRAP} mx-auto max-w-[760px] text-center`}>
          <div className="flex justify-center"><Eyebrow tone="gold">The standard</Eyebrow></div>
          <h2 className="mx-auto my-6 max-w-[14ch] font-serif italic font-normal text-[clamp(34px,5vw,68px)] leading-[1.1] text-[#1A1714]">You are allowed to take your morning seriously.</h2>
          <p className="mx-auto mb-9 max-w-[560px] text-[17px] leading-[1.75] text-[#1A1714]/[0.66]">To build something that is only for you. We are the people taking the controls back, six minutes at a time. Truth over hype. Mechanism over marketing.</p>
          <div className="flex justify-center [&_input]:border-[rgba(26,23,20,0.15)] [&_input]:bg-white [&_input]:text-[#1A1714] [&_input]:placeholder:text-[#1A1714]/40 [&_p]:text-[#1A1714]/50">
            <JoinForm source="movement-close" cta="Reclaim your frequency" />
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default TruthMovement;
