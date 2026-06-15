import { PageShell } from "@/components/zential/v2/PageShell";

/** Eyebrow, mono, tracked, on system. */
function Eyebrow({ children }: { children: React.ReactNode }) {
 return (
  <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#6B5A4A] mb-6">
   {children}
  </p>
 );
}

const PHASES = [
 {
  range: "0:00 · 2:00",
  title: "Empty the alarm",
  body:
   "Sit or stand. Breathe in through the nose, then take a second short sip of air on top of it. Long, slow exhale through the mouth. Repeat for two minutes. The double inhale and long exhale lean the system toward its rest state. This is the part most people skip.",
 },
 {
  range: "2:00 · 4:00",
  title: "Work the face",
  body:
   "Bring attention to the jaw, the brow, the space between the eyes. These hold the day. Move slowly here, with or without the device. The face already runs on its own current. You are working with the signal, not forcing it.",
 },
 {
  range: "4:00 · 6:00",
  title: "Stay down",
  body:
   "Do nothing. No phone, no plan, no input. Let the system stay in the lower gear you just found. Two minutes of being unreachable is the whole point. This is where the reset sets.",
 },
];

const Reset = () => {
 return (
  <PageShell
   title="The 6-Minute Reset | Zential Pure"
   description="A simple down-regulation practice you can run anywhere. Six minutes to bring your own system back online, before the world asks anything of you."
   canonical="/reset"
   eyebrow="ZENTIAL PURE · THE MOVEMENT"
   displayTitle="The 6-Minute Reset."
   displaySubtitle="One practice. Six minutes. A way to bring your own system back into its lower gear, before the noise starts. Save this page. Run it tomorrow morning."
   stickyTag="Reset 01"
  >
   {/* The protocol */}
   <section className="section-padding">
    <div className="max-w-3xl">
     <Eyebrow>The practice</Eyebrow>
     <div className="space-y-6">
      {PHASES.map((p, i) => (
       <div key={p.range} className="bg-white rounded-[1.5rem] border border-border/60 p-7 md:p-9">
        <div className="flex items-baseline justify-between gap-4 mb-4">
         <h2 className="font-[Lora] italic text-[#1A1714] leading-tight" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)" }}>
          {p.title}
         </h2>
         <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#2ED8A8] shrink-0">
          {String(i + 1).padStart(2, "0")}
         </span>
        </div>
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#6B5A4A] mb-3">{p.range}</p>
        <p className="text-base md:text-lg text-[#1A1714]/80 leading-relaxed">{p.body}</p>
       </div>
      ))}
     </div>
    </div>
   </section>

   {/* Why it works (mechanism, compliant) */}
   <section className="section-padding bg-white border-y border-border/60">
    <div className="max-w-3xl">
     <Eyebrow>Why it works</Eyebrow>
     <div className="space-y-5 text-lg md:text-xl text-[#1A1714]/80 leading-relaxed">
      <p>
       A long exhale is one of the few levers you have direct access to. It nudges the
       system from its switched-on state toward rest. You are not forcing calm. You are
       reminding the body of a setting it already has.
      </p>
      <p>
       Doing it at the same time each day is what makes it hold. The ritual is the result.
      </p>
     </div>
     <p className="mt-8 text-xs text-[#8A7F74] leading-relaxed">
      This is a wellbeing practice, not medical advice, and not a treatment for any condition.
     </p>
    </div>
   </section>

   {/* Next step */}
   <section className="section-padding">
    <div className="max-w-3xl">
     <Eyebrow>What comes next</Eyebrow>
     <h2 className="font-[Lora] italic text-[#1A1714] leading-[1.1] mb-6" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
      One true finding, every week.
     </h2>
     <p className="text-lg text-[#1A1714]/80 leading-relaxed mb-8 max-w-xl">
      You are on the list. Each week we send one real thing about how your system actually
      works. No hype. No noise. When you want the device that makes the ritual deeper, it
      will be there.
     </p>
     <div className="flex flex-col sm:flex-row gap-4">
      <a href="/movement#join" className="cta-pill">Back to the movement</a>
      <a href="/protocol/face-introducer" className="ghost-pill">See the ritual device</a>
     </div>
    </div>
   </section>
  </PageShell>
 );
};

export default Reset;
