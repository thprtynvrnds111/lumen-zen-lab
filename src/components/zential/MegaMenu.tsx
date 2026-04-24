import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProductByHandle } from "@/lib/shopify";

interface MegaMenuProps {
  onNavigate?: () => void;
}

const concerns = [
  { label: "Lift & Contour", href: "/product/portable-ems-microcurrent-facial-beauty-device", desc: "Sculpt & jawline definition" },
  { label: "Tone & Glow", href: "/product/facial-beauty-tools-and-ems-beauty-equipment", desc: "Even skin & radiance" },
  { label: "Eyes & Fine Lines", href: "/product/eye-massage", desc: "Periorbital renewal" },
  { label: "Body & Tissue", href: "/body-lift", desc: "Firming & circulation" },
];

const byArea = [
  { label: "Face", href: "/product/lifting-and-tightening-face-introducer" },
  { label: "Eye Contour", href: "/product/eye-massage" },
  { label: "Jawline", href: "/product/facial-beauty-tools-and-ems-beauty-equipment" },
  { label: "Neck & Décolleté", href: "/product/color-light-import-micro-current-vibration-massager" },
  { label: "Body", href: "/body-lift" },
];

const byTech = [
  { label: "Red Light Therapy", href: "/technology/red-light" },
  { label: "Microcurrent", href: "/technology/microcurrent" },
  { label: "EMS", href: "/technology/ems" },
  { label: "Thermal", href: "/technology/thermal" },
  { label: "Electroporation", href: "/technology/electroporation" },
  { label: "Iontophoresis", href: "/technology/iontophoresis" },
];

export function MegaMenu({ onNavigate }: MegaMenuProps) {
  return (
    <div className="bg-background border-t border-border/30 shadow-2xl">
      <div className="max-w-[1400px] mx-auto px-12 lg:px-20 py-12 grid grid-cols-12 gap-12">
        {/* Shop by Concern */}
        <div className="col-span-4">
          <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/50 mb-6">— Shop by Concern —</p>
          <ul className="space-y-4">
            {concerns.map(c => (
              <li key={c.label}>
                <Link to={c.href} onClick={onNavigate} className="group block">
                  <p className="font-serif italic text-xl text-foreground group-hover:text-foreground/70 transition-colors">{c.label}</p>
                  <p className="text-xs text-foreground/55 mt-0.5">{c.desc}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Shop by Area */}
        <div className="col-span-3">
          <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/50 mb-6">— Shop by Area —</p>
          <ul className="space-y-3">
            {byArea.map(a => (
              <li key={a.label}>
                <Link to={a.href} onClick={onNavigate}
                  className="text-sm text-foreground/75 hover:text-foreground transition-colors">
                  {a.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Shop by Technology */}
        <div className="col-span-3">
          <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/50 mb-6">— Technology —</p>
          <ul className="space-y-3">
            {byTech.map(t => (
              <li key={t.label}>
                <Link to={t.href} onClick={onNavigate}
                  className="text-sm text-foreground/75 hover:text-foreground transition-colors">
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Featured */}
        <div className="col-span-2">
          <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/50 mb-6">— Featured —</p>
          <Link to="/product/lifting-and-tightening-face-introducer" onClick={onNavigate}
            className="block group">
            <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-[#F7F4F0] to-[#E8DDD0] mb-3 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-serif italic text-2xl text-[#2A211A]/60">Bestseller</span>
              </div>
            </div>
            <p className="text-sm font-medium text-foreground group-hover:text-foreground/70 transition-colors">Face Introducer</p>
            <p className="text-xs text-foreground/55 mt-0.5">€88 · Most popular</p>
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/30 bg-[#FBF8F4]">
        <div className="max-w-[1400px] mx-auto px-12 lg:px-20 py-4 flex items-center justify-between text-[11px] tracking-[0.15em] uppercase text-foreground/60">
          <span>Free EU Shipping · 30-Day Guarantee</span>
          <Link to="/#devices" onClick={onNavigate} className="hover:text-foreground transition-colors">View All Devices →</Link>
        </div>
      </div>
    </div>
  );
}
