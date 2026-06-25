/**
 * Trust / compliance strip for the instrument spec block.
 *
 * Only displays certifications the brand actually holds. CE marking is shown
 * for all instruments (EU electrical devices, Declaration of Conformity on
 * file). Add further certifications via the `certifications` slot only once
 * documentation exists — never display an unheld mark.
 */

interface Badge {
  label: string;
  sub?: string;
  icon: "ce" | "shield" | "truck" | "plug";
}

function Icon({ kind }: { kind: Badge["icon"] }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "#157A5C", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (kind === "ce") {
    return (
      <span className="grid h-[22px] min-w-[30px] place-items-center rounded-[3px] border border-[#157A5C]/45 px-1 font-serif text-[12px] not-italic tracking-[0.04em] text-[#157A5C]">CE</span>
    );
  }
  if (kind === "shield") {
    return (
      <svg {...common}><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></svg>
    );
  }
  if (kind === "truck") {
    return (
      <svg {...common}><path d="M3 7h11v8H3z" /><path d="M14 10h4l3 3v2h-7z" /><circle cx="7" cy="17" r="1.6" /><circle cx="17.5" cy="17" r="1.6" /></svg>
    );
  }
  return (
    <svg {...common}><path d="M9 2v6" /><path d="M15 2v6" /><path d="M7 8h10v3a5 5 0 01-10 0z" /><path d="M12 16v6" /></svg>
  );
}

export interface TrustBadgesProps {
  /** Cordless / USB-C device (Mat is mains-powered, so omit there). */
  cordless?: boolean;
  /** Extra held certifications, e.g. ["RoHS", "FCC"]. Only add what's real. */
  certifications?: string[];
}

export function TrustBadges({ cordless = false, certifications = [] }: TrustBadgesProps) {
  const badges: Badge[] = [
    { label: "CE marked", sub: "Declaration of Conformity on file", icon: "ce" },
    { label: "2-year warranty", icon: "shield" },
    { label: "EU shipping", sub: "in 48 hours", icon: "truck" },
    ...(cordless ? [{ label: "Cordless · USB-C", icon: "plug" as const }] : []),
    ...certifications.map((c) => ({ label: c, icon: "shield" as const })),
  ];

  return (
    <ul className="mt-7 grid grid-cols-1 gap-x-6 gap-y-4 border-t border-[rgba(26,23,20,0.12)] pt-7 sm:grid-cols-2">
      {badges.map((b) => (
        <li key={b.label} className="flex items-center gap-3">
          <Icon kind={b.icon} />
          <span className="font-sans text-[12px] leading-[1.4] text-[#1A1714]/75">
            <b className="font-medium text-[#1A1714]">{b.label}</b>
            {b.sub && <span className="text-[#1A1714]/55"> · {b.sub}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}
