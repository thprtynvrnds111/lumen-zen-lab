import { Link } from "react-router-dom";

const footerLinks = {
  Shop: ["All Devices", "Bundles", "Accessories"],
  Ritual: ["The 5-Step Method", "Daily Guide", "Before & After"],
  Science: ["Microcurrent", "Red Light", "EMS"],
  Support: ["Contact", "Shipping", "Returns", "FAQ"],
  Legal: ["Privacy Policy", "Terms of Service", "Imprint"],
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
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-background transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" className="text-sm tracking-[0.3em] uppercase font-semibold text-background">
            Zential Pure
          </Link>
          <p className="text-xs text-background/40">© 2025 Zential Pure. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
