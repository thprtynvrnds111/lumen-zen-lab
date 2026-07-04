import { useEffect, useRef, useState } from "react";

/**
 * Lead capture for the instrument PDPs. Surfaces the "10-minute Face Protocol
 * by email" primer beyond the footer — inline mid-page and as a one-time
 * exit-intent prompt — to catch the ~97% who leave without ordering.
 * Both post to the same /api/newsletter endpoint the footer uses.
 */

type Status = "idle" | "sending" | "done" | "error";

const SUBSCRIBED_KEY = "zp-subscribed";
const DISMISSED_AT_KEY = "zp-primer-dismissed-at";
const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // a week of quiet after a dismissal

/** True once this browser has subscribed — used to suppress re-nagging. */
function alreadySubscribed(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(SUBSCRIBED_KEY) === "1";
}

/** True while a past dismissal is still cooling down. */
function recentlyDismissed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const at = Number(window.localStorage.getItem(DISMISSED_AT_KEY));
    return Number.isFinite(at) && at > 0 && Date.now() - at < DISMISS_COOLDOWN_MS;
  } catch {
    return false;
  }
}

function rememberDismissal(): void {
  try {
    window.localStorage.setItem(DISMISSED_AT_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}

/** Paid visits get the reveal ritual instead — the primer stays out of their way. */
function isAdVisit(): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return params.has("fbclid") || params.has("utm_source") || params.has("utm_campaign");
}

function useNewsletter(source: string) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source }),
      });
      if (res.ok && typeof window !== "undefined") {
        window.localStorage.setItem(SUBSCRIBED_KEY, "1");
      }
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return { email, setEmail, status, submit };
}

