# Quiz Email Flow

Documents the end-to-end path from quiz submission to welcome email.

---

## Environment variable required

| Name | Where to set |
|------|-------------|
| `SHOPIFY_ADMIN_TOKEN` | Vercel Project Settings → Environment Variables → Production (and Preview if preview deployments should also subscribe customers) |

The function returns HTTP 500 and no customer is created if this variable is missing.

---

## Admin API scopes required

In Shopify Admin → Apps → Develop apps → your custom app → API credentials, the access token must have:

- `write_customers` — to create and update customers
- `read_customers` — to look up an existing customer when a duplicate email is detected

---

## What `api/newsletter.ts` does (and does not do)

The function:
1. Validates the email format server-side.
2. Attempts to `POST /admin/api/2024-01/customers.json` to create a new customer with `email_marketing_consent: subscribed`, tag `newsletter`, and a source tag (e.g. `source-skin-ritual-quiz`).
3. If Shopify returns 422 "email has already been taken", it fetches the existing customer by email, merges the tags, and updates their marketing consent via `PUT`. This is treated as success — the caller receives `{ success: true, note: "already_subscribed" }`.
4. Logs all key events (incoming email, Shopify status codes, error bodies) to stdout, which appear in Vercel function logs.

**The function does NOT send any email.** That is entirely Shopify's responsibility via Marketing Automations.

---

## Configuring the welcome email in Shopify

Go to: **Shopify Admin → Marketing → Automations**

Create (or confirm there is) an active automation with one of these triggers:

- **"Customer subscribes to email marketing"** — fires when a customer is created with `email_marketing_consent.state = subscribed`. This is the preferred trigger.
- **"Customer tag added: newsletter"** — fires when the `newsletter` tag is applied. Use this as a fallback if the consent trigger does not work with your Shopify plan.

Without an active automation, customers are silently added to Shopify and never receive anything.

---

## How to test end-to-end

1. **Deploy** to a Vercel preview branch (or production).
2. **Submit the quiz** with a fresh email address you can check (use an address not already in Shopify).
3. **Vercel function logs**: Vercel Dashboard → your project → Functions → `api/newsletter` → Logs. You should see:
   - `[newsletter] signup — email: …, source: skin-ritual-quiz`
   - `[newsletter] Shopify POST /customers → 201`
   - `[newsletter] customer created: …`
4. **Shopify Admin → Customers**: the new customer should appear with:
   - Email marketing: **Subscribed**
   - Tags: `newsletter`, `source-skin-ritual-quiz`
5. **Shopify Admin → Marketing → Automations**: confirm the automation triggered (check the automation's activity log or the customer's timeline).
6. **Check your inbox** for the welcome email (may take a few minutes).

### Testing the duplicate-email path

Submit the quiz a second time with the same email. In the function logs you should see:
- `[newsletter] already exists — updating: …`
- `[newsletter] Shopify PUT /customers/{id} → 200`

And the response to the client is still `{ success: true }`, so the quiz result page shows the success toast.
