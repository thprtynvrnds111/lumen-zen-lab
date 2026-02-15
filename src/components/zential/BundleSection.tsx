import { Button } from "@/components/ui/button";

const bundles = [
  {
    title: "Starter Ritual",
    items: ["Sculpt Wand", "Conductive Gel"],
    price: "€129",
    originalPrice: "€158",
    save: "18%",
    highlight: false,
  },
  {
    title: "Complete Ritual Set",
    items: ["Body Lift", "Sculpt Wand", "Frequency Wand", "Collagen Gel"],
    price: "€299",
    originalPrice: "€389",
    save: "23%",
    highlight: true,
  },
  {
    title: "Glow Essentials",
    items: ["Skin Pulse", "Collagen PDRN Pads", "Conductive Gel"],
    price: "€189",
    originalPrice: "€237",
    save: "20%",
    highlight: false,
  },
];

export function BundleSection() {
  return (
    <section className="section-padding gradient-pearl">
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">Smart Bundles</p>
        <h2 className="text-3xl md:text-5xl font-semibold">Elevate Your Ritual.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {bundles.map(b => (
          <div key={b.title} className={`glass-card p-8 relative ${b.highlight ? 'ring-2 ring-primary/30' : ''}`}>
            {b.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.15em] uppercase bg-primary text-primary-foreground px-4 py-1 rounded-full">
                Best Value
              </span>
            )}
            <h3 className="font-semibold text-lg mb-4">{b.title}</h3>
            <ul className="space-y-2 mb-6">
              {b.items.map(item => (
                <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-accent" /> {item}
                </li>
              ))}
            </ul>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl font-bold">{b.price}</span>
              <span className="text-sm text-muted-foreground line-through">{b.originalPrice}</span>
              <span className="text-xs bg-emerald text-emerald-foreground px-2 py-0.5 rounded-full font-semibold">
                Save {b.save}
              </span>
            </div>
            <Button variant={b.highlight ? "ritual" : "outline-ritual"} className="w-full">
              Add Bundle
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
