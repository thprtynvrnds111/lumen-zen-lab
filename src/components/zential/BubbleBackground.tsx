const bubbles = [
  { size: 180, x: '8%', y: '10%', opacity: 0.04, delay: 0, duration: 18 },
  { size: 120, x: '75%', y: '5%', opacity: 0.05, delay: 2, duration: 22 },
  { size: 90, x: '85%', y: '55%', opacity: 0.06, delay: 4, duration: 16 },
  { size: 220, x: '60%', y: '60%', opacity: 0.03, delay: 1, duration: 25 },
  { size: 60, x: '20%', y: '70%', opacity: 0.07, delay: 3, duration: 14 },
  { size: 140, x: '40%', y: '15%', opacity: 0.04, delay: 5, duration: 20 },
  { size: 45, x: '50%', y: '80%', opacity: 0.08, delay: 0.5, duration: 12 },
  { size: 100, x: '15%', y: '45%', opacity: 0.05, delay: 6, duration: 19 },
  { size: 35, x: '70%', y: '35%', opacity: 0.09, delay: 2.5, duration: 15 },
  { size: 70, x: '90%', y: '25%', opacity: 0.05, delay: 7, duration: 21 },
  { size: 50, x: '30%', y: '90%', opacity: 0.06, delay: 1.5, duration: 17 },
  { size: 160, x: '55%', y: '30%', opacity: 0.03, delay: 3.5, duration: 24 },
];

export function BubbleBackground() {
  return (
    <>
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: b.size,
            height: b.size,
            left: b.x,
            top: b.y,
            border: `1px solid hsl(var(--accent) / ${b.opacity + 0.03})`,
            background: `radial-gradient(circle at 35% 35%, hsl(var(--accent) / ${b.opacity + 0.02}), hsl(var(--accent) / ${b.opacity * 0.3}) 60%, transparent 80%)`,
            animation: `journal-float ${b.duration}s ease-in-out infinite`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </>
  );
}
