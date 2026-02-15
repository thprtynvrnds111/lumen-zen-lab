import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  const searchProducts = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); return; }
    setLoading(true);
    try {
      const products = await fetchProducts(8, q);
      setResults(products);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => searchProducts(query), 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query, searchProducts]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const formatPrice = (amount: string, currency: string) =>
    new Intl.NumberFormat("en-EU", { style: "currency", currency }).format(parseFloat(amount));

  return (
    <div className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-2xl mx-auto mt-20 px-4" onClick={(e) => e.stopPropagation()}>
        <div className="bg-background rounded-2xl shadow-2xl border border-border/30 overflow-hidden">
          {/* Input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border/20">
            <Search size={18} className="text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search devices, rituals, science..."
              className="flex-1 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground"
            />
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Results */}
          {query.length >= 2 && (
            <div className="max-h-[60vh] overflow-y-auto">
              {loading ? (
                <div className="px-5 py-8 text-center text-sm text-muted-foreground">Searching...</div>
              ) : results.length > 0 ? (
                <div className="p-2">
                  {results.map((product) => {
                    const p = product.node;
                    const img = p.images.edges[0]?.node?.url;
                    const price = p.priceRange.minVariantPrice;
                    return (
                      <Link
                        key={p.id}
                        to={`/product/${p.handle}`}
                        onClick={onClose}
                        className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-muted/50 transition-colors group"
                      >
                        {img && (
                          <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden shrink-0">
                            <img src={img} alt={p.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                            {p.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{formatPrice(price.amount, price.currencyCode)}</p>
                        </div>
                      </Link>
                    );
                  })}
                  <Link
                    to="/#devices"
                    onClick={onClose}
                    className="block text-center text-xs tracking-[0.1em] uppercase text-primary hover:text-primary/80 py-3 mt-1 border-t border-border/20 transition-colors"
                  >
                    View All Products
                  </Link>
                </div>
              ) : (
                <div className="px-5 py-10 text-center">
                  <p className="text-sm text-muted-foreground mb-4">No results found. Explore our signature devices.</p>
                  <Link
                    to="/#devices"
                    onClick={onClose}
                    className="inline-block text-xs tracking-[0.15em] uppercase font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    Browse All Products
                  </Link>
                </div>
              )}
            </div>
          )}

          {query.length < 2 && (
            <div className="px-5 py-6 text-center text-xs text-muted-foreground">
              Start typing to search products...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
