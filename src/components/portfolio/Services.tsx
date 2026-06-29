"use client";

import {
  Bot, Workflow, Brain, Code2, Users, Globe,
  Figma, Database, Server, Zap, Mail, BarChart3,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SERVICES = [
  {
    Icon: Bot,
    title: "CRM Automation",
    tag: "GoHighLevel",
    desc: "Full GoHighLevel setup, pipeline automation, lead management, tagging, follow-up sequences, and conversion tracking.",
    from: "right",
  },
  {
    Icon: Users,
    title: "Lead Generation",
    tag: "AI-Powered",
    desc: "Automated lead capture, scoring, and routing. AI-driven qualification funnels that filter, rank, and deliver sales-ready contacts.",
    from: "left",
  },
  {
    Icon: Workflow,
    title: "Workflow Automation",
    tag: "n8n / Make",
    desc: "End-to-end n8n workflow engineering, multi-step automations, API integrations, and scalable system architecture.",
    from: "right",
  },
  {
    Icon: Brain,
    title: "AI Integration",
    tag: "OpenAI / Claude",
    desc: "OpenAI and Claude API integration, AI-powered decision systems, structured outputs, and intelligent automation logic.",
    from: "left",
  },
  {
    Icon: Globe,
    title: "Web Development",
    tag: "Next.js / React",
    desc: "Production-grade web applications with Next.js, server-side rendering, API routes, and performance-optimized deployment.",
    from: "right",
  },
  {
    Icon: Code2,
    title: "Frontend Design",
    tag: "Tailwind / GSAP",
    desc: "Pixel-perfect interfaces with advanced scroll animations, micro-interactions, and editorial design systems.",
    from: "left",
  },
  {
    Icon: Figma,
    title: "Figma Design",
    tag: "UI / UX",
    desc: "High-fidelity wireframes, component libraries, and interactive prototypes. Design systems built for developer handoff.",
    from: "right",
  },
  {
    Icon: Server,
    title: "Backend Development",
    tag: "Node / FastAPI",
    desc: "RESTful API design, authentication systems, middleware, and server architecture built for scale and reliability.",
    from: "left",
  },
  {
    Icon: Database,
    title: "Database Integration",
    tag: "Supabase / Postgres",
    desc: "Schema design, relational and document databases, real-time subscriptions, and optimized query performance.",
    from: "right",
  },
  {
    Icon: Mail,
    title: "Email Automation",
    tag: "Sequences / Drip",
    desc: "Multi-step email sequences, conditional branching, open/click tracking, and deliverability optimization.",
    from: "left",
  },
  {
    Icon: Zap,
    title: "AI Agent Development",
    tag: "Multi-Agent",
    desc: "Autonomous AI agents with memory, tool use, and decision trees. Multi-agent orchestration for complex business logic.",
    from: "right",
  },
  {
    Icon: BarChart3,
    title: "Analytics & Reporting",
    tag: "Dashboards",
    desc: "Automated reporting pipelines, custom dashboards, KPI tracking, and data visualization for business intelligence.",
    from: "left",
  },
];

function useScrollReveal(ref: React.RefObject<HTMLElement>, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useScrollReveal(ref as React.RefObject<HTMLElement>, 0.2);
  const { Icon, title, tag, desc, from } = service;

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(0) scale(1)"
          : from === "right"
          ? "translateX(90px) scale(0.96)"
          : "translateX(-90px) scale(0.96)",
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 40}ms,
                     transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 40}ms`,
        position: "relative",
        background: "#0d0d0d",
        border: "1px solid rgba(245,166,35,0.15)",
        padding: "36px 32px",
        overflow: "hidden",
        cursor: "none",
      }}
      className="group service-card"
    >
      {/* Animated top border sweep */}
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "1.5px",
          width: "0%",
          background: "linear-gradient(90deg, transparent, #f5a623, transparent)",
          transition: "width 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
        className="group-hover:!w-full"
      />

      {/* Ambient glow on hover */}
      <span
        style={{
          position: "absolute",
          bottom: "-60px",
          right: "-60px",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)",
          opacity: 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
        className="group-hover:!opacity-100"
      />

      {/* Tag */}
      <span
        style={{
          display: "inline-block",
          fontSize: "9px",
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(245,166,35,0.6)",
          fontFamily: "'Inter', sans-serif",
          marginBottom: "16px",
          border: "1px solid rgba(245,166,35,0.2)",
          padding: "3px 8px",
        }}
      >
        {tag}
      </span>

      {/* Icon */}
      <div style={{ marginBottom: "16px" }}>
        <Icon
          size={32}
          style={{
            color: "#f5a623",
            transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
          }}
          className="group-hover:scale-110"
        />
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(18px, 2vw, 22px)",
          fontWeight: 700,
          color: "#ffffff",
          lineHeight: 1.2,
          marginBottom: "12px",
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "13px",
          lineHeight: 1.75,
          color: "rgba(255,255,255,0.45)",
          maxWidth: "360px",
        }}
      >
        {desc}
      </p>

      {/* Bottom index number */}
      <span
        style={{
          position: "absolute",
          right: "20px",
          bottom: "16px",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.15em",
          color: "rgba(245,166,35,0.2)",
          fontFamily: "'Inter', sans-serif",
          transition: "color 0.3s ease",
        }}
        className="group-hover:!text-gold/50"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

export function Services() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingVisible = useScrollReveal(headingRef as React.RefObject<HTMLElement>, 0.3);

  // Custom cursor
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const section = sectionRef.current;
    const cursor = cursorRef.current;
    const cursorRing = cursorRingRef.current;
    if (!section || !cursor || !cursorRing) return;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onEnter = () => {
      cursor.style.opacity = "1";
      cursorRing.style.opacity = "1";
    };
    const onLeave = () => {
      cursor.style.opacity = "0";
      cursorRing.style.opacity = "0";
    };

    const onCardEnter = () => {
      cursor.style.transform = "translate(-50%,-50%) scale(2.5)";
      cursorRing.style.transform = "translate(-50%,-50%) scale(1.6)";
      cursorRing.style.borderColor = "rgba(245,166,35,0.8)";
    };
    const onCardLeave = () => {
      cursor.style.transform = "translate(-50%,-50%) scale(1)";
      cursorRing.style.transform = "translate(-50%,-50%) scale(1)";
      cursorRing.style.borderColor = "rgba(245,166,35,0.4)";
    };

    const cards = section.querySelectorAll(".service-card");
    cards.forEach((c) => {
      c.addEventListener("mouseenter", onCardEnter);
      c.addEventListener("mouseleave", onCardLeave);
    });

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseenter", onEnter);
    section.addEventListener("mouseleave", onLeave);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.1);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.1);

      cursor.style.left = mouse.current.x + "px";
      cursor.style.top = mouse.current.y + "px";
      cursorRing.style.left = ring.current.x + "px";
      cursorRing.style.top = ring.current.y + "px";

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseenter", onEnter);
      section.removeEventListener("mouseleave", onLeave);
      cards.forEach((c) => {
        c.removeEventListener("mouseenter", onCardEnter);
        c.removeEventListener("mouseleave", onCardLeave);
      });
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "#0A0A0A", cursor: "none" }}
    >
      {/* Custom cursor dot */}
      <div
        ref={cursorRef}
        style={{
          position: "absolute",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#f5a623",
          transform: "translate(-50%,-50%) scale(1)",
          pointerEvents: "none",
          zIndex: 50,
          opacity: 0,
          transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1), opacity 0.2s ease",
        }}
      />
      {/* Cursor ring (lagging) */}
      <div
        ref={cursorRingRef}
        style={{
          position: "absolute",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "1.5px solid rgba(245,166,35,0.4)",
          transform: "translate(-50%,-50%) scale(1)",
          pointerEvents: "none",
          zIndex: 50,
          opacity: 0,
          transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease, opacity 0.2s ease",
        }}
      />

      {/* Faint bg word */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          overflow: "hidden",
          opacity: 0.012,
        }}
      >
        <span
          style={{
            fontSize: "16vw",
            fontWeight: 900,
            textTransform: "uppercase",
            color: "#ffffff",
            letterSpacing: "-0.05em",
            whiteSpace: "nowrap",
          }}
        >
          SERVICES
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6" style={{ zIndex: 2 }}>
        {/* Heading */}
        <div
          ref={headingRef}
          className="text-center mb-20"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div style={{ height: "1px", width: "60px", background: "rgba(245,166,35,0.3)" }} />
            <span
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#f5a623",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              What I Offer
            </span>
            <div style={{ height: "1px", width: "60px", background: "rgba(245,166,35,0.3)" }} />
          </div>

          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Services &amp;{" "}
            <span style={{ color: "#f5a623" }}>Expertise</span>
          </h2>

          <div
            style={{
              margin: "20px auto 0",
              height: "1px",
              width: "48px",
              background: "rgba(245,166,35,0.5)",
            }}
          />
        </div>

        {/* Cards grid */}
        <div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}