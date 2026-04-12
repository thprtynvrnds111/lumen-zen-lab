import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
import { NewsletterSection } from "@/components/zential/NewsletterSection";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const JournalRitual = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="The 5-Minute Evening Protocol — Zential Pure Journal"
        description="A structured guide to integrating microcurrent therapy into your nightly wind-down. Designed for consistency, not perfection."
        canonicalUrl="/journal/evening-protocol"
        jsonLd={{ "@context": "https://schema.org", "@type": "Article", "headline": "The 5-Minute Evening Protocol", "description": "A structured guide to integrating microcurrent therapy into your nightly wind-down. Designed for consistency, not perfection.", "datePublished": "2026-02-05T00:00:00Z", "author": { "@type": "Organization", "name": "Zential Pure" }, "publisher": { "@type": "Organization", "name": "Zential Pure", "url": "https://zentialpure.com" }, "url": "https://zentialpure.com/journal/evening-protocol" }}
      />
      <AnnouncementBar />
      <Header />
      <main>
        <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <Link to="/journal" className="text-xs tracking-[0.25em] uppercase text-teal hover:text-primary transition-colors mb-8 inline-block">
              ← Back to Journal
            </Link>
            <p className="text-xs tracking-[0.25em] uppercase text-primary mb-4 mt-6">Ritual · Evening Practice</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              The 5-Minute Evening Protocol
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span>February 5, 2026</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span>5 min read</span>
            </div>
            <div className="w-16 h-px bg-primary/30 mt-8" />
          </div>
        </section>

        <section className="px-6 md:px-12 lg:px-20 pb-16">
          <div className="max-w-3xl mx-auto space-y-8">

            <p className="text-lg text-foreground/90 leading-relaxed">
              The evening doesn't begin when the sun sets. It begins when you decide the day is done, when you choose to stop producing and start returning. This protocol is built for that exact threshold. Not as another task on your list, but as the signal your nervous system has been waiting for: we are safe now. We can soften.
            </p>

            <p className="text-foreground/80 leading-relaxed">
              Five minutes. That's all. Not because more wouldn't be beneficial, but because five minutes is the minimum effective dose for consistency. The protocol that works is the one you actually do. Every night. Without negotiation. Without needing to feel inspired first.
            </p>

            <h2 className="text-2xl font-bold text-foreground pt-4">Why the Evening Matters</h2>

            <p className="text-foreground/80 leading-relaxed">
              Cortisol peaks in the morning and should taper through the day, reaching its lowest point in the hours before sleep. But for most of us, it doesn't. The blue light, the late emails, the doom scroll, they keep cortisol elevated long past its biological curfew. The result is skin that can't repair, a mind that can't rest, and a nervous system stuck in a low-grade state of alert.
            </p>

            <p className="text-foreground/80 leading-relaxed">
              The evening protocol creates a physiological off-ramp. Not through willpower, but through signal. When the body encounters consistent cues (same time, same sequence, same gentle stimulus), it begins to anticipate rest before the practice even begins. After two weeks, most people report that simply picking up the device triggers a parasympathetic shift. The ritual has become the signal.
            </p>

            <div className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-8 md:p-10 my-12">
              <p className="text-xs tracking-[0.2em] uppercase text-primary mb-4">The Protocol</p>
              <h2 className="text-2xl font-bold text-foreground mb-6">Your 5-Minute Evening Sequence</h2>
              <p className="text-foreground/80 leading-relaxed mb-8">
                Perform this sequence at the same time each evening, ideally 30 to 60 minutes before sleep. Consistency of timing matters more than perfection of technique.
              </p>

              <div className="space-y-6">
                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center text-sm font-semibold text-primary shrink-0">01</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Transition (30 seconds)</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Put your phone in another room. Not on silent, not face down. In another room. Stand at your bathroom mirror and take three slow breaths. This isn't meditation. This is just a doorway. You're crossing from performance into presence.</p>
                  </div>
                </div>

                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center text-sm font-semibold text-primary shrink-0">02</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Cleanse (60 seconds)</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Warm water. A gentle cleanser. Move slowly. Feel the temperature on your skin. This isn't about removing the day's dirt; it's about acknowledging the day happened. Every stroke is a small act of closure.</p>
                  </div>
                </div>

                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center text-sm font-semibold text-primary shrink-0">03</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Apply Conductive Gel (30 seconds)</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">A thin, even layer across the cheeks, jawline, and forehead. The gel serves two purposes: it enhances microcurrent conductivity, and the cool, smooth texture is itself a sensory cue that downregulates the nervous system.</p>
                  </div>
                </div>

                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center text-sm font-semibold text-primary shrink-0">04</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Microcurrent Glide (2 minutes)</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Begin at the jawline. Glide upward along the natural contours of the face: jaw to cheekbone, cheekbone to temple, forehead center to hairline. Each stroke should take 3 to 4 seconds. No pressure. The current does the work. Your only job is to move slowly and breathe.</p>
                  </div>
                </div>

                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center text-sm font-semibold text-primary shrink-0">05</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Red Light Hold (60 seconds)</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Switch to red light mode. Hold the device 2 inches from your face. Close your eyes. The 660nm wavelength penetrates the dermis, supporting mitochondrial function and collagen synthesis. But right now, you don't need to think about any of that. Just feel the warmth. Let it be enough.</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-foreground pt-4">What Happens When You Stop Negotiating</h2>

            <p className="text-foreground/80 leading-relaxed">
              The first week, five minutes will feel like nothing. The second week, it will feel like everything. Not because the practice changes, but because you do. You start to notice the quality of your sleep shifting. The tension in your jaw softening. The way your skin looks in morning light, not dramatically different, but somehow more present. More yours.
            </p>

            <p className="text-foreground/80 leading-relaxed">
              Consistency is not about discipline. It's about removing the decision. When you commit to the same five minutes at the same time, you are no longer choosing each night whether to show up for yourself. The choice has already been made. All that remains is the doing, and the doing, over time, becomes the deepest form of self-trust there is.
            </p>

            <blockquote className="border-l-2 border-primary/30 pl-6 py-2 my-10">
              <p className="font-serif italic text-xl md:text-2xl text-foreground/70 leading-relaxed">
                "The ritual that transforms you is the one so simple you can do it on your worst day."
              </p>
            </blockquote>

            <h2 className="text-2xl font-bold text-foreground pt-4">Adapting Without Abandoning</h2>

            <p className="text-foreground/80 leading-relaxed">
              There will be nights when five minutes feels impossible. Travel, illness, exhaustion, life. On those nights, do two minutes. Or one. Or simply hold the device in your hands, breathe three times, and set it down. The protocol is not a performance. It's a relationship. And relationships survive imperfection. What they don't survive is abandonment.
            </p>

            <p className="text-foreground/80 leading-relaxed">
              The goal is never perfection. The goal is continuity. A thread that runs through your evenings, connecting this night to the last and the next, weaving something stronger than any single session could produce. That thread is the ritual. And the ritual, over time, becomes you.
            </p>

            <div className="text-center py-8">
              <div className="w-16 h-px bg-primary/30 mx-auto mb-8" />
              <p className="font-serif italic text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-xl mx-auto">
                "Transformation comes from repetition, not force. Show up gently, and the body will meet you there."
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

export default JournalRitual;
