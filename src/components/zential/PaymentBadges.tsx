import visaLogo from "@/assets/pay-visa.png";
import mastercardLogo from "@/assets/pay-mastercard.png";
import maestroLogo from "@/assets/pay-maestro.png";
import applePayLogo from "@/assets/pay-applepay.png";
import googlePayLogo from "@/assets/pay-googlepay.png";
import paypalLogo from "@/assets/pay-paypal.png";

const icons = [
  { src: visaLogo, alt: "Visa", h: "h-6" },
  { src: mastercardLogo, alt: "Mastercard", h: "h-5" },
  { src: maestroLogo, alt: "Maestro", h: "h-9" },
  { src: applePayLogo, alt: "Apple Pay", h: "h-4" },
  { src: googlePayLogo, alt: "Google Pay", h: "h-4" },
  { src: paypalLogo, alt: "PayPal", h: "h-5" },
];

export function PaymentBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 flex-wrap ${className}`}>
      {icons.map(({ src, alt, h }) => (
        <img key={alt} src={src} alt={alt} className={`${h} w-auto object-contain opacity-60`} />
      ))}
    </div>
  );
}