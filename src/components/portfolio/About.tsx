import portrait from "@/assets/hassan-potrait.png";

const STATS = [
  { value: "50+", label: "Automation Systems Built" },
  { value: "2+", label: "Years of Experience" },
  { value: "8K+", label: "Professionals Who Trust My Work" },
  { value: "18", label: "Age When It All Started" },
];

export function About() {
  return (
    <section id="about" className="section-pad relative bg-black">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:items-center">
        {/* Portrait */}
        <div className="reveal relative mx-auto w-full max-w-md">
          <div className="absolute -bottom-6 -right-6 h-full w-full bg-gold/90" />
          <div className="relative aspect-[4/5] w-full overflow-hidden border-2 border-gold bg-black">
            <img
              src={portrait}
              alt="Hassan Rizwan portrait"
              className="h-full w-full object-cover"
              style={{ objectPosition: "center 25%" }}
              loading="lazy"
            />
          </div>
        </div>

        {/* Content */}
        <div className="reveal">
          <h2 className="heading-underline font-display text-4xl font-bold text-white md:text-5xl">
            About Me
          </h2>
          <p className="mt-10 text-lg font-semibold text-gold">
            AI Automation Expert &amp; Full Stack Developer
          </p>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            I'm Hassan Rizwan, an AI Automation Specialist and Full Stack Web
            Developer from Pakistan with 2+ years of hands-on experience
            building real-world automation systems. I've engineered and deployed
            50+ automation workflows across CRM, AI, and productivity
            platforms. I specialize in GoHighLevel CRM automation, n8n workflow
            engineering, and building end-to-end AI-powered systems that solve
            real business problems. What makes me different — I built all of
            this starting at 18 years old, earning the trust of 8,000+
            professionals along the way.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="border-t-2 border-gold bg-surface px-4 py-5 transition-transform hover:-translate-y-1"
              >
                <div className="font-display text-3xl font-bold text-gold md:text-4xl">
                  {s.value}
                </div>
                <div className="mt-2 text-xs leading-snug text-white">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
