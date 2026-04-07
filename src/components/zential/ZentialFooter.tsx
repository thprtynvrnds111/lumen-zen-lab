import { Link } from "react-router-dom";
import zentialFlower from "@/assets/zential-flower.png";

const footerLinks = {
  Shop: [
    { label: "All Devices", to: "/#devices" },
    { label: "Bundles", to: "/#bundles" },
  ],
  Ritual: [
    { label: "The 5-Step Method", to: "/#ritual" },
    { label: "Daily Guide", to: "/journal/evening-protocol" },
  ],
  Science: [
    { label: "Microcurrent", to: "/journal/microcurrent-collagen" },
    { label: "Red Light", to: "/journal/red-light-clinical" },
    { label: "EMS", to: "/journal/ems-vs-microcurrent" },
  ],
  Support: [
    { label: "Contact", to: "/support" },
    { label: "Shipping", to: "/shipping" },
    { label: "Returns", to: "/returns" },
    { label: "FAQ", to: "/faq" },
  ],
  Legal: [
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Service", to: "/terms" },
  ],
};

export function ZentialFooter() {
  return (
    <footer className="bg-foreground text-background/70">
      <div className="section-padding">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs tracking-[0.2em] uppercase text-background/40 mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm hover:text-background transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" className="text-sm tracking-[0.3em] uppercase font-semibold text-background inline-flex items-center">
            Zential Pure<img src={zentialFlower} alt="" className="inline-block h-[1.6em] w-auto ml-1.5 opacity-80 brightness-[10]" />
          </Link>
          <div className="text-right md:text-right">
            <p className="text-[10px] tracking-[0.2em] uppercase text-background/30 mb-1">Know your skin. Work with it.</p>
            <p className="text-xs text-background/40">© 2025 Zential Pure. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
