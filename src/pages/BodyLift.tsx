import { Navigate } from "react-router-dom";

/**
 * /body-lift has no live Shopify product (handle "body-lift" 404s on the
 * Storefront API), so its buy flow was dead. Recovery/body products live on
 * the Instruments hub — redirect there until a real Body Lift SKU exists.
 */
export default function BodyLift() {
 return <Navigate to="/instruments" replace />;
}
