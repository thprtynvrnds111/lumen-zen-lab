import { Zap, Radio, Sun } from "lucide-react";

const technologies = [
  {
    icon: Zap,
    title: "Microcurrent Therapy",
    description: "Low-level electrical currents mimic your body's natural bioelectrical field, re-educating facial muscles for a lifted, sculpted appearance.",
    badge: "FDA-cleared technology",
  },
  {
    icon: Radio,
    title: "EMS Muscle Activation",
    description: "Electrical muscle stimulation targets deeper muscle layers, improving tone and firmness where traditional skincare cannot reach.",
    badge: "Clinically studied",
  },
  {
    icon: Sun,
    title: "660nm Red Light Therapy",
    description: "Specific wavelengths of red light penetrate skin tissue, stimulating cellular repair and boosting collagen synthesis at the source.",
    badge: "Published research",
  },
];

export function ScienceSection() {
  return (
    <section id="science" className="section-padding gradient-pearl">
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">The Science</p>
        <h2 className="text-3xl md:text-5xl font-semibold">Precision Technology</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {technologies.map(tech => (
          <div key={tech.title} className="glass-card p-8 text-center group hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
              <tech.icon className="text-accent" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-3">{tech.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{tech.description}</p>
            <span className="inline-block text-[10px] tracking-[0.15em] uppercase text-accent/80 border border-accent/20 rounded-full px-3 py-1">
              {tech.badge}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
