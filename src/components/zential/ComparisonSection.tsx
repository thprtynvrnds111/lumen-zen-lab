import { Check, X } from "lucide-react";

const rows = [
  { feature: "Cost per session", clinic: "€80–€200", zential: "One-time investment" },
  { feature: "Time per session", clinic: "60–90 min + travel", zential: "5 minutes" },
  { feature: "Scheduling", clinic: "Book weeks ahead", zential: "On your terms" },
  { feature: "Downtime", clinic: "24–48 hours", zential: "None" },
  { feature: "Privacy", clinic: "Clinic setting", zential: "Your space" },
];

export function ComparisonSection() {
  return (
    <section className="section-padding">
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">Compare</p>
        <h2 className="text-3xl md:text-5xl font-semibold">Freedom, Not Appointments.</h2>
      </div>
      <div className="max-w-3xl mx-auto glass-card overflow-hidden">
        <div className="grid grid-cols-3 text-center text-xs tracking-[0.1em] uppercase font-semibold border-b border-border/50">
          <div className="p-4" />
          <div className="p-4 text-muted-foreground">Clinic Visits</div>
          <div className="p-4 text-primary">Zential Ritual</div>
        </div>
        {rows.map(row => (
          <div key={row.feature} className="grid grid-cols-3 text-center border-b border-border/30 last:border-0">
            <div className="p-4 text-sm font-medium text-left">{row.feature}</div>
            <div className="p-4 text-sm text-muted-foreground flex items-center justify-center gap-1">
              <X size={14} className="text-destructive/60" /> {row.clinic}
            </div>
            <div className="p-4 text-sm flex items-center justify-center gap-1">
              <Check size={14} className="text-accent" /> {row.zential}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
