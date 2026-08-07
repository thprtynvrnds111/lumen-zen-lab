import { Link } from "react-router-dom";
import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { SparseFooter } from "@/components/zential/v2/SparseFooter";
import { SEO } from "@/components/SEO";

// The three live instruments (LIVE-CATALOG-TRUTH.md). This list used to offer
// Sculpt Wand, Eye Activator and Gua Sha Frequency — all discontinued — so the
// 404 page recovered a lost visitor onto three products that no longer exist.
const devices = [
 { name: "Face Introducer", href: "/instruments/face-introducer" },
 { name: "Restoration Belt", href: "/instruments/restoration-belt" },
 { name: "Restoration Mat", href: "/instruments/restoration-mat" },
 { name: "The System", href: "/one-shelf" },
];

const NotFound = () => {
 return (
  <div className="min-h-screen bg-white text-[#141414]">
   <SEO title="Page Not Found, Zential Pure" description="This page doesn't exist. Explore our clinical beauty devices." />
   <AnnouncementBar />
   <Header />
   <main className="px-6 py-20 md:px-12 lg:px-20 xl:px-32">
    <div className="max-w-2xl mx-auto text-center py-20">
     <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#0E7A54] mb-6">404</p>
     <h1 className="font-sans font-light text-4xl md:text-5xl tracking-[-0.03em] text-[#141414] mb-4">This page doesn't exist.</h1>
     <p className="text-[#5A5A5A] text-lg mb-12">But your ritual does. Start here.</p>

     <div className="grid grid-cols-2 gap-3 mb-10 max-w-sm mx-auto">
      {devices.map(d => (
       <Link
        key={d.href}
        to={d.href}
        className="text-xs tracking-[0.15em] uppercase font-medium px-4 py-3 rounded-none border border-[rgba(20,20,20,0.12)] text-[#141414] hover:border-[#0E7A54] hover:text-[#0E7A54] transition-all duration-200"
       >
        {d.name}
       </Link>
      ))}
     </div>

     <Link to="/" className="inline-block text-xs tracking-[0.2em] uppercase font-semibold text-[#0E7A54] hover:text-[#1BAF86] transition-colors">
      ← Back to home
     </Link>
    </div>
   </main>
   <SparseFooter />
  </div>
 );
};

export default NotFound;
