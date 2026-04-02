const OPACITY = 0.09;

const bubbles = [
  { size: 180, x: '8%', y: '10%', delay: 0, duration: 18 },
  { size: 120, x: '75%', y: '5%', delay: 2, duration: 22 },
  { size: 90, x: '85%', y: '55%', delay: 4, duration: 16 },
  { size: 220, x: '60%', y: '60%', delay: 1, duration: 25 },
  { size: 60, x: '20%', y: '70%', delay: 3, duration: 14 },
  { size: 140, x: '40%', y: '15%', delay: 5, duration: 20 },
  { size: 45, x: '50%', y: '80%', delay: 0.5, duration: 12 },
  { size: 100, x: '15%', y: '45%', delay: 6, duration: 19 },
  { size: 35, x: '70%', y: '35%', delay: 2.5, duration: 15 },
  { size: 70, x: '90%', y: '25%', delay: 7, duration: 21 },
  { size: 50, x: '30%', y: '90%', delay: 1.5, duration: 17 },
  { size: 160, x: '55%', y: '30%', delay: 3.5, duration: 24 },
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
            border: `1px solid hsl(var(--accent) / ${OPACITY + 0.04})`,
            background: `radial-gradient(circle at 35% 35%, hsl(var(--accent) / ${OPACITY + 0.03}), hsl(var(--accent) / ${OPACITY * 0.4}) 60%, transparent 80%)`,
            animation: `journal-float ${b.duration}s ease-in-out infinite`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </>
  );
}
