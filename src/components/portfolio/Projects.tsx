"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Total horizontal scroll distance = (cards - 1) * card width with gap
    // We pin the section for enough vertical scroll to traverse all cards
    const CARD_COUNT = PROJECTS.length;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowH = window.innerHeight;

      // Progress: 0 when section top hits viewport top, 1 when section bottom exits
      const scrollable = sectionHeight - windowH;
      const progress = Math.max(0, Math.min(1, -sectionTop / scrollable));

      // Translate track horizontally based on progress
      const trackW = track.scrollWidth - track.offsetWidth;
      track.style.transform = `translateX(-${progress * trackW}px)`;

      // Active card index
      const idx = Math.round(progress * (CARD_COUNT - 1));
      setActiveIndex(idx);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    /*
      The section is tall enough to act as scroll space.
      `sticky top-0` keeps the visible window pinned while the
      outer section scrolls past.
    */
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: `${PROJECTS.length * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">

        {/* Header */}
        <div className="pt-16 pb-8 text-center px-6 shrink-0">
          <h2 className="heading-underline mx-auto font-display text-4xl font-bold text-white md:text-5xl">
            Projects
          </h2>
          <p className="mt-4 text-muted-foreground text-sm max-w-xl mx-auto">
            A selection of automation and AI systems engineered for real businesses.
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6 shrink-0">
          {PROJECTS.map((_, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                width: i === activeIndex ? "24px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === activeIndex ? "#f5a623" : "rgba(245,166,35,0.25)",
                transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
              }}
            />
          ))}
        </div>

        {/* Horizontal track */}
        <div className="relative flex-1 overflow-hidden px-[10vw]">
          <div
            ref={trackRef}
            className="flex gap-6 h-full will-change-transform"
            style={{ transition: "transform 0.05s linear" }}
          >
            {PROJECTS.map((p, i) => (
              <ProjectCard
                key={p.title}
                project={p}
                index={i}
                active={i === activeIndex}
              />
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="shrink-0 text-center pb-6 pt-4"
          style={{
            fontSize: "11px",
            letterSpacing: "0.2em",
            color: "rgba(245,166,35,0.35)",
            fontFamily: "'Inter', sans-serif",
            textTransform: "uppercase",
            opacity: activeIndex === PROJECTS.length - 1 ? 0 : 1,
            transition: "opacity 0.5s ease",
          }}
        >
          scroll to explore
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  active,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  active: boolean;
}) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className="group shrink-0 flex flex-col relative"
      style={{
        width: "clamp(300px, 38vw, 480px)",
        height: "calc(100% - 32px)",
        alignSelf: "center",
        background: "#0d0d0d",
        border: "1px solid",
        borderColor: active ? "rgba(245,166,35,0.5)" : "rgba(255,255,255,0.06)",
        padding: "36px 32px",
        transform: active
          ? "scale(1) translateY(0px)"
          : "scale(0.94) translateY(12px)",
        opacity: active ? 1 : 0.45,
        transition:
          "transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.55s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease",
        textDecoration: "none",
        overflow: "hidden",
      }}
    >
      {/* Gold top border that grows in when active */}
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "2px",
          width: active ? "100%" : "0%",
          background: "#f5a623",
          transition: "width 0.6s cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      {/* Number */}
      <span
        style={{
          position: "absolute",
          right: "24px",
          top: "20px",
          fontFamily: "'Inter', sans-serif",
          fontSize: "52px",
          fontWeight: 800,
          lineHeight: 1,
          color: active ? "rgba(245,166,35,0.7)" : "rgba(245,166,35,0.15)",
          transition: "color 0.4s ease",
          letterSpacing: "-0.03em",
          userSelect: "none",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Content */}
      <div className="flex flex-col flex-1 mt-10">
        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(15px, 2vw, 19px)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.3,
            paddingRight: "48px",
            marginBottom: "16px",
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontSize: "13px",
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.5)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {project.desc}
        </p>

        <div
          style={{
            marginTop: "auto",
            paddingTop: "28px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.05em",
            color: "#f5a623",
            fontFamily: "'Inter', sans-serif",
            opacity: active ? 1 : 0,
            transform: active ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s",
            textTransform: "uppercase",
          }}
        >
          <span>View on GitHub</span>
          <ArrowUpRight size={14} />
        </div>
      </div>

      {/* Hover gold fill overlay */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(245,166,35,0.03)",
          opacity: 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
        className="group-hover:opacity-100"
      />
    </a>
  );
}