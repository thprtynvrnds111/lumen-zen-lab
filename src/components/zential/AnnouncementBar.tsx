import { useState, useEffect } from "react";

const messages = [
  "30-Day Ritual Guarantee",
  "Clinically Inspired. Designed for Daily Use.",
  "Free Shipping on Orders Over €75",
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % messages.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-foreground text-background py-2.5 text-center overflow-hidden">
      <p className="text-xs tracking-[0.2em] uppercase font-light" key={index}
        style={{ animation: 'slide-announcement 5s ease-in-out' }}>
        {messages[index]}
      </p>
    </div>
  );
}
