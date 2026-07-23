import protocolFaceImg from "@/assets/editorial/protocol-face.webp";
import protocolBodyImg from "@/assets/editorial/protocol-body.webp";
import protocolRecoveryImg from "@/assets/editorial/protocol-recovery.webp";
import beltHero from "@/assets/belt-pdp-hero.png";
import matHero from "@/assets/hero-restore-mat.webp";

/**
 * The three protocols, rebuilt on the LIVE catalog 2026-07-24.
 *
 * Until this rewrite each protocol sold a multi-device "sequence" assembled from
 * products that do not exist: Eye Activator, Gua Sha Frequency, Pressure Shell,
 * Ritual Light Pro, Restore Mat, Pulse Roller — eight discontinued names across
 * the three pages, at invented prices, under invented bundle discounts.
 * knowledge/products/LIVE-CATALOG-TRUTH.md lists every one of them as
 * discontinued and forbids them in customer copy.
 *
 * The store sells three instruments and one bundle. So each protocol now names
 * exactly one live instrument, and the bundle CTA on every protocol is the real
 * System (€399 against €468 bought separately — a €69 saving, not a made-up one).
 *
 * Prices, modalities and session lengths below are copied from LIVE-CATALOG-TRUTH.md
 * (re-verified against the live Storefront API 2026-07-08). Do not add a device
 * here that is not in src/data/liveCatalog.ts LIVE_HANDLES.
 */

/** The System bundle — the single purchase path offered on every protocol page. */
export const SYSTEM = {
  /** All three instruments bought together. */
  price: 399,
  /** €88 + €180 + €200 bought separately. */
  separatePrice: 468,
  href: "/one-shelf",
  name: "The System",
} as const;

export interface Protocol {
 slug: string;
 number: string;
 title: string;
 modalities: string;
 sessionMinutes: number;
 description: string;
 devices: {
  name: string;
  role: string;
  minutes: number;
  handle: string;
  /** Route of the instrument's own page. Never a /product/<handle> PDP. */
  href: string;
  price: number;
  imageUrl: string;
 }[];
 totalPrice: number;
 cardBg: string;
 image?: string;
 imageQuote?: string;
 /** Outcome-led label shown on the entry square (e.g. "Skin & Face"). */
 outcomeLabel: string;
 /** Hero product image for the entry square. */
 squareImageUrl: string;
 /** "from €X" price shown on the square. */
 fromPrice: number;
 /** Live handles in this protocol's family, drives the category grid. */
 categoryHandles: string[];
 /** Price of the System bundle, which every protocol upgrades into. */
 bundlePrice: number;
}

const FACE_INTRODUCER_IMG =
 "https://cdn.shopify.com/s/files/1/0890/2813/3207/files/94d36d02-390a-462a-8749-64007fa10d18.png?v=1777502654";

export const protocols: Protocol[] = [
 {
  slug: "01-face",
  number: "01",
  title: "Face",
  modalities: "EMS · Microcurrent · Thermal · Cosmetic LED",
  sessionMinutes: 12,
  description:
   "One instrument, four modalities, twelve minutes. The inputs a facialist charges you by the session, calibrated into a ritual you run yourself.",
  devices: [
   {
    name: "The Face Introducer",
    role: "Face · 12 min",
    minutes: 12,
    handle: "lifting-and-tightening-face-introducer",
    href: "/instruments/face-introducer",
    price: 88,
    imageUrl: FACE_INTRODUCER_IMG,
   },
  ],
  totalPrice: 88,
  cardBg: "#F7F4F0",
  image: protocolFaceImg,
  imageQuote: "The face is the first instrument. Touch it as such.",
  outcomeLabel: "Skin & Face",
  squareImageUrl: FACE_INTRODUCER_IMG,
  fromPrice: 88,
  bundlePrice: SYSTEM.price,
  categoryHandles: ["lifting-and-tightening-face-introducer"],
 },
 {
  slug: "02-body",
  number: "02",
  title: "Body",
  modalities: "660nm Red Light · 850nm Near-Infrared · Thermal",
  sessionMinutes: 15,
  description:
   "Recovery, worn close. 660nm red and 850nm near-infrared pressed to the muscle by a thermal wrap, sized to the waist.",
  devices: [
   {
    name: "The Restoration Belt",
    role: "Body · 15 min",
    minutes: 15,
    handle:
     "red-light-therapy-belt-for-waist-shoulder-660-850nm-light-therapy-device",
    href: "/instruments/restoration-belt",
    price: 180,
    imageUrl: beltHero,
   },
  ],
  totalPrice: 180,
  cardBg: "#1A1714",
  image: protocolBodyImg,
  imageQuote: "Scaled to the limbs. Same precision.",
  outcomeLabel: "Body & Recovery",
  squareImageUrl: beltHero,
  fromPrice: 180,
  bundlePrice: SYSTEM.price,
  categoryHandles: [
   "red-light-therapy-belt-for-waist-shoulder-660-850nm-light-therapy-device",
  ],
 },
 {
  slug: "03-recovery",
  number: "03",
  title: "Recovery",
  modalities: "660nm Red Light · Far-Infrared Heat",
  sessionMinutes: 20,
  description:
   "A bed of 660nm red light and far-infrared heat, sized to the back of the body. Lie down, twenty minutes, and let the day come off the spine.",
  devices: [
   {
    name: "The Restoration Mat",
    role: "Recovery · 20 min",
    minutes: 20,
    handle: "the-restoration-mat",
    href: "/instruments/restoration-mat",
    price: 200,
    imageUrl: matHero,
   },
  ],
  totalPrice: 200,
  cardBg: "#C6A07C",
  image: protocolRecoveryImg,
  imageQuote: "Closing the day is also a protocol.",
  outcomeLabel: "Sleep & Recovery",
  squareImageUrl: matHero,
  fromPrice: 200,
  bundlePrice: SYSTEM.price,
  categoryHandles: ["the-restoration-mat"],
 },
];

export const getProtocol = (slug: string): Protocol | undefined =>
 protocols.find((p) => p.slug === slug);

/** Find the Protocol whose category (or sequence) contains a given product handle. */
export const getProtocolForHandle = (
 ...handles: (string | undefined)[]
): Protocol | undefined => {
 const set = handles.filter(Boolean) as string[];
 return protocols.find(
  (p) =>
   p.categoryHandles.some((h) => set.includes(h)) ||
   p.devices.some((d) => set.includes(d.handle)),
 );
};
