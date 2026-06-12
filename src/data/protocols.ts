import protocolFaceImg from "@/assets/editorial/protocol-face.webp";
import protocolBodyImg from "@/assets/editorial/protocol-body.webp";
import protocolRecoveryImg from "@/assets/editorial/protocol-recovery.webp";

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
    price: number;
  }[];
  totalPrice: number;
  cardBg: string;
  image?: string;
  imageQuote?: string;
  /** Outcome-led label shown on the entry square (e.g. "Skin & Face"). */
  outcomeLabel: string;
  /** Hero product image for the entry square (Shopify CDN). */
  squareImageUrl: string;
  /** "from €X" price shown on the square. */
  fromPrice: number;
  /** All Shopify handles in this category — drives the full category grid on the hub page. */
  categoryHandles: string[];
  /** Discounted price for the 3-device sequence bought as one protocol. */
  bundlePrice: number;
}

export const protocols: Protocol[] = [
  {
    slug: "01-face",
    number: "01",
    title: "Face",
    modalities: "EMS · Microcurrent · Thermal · Cosmetic LED",
    sessionMinutes: 10,
    description:
      "Three devices. One ten-minute sequence. Designed for the buyer who already does the work and wants the order set.",
    devices: [
      {
        name: "Eye Activator",
        role: "Open · 2 min",
        minutes: 2,
        handle:
          "3d-eye-beauty-instrument-micro-current-pulse-eye-relax-reduce-wrinkles-and-dark-circle-remove-eye-bags-massager-beauty-tool",
        price: 88,
      },
      {
        name: "Face Introducer",
        role: "Stack · 6 min",
        minutes: 6,
        handle: "lifting-and-tightening-face-introducer",
        price: 88,
      },
      {
        name: "Gua Sha Frequency",
        role: "Close · 2 min",
        minutes: 2,
        handle: "electric-guasha-massager",
        price: 88,
      },
    ],
    totalPrice: 264,
    cardBg: "#F7F4F0",
    image: protocolFaceImg,
    imageQuote: "The face is the first instrument. Touch it as such.",
    outcomeLabel: "Skin & Face",
    squareImageUrl:
      "https://cdn.shopify.com/s/files/1/0890/2813/3207/files/94d36d02-390a-462a-8749-64007fa10d18.png?v=1777502654",
    fromPrice: 88,
    bundlePrice: 238,
    categoryHandles: [
      "lifting-and-tightening-face-introducer",
      "eye-massage",
      "electric-guasha-massager",
      "electric-micro-current",
      "facial-beauty-tools-and-ems-beauty-equipment",
      "color-light-import-micro-current-vibration-massager",
      "3d-eye-beauty-instrument-micro-current-pulse-eye-relax-reduce-wrinkles-and-dark-circle-remove-eye-bags-massager-beauty-tool",
      "portable-ems-microcurrent-facial-beauty-device",
      "medicube-collagen-elastic-jelly-moisturizing-cream",
      "collagen-eye-mask",
    ],
  },
  {
    slug: "02-body",
    number: "02",
    title: "Body",
    modalities: "Red Light Therapy · Compression",
    sessionMinutes: 30,
    description:
      "Body protocol. Mitochondrial light, then sequential pressure. The same precision, scaled to the limbs and torso.",
    devices: [
      {
        name: "Flux Panel",
        role: "Open · 10 min",
        minutes: 10,
        handle:
          "red-light-therapy-belt-for-waist-shoulder-660-850nm-light-therapy-device",
        price: 199,
      },
      {
        name: "Pressure Shell",
        role: "Close · 20 min",
        minutes: 20,
        handle:
          "pneumatic-air-wave-massager-pneumatic-circulation-leg-massager-pneumatic-massager",
        price: 159,
      },
    ],
    totalPrice: 358,
    cardBg: "#1A1714",
    image: protocolBodyImg,
    imageQuote: "Scaled to the limbs. Same precision.",
    outcomeLabel: "Body & Circulation",
    squareImageUrl:
      "https://cdn.shopify.com/s/files/1/0890/2813/3207/files/a42f0fa0-65aa-4eb3-a705-ba9058044e17.jpg?v=1778533310",
    fromPrice: 120,
    bundlePrice: 323,
    categoryHandles: [
      "red-light-therapy-belt-for-waist-shoulder-660-850nm-light-therapy-device",
      "pneumatic-air-wave-massager-pneumatic-circulation-leg-massager-pneumatic-massager",
      "household-red-light-charging-vibrating-red-light-therapy-mat",
      "portable-home-use-charging-red-light-therapy-blanket-far-infrared",
      "red-light-therapy-belt-infrared-hot-compress-phototherapy",
    ],
  },
  {
    slug: "03-recovery",
    number: "03",
    title: "Recovery",
    modalities: "Red Light Therapy · Acupressure · Vibration",
    sessionMinutes: 28,
    description:
      "For the nervous system that never clocks out. A screen day keeps you switched on — shallow breath, shoulders up, wired past bedtime. This sequence is the off-switch: red light at the desk, deep-pressure on the mat, then targeted vibration to close.",
    devices: [
      {
        name: "Ritual Light Pro",
        role: "Open · 10 min",
        minutes: 10,
        handle: "led-beauty-lamp-red-light-therapy-lamp-desktop-stand",
        price: 89,
      },
      {
        name: "Restore Mat",
        role: "Stack · 15 min",
        minutes: 15,
        handle:
          "acupressure-massage-mat-with-needles-set-back-massager-for-neck-foot-kuznetsovs-applicator-massage-pad-yoga-mat-with-pillow",
        price: 34,
      },
      {
        name: "Pulse Roller",
        role: "Close · 3 min",
        minutes: 3,
        handle: "electric-foam-roller-muscle-relaxation-fitness-yoga-column",
        price: 109,
      },
    ],
    totalPrice: 232,
    cardBg: "#C6A07C",
    image: protocolRecoveryImg,
    imageQuote: "Closing the day is also a protocol.",
    outcomeLabel: "Sleep & Recovery",
    squareImageUrl:
      "https://cdn.shopify.com/s/files/1/0890/2813/3207/files/Gemini_Generated_Image_lz4og3lz4og3lz4o_1.png?v=1778370884",
    fromPrice: 29,
    bundlePrice: 209,
    categoryHandles: [
      "led-beauty-lamp-red-light-therapy-lamp-desktop-stand",
      "acupressure-massage-mat-with-needles-set-back-massager-for-neck-foot-kuznetsovs-applicator-massage-pad-yoga-mat-with-pillow",
      "electric-foam-roller-muscle-relaxation-fitness-yoga-column",
      "gravity-quilt-cotton-weighted-blanket",
      "blackout-eye-mask-3d-deep-contoured-sleep-mask-lash-extensions-no-pressure-blindfold-sleeping-eye-mask-women-men-side-sleepers",
      "white-noise-sleep-aid-machine",
      "infrared-light-therapy-joint-knee-shoulder-electric-heating-knee-pad",
    ],
  },
];

export const getProtocol = (slug: string): Protocol | undefined =>
  protocols.find((p) => p.slug === slug);
