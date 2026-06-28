import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    title: "AI-Powered Lead Qualification & CRM Automation",
    desc: "Designed an AI-driven system to categorize leads into Hot, Warm, and Cold. Integrated AI for structured decision-making, automated CRM updates, conditional emails, scam filtering, validation, and error handling.",
    url: "https://github.com/hassanrizwan247/n8n-ai-lead-qualification-crm-automation",
  },
  {
    title: "Full CRM Pipeline Automation (GoHighLevel)",
    desc: "Built a complete lead lifecycle automation system. Created multi-step follow-ups and engagement workflows. Automated tagging, segmentation, and conversion tracking.",
    url: "https://github.com/hassanrizwan247/n8n-Secure-Contact-Form-CRM-Email-Automation",
  },
  {
    title: "High-Priority Task Automation System",
    desc: "Developed a logic-based system to identify urgent tasks and priorities. Triggered real-time automated alerts and notifications.",
    url: "https://github.com/hassanrizwan247/n8n-Client-Risk-Assessment-Action-Routing-System",
  },
  {
    title: "Smart Email Reminder System",
    desc: "Built conditional, weekday-based scheduling automation. Implemented dynamic time-based logic.",
    url: "https://github.com/hassanrizwan247/n8n-Secure-Contact-Form-CRM-Email-Automation",
  },
  {
    title: "Daily Reminder Automation",
    desc: "Designed an automated daily notification system for consistency and productivity.",
    url: "https://github.com/hassanrizwan247/n8n-AI-Powered-Client-Follow-Up-Deal-Rescue-Automation-",
  },
  {
    title: "Google Sheets CRM Automation",
    desc: "Automated data handling, updates, and tracking. Used as a backend system for CRM workflows.",
    url: "https://github.com/hassanrizwan247?tab=repositories",
  },
  {
    title: "AI + Automation Systems",
    desc: "Built experimental AI-integrated workflows. Focused on structured outputs and real-world usability.",
    url: "https://github.com/hassanrizwan247?tab=repositories",
  },
];

export function Projects() {
  return (
    <section id="projects" className="section-pad bg-black">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal text-center">
          <h2 className="heading-underline mx-auto font-display text-4xl font-bold text-white md:text-5xl">
            Projects
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-muted-foreground">
            A selection of automation and AI systems engineered for real
            businesses.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <a
              key={p.title}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="reveal group relative flex flex-col border-t-2 border-gold bg-surface p-7 transition-all duration-300 hover:-translate-y-2 hover:gold-glow"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="absolute right-5 top-4 font-display text-5xl font-bold text-gold/40 transition-colors group-hover:text-gold/80">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-8 pr-14 font-display text-xl font-semibold text-white">
                {p.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {p.desc}
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span>View on GitHub</span>
                <ArrowUpRight size={16} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
