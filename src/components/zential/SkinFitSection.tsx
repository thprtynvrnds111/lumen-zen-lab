import { useState } from "react";

const steps = [
  { label: "Skin type", options: ["Normal", "Dry", "Oily", "Combination", "Sensitive"] },
  { label: "Primary concern", options: ["Lifting", "Firmness", "Texture", "Tone"] },
  { label: "Sensitivity", options: ["None", "Mild", "High"] },
];

export function SkinFitSection() {
  const [answers, setAnswers] = useState<(string | null)[]>([null, null, null]);
  const currentStep = answers.findIndex((a) => a === null);
  const complete = currentStep === -1;
  const isHighSensitivity = answers[2] === "High";

  const select = (stepIdx: number, value: string) => {
    const next = [...answers];
    next[stepIdx] = value;
    setAnswers(next);
  };

  const reset = () => setAnswers([null, null, null]);

  return (
    <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28" style={{ backgroundColor: '#F7F4F0' }}>
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-serif italic text-3xl md:text-4xl text-foreground mb-2">
          Is this right for your skin?
        </h2>
        <p className="text-sm text-foreground/60 mb-12">Three questions. Honest answer.</p>

        {!complete ? (
          <div>
            <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#9B5A2E' }}>
              {steps[currentStep].label}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {steps[currentStep].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => select(currentStep, opt)}
                  className="px-5 py-2.5 text-sm rounded-md border transition-colors hover:bg-black/[0.03]"
                  style={{ borderColor: '#C6A07C', color: '#9B5A2E' }}
                >
                  {opt}
                </button>
              ))}
            </div>
            <p className="text-xs text-foreground/40 mt-6">
              Step {currentStep + 1} of 3
            </p>
          </div>
        ) : (
          <div>
            <div className="rounded-lg p-6 mb-6" style={{ backgroundColor: '#EFEBE5', border: '1px solid #E4DFD8' }}>
              <p className="text-sm text-foreground leading-relaxed">
                {isHighSensitivity
                  ? "This device is suitable for you — start on the lowest intensity setting and work up over 2 weeks."
                  : "This device is suitable for you."}
              </p>
            </div>
            <button
              onClick={reset}
              className="text-xs font-medium hover:underline"
              style={{ color: '#9B5A2E' }}
            >
              Retake →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