/** Inline primer block — drop into the body of a long PDP. */
export function InlinePrimer({ slug }: { slug?: string }) {
  const { email, setEmail, status, submit } = useNewsletter(slug ? `pdp-${slug}` : "pdp-inline");

  return (
    <section className="bg-[#070A0E] py-[clamp(64px,8vw,96px)] text-[#F7F4F0]">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="grid items-center gap-8 rounded-[16px] border border-[rgba(247,244,240,0.10)] bg-[#1A1714] p-[clamp(28px,4vw,52px)] md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#2ED8A8]">Not ordering today?</div>
            <h2 className="mt-4 font-serif italic font-normal text-[clamp(26px,3.2vw,38px)] leading-[1.1] text-[#F7F4F0]">
              Take the 10-minute Face Protocol by email.
            </h2>
            <p className="mt-3 max-w-[44ch] text-[15px] leading-[1.7] text-[#F7F4F0]/[0.62]">
              The same sequence the instruments are built around — yours to read first. No spam, leave whenever.
            </p>
          </div>
          <div>
            {status === "done" ? (
              <p className="font-serif italic text-[20px] text-[#2ED8A8]">Sent. Check your inbox.</p>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="flex-1 rounded-full border border-[rgba(247,244,240,0.16)] bg-[#070A0E] px-5 py-3.5 font-sans text-[14px] text-[#F7F4F0] placeholder:text-[#F7F4F0]/40 focus:border-[#2ED8A8] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-full bg-[#2ED8A8] px-7 py-3.5 font-sans text-[13px] font-medium tracking-[0.04em] text-[#070A0E] transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send it to me"}
                </button>
              </form>
            )}
            {status === "error" && (
              <p className="mt-2 font-sans text-[12px] text-[#E89B7A]">Something went wrong. Try again.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * One-time capture prompt. Desktop: fires on cursor leaving the viewport top
 * (exit intent). Touch/small screens: exit intent is unreliable, so it fires
 * on a scroll-depth + dwell-time trigger instead. Once per session; suppressed
 * for subscribers, for a week after any dismissal, and (optionally) for
 * ad-tagged visits — those get the reveal ritual instead.
 */
export function ExitIntentPrimer({
  slug,
  source,
  organicOnly = false,
}: {
  slug?: string;
  source?: string;
  organicOnly?: boolean;
}) {
  const { email, setEmail, status, submit } = useNewsletter(
    source ?? (slug ? `pdp-exit-${slug}` : "pdp-exit-intent")
  );
  const [open, setOpen] = useState(false);
  const fired = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (alreadySubscribed()) return;
    if (recentlyDismissed()) return;
    if (organicOnly && isAdVisit()) return;
    if (window.sessionStorage.getItem("zp-exit-primer") === "1") return;

    function trigger() {
      if (fired.current) return;
      fired.current = true;
      window.sessionStorage.setItem("zp-exit-primer", "1");
      setOpen(true);
      cleanup();
    }

    function onLeave(e: MouseEvent) {
      if (e.clientY <= 0) trigger();
    }

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    let scrollHandler: (() => void) | null = null;
    let dwellOk = false;

    function onScroll() {
      const scrolled = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (dwellOk && scrolled > 0.55) trigger();
    }

    function cleanup() {
      document.removeEventListener("mouseout", onLeave);
      if (scrollHandler) window.removeEventListener("scroll", scrollHandler);
    }

    // give the visitor a moment before arming
    const arm = window.setTimeout(() => {
      if (isTouch) {
        dwellOk = true;
        scrollHandler = onScroll;
        window.addEventListener("scroll", scrollHandler, { passive: true });
      } else {
        document.addEventListener("mouseout", onLeave);
      }
    }, isTouch ? 20000 : 6000);

    return () => {
      window.clearTimeout(arm);
      cleanup();
    };
  }, [organicOnly]);

  // scroll lock + escape while open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function dismiss() {
    setOpen(false);
    // a completed signup is not a dismissal — no cooldown in that case
    if (status !== "done") rememberDismissal();
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(7,10,14,0.72)] px-5 backdrop-blur-sm"
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-label="The 10-minute Face Protocol by email"
    >
      <style>{`
        @keyframes zp-primer-in {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .zp-primer-card { animation: none !important; }
        }
      `}</style>
      <div
        className="zp-primer-card relative w-[min(460px,92vw)] rounded-[16px] border border-[rgba(198,160,124,0.35)] bg-[#1A1714] p-[clamp(28px,5vw,40px)] text-[#F7F4F0]"
        style={{ animation: "zp-primer-in 450ms cubic-bezier(0,0,.2,1) both" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center text-[#F7F4F0]/50 transition-colors hover:text-[#F7F4F0]"
        >
          ✕
        </button>
        <div className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#2ED8A8]">Before you go</div>
        <h2 className="mt-4 font-serif italic font-normal text-[clamp(24px,4vw,32px)] leading-[1.1]">
          Keep the 10-minute Face Protocol.
        </h2>
        <p className="mt-3 text-[14px] leading-[1.7] text-[#F7F4F0]/[0.62]">
          The sequence the instruments are built around, by email. Read it first, decide later.
        </p>
        {status === "done" ? (
          <p className="mt-6 font-serif italic text-[20px] text-[#2ED8A8]">Sent. Check your inbox.</p>
        ) : (
          <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
            <input
              type="email"
              name="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
              className="rounded-full border border-[rgba(247,244,240,0.16)] bg-[#070A0E] px-5 py-3.5 font-sans text-[16px] text-[#F7F4F0] placeholder:text-[#F7F4F0]/40 focus:border-[#2ED8A8] focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-full bg-[#2ED8A8] px-7 py-3.5 font-sans text-[13px] font-medium tracking-[0.04em] text-[#070A0E] transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send me the protocol"}
            </button>
            <p className="text-center font-sans text-[11px] leading-[1.6] text-[#F7F4F0]/40">
              You agree to receive emails from Zential Pure. Unsubscribe anytime.
            </p>
          </form>
        )}
        {status === "error" && (
          <p className="mt-2 font-sans text-[12px] text-[#E89B7A]">Something went wrong. Try again.</p>
        )}
      </div>
    </div>
  );
}
