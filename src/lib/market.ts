// Market + currency localization helpers.
//
// The storefront serves EUR to its home market (NL) and USD to the US market
// (Shopify Dynamic FX). getCountry() resolves which market the current visitor
// belongs to so Shopify @inContext queries and the checkout buyerIdentity can
// hand back the right currency.

const DEFAULT_COUNTRY = 'NL';
const SESSION_KEY = 'zp_country';

let countryPromise: Promise<string> | null = null;

function normalize(code: unknown): string {
  return typeof code === 'string' && /^[A-Za-z]{2}$/.test(code)
    ? code.toUpperCase()
    : '';
}

function overrideFromUrl(): string {
  if (typeof window === 'undefined') return '';
  try {
    return normalize(new URLSearchParams(window.location.search).get('country'));
  } catch {
    return '';
  }
}

function readSession(): string {
  if (typeof window === 'undefined') return '';
  try {
    return normalize(window.sessionStorage.getItem(SESSION_KEY));
  } catch {
    return '';
  }
}

function writeSession(country: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(SESSION_KEY, country);
  } catch {
    /* sessionStorage unavailable (private mode / SSR) — ignore */
  }
}

/**
 * Resolve the visitor's country (ISO 3166-1 alpha-2, uppercase).
 * Precedence: ?country=XX override → sessionStorage cache → /api/geo → "NL".
 * Memoized module-level so we hit /api/geo at most once per page load, except
 * an explicit ?country override always wins (for testing markets).
 */
export function getCountry(): Promise<string> {
  const override = overrideFromUrl();
  if (override) {
    writeSession(override);
    countryPromise = Promise.resolve(override);
    return countryPromise;
  }

  if (countryPromise) return countryPromise;

  const cached = readSession();
  if (cached) {
    countryPromise = Promise.resolve(cached);
    return countryPromise;
  }

  countryPromise = (async () => {
    try {
      const res = await fetch('/api/geo');
      if (!res.ok) throw new Error(`geo ${res.status}`);
      const data = await res.json();
      const country = normalize(data?.country) || DEFAULT_COUNTRY;
      writeSession(country);
      return country;
    } catch {
      return DEFAULT_COUNTRY;
    }
  })();

  return countryPromise;
}

/** Format a Shopify money amount using the currency's own locale conventions. */
export function formatMoney(amount: string | number, currencyCode: string): string {
  const value = typeof amount === 'string' ? parseFloat(amount) : amount;
  const safeValue = Number.isFinite(value) ? value : 0;
  const currency = (currencyCode || 'EUR').toUpperCase();
  // Whole amounts render as "€88"; amounts with cents keep 2 decimals ("€220.50").
  const fractionDigits = Number.isInteger(safeValue) ? 0 : 2;
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(safeValue);
  } catch {
    // Unknown currency code — fall back to a plain amount with the code appended.
    return `${safeValue.toFixed(2)} ${currency}`;
  }
}

/** Test-only: clear the memoized country resolution. */
export function _resetCountryCache(): void {
  countryPromise = null;
}
