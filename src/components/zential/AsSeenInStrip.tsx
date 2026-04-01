import { useScrollReveal } from "@/hooks/useScrollReveal";

const logos = [
  { name: "Vogue", text: "VOGUE" },
  { name: "Elle", text: "ELLE" },
  { name: "Cosmopolitan", text: "COSMOPOLITAN" },
  { name: "Harper's Bazaar", text: "HARPER'S BAZAAR" },
  { name: "Allure", text: "ALLURE" },
];

export function AsSeenInStrip() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-10 md:py-14 border-y" style={{ backgroundColor: '#F7F4F0', borderColor: '#E4DFD8' }}>
      <p className="text-[10px] tracking-[0.3em] uppercase text-center mb-6 text-muted-foreground">
        As Featured In
      </p>
      <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap px-6">
        {logos.map((logo) => (
          <span
            key={logo.name}
            className="text-sm md:text-base tracking-[0.2em] uppercase font-light text-foreground/25 select-none"
          >
            {logo.text}
          </span>
        ))}
      </div>
    </section>
  );
}
