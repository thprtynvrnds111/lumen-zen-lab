import { useParams } from "react-router-dom";
import { getProductConfig } from "@/data/productConfigs";
import { ProductLanding } from "@/components/zential/ProductLanding";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";

export default function BodyLift() {
  const config = getProductConfig("body-lift");

  if (!config) return null;

  return <ProductLanding config={config} />;
}
