import { Link } from "react-router-dom";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
import { SEO } from "@/components/SEO";

const devices = [
  { name: "Face Introducer", handle: "lifting-and-tightening-face-introducer" },
  { name: "Sculpt Wand", handle: "facial-beauty-tools-and-ems-beauty-equipment" },
  { name: "Eye Activator", handle: "eye-massage" },
  { name: "Gua Sha Frequency", handle: "electric-guasha-massager" },
];

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO title="Page Not Found — Zential Pure" description="This page doesn't exist. Explore our clinical beauty devices." />
      <AnnouncementBar />
      <Header />
      <main className="section-padding">
        <div className="max-w-2xl mx-auto text-center py-20">
          <p className="text-xs tracking-[0.25em] uppercase text-accent mb-6">404</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">This page doesn't exist.</h1>
          <p className="text-muted-foreground text-lg mb-12">But your ritual does. Start here.</p>

          <div className="grid grid-cols-2 gap-3 mb-10 max-w-sm mx-auto">
            {devices.map(d => (
              <Link
                key={d.handle}
                to={`/product/${d.handle}`}
                className="text-xs tracking-[0.15em] uppercase font-medium px-4 py-3 rounded-xl border border-border/40 text-foreground hover:border-primary hover:text-primary transition-all duration-200"
              >
                {d.name}
              </Link>
            ))}
          </div>

          <Link to="/" className="inline-block text-xs tracking-[0.2em] uppercase font-semibold text-accent hover:text-accent/80 transition-colors">
            ← Back to home
          </Link>
        </div>
      </main>
      <ZentialFooter />
    </div>
  );
};

export default NotFound;
