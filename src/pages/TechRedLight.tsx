import { TechnologyPage } from "@/components/zential/TechnologyPage";

const TechRedLight = () => (
  <TechnologyPage
    title="Red Light Therapy — How It Works | Zential Pure"
    metaDescription="How red light therapy stimulates collagen synthesis in dermal fibroblasts. 630–660nm wavelength, clinical studies, and daily usage guidance."
    canonicalUrl="/technology/red-light"
    tagline="Technology"
    headline="Red Light Therapy"
    paramLabel="Wavelength"
    paramValue="630–660nm"
    intro="Red light penetrates the skin at a cellular level, stimulating the mitochondria to produce more adenosine triphosphate (ATP) — the energy currency your cells need to repair, regenerate, and produce collagen."
    mechanism={{
      heading: "How it works",
      body: "Red light at 630–660nm is absorbed by cytochrome c oxidase, a photoreceptor within the mitochondrial electron transport chain. This absorption increases mitochondrial membrane potential, accelerates electron transport, and boosts ATP synthesis. The result is a measurable increase in cellular energy available for collagen production, DNA repair, and anti-inflammatory signalling. Unlike UV light, red light does not damage DNA or cause oxidative stress — it works with your biology, not against it."
    }}
    biology={{
      heading: "What happens in your skin",
      body: "Dermal fibroblasts — the cells responsible for producing collagen, elastin, and hyaluronic acid — respond to red light by upregulating procollagen type I synthesis. Studies show a significant increase in collagen density after consistent exposure. Simultaneously, red light reduces the expression of matrix metalloproteinases (MMPs), the enzymes that break down existing collagen. The net effect: more collagen produced, less collagen degraded. Over weeks, this translates to improved skin firmness, reduced fine lines, and a measurable increase in dermal thickness."
    }}
    usage={{
      heading: "How to use it",
      points: [
        "Hold the device 1–2cm from clean, dry skin",
        "Treat each zone for 2–3 minutes, 5–10 minutes total per session",
        "Use 5 times per week for optimal results",
        "No conductive gel required for red light — it works through direct photon absorption",
        "Results typically visible after 2–3 weeks of consistent use",
      ]
    }}
    studies={[
      { title: "Low-level light therapy and skin fibroblast collagen synthesis", source: "Journal of Investigative Dermatology", year: "2014", url: "#" },
      { title: "Photobiomodulation with 633nm LED improves collagen density", source: "Photomedicine and Laser Surgery", year: "2009", url: "#" },
      { title: "Effect of red light on mitochondrial function and ATP production", source: "Lasers in Surgery and Medicine", year: "2011", url: "#" },
    ]}
    deviceHandle="lifting-and-tightening-face-introducer"
    deviceName="Zential Pure"
  />
);

export default TechRedLight;
