import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductByHandle } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Shield, Truck, RotateCcw } from "lucide-react";
import { Header } from "@/components/zential/Header";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { ZentialFooter } from "@/components/zential/ZentialFooter";

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const addItem = useCartStore(s => s.addItem);
  const isCartLoading = useCartStore(s => s.isLoading);

  useEffect(() => {
    if (!handle) return;
    fetchProductByHandle(handle).then(p => { setProduct(p); setLoading(false); }).catch(() => setLoading(false));
  }, [handle]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-muted-foreground" size={32} />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Product not found</p>
    </div>
  );

  const images = product.images?.edges || [];
  const variants = product.variants?.edges || [];
  const variant = variants[selectedVariant]?.node;
  const price = variant?.price;

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to your ritual", { position: "top-center" });
  };

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />

      <div className="section-padding">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft size={16} /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary/30">
              {images[selectedImage] && (
                <img src={images[selectedImage].node.url} alt={images[selectedImage].node.altText || product.title}
                  className="w-full h-full object-cover" />
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {images.map((img: any, i: number) => (
                  <button key={i} onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${i === selectedImage ? 'border-primary' : 'border-transparent'}`}>
                    <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.title}</h1>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl font-bold">{price?.currencyCode} {parseFloat(price?.amount || '0').toFixed(2)}</span>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            {/* Variant selection */}
            {product.options?.length > 0 && product.options[0].values.length > 1 && (
              <div className="mb-8">
                <p className="text-sm font-medium mb-3">{product.options[0].name}</p>
                <div className="flex gap-2">
                  {variants.map((v: any, i: number) => (
                    <button key={v.node.id} onClick={() => setSelectedVariant(i)}
                      className={`px-4 py-2 rounded-full text-sm border transition-all ${i === selectedVariant ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:border-foreground'}`}>
                      {v.node.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button variant="ritual" size="xl" className="w-full mb-4" onClick={handleAdd} disabled={isCartLoading || !variant?.availableForSale}>
              {isCartLoading ? <Loader2 className="animate-spin" size={16} /> : variant?.availableForSale ? "Add To Ritual" : "Sold Out"}
            </Button>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border/30">
              {[
                { icon: RotateCcw, label: "30-Day Guarantee" },
                { icon: Shield, label: "Secure Checkout" },
                { icon: Truck, label: "Fast Shipping" },
              ].map(badge => (
                <div key={badge.label} className="text-center">
                  <badge.icon size={20} className="mx-auto mb-2 text-accent" />
                  <p className="text-[11px] tracking-[0.1em] uppercase text-muted-foreground">{badge.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ZentialFooter />
    </div>
  );
}
