import { Bot, Workflow, Brain, Code2 } from "lucide-react";

const SERVICES = [
  {
    Icon: Bot,
    title: "CRM Automation",
    desc: "Full GoHighLevel setup, pipeline automation, lead management, tagging, follow-up sequences, and conversion tracking.",
  },
  {
    Icon: Workflow,
    title: "Workflow Automation",
    desc: "End-to-end n8n workflow engineering, multi-step automations, API integrations, and scalable system architecture.",
  },
  {
    Icon: Brain,
    title: "AI Integration",
    desc: "OpenAI API integration, AI-powered decision systems, lead qualification, and intelligent automation logic.",
  },
  {
    Icon: Code2,
    title: "Full Stack Development",
    desc: "React and Next.js web applications, REST API development, database integration, and production-ready deployment.",
  },
];

export function Services() {
  return (
    <section id="services" className="section-pad" style={{ background: "#0A0A0A" }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal text-center">
          <h2 className="heading-underline mx-auto font-display text-4xl font-bold text-white md:text-5xl">
            What I Offer
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {SERVICES.map(({ Icon, title, desc }, i) => (
            <div
              key={title}
              className="reveal group relative overflow-hidden border border-gold/30 bg-black p-10 transition-all duration-300 hover:border-gold hover:gold-glow-lg"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Icon className="text-gold" size={42} />
              <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                {title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                {desc}
              </p>
              <div
                className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-gold/10 blur-3xl transition-opacity duration-500"
                style={{ opacity: 0 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
