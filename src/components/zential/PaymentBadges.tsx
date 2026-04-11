import visaLogo from "@/assets/pay-visa.webp";
import mastercardLogo from "@/assets/pay-mastercard.webp";
import maestroLogo from "@/assets/pay-maestro.webp";
import applePayLogo from "@/assets/pay-applepay.webp";
import googlePayLogo from "@/assets/pay-googlepay.webp";
import paypalLogo from "@/assets/pay-paypal.webp";

const icons = [
  { src: visaLogo, alt: "Visa", h: "h-6", w: 80, hPx: 24 },
  { src: mastercardLogo, alt: "Mastercard", h: "h-4", w: 80, hPx: 16 },
  { src: maestroLogo, alt: "Maestro", h: "h-10", w: 80, hPx: 40 },
  { src: applePayLogo, alt: "Apple Pay", h: "h-4", w: 80, hPx: 16 },
  { src: googlePayLogo, alt: "Google Pay", h: "h-4", w: 80, hPx: 16 },
  { src: paypalLogo, alt: "PayPal", h: "h-5", w: 80, hPx: 20 },
];

export function PaymentBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 flex-wrap ${className}`}>
      {icons.map(({ src, alt, h, w, hPx }) => (
        <img key={alt} src={src} alt={alt} width={w} height={hPx} className={`${h} w-auto object-contain opacity-80`} loading="lazy" />
      ))}
    </div>
  );
}
