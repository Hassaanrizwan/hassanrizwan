import { Trophy, Users, Calendar } from "lucide-react";

const ITEMS = [
  {
    Icon: Trophy,
    stat: "50+ Real-World Automation Systems Built",
    desc: "Production-grade workflows deployed across CRM, AI, and operations.",
  },
  {
    Icon: Users,
    stat: "8,000+ Professionals Trust My Work at Age 18",
    desc: "A community built on results, not marketing.",
  },
  {
    Icon: Calendar,
    stat: "2+ Years Delivering Client-Ready Solutions",
    desc: "Hands-on building since day one. Shipping, not theorizing.",
  },
];

export function Achievements() {
  return (
    <section className="section-pad bg-black">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal text-center">
          <h2 className="heading-underline mx-auto font-display text-4xl font-bold text-white md:text-5xl">
            Why Work With Me
          </h2>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-0">
          {ITEMS.map(({ Icon, stat, desc }, i) => (
            <div
              key={stat}
              className="reveal relative px-6 text-center md:px-10"
              style={{
                borderRight:
                  i < ITEMS.length - 1 ? "1px solid rgba(245,166,35,0.25)" : "none",
              }}
            >
              <Icon className="mx-auto text-gold" size={40} />
              <h3 className="mt-5 font-display text-xl font-bold text-white">
                {stat}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {desc}
              </p>
            </div>
          ))}
        </div>

        <div className="reveal mt-20 mx-auto max-w-3xl">
          <blockquote className="relative border border-gold bg-gold/[0.04] px-8 py-10 text-center font-display text-xl italic text-white md:text-2xl gold-glow">
            <span className="absolute -top-5 left-6 bg-black px-3 font-display text-4xl text-gold">
              “
            </span>
            I don't just build automations — I build systems that work while you
            sleep.
            <span className="absolute -bottom-8 right-6 bg-black px-3 font-display text-4xl text-gold">
              ”
            </span>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
