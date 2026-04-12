import { AnnouncementBar } from "@/components/zential/AnnouncementBar";
import { Header } from "@/components/zential/Header";
import { ZentialFooter } from "@/components/zential/ZentialFooter";
import { NewsletterSection } from "@/components/zential/NewsletterSection";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const JournalArticle = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="The Night My Frequency Shifted — Zential Pure Journal"
        description="A reflection on what happens when microcurrent becomes more than skincare — a conversation with the nervous system, and a return to self-trust."
        canonicalUrl="/journal/frequency-shift"
        jsonLd={{ "@context": "https://schema.org", "@type": "Article", "headline": "The Night My Frequency Shifted, and I Finally Trusted the Stillness", "description": "A reflection on what happens when microcurrent becomes more than skincare — a conversation with the nervous system, and a return to self-trust.", "datePublished": "2026-02-16T00:00:00Z", "author": { "@type": "Organization", "name": "Zential Pure" }, "publisher": { "@type": "Organization", "name": "Zential Pure", "url": "https://zentialpure.com" }, "url": "https://zentialpure.com/journal/frequency-shift" }}
      />
      <AnnouncementBar />
      <Header />
      <main>
        {/* Article Header */}
        <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <Link to="/journal" className="text-xs tracking-[0.25em] uppercase text-teal hover:text-primary transition-colors mb-8 inline-block">
              ← Back to Journal
            </Link>
            <p className="text-xs tracking-[0.25em] uppercase text-primary mb-4 mt-6">Ritual · Deep Practice</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              The Night My Frequency Shifted, and I Finally Trusted the Stillness
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span>February 16, 2026</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span>12 min read</span>
            </div>
            <div className="w-16 h-px bg-primary/30 mt-8" />
          </div>
        </section>

        {/* Article Body */}
        <section className="px-6 md:px-12 lg:px-20 pb-16">
          <div className="max-w-3xl mx-auto space-y-8">

            {/* Opening */}
            <p className="text-lg text-foreground/90 leading-relaxed">
              There is a moment, just past the second minute of stillness, where the device stops feeling like a device and starts feeling like a conversation. The microcurrent hums against the jaw, barely perceptible, and something inside begins to loosen. Not a muscle. Something older. Something held.
            </p>

            <p className="text-foreground/80 leading-relaxed">
              Last night, I felt it. Not dramatically. Not like a revelation that announces itself in capital letters. More like a sigh the body had been holding for months, released without permission, without effort. The kind of exhale that rearranges your posture before you realize you were hunched.
            </p>

            <blockquote className="border-l-2 border-primary/30 pl-6 py-2 my-10">
              <p className="font-serif italic text-xl md:text-2xl text-foreground/70 leading-relaxed">
                "The frequency didn't change me. It reminded me of the frequency I already was, before the noise."
              </p>
            </blockquote>

            {/* Frequency & the Nervous System */}
            <h2 className="text-2xl font-bold text-foreground pt-4">The Body Knows Before the Mind Agrees</h2>

            <p className="text-foreground/80 leading-relaxed">
              We talk about frequency as if it's a metaphor. It isn't. Every cell in the body oscillates. Every thought carries an electrical signature. When you hold a microcurrent device against your skin, you're not adding something foreign. You're entraining. You're inviting your nervous system back to a rhythm it forgot it knew.
            </p>

            <p className="text-foreground/80 leading-relaxed">
              The vagus nerve, that ancient thread running from brainstem to belly, responds to gentle electrical stimulation the way a tuning fork responds to a struck note. It doesn't resist. It remembers. And when the vagus nerve remembers safety, the entire body follows: heart rate slows, digestion softens, the jaw unclenches, the eyes stop scanning for threat.
            </p>

            <p className="text-foreground/80 leading-relaxed">
              Last night, somewhere between the second and fourth minute of my ritual, I felt the shift. Not in my skin, though my skin felt warmer, more alive, flushed with something that wasn't just circulation. The shift was deeper. Somewhere behind my sternum. A settling. Like sediment finding the bottom of still water.
            </p>

            {/* Identity vs. Outcome */}
            <div className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-8 md:p-10 my-12">
              <p className="text-xs tracking-[0.2em] uppercase text-teal mb-4">Reflection</p>
              <h2 className="text-2xl font-bold text-foreground mb-4">Identity Over Outcome</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                We've been trained to chase results: the before-and-after, the measurement, the proof. But the most profound transformation I've experienced with this practice has nothing to do with how my skin looks in the mirror. It has to do with who I become when I show up for myself in the dark.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                The ritual rewires identity. Not through affirmation, but through repetition. Every evening I choose five minutes of stillness over five minutes of scrolling, I am casting a vote for a version of myself that trusts slowness. That believes gentleness is not weakness. That knows the most powerful thing I can do for my nervous system is <span className="italic font-serif">nothing at all</span>, held with intention.
              </p>
            </div>

            {/* Embodiment */}
            <h2 className="text-2xl font-bold text-foreground pt-4">What Embodiment Actually Feels Like</h2>

            <p className="text-foreground/80 leading-relaxed">
              It doesn't feel like enlightenment. It feels like warmth in the palms. A softness behind the eyes. A willingness to breathe all the way down to the belly instead of stopping at the chest. It feels like the moment between waking and sleeping where you're not performing for anyone, not even yourself.
            </p>

            <p className="text-foreground/80 leading-relaxed">
              The red light, 660 nanometers, the wavelength that penetrates just deep enough to reach the mitochondria, bathes the face in a warm amber glow. There's a reason every ancient healing tradition placed light at the center of its cosmology. Light is information. And when the right wavelength meets living tissue, something ancestral stirs.
            </p>

            <p className="text-foreground/80 leading-relaxed">
              I've started thinking of my evening ritual not as skincare, but as a form of self-trust. Every night I return to it, I am saying: <span className="font-serif italic">I am worth this pause. I am worth this attention. I am worth the slow, unglamorous work of becoming.</span>
            </p>

            <blockquote className="border-l-2 border-primary/30 pl-6 py-2 my-10">
              <p className="font-serif italic text-xl md:text-2xl text-foreground/70 leading-relaxed">
                "Self-trust is not built in breakthroughs. It is built in the returning, the quiet, unremarkable act of showing up again."
              </p>
            </blockquote>

            {/* Quiet Power */}
            <h2 className="text-2xl font-bold text-foreground pt-4">The Quiet Power of Low Frequency</h2>

            <p className="text-foreground/80 leading-relaxed">
              We live in a culture addicted to intensity. Harder workouts. Louder affirmations. More aggressive protocols. But the body doesn't heal in intensity. It heals in safety. Microcurrent operates below the threshold of sensation, at just 400 microamps, invisible to the conscious mind but deeply legible to the cell.
            </p>

            <p className="text-foreground/80 leading-relaxed">
              This is the paradox: the most transformative frequency is the one you can barely feel. The one that doesn't announce itself. The one that works in the background while you breathe, while you soften, while you let the day's armor dissolve.
            </p>

            <p className="text-foreground/80 leading-relaxed">
              There's a lesson in that for how we approach everything, from boundaries to self-worth, from sleep to healing. The most durable changes are the ones that arrive without force. The ones that accumulate so gradually you don't notice until one morning you catch your reflection and something is different. Not your face. Your presence.
            </p>

            {/* Ritual Steps */}
            <div className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-8 md:p-10 my-12">
              <p className="text-xs tracking-[0.2em] uppercase text-primary mb-4">Anchor Ritual</p>
              <h2 className="text-2xl font-bold text-foreground mb-6">Tonight's Practice: The Frequency Reset</h2>
              <p className="text-foreground/80 leading-relaxed mb-8">
                This is not a routine. It's a return. A way of telling your nervous system, and your deepest self, that you are safe enough to soften.
              </p>

              <div className="space-y-6">
                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center text-sm font-semibold text-primary shrink-0">01</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Arrive: 3 Breaths at the Threshold</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Before you touch the device, stand at the bathroom door. Three breaths. Inhale through the nose for 4 counts. Exhale through the mouth for 6. This isn't preparation, this is the ritual beginning. You are crossing from doing into being.</p>
                  </div>
                </div>

                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center text-sm font-semibold text-primary shrink-0">02</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Light: Bathe Before You Touch</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Turn on the red light mode. Hold the device 2-3 inches from your face. Close your eyes. Let the warmth reach you before the current does. 60 seconds. Feel the amber glow through your eyelids. This is the body's invitation to downregulate.</p>
                  </div>
                </div>

                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center text-sm font-semibold text-primary shrink-0">03</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Glide: Follow the Jaw, Release the Day</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Apply conductive gel. Begin at the jawline, where we hold tension, words unsaid, decisions unmade. Glide upward along the natural contours. Slow. Slower than you think. Let each stroke be a sentence you're writing to your future self: <span className="font-serif italic">I am not in a rush to become.</span></p>
                  </div>
                </div>

                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center text-sm font-semibold text-primary shrink-0">04</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Stillness: Hold at the Temples</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Rest the device at both temples. Don't move. Breathe. This is the integration point, where electrical frequency meets emotional frequency. 90 seconds of nothing. Notice what arises without narrating it. This is where self-trust is built: in the willingness to stay.</p>
                  </div>
                </div>

                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center text-sm font-semibold text-primary shrink-0">05</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Close: One Whispered Word</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">As you set the device down, choose one word. Not a mantra. Not an affirmation. A word that describes the version of you that just spent five minutes in sacred stillness. Carry it to sleep. Let it dissolve into the body overnight. Tomorrow, you'll wake up slightly different. Not because you forced it, because you allowed it.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Closing */}
            <div className="text-center py-8">
              <div className="w-16 h-px bg-primary/30 mx-auto mb-8" />
              <p className="font-serif italic text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-xl mx-auto">
                "You are not becoming someone new. You are remembering someone ancient, the one who knew that stillness was the highest frequency."
              </p>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-6">
                A Zential Evening
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

export default JournalArticle;
