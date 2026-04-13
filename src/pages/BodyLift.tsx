import { getProductConfig } from "@/data/productConfigs";
import { ProductLanding } from "@/components/zential/ProductLanding";
import { SEO } from "@/components/SEO";

export default function BodyLift() {
  const config = getProductConfig("body-lift");

  if (!config) return null;

  return (
    <>
      <SEO
        title="Body Lift — Zential Pure"
        description="Microcurrent, red light and sonic pulse in one daily body ritual. Visibly firms, lifts and sculpts with consistent use."
        canonicalUrl="/body-lift"
      />
      <ProductLanding config={config} />
    </>
  );
}
