import { useState } from "react";

interface EditorialNewsletterProps {
  slug: string;
  heading?: string;
  copy: string;
  /** light = cream section w/ outline button · dark = ink section w/ brand button */
  variant?: "light" | "dark";
}

export function EditorialNewsletter({
  slug,
  heading = "The Sunday Protocol",
  copy,
  variant = "light",
}: EditorialNewsletterProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit() {
    if (!email.includes("@") || state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: `sunday-protocol-${slug}` }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  const dark = variant === "dark";
  return (
    <section
      className="ed-sec ed-newsletter"
      style={{
        background: dark ? "var(--ed-dark)" : "var(--ed-bg)",
        padding: "40px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        borderBottom: dark ? "none" : "1px solid var(--ed-line)",
      }}
    >
      <span className={dark ? "eyebrow eyebrow--teal" : "eyebrow"}>{heading}</span>
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: dark ? "var(--ed-on-dark-dim)" : "var(--ed-grey)",
          margin: 0,
        }}
      >
        {copy}
      </p>
      {state === "done" ? (
        <p role="status" style={{ fontSize: "14px", color: dark ? "var(--ed-teal)" : "var(--ed-teal-deep)", margin: 0 }}>
          Confirmed. The next letter arrives Sunday.
        </p>
      ) : (
        <>
          <form
            className="ed-nl-row"
            aria-label={heading}
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <input
              className="input"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <button
              className={dark ? "btn btn--brand" : "btn btn--outline"}
              type="submit"
              disabled={state === "sending"}
            >
              {state === "sending" ? "One moment…" : "Subscribe"}
            </button>
          </form>
          {state === "error" && (
            <p role="alert" style={{ fontSize: "13px", color: dark ? "var(--ed-on-dark-dim)" : "var(--ed-grey-warm)", margin: 0 }}>
              That didn't go through. Try once more.
            </p>
          )}
        </>
      )}
    </section>
  );
}
