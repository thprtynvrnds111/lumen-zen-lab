import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { SparseFooter } from "@/components/zential/v2/SparseFooter";
import { ImageDivider } from "@/components/zential/ImageDivider";
import { Link, useParams, Navigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { getProtocol, protocols, SYSTEM } from "@/data/protocols";
import { ProtocolSpecCard } from "@/components/zential/ProtocolSpecCard";
import { CategoryGrid } from "@/components/zential/CategoryGrid";
import { useEffect, useState } from "react";

/**
 * Shopify's CDN resizes via query params; a bundled local asset does not. The
 * protocol images are now a mix of both, so only the Shopify URLs get sized.
 */
const shopifyWidth = (url: string, width: number) =>
 url.includes("cdn.shopify.com") ? `${url}&width=${width}` : url;

const ProtocolDetail = () => {
 const { slug } = useParams<{ slug: string }>();
 const protocol = slug ? getProtocol(slug) : undefined;
 const [scrollPct, setScrollPct] = useState(0);

 useEffect(() => {
  const handleScroll = () => {
   const max = document.documentElement.scrollHeight - window.innerHeight;
   const pct = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
   setScrollPct(pct);
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
  return () => window.removeEventListener("scroll", handleScroll);
 }, [slug]);

 if (!protocol) {
  return <Navigate to="/protocols" replace />;
 }

 return (
  <div className="min-h-screen bg-white text-[#141414]">
   <SEO
    title={`Protocol ( ${protocol.number} ), ${protocol.title}, Zential Pure`}
    description={protocol.description}
    canonical={`https://zentialpure.com/protocols/${protocol.slug}`}
   />
   <AnnouncementBar />
   <Header />

   {/* Sticky protocol indicator, hidden during hero, fades in mid-scroll, fades out at footer */}
   <div
    className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col items-start gap-3 pointer-events-none transition-opacity duration-500"
    style={{
     opacity:
      scrollPct < 0.04 ? 0
      : scrollPct < 0.10 ? (scrollPct - 0.04) / 0.06
      : scrollPct > 0.92 ? 0
      : scrollPct > 0.85 ? 1 - (scrollPct - 0.85) / 0.07
      : 1,
    }}
    aria-hidden
   >
    <div className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E]">
     Protocol
    </div>
    <div
     className="font-sans font-light tracking-[-0.03em] leading-none"
     style={{ fontSize: "5rem", color: "#141414" }}
    >
     ( {protocol.number} )
    </div>
    <div className="mt-4 w-1 h-32 bg-[rgba(20,20,20,0.10)] overflow-hidden">
     <div
      className="w-full bg-[#0E7A54] origin-top"
      style={{
       height: "100%",
       transform: `scaleY(${scrollPct})`,
       transformOrigin: "top",
       transition: "transform 0.1s linear",
      }}
     />
    </div>
   </div>

   {/* Hero band, white canvas with hairline rule */}
   <section className="border-b border-[rgba(20,20,20,0.10)] bg-white px-6 py-24 md:py-40">
    <div className="max-w-5xl mx-auto md:ml-32">
     <p
      className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase mb-6 text-[#8E8E8E]"
     >
      <Link to="/protocols" className="hover:underline">
       Protocols
      </Link>{" "}
      · Protocol ( {protocol.number} )
     </p>
     <h1
      className="font-sans font-light tracking-[-0.03em] text-7xl md:text-[9rem] leading-[0.9] mb-10 text-[#141414]"
     >
      {protocol.title}.
     </h1>
     <p
      className="text-base md:text-xl tracking-wide mb-3 max-w-2xl text-[#5A5A5A]"
     >
      {protocol.description}
     </p>
     <p
      className="font-sans text-sm tracking-wide text-[#8E8E8E]"
     >
      {protocol.modalities}
     </p>
    </div>
   </section>

   {/* Editorial break, protocol-specific image */}
   {protocol.image && (
    <ImageDivider
     src={protocol.image}
     alt=""
     quote={protocol.imageQuote}
    />
   )}

   {/* Mechanism chips, quick legend */}
   <section className="px-6 py-12 max-w-5xl mx-auto md:ml-32 border-b border-[rgba(20,20,20,0.10)]">
    <div className="flex flex-wrap gap-3">
     {protocol.modalities.split(" · ").map((m) => (
      <span
       key={m}
       className="font-sans text-[10px] font-medium tracking-[0.18em] uppercase px-3 py-1.5 border border-[rgba(20,20,20,0.20)] rounded-full text-[#141414]"
      >
       {m}
      </span>
     ))}
     <span className="font-sans text-[10px] font-medium tracking-[0.18em] uppercase px-3 py-1.5 bg-[#2ED8A8] text-[#141414] rounded-full">
      {protocol.sessionMinutes} min · no consumables
     </span>
    </div>
   </section>

   {/* Sequence, 3 steps */}
   <section className="px-6 py-24 md:py-32 max-w-5xl mx-auto md:ml-32">
    <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-12">
     Sequence
    </p>
    <div className="grid grid-cols-1 gap-12 md:gap-16">
     {protocol.devices.map((device, idx) => (
      <Link
       key={device.handle}
       to={device.href}
       className="group flex items-center gap-5 md:gap-10 border-b border-[rgba(20,20,20,0.10)] pb-10 md:pb-12 hover:border-[#0E7A54] transition-colors"
      >
       {/* Device thumbnail, fast visual grasp */}
       <div className="shrink-0 w-24 h-24 md:w-36 md:h-36 rounded-none bg-white border border-[rgba(20,20,20,0.10)] overflow-hidden grid place-items-center">
        <img
         src={shopifyWidth(device.imageUrl, 320)}
         srcSet={`${shopifyWidth(device.imageUrl, 160)} 160w, ${shopifyWidth(device.imageUrl, 320)} 320w`}
         sizes="(max-width: 768px) 96px, 144px"
         alt={device.name}
         loading="lazy"
         className="w-[82%] h-[82%] object-contain transition-transform duration-500 group-hover:scale-105"
        />
       </div>

       <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between mb-3">
         <span className="font-sans text-xs md:text-sm tracking-[0.16em] text-[#8E8E8E]">
          Step ( {String(idx + 1).padStart(2, "0")} )
         </span>
         <span className="font-sans text-xs md:text-sm tracking-[0.12em] text-[#8E8E8E]">
          {device.role}
         </span>
        </div>
        <h3 className="font-sans font-light tracking-[-0.025em] text-3xl md:text-5xl leading-tight text-[#141414] group-hover:text-[#0E7A54] transition-colors">
         {device.name}.
        </h3>
        <p className="mt-3 text-sm md:text-base text-[#5A5A5A]">
         €{device.price} · See device →
        </p>
       </div>
      </Link>
     ))}
    </div>
   </section>

   {/* Total session, kinetic countdown band */}
   <section className="px-6 py-32 border-y border-[rgba(20,20,20,0.10)] bg-white text-[#141414]">
    <div className="max-w-4xl mx-auto md:ml-32 text-left">
     <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-8">
      Total session
     </p>
     <div className="flex items-baseline gap-6">
      <span
       className="font-sans font-light tracking-[-0.03em] tabular-nums leading-none text-[#0E7A54]"
       style={{ fontSize: "clamp(7rem, 18vw, 16rem)" }}
      >
       {protocol.sessionMinutes}
      </span>
      <span className="text-2xl md:text-4xl tracking-wide text-[#141414]">
       minutes.
      </span>
     </div>
     <p className="mt-8 text-base md:text-lg text-[#5A5A5A] max-w-2xl">
      Two to four sessions per week. Same time of day. Same room.
      The sequence rewards rhythm, not volume.
     </p>
    </div>
   </section>

   {/* Protocol Card preview */}
   <section className="px-6 py-32 max-w-6xl mx-auto md:ml-32">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
     <div>
      <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-8">
       The Protocol Card
      </p>
      <h2 className="font-sans font-light tracking-[-0.03em] text-4xl md:text-6xl leading-tight mb-8">
       The card is the
       <br />
       deliverable.
      </h2>
      <p className="text-base md:text-lg text-[#5A5A5A] mb-4 max-w-md">
       Every Protocol ships with a printed A6 card. The sequence
       you follow, on cream uncoated 300gsm stock.
      </p>
      <p className="text-base md:text-lg text-[#5A5A5A] max-w-md">
       The device is the apparatus. The card is the system.
      </p>
     </div>
     <div className="max-w-md mx-auto w-full">
      <ProtocolSpecCard protocol={protocol} />
     </div>
    </div>
   </section>

   {/* Spec + Included */}
   <section className="px-6 py-24 bg-white">
    <div className="max-w-3xl mx-auto md:ml-32">
     <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-10">
      Spec
     </p>
     <dl className="grid grid-cols-2 gap-y-6 text-sm md:text-base mb-20">
      <dt className="text-[#8E8E8E]">Devices</dt>
      <dd className="text-right">{protocol.devices.length}</dd>
      <dt className="text-[#8E8E8E]">Modalities</dt>
      <dd className="text-right">{protocol.modalities}</dd>
      <dt className="text-[#8E8E8E]">Session</dt>
      <dd className="text-right">{protocol.sessionMinutes} minutes</dd>
      <dt className="text-[#8E8E8E]">Frequency</dt>
      <dd className="text-right">2 to 4× per week</dd>
      <dt className="text-[#8E8E8E]">Consumables</dt>
      <dd className="text-right">None</dd>
      <dt className="text-[#8E8E8E]">Shipping</dt>
      <dd className="text-right">Free, EU</dd>
     </dl>

     <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-8">
      Included
     </p>
     <ul className="space-y-5 text-base md:text-lg">
      {protocol.devices.map((d) => (
       <li
        key={d.handle}
        className="flex justify-between items-baseline border-b border-[rgba(20,20,20,0.10)] pb-5"
       >
        <span>{d.name}</span>
        <span className="font-sans tabular-nums text-sm text-[#8E8E8E]">
         €{d.price}
        </span>
       </li>
      ))}
      <li className="flex justify-between items-baseline border-b border-[rgba(20,20,20,0.10)] pb-5">
       <span>Protocol Card ( print )</span>
       <span className="font-sans text-sm text-[#8E8E8E]">Included</span>
      </li>
      <li className="flex justify-between items-baseline border-b border-[rgba(20,20,20,0.10)] pb-5">
       <span>Shipping ( EU )</span>
       <span className="font-sans text-sm text-[#8E8E8E]">Included</span>
      </li>
      <li className="flex justify-between items-baseline pt-3">
       <span className="font-sans font-light tracking-[-0.02em] text-2xl md:text-3xl">
        Protocol total
       </span>
       <span className="font-sans font-light tracking-[-0.02em] tabular-nums text-2xl md:text-3xl">
        €{protocol.totalPrice}
       </span>
      </li>
     </ul>

     {/* Upgrade path: the real bundle, not a per-protocol discount */}
     <div className="mt-10 border-t border-[rgba(20,20,20,0.10)] pt-8">
      <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-3">
       Or take all three
      </p>
      <p className="text-base md:text-lg text-[#5A5A5A] mb-5">
       {SYSTEM.name} is every instrument — face, body and recovery — for €
       {SYSTEM.price} instead of €{SYSTEM.separatePrice} bought separately.
      </p>
      <Link
       to={SYSTEM.href}
       className="font-sans text-xs font-medium tracking-[0.16em] uppercase text-[#141414] underline underline-offset-4 hover:text-[#0E7A54] transition-colors"
      >
       See {SYSTEM.name} · €{SYSTEM.price} →
      </Link>
     </div>

     <div className="mt-5 flex justify-center">
      <span className="font-sans text-[11px] font-medium tracking-[0.16em] uppercase px-4 py-2 border border-[rgba(20,20,20,0.20)] rounded-full text-[#8E8E8E]">
       One price · no codes · no countdowns
      </span>
     </div>

     <div className="mt-10 flex flex-col items-center gap-3">
      <Link
       to={protocol.devices[0].href}
       className="inline-block rounded-full bg-[#2ED8A8] text-[#141414] px-12 py-5 text-xs font-semibold tracking-[0.18em] uppercase hover:bg-[#1BAF86] transition-colors"
      >
       Take Protocol ( {protocol.number} ) · €{protocol.totalPrice}
      </Link>
      <p className="text-center text-[10px] font-medium tracking-[0.15em] uppercase text-[#8E8E8E] font-sans">
       Ships with the printed Protocol Card
      </p>
     </div>
    </div>
   </section>

   {/* Full category, every device in this protocol's family */}
   <section className="px-6 py-24 md:py-32 bg-white border-t border-[rgba(20,20,20,0.10)]">
    <div className="max-w-6xl mx-auto md:ml-32">
     <div className="flex items-baseline justify-between mb-3">
      <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E]">
       Every {protocol.title} device · {protocol.categoryHandles.length}
      </p>
      <p className="font-sans text-[10px] font-medium tracking-[0.16em] uppercase text-[#8E8E8E]">
       {protocol.outcomeLabel}
      </p>
     </div>
     <h2 className="font-sans font-light tracking-[-0.03em] text-4xl md:text-6xl leading-tight mb-4">
      Build your own.
     </h2>
     <p className="text-base md:text-lg text-[#5A5A5A] max-w-xl mb-12">
      The sequence is the shortcut. Below is the full {protocol.title.toLowerCase()} catalog 
      every device, on its own. Tap any one for the full page.
     </p>
     <CategoryGrid handles={protocol.categoryHandles} />
    </div>
   </section>

   {/* Other protocols */}
   <section className="px-6 py-32 max-w-6xl mx-auto md:ml-32">
    <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-10">
     Other Protocols
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
     {protocols
      .filter((p) => p.slug !== protocol.slug)
      .map((other) => (
       <Link
        key={other.slug}
        to={`/protocols/${other.slug}`}
        className="group block border border-[rgba(20,20,20,0.10)] bg-white p-10 hover:border-[#0E7A54] transition-colors"
       >
        <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase mb-3 text-[#8E8E8E]">
         Protocol ( {other.number} )
        </p>
        <h3 className="font-sans font-light tracking-[-0.03em] text-4xl md:text-5xl mb-2 text-[#141414] transition-colors group-hover:text-[#0E7A54]">
         {other.title}.
        </h3>
        <p className="text-sm tracking-wide text-[#5A5A5A]">
         {other.modalities}
        </p>
       </Link>
      ))}
    </div>
   </section>

   {/* Quiet credit footer */}
   <section className="px-6 py-12 border-t border-[rgba(20,20,20,0.10)] text-center">
    <p className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E]">
     Sequence designed by Zential Lab · Rotterdam
    </p>
   </section>

   <SparseFooter />
  </div>
 );
};

export default ProtocolDetail;
