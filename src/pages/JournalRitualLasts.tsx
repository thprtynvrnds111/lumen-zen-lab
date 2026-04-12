import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
import { NewsletterSection } from "@/components/zential/NewsletterSection";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const JournalRitualLasts = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Building a Skin Ritual That Lasts — Zential Pure Journal"
        description="Consistency over intensity. How to design a personal protocol that adapts to your life, without burnout or guilt."
        canonicalUrl="/journal/ritual-that-lasts"
      />
      <AnnouncementBar />
      <Header />
      <main>
        <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <Link to="/journal" className="text-xs tracking-[0.25em] uppercase text-teal hover:text-primary transition-colors mb-8 inline-block">
              ← Back to Journal
            </Link>
            <p className="text-xs tracking-[0.25em] uppercase text-primary mb-4 mt-6">Ritual · Philosophy</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              Building a Skin Ritual That Lasts
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span>January 7, 2026</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span>4 min read</span>
            </div>
            <div className="w-16 h-px bg-primary/30 mt-8" />
          </div>
        </section>

        <section className="px-6 md:px-12 lg:px-20 pb-16">
          <div className="max-w-3xl mx-auto space-y-8">

            <p className="text-lg text-foreground/90 leading-relaxed">
              You've tried the 10-step routines. The 30-day challenges. The elaborate Sunday reset protocols with masks and tools and timers. They worked for a week, maybe two. Then life happened. The routine felt like another demand. And you stopped. Not because you didn't care, but because the system wasn't built for a human life. It was built for an Instagram grid.
            </p>

            <p className="text-foreground/80 leading-relaxed">
              A ritual that lasts is not a routine that's been optimized. It's a relationship that's been simplified. The difference is fundamental. A routine asks you to perform. A ritual asks you to return. One measures compliance. The other measures presence.
            </p>

            <h2 className="text-2xl font-bold text-foreground pt-4">The Minimum Viable Ritual</h2>

            <p className="text-foreground/80 leading-relaxed">
              Start with less than you think you need. Not because less is better in some minimalist, aesthetic sense, but because the nervous system builds habits through repetition, not duration. A 2-minute practice done every night for 90 days will reshape your relationship with self-care more profoundly than a 45-minute session done inconsistently for a month.
            </p>

            <p className="text-foreground/80 leading-relaxed">
              The minimum viable ritual has three elements: a trigger (something you already do every night, like brushing your teeth), an action (one pass with your device, 60 seconds of light, three breaths), and a close (setting the device down, turning off the bathroom light). That's it. Everything else is optional expansion that can be added later, once the foundation is load-bearing.
            </p>

            <div className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-8 md:p-10 my-12">
              <p className="text-xs tracking-[0.2em] uppercase text-teal mb-4">Psychology</p>
              <h2 className="text-2xl font-bold text-foreground mb-4">Why Habits Break (and What to Do Instead)</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Behavioral research consistently shows that habits break not because we lose motivation, but because we lose the environmental cue. The trigger disappears. The device gets put in a drawer. The gel runs out and we don't reorder. The bathroom gets reorganized. We travel.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                The solution isn't more willpower. It's more visibility. Keep your device where you can see it. Keep it charged. Keep the gel next to the toothpaste. Design your environment so that the path of least resistance leads directly to your ritual. You're not fighting laziness. You're designing for the version of yourself that comes home exhausted at 11pm and has exactly enough energy to do one small, meaningful thing before bed.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-foreground pt-4">Scaling Without Breaking</h2>

            <p className="text-foreground/80 leading-relaxed">
              Once you've maintained the minimum viable ritual for two to three weeks, you'll notice something: you want to do more. Not from guilt or obligation, but from genuine momentum. The practice has become a pocket of calm in your evening, and the body wants to expand it. This is the moment to add, not before.
            </p>

            <p className="text-foreground/80 leading-relaxed">
              Add one element at a time. Maybe it's extending the microcurrent session from 60 seconds to three minutes. Maybe it's adding the red light hold at the end. Maybe it's the three breaths at the beginning that turn 120 seconds into a genuine ritual rather than a rushed task. Each addition should feel like a gift, not a burden. The moment it feels like obligation, you've added too much. Scale back. The ritual will wait.
            </p>

            <blockquote className="border-l-2 border-primary/30 pl-6 py-2 my-10">
              <p className="font-serif italic text-xl md:text-2xl text-foreground/70 leading-relaxed">
                "The ritual that lasts is the one you can do on your hardest day. Everything else is bonus."
              </p>
            </blockquote>

            <h2 className="text-2xl font-bold text-foreground pt-4">Permission to Be Imperfect</h2>

            <p className="text-foreground/80 leading-relaxed">
              You will miss nights. You will travel without your device. You will have weeks where survival mode is the only mode available. This is not failure. This is life. The difference between a ritual that lasts and one that doesn't isn't whether you miss a night. It's whether you come back the next one.
            </p>

            <p className="text-foreground/80 leading-relaxed">
              The return is the practice. Not the streak. Not the perfect month on a habit tracker. The quiet, unglamorous act of picking up the device again after three days, or a week, or a month, and beginning again without self-punishment. That is the real ritual. That is where the transformation lives. Not in the perfection, but in the returning.
            </p>

            <h2 className="text-2xl font-bold text-foreground pt-4">What You're Actually Building</h2>

            <p className="text-foreground/80 leading-relaxed">
              A skin ritual that lasts isn't really about skin. It's about building a relationship with yourself that can survive imperfection. It's about proving, night after night, that you are worth five minutes of undivided attention. It's about creating one space in your day that belongs entirely to you, unborrowed, unshared, unproductive in every way except the one that matters most.
            </p>

            <p className="text-foreground/80 leading-relaxed">
              The collagen will rebuild. The lymph will flow. The muscles will remember their tone. But the deepest thing you're building is trust. Trust that you will show up for yourself. Trust that gentleness works. Trust that the slow, invisible accumulation of small acts of care is, in the end, the most powerful force there is.
            </p>

            <div className="text-center py-8">
              <div className="w-16 h-px bg-primary/30 mx-auto mb-8" />
              <p className="font-serif italic text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-xl mx-auto">
                "Consistency isn't about never stopping. It's about always beginning again."
              </p>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-6">
                The Zential Philosophy
              </p>
            </div>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <ZentialFooter />
    </div>
  );
};

export default JournalRitualLasts;
