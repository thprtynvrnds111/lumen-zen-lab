import { useState, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ZentialLogo } from "@/components/zential/ZentialLogo";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchOverlay } from "@/components/zential/SearchOverlay";
import { MegaMenu } from "@/components/zential/MegaMenu";
import { LanguageSwitcher } from "@/components/zential/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const { t } = useTranslation('common');

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
              {t('nav.shop')} <ChevronDown size={12} className={cn("transition-transform", shopOpen && "rotate-180")} />
            </button>
            <Link to="/collection"
              className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.collection')}
            </Link>
            <Link to="/#ritual"
              onClick={(e) => handleHashClick(e, "/#ritual")}
              className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.ritual')}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Center logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2" aria-label="Zential Pure — Home">
            <ZentialLogo size="md" variant="white" animateMark />
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-5">
            <nav className="hidden lg:flex items-center gap-6">
              <Link to="/quiz"
                className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.quiz')}
              </Link>
              <Link to="/journal"
                className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.journal')}
              </Link>
              <Link to="/support"
                className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.support')}
              </Link>
            </nav>
            <LanguageSwitcher />
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
              {t('nav.shopDevices')}
            </Link>
            <div className="pl-4 space-y-2.5 border-l border-border/30">
              <Link to="/product/portable-ems-microcurrent-facial-beauty-device" onClick={() => setMobileOpen(false)} className="block text-xs text-muted-foreground hover:text-foreground">{t('nav.liftContour')}</Link>
              <Link to="/product/facial-beauty-tools-and-ems-beauty-equipment" onClick={() => setMobileOpen(false)} className="block text-xs text-muted-foreground hover:text-foreground">{t('nav.toneGlow')}</Link>
              <Link to="/product/eye-massage" onClick={() => setMobileOpen(false)} className="block text-xs text-muted-foreground hover:text-foreground">{t('nav.eyeFinelines')}</Link>
              <Link to="/body-lift" onClick={() => setMobileOpen(false)} className="block text-xs text-muted-foreground hover:text-foreground">{t('nav.bodyTissue')}</Link>
            </div>
            <Link to="/collection" onClick={() => setMobileOpen(false)}
              className="block text-sm tracking-[0.1em] uppercase text-foreground">
              {t('nav.collection')}
            </Link>
            <Link to="/#ritual" onClick={(e) => { handleHashClick(e, "/#ritual"); setMobileOpen(false); }}
              className="block text-sm tracking-[0.1em] uppercase text-foreground">
              {t('nav.ritual')}
            </Link>
            <Link to="/quiz" onClick={() => setMobileOpen(false)}
              className="block text-sm tracking-[0.1em] uppercase text-foreground">
              {t('nav.quiz')}
            </Link>
            <Link to="/journal" onClick={() => setMobileOpen(false)}
              className="block text-sm tracking-[0.1em] uppercase text-foreground">
              {t('nav.journal')}
            </Link>
            <Link to="/support" onClick={() => setMobileOpen(false)}
              className="block text-sm tracking-[0.1em] uppercase text-foreground">
              {t('nav.support')}
            </Link>
            <div className="pt-1 border-t border-border/20">
              <LanguageSwitcher />
            </div>
          </nav>
        )}
      </header>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
