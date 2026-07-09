import { useState } from "react";

interface HubNewsletterFormProps {
  /** Posted as `sunday-protocol-<slug>` — matches EditorialNewsletter's source scheme. */
  slug: string;
  buttonLabel: string;
  /** Brand-voice confirmation line shown after a successful subscribe. */
  confirmation: string;
}

/**
 * Newsletter form for the hub pages. Same /api/newsletter contract as
 * EditorialNewsletter; markup is bare (form + confirmation) so each page
 * can frame it per its design. Tangerine button = the view's single action.
 */
export function HubNewsletterForm({ slug, buttonLabel, confirmation }: HubNewsletterFormProps) {
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

  if (state === "done") {
    return (
      <p role="status" className="hub-nl__confirm">
        {confirmation}
      </p>
    );
  }

  return (
    <>
      <form
        className="hub-nl__form"
        aria-label="Newsletter"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <input
          className="hub-nl__input"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
        />
        <button className="hub-btn hub-btn--action" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "One moment…" : buttonLabel}
        </button>
      </form>
      {state === "error" && (
        <p role="alert" className="hub-nl__error">
          That didn't go through. Try once more.
        </p>
      )}
    </>
  );
}
