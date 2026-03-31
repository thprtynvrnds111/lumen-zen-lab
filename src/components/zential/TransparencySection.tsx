export function TransparencySection() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ backgroundColor: '#EDE9E3' }}>
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif italic text-3xl md:text-4xl text-foreground mb-8">
          We show our work
        </h2>
        <div className="text-sm text-foreground/80 leading-[1.8] space-y-5">
          <p>
            Every brand in this category will tell you they're science-backed.
            Most of them mean: we hired someone to say that once.
          </p>
          <p>
            We mean: here are the studies we built this on. Read them if you want.
          </p>
          <div className="space-y-2">
            <a href="#" className="block font-medium hover:underline" style={{ color: '#9B5A2E' }}>
              Study 1: Red light therapy and collagen →
            </a>
            <a href="#" className="block font-medium hover:underline" style={{ color: '#9B5A2E' }}>
              Study 2: Microcurrent and ATP production →
            </a>
            <a href="#" className="block font-medium hover:underline" style={{ color: '#9B5A2E' }}>
              Study 3: EMS and facial muscle tone →
            </a>
            <a href="#" className="block font-medium hover:underline" style={{ color: '#9B5A2E' }}>
              Study 4: Thermal and transdermal absorption →
            </a>
          </div>
          <p>
            The device either works or you get your money back.
            That's the whole offer.
          </p>
        </div>
      </div>
    </section>
  );
}
