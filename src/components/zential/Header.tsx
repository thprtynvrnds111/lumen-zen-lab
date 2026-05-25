import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchOverlay } from "@/components/zential/SearchOverlay";

const S = {
  dark: '#1A1714',
  teal: '#2ED8A8',
  cream: '#F7F4F0',
  dm: { fontFamily: "'DM Sans', sans-serif" } as React.CSSProperties,
} as const;

function FlowerMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 100 100" aria-hidden>
      <g transform="translate(50,50)">
        <ellipse rx="18" ry="32" fill={S.teal} transform="rotate(0)" />
        <ellipse rx="18" ry="32" fill={S.teal} transform="rotate(45)" opacity="0.75" />
        <ellipse rx="18" ry="32" fill={S.teal} transform="rotate(90)" opacity="0.55" />
        <ellipse rx="18" ry="32" fill={S.teal} transform="rotate(135)" opacity="0.38" />
      </g>
    </svg>
  );
}

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? scrolled / total : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const scrollToDevices = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      document.getElementById("devices")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className="sticky top-0 z-50 relative"
        style={{ backgroundColor: S.dark, borderBottom: '1px solid rgba(247,244,240,0.06)' }}
      >
        <div className="flex items-center justify-between px-8 md:px-14 lg:px-16 h-16">

          {/* Left: flower mark + wordmark */}
          <Link to="/" className="flex items-center gap-3" aria-label="Zential Pure — Home">
            <FlowerMark />
            <span style={{
              ...S.dm,
              fontWeight: 300,
              fontSize: 12,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: S.cream,
            }}>
              Zential Pure
            </span>
          </Link>

          {/* Right: desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/#devices"
              onClick={scrollToDevices}
              style={{
                ...S.dm,
                fontWeight: 300,
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(247,244,240,0.55)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = S.teal)}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(247,244,240,0.55)')}
            >
              Shop the Protocol
            </Link>
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              style={{ color: 'rgba(247,244,240,0.45)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', transition: 'color 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = S.teal)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(247,244,240,0.45)')}
            >
              <Search size={17} />
            </button>
            <CartDrawer />
          </div>

          {/* Right: mobile */}
          <div className="flex md:hidden items-center gap-5">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              style={{ color: 'rgba(247,244,240,0.45)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <Search size={17} />
            </button>
            <CartDrawer />
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              style={{ ...S.dm, fontWeight: 300, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(247,244,240,0.45)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {mobileOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {/* Scroll progress bar */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 1,
            backgroundColor: 'rgba(46,216,168,0.12)',
          }}
        >
          <div
            style={{
              height: '100%',
              backgroundColor: S.teal,
              transformOrigin: 'left center',
              transform: `scaleX(${scrollProgress})`,
              transition: 'transform 0.08s linear',
            }}
          />
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav
            style={{ borderTop: '1px solid rgba(247,244,240,0.06)', backgroundColor: S.dark }}
            className="md:hidden px-8 py-6 space-y-5"
          >
            <Link
              to="/#devices"
              onClick={(e) => { scrollToDevices(e); setMobileOpen(false); }}
              style={{ ...S.dm, fontWeight: 300, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(247,244,240,0.7)', display: 'block' }}
            >
              Shop the Protocol
            </Link>
            <Link
              to="/collection"
              onClick={() => setMobileOpen(false)}
              style={{ ...S.dm, fontWeight: 300, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(247,244,240,0.45)', display: 'block' }}
            >
              Collection
            </Link>
            <Link
              to="/quiz"
              onClick={() => setMobileOpen(false)}
              style={{ ...S.dm, fontWeight: 300, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(247,244,240,0.45)', display: 'block' }}
            >
              Find Your Protocol
            </Link>
          </nav>
        )}
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
