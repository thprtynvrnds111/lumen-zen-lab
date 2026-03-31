import { useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchOverlay } from "@/components/zential/SearchOverlay";

const navItems = [
  { label: "Shop", href: "/#devices" },
  { label: "Ritual", href: "/#ritual" },
  { label: "Journal", href: "/journal" },
  { label: "Support", href: "/support" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isJournal = location.pathname.startsWith("/journal");

  const handleNavClick = useCallback((e: React.MouseEvent, href: string) => {
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
        <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 h-16">
          {/* Left nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.slice(0, 3).map(item => (
              <Link key={item.label} to={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  "text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                )}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Center logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <span className="text-lg tracking-[0.3em] uppercase font-semibold">Zential Pure</span>
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-5">
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.slice(3).map(item => (
                <Link key={item.label} to={item.href}
                  className={cn(
                    "text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                  )}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <button onClick={() => setSearchOpen(true)} className="text-muted-foreground hover:text-foreground transition-colors">
              <Search size={18} />
            </button>
            <button className="hidden md:block text-muted-foreground hover:text-foreground transition-colors">
              <User size={18} />
            </button>
            <CartDrawer />
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden border-t border-border/30 bg-background px-6 py-4 space-y-3">
            {navItems.map(item => (
              <Link key={item.label} to={item.href} onClick={(e) => { handleNavClick(e, item.href); setMobileOpen(false); }}
                className="block text-sm tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
