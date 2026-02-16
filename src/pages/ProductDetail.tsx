import { useParams } from "react-router-dom";
import { getProductConfig } from "@/data/productConfigs";
import { ProductLanding } from "@/components/zential/ProductLanding";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const config = handle ? getProductConfig(handle) : null;

  if (config) {
    return <ProductLanding config={config} />;
  }

  // Fallback for products without a config
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <div className="section-padding text-center">
        <p className="text-muted-foreground">Product not found</p>
      </div>
      <ZentialFooter />
    </div>
  );
}
