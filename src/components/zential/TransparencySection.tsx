import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function TransparencySection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ backgroundColor: '#EDE9E3' }}>
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif italic text-3xl md:text-4xl text-foreground mb-8">
          We show our work
        </h2>
        <div className="text-sm text-foreground/80 leading-[1.8] space-y-5">
          <p>Every brand in this category will tell you they're science-backed. Most of them mean: we hired someone to say that once.</p>
          <p>We mean: here are the studies we built this on. Read them if you want.</p>
          <div className="space-y-2">
            <Link to="/technology/red-light" className="block font-medium hover:underline" style={{ color: '#9B5A2E' }}>Red light therapy and collagen →</Link>
            <Link to="/technology/microcurrent" className="block font-medium hover:underline" style={{ color: '#9B5A2E' }}>Microcurrent and ATP production →</Link>
            <Link to="/technology/ems" className="block font-medium hover:underline" style={{ color: '#9B5A2E' }}>EMS and facial muscle tone →</Link>
            <Link to="/technology/thermal" className="block font-medium hover:underline" style={{ color: '#9B5A2E' }}>Thermal and transdermal absorption →</Link>
          </div>
          <p>The device either works or you get your money back. That's the whole offer.</p>
        </div>
      </div>
    </section>
  );
}
