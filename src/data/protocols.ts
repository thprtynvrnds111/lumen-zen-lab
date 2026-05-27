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
  },
  {
    slug: "02-body",
    number: "02",
    title: "Body",
    modalities: "Vibration · Red Light · Compression",
    sessionMinutes: 33,
    description:
      "Body protocol. Movement, mitochondrial light, then sequential pressure. The same precision, scaled to the limbs and torso.",
    devices: [
      {
        name: "Pulse Roller",
        role: "Open · 3 min",
        minutes: 3,
        handle: "electric-foam-roller-muscle-relaxation-fitness-yoga-column",
        price: 109,
      },
      {
        name: "Flux Panel",
        role: "Stack · 10 min",
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
    totalPrice: 467,
    cardBg: "#1A1714",
  },
  {
    slug: "03-recovery",
    number: "03",
    title: "Recovery",
    modalities: "Red Light · Acupressure · Light Seal",
    sessionMinutes: 25,
    description:
      "Pre-sleep sequence. Red light at the desk, parasympathetic activation on the mat, blackout to close. For the days the body needs more than maintenance.",
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
        name: "Depth Mask",
        role: "Close · all night",
        minutes: 0,
        handle:
          "blackout-eye-mask-3d-deep-contoured-sleep-mask-lash-extensions-no-pressure-blindfold-sleeping-eye-mask-women-men-side-sleepers",
        price: 29,
      },
    ],
    totalPrice: 152,
    cardBg: "#C6A07C",
  },
];

export const getProtocol = (slug: string): Protocol | undefined =>
  protocols.find((p) => p.slug === slug);
