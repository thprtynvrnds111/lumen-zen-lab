import { useState, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import zentialFlower from "@/assets/zential-flower.webp";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchOverlay } from "@/components/zential/SearchOverlay";
import { MegaMenu } from "@/components/zential/MegaMenu";

const rightNavItems = [
  { label: "Quiz", href: "/quiz" },
  { label: "Journal", href: "/journal" },
  { label: "Support", href: "/support" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setShopOpen(true);
  };
  const closeMega = () => {
    closeTimer.current = setTimeout(() => setShopOpen(false), 150);
  };

  const handleHashClick = useCallback((e: React.MouseEvent, href: string) => {
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (location.pathname === "/") {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/30">
        <div className="flex items-center justify-between px-4 md:px-12 lg:px-20 h-16">
          {/* Left nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <button
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
              onClick={() => setShopOpen(v => !v)}
              className={cn(
                "flex items-center gap-1 text-xs tracking-[0.15em] uppercase transition-colors",
                shopOpen ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Shop <ChevronDown size={12} className={cn("transition-transform", shopOpen && "rotate-180")} />
            </button>
            <Link to="/#ritual"
              onClick={(e) => handleHashClick(e, "/#ritual")}
              className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors">
              Ritual
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close menu" : "Open menu"}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Center logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <span className="text-sm md:text-lg tracking-[0.2em] md:tracking-[0.3em] uppercase font-semibold inline-flex items-center whitespace-nowrap">
              Zential<img src={zentialFlower} alt="" width={80} height={80} className="inline-block h-[1.6em] md:h-[2em] w-auto ml-1 md:ml-1.5 opacity-80 animate-flower-breathe" />
            </span>
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-5">
            <nav className="hidden lg:flex items-center gap-6">
              {rightNavItems.map(item => (
                <Link key={item.label} to={item.href}
                  className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              ))}
            </nav>
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className="text-muted-foreground hover:text-foreground transition-colors">
              <Search size={18} />
            </button>
            <CartDrawer />
          </div>
        </div>

        {/* Mega menu (desktop) */}
        {shopOpen && (
          <div
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
            className="hidden lg:block absolute left-0 right-0 top-full"
          >
            <MegaMenu onNavigate={() => setShopOpen(false)} />
          </div>
        )}

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden border-t border-border/30 bg-background px-6 py-5 space-y-4">
            <Link to="/#devices" onClick={(e) => { handleHashClick(e, "/#devices"); setMobileOpen(false); }}
              className="block text-sm tracking-[0.1em] uppercase text-foreground">
              Shop Devices
            </Link>
            <div className="pl-4 space-y-2.5 border-l border-border/30">
              <Link to="/product/portable-ems-microcurrent-facial-beauty-device" onClick={() => setMobileOpen(false)} className="block text-xs text-muted-foreground hover:text-foreground">Lift & Contour</Link>
              <Link to="/product/facial-beauty-tools-and-ems-beauty-equipment" onClick={() => setMobileOpen(false)} className="block text-xs text-muted-foreground hover:text-foreground">Tone & Glow</Link>
              <Link to="/product/eye-massage" onClick={() => setMobileOpen(false)} className="block text-xs text-muted-foreground hover:text-foreground">Eyes & Fine Lines</Link>
              <Link to="/body-lift" onClick={() => setMobileOpen(false)} className="block text-xs text-muted-foreground hover:text-foreground">Body & Tissue</Link>
            </div>
            <Link to="/#ritual" onClick={(e) => { handleHashClick(e, "/#ritual"); setMobileOpen(false); }}
              className="block text-sm tracking-[0.1em] uppercase text-foreground">Ritual</Link>
            <Link to="/quiz" onClick={() => setMobileOpen(false)}
              className="block text-sm tracking-[0.1em] uppercase text-foreground">Skin Quiz</Link>
            <Link to="/journal" onClick={() => setMobileOpen(false)}
              className="block text-sm tracking-[0.1em] uppercase text-foreground">Journal</Link>
            <Link to="/support" onClick={() => setMobileOpen(false)}
              className="block text-sm tracking-[0.1em] uppercase text-foreground">Support</Link>
          </nav>
        )}
      </header>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
