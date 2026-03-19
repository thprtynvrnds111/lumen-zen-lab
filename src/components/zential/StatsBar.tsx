import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 94, label: "Reported Firmer Skin" },
  { value: 89, label: "Saw Improved Tone" },
  { value: 92, label: "Felt More Confident" },
];

function CountUp({ target, active }: { target: number; active: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 2000;
    const step = duration / target;
    const timer = setInterval(() => {
      start++;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [active, target]);
  return <span>{count}%</span>;
}

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-foreground text-background py-16 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {stats.map(stat => (
          <div key={stat.label}>
            <p className="text-4xl md:text-5xl font-bold mb-2"><CountUp target={stat.value} active={visible} /></p>
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
