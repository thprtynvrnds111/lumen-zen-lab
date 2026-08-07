import { PageShell } from "@/components/zential/v2/PageShell";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#8E8E8E] mb-4">
      {children}
    </p>
  );
}

const SECTIONS = [
  {
    k: "What lands today",
    b: "The moment you join the Founding Circle you receive: the 30-Day Nervous-System Reset programme, the Daily Reset Library, and your named place in the Founding 100. These are delivered immediately and are yours to keep.",
  },
  {
    k: "What is locked for later",
    b: "Three parts of the founding offer are commitments we honour as they become available: a seat in the first guided cohort when it runs, a founding price on the Face Introducer device when you choose to buy one, and a lifetime founding rate on the membership if and when the membership opens. You are never charged again for any of these. If the membership never opens, you have lost nothing and paid nothing further.",
  },
  {
    k: "The 30-Day Reset Guarantee",
    b: "Run the programme for 30 days. If your practice does not feel more your own, reply to your welcome email within 30 days of purchase for a full refund. You keep the protocol. No forms, no friction.",
  },
  {
    k: "Right of withdrawal",
    b: "Where statutory withdrawal rights apply (for example under EU consumer law), they are in addition to the guarantee above. Because the digital programme is delivered immediately on purchase, you consent to that immediate access when you join. The 30-day guarantee applies regardless.",
  },
  {
    k: "This is a wellbeing practice",
    b: "The reset and the protocol are a wellbeing practice. They are not medical advice, not a diagnosis, and not a treatment for any condition. If you have a health concern, speak with a qualified professional.",
  },
  {
    k: "Your data",
    b: "Your streak and practice progress are stored on your own device. If you join by email, we use it to deliver the programme and the weekly note, and you can leave at any time. See our Privacy page for the full detail.",
  },
];

const FoundingTerms = () => {
  return (
    <PageShell
      title="Founding Circle terms | Zential Pure"
      description="What the Founding Circle includes, what is guaranteed, what is conditional, and how the guarantee and refund work."
      canonical="/founding-terms"
      eyebrow="ZENTIAL PURE · THE MOVEMENT"
      displayTitle="Founding terms."
      displaySubtitle="Plain language. What you get today, what is locked for later, and how the guarantee works."
      stickyTag="Terms 01"
    >
      <section className="section-padding">
        <div className="max-w-3xl space-y-8">
          {SECTIONS.map((s) => (
            <div key={s.k} className="border-l-2 border-[#0E7A54] pl-6">
              <Eyebrow>{s.k}</Eyebrow>
              <p className="text-base md:text-lg text-[#5A5A5A] leading-relaxed">{s.b}</p>
            </div>
          ))}
          <div className="pt-4">
            <a href="/movement#join" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2ED8A8] px-7 py-4 font-sans text-[12px] font-semibold tracking-[0.16em] uppercase text-[#141414] transition-colors hover:bg-[#1BAF86]">Back to the movement</a>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default FoundingTerms;
