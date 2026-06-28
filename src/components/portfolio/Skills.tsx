import { Bot, Workflow, Brain, Mail, Sheet, Braces } from "lucide-react";

const AUTOMATION = [
  "CRM Automation (GoHighLevel)",
  "Workflow Automation (n8n)",
  "AI Integrations (OpenAI API)",
  "Lead Management & Sales Pipelines",
  "Email Automation & Sequences",
  "Google Sheets Data Automation",
  "JSON Structuring & Debugging",
  "Conditional Logic & Workflow Design",
  "Process Optimization & System Thinking",
];

const DEV = [
  "Full Stack Web Development",
  "React.js",
  "Next.js",
  "Node.js",
  "JavaScript",
  "HTML & CSS",
  "REST APIs",
  "Database Integration",
  "Git & Version Control",
];

const TOOLS = [
  { label: "n8n", Icon: Workflow },
  { label: "GoHighLevel", Icon: Bot },
  { label: "OpenAI", Icon: Brain },
  { label: "Gmail", Icon: Mail },
  { label: "Google Sheets", Icon: Sheet },
  { label: "JSON", Icon: Braces },
];

function Pill({ label, delay }: { label: string; delay: number }) {
  return (
    <span
      className="reveal inline-flex cursor-default items-center rounded-full border border-gold/70 bg-black px-4 py-2 text-sm text-white transition-all duration-300 hover:bg-gold hover:text-black hover:gold-glow"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {label}
    </span>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section-pad" style={{ background: "#0A0A0A" }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal text-center">
          <h2 className="heading-underline mx-auto font-display text-4xl font-bold text-white md:text-5xl">
            Skills &amp; Expertise
          </h2>
        </div>

        <div className="mt-20 grid gap-14 md:grid-cols-2">
          <div className="reveal">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
              Automation &amp; AI
            </h3>
            <div className="mt-6 flex flex-wrap gap-3">
              {AUTOMATION.map((s, i) => (
                <Pill key={s} label={s} delay={i * 40} />
              ))}
            </div>
          </div>

          <div className="reveal">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
              Development &amp; Tech
            </h3>
            <div className="mt-6 flex flex-wrap gap-3">
              {DEV.map((s, i) => (
                <Pill key={s} label={s} delay={i * 40} />
              ))}
            </div>
          </div>
        </div>

        <div className="reveal mt-20">
          <h3 className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Tools &amp; Technologies
          </h3>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {TOOLS.map(({ label, Icon }) => (
              <div
                key={label}
                className="group flex flex-col items-center justify-center gap-3 border border-gold/20 bg-black px-4 py-6 transition-all hover:border-gold hover:gold-glow"
              >
                <Icon className="text-gold transition-transform group-hover:scale-110" size={28} />
                <span className="text-sm text-white">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
