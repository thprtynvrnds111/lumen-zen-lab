const stats = [
  { value: "94%", label: "Reported Firmer Skin" },
  { value: "89%", label: "Saw Improved Tone" },
  { value: "92%", label: "Felt More Confident" },
];

export function StatsBar() {
  return (
    <section className="bg-foreground text-background py-16 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {stats.map(stat => (
          <div key={stat.label}>
            <p className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</p>
            <p className="text-sm tracking-[0.15em] uppercase text-background/60">{stat.label}</p>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-background/30 mt-10 max-w-md mx-auto">
        Based on user survey conducted by manufacturer. Individual results may vary.
      </p>
    </section>
  );
}