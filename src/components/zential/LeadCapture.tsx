import { useEffect, useRef, useState } from "react";

/**
 * Lead capture for the instrument PDPs. Surfaces the "ten-minute Face Protocol
 * by email" primer beyond the footer — inline mid-page and as a one-time
 * exit-intent prompt — to catch the ~97% who leave without ordering.
 * Both post to the same /api/newsletter endpoint the footer uses.
 */

type Status = "idle" | "sending" | "done" | "error";

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
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return { email, setEmail, status, submit };
}

/** Inline primer block — drop into the body of a long PDP. */
export function InlinePrimer() {
  const { email, setEmail, status, submit } = useNewsletter("pdp-inline");

  return (
    <section className="bg-[#070A0E] py-[clamp(64px,8vw,96px)] text-[#F7F4F0]">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="grid items-center gap-8 rounded-[16px] border border-[rgba(247,244,240,0.10)] bg-[#1A1714] p-[clamp(28px,4vw,52px)] md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#2ED8A8]">Not ordering today?</div>
            <h2 className="mt-4 font-serif italic font-normal text-[clamp(26px,3.2vw,38px)] leading-[1.1] text-[#F7F4F0]">
              Take the ten-minute Face Protocol by email.
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

/** One-time exit-intent prompt. Fires on cursor leaving the viewport top. */
export function ExitIntentPrimer() {
  const { email, setEmail, status, submit } = useNewsletter("pdp-exit-intent");
  const [open, setOpen] = useState(false);
  const fired = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem("zp-exit-primer") === "1") return;

    function onLeave(e: MouseEvent) {
      if (fired.current || e.clientY > 0) return;
      fired.current = true;
      window.sessionStorage.setItem("zp-exit-primer", "1");
      setOpen(true);
    }

    // give the visitor a moment before arming
    const t = window.setTimeout(() => document.addEventListener("mouseout", onLeave), 6000);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(7,10,14,0.72)] px-5 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-[min(460px,92vw)] rounded-[16px] border border-[rgba(247,244,240,0.10)] bg-[#1A1714] p-[clamp(28px,5vw,40px)] text-[#F7F4F0]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 text-[#F7F4F0]/50 transition-colors hover:text-[#F7F4F0]"
        >
          ✕
        </button>
        <div className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#2ED8A8]">Before you go</div>
        <h2 className="mt-4 font-serif italic font-normal text-[clamp(24px,4vw,32px)] leading-[1.1]">
          Keep the ten-minute Face Protocol.
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
              className="rounded-full border border-[rgba(247,244,240,0.16)] bg-[#070A0E] px-5 py-3.5 font-sans text-[14px] text-[#F7F4F0] placeholder:text-[#F7F4F0]/40 focus:border-[#2ED8A8] focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-full bg-[#2ED8A8] px-7 py-3.5 font-sans text-[13px] font-medium tracking-[0.04em] text-[#070A0E] transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send me the protocol"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-2 font-sans text-[12px] text-[#E89B7A]">Something went wrong. Try again.</p>
        )}
      </div>
    </div>
  );
}
