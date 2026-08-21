import { Bot, Workflow, Brain, Mail, Sheet, Braces, Code2, Database, Zap, Server, MessageSquare, Globe } from "lucide-react";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";

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
  "Zapier Automation",
  "Make (Integromat) Workflows",
  "Webhook Configuration",
  "API Integration & Orchestration",
  "Chatbot Development",
  "AI Prompt Engineering",
  "Data Scraping & Parsing",
  "Auto-Reporting Systems",
  "Multi-Step Workflow Design",
  "CRM Pipeline Management",
  "Appointment Booking Automation",
  "SMS & WhatsApp Automation",
  "AI Agent Development",
  "Voice AI Integration",
  "Airtable Automation",
  "Notion Automation",
  "Slack Bot Development",
  "Error Handling & Retry Logic",
  "Rate Limiting & Throttling",
  "OAuth & Token Management",
  "Business Process Automation (BPA)",
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
  "TypeScript",
  "Tailwind CSS",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "Supabase",
  "Firebase",
  "GraphQL",
  "Docker Basics",
  "CI/CD Pipelines",
  "Vercel Deployment",
  "Cloudflare Workers",
  "React Query",
  "Zustand / Redux",
  "Framer Motion",
  "WebSockets",
  "Server Side Rendering (SSR)",
  "Static Site Generation (SSG)",
  "Responsive Design",
  "Web Performance Optimization",
  "SEO Best Practices",
];

const TOOLS = [
  { label: "n8n",           Icon: Workflow },
  { label: "GoHighLevel",   Icon: Bot },
  { label: "OpenAI",        Icon: Brain },
  { label: "Claude AI",     Icon: Zap },
  { label: "Gmail",         Icon: Mail },
  { label: "Google Sheets", Icon: Sheet },
  { label: "JSON",          Icon: Braces },
  { label: "Next.js",       Icon: Globe },
  { label: "Supabase",      Icon: Database },
  { label: "TypeScript",    Icon: Code2 },
  { label: "Telegram",      Icon: Mail },
  { label: "Vercel",        Icon: Server },
];

interface Point { x: number; y: number }
interface Bolt { pts: Point[]; alpha: number; decay: number; width: number }

function useLightning(
  sectionRef: React.RefObject<HTMLElement | null>,
  pillRegistry: React.RefObject<Map<string, HTMLSpanElement>>
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -999, y: -999 });
  const bolts = useRef<Bolt[]>([]);
  const raf = useRef<number>(0);
  const lastStrike = useRef<Map<string, number>>(new Map());

  const jitter = (pts: Point[], spread: number): Point[] => {
    if (pts.length >= 10) return pts;
    const next: Point[] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      const mid = {
        x: (a.x + b.x) / 2 + (Math.random() - 0.5) * spread,
        y: (a.y + b.y) / 2 + (Math.random() - 0.5) * spread,
      };
      next.push(a, mid);
    }
    next.push(pts[pts.length - 1]);
    return jitter(next, spread * 0.5);
  };

  const spawnBolt = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { x, y } = mouse.current;
    const angle = Math.random() * Math.PI * 2;
    const length = 40 + Math.random() * 80;
    const end = {
      x: x + Math.cos(angle) * length,
      y: y + Math.sin(angle) * length,
    };
    const raw: Point[] = [{ x, y }, end];
    const pts = jitter(raw, length * 0.4);
    bolts.current.push({
      pts,
      alpha: 0.7 + Math.random() * 0.3,
      decay: 0.06 + Math.random() * 0.04,
      width: 0.8 + Math.random() * 0.8,
    });
    if (Math.random() > 0.55) {
      const branchPt = pts[Math.floor(pts.length * 0.4)];
      const bAngle = angle + (Math.random() - 0.5) * 1.4;
      const bLen = length * (0.3 + Math.random() * 0.3);
      const bEnd = {
        x: branchPt.x + Math.cos(bAngle) * bLen,
        y: branchPt.y + Math.sin(bAngle) * bLen,
      };
      bolts.current.push({
        pts: jitter([branchPt, bEnd], bLen * 0.35),
        alpha: 0.45 + Math.random() * 0.25,
        decay: 0.08 + Math.random() * 0.05,
        width: 0.5 + Math.random() * 0.4,
      });
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const resize = () => {
      canvas.width  = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let spawnInterval = 0;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onEnter = () => {
      spawnInterval = window.setInterval(spawnBolt, 60);
    };
    const onLeave = () => {
      clearInterval(spawnInterval);
      mouse.current = { x: -999, y: -999 };
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseenter", onEnter);
    section.addEventListener("mouseleave", onLeave);

    const strikeRadius = 46;
    const strikeCooldown = 500;

    const checkPillStrikes = () => {
      const registry = pillRegistry.current;
      if (!registry || !section) return;
      const sectionRect = section.getBoundingClientRect();
      const now = performance.now();

      for (const bolt of bolts.current) {
        if (bolt.alpha < bolt.decay * 2) continue;
        const tip = bolt.pts[bolt.pts.length - 1];

        registry.forEach((el, key) => {
          const last = lastStrike.current.get(key) || 0;
          if (now - last < strikeCooldown) return;

          const r = el.getBoundingClientRect();
          const cx = r.left - sectionRect.left + r.width / 2;
          const cy = r.top - sectionRect.top + r.height / 2;
          const dx = tip.x - cx;
          const dy = tip.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < strikeRadius) {
            lastStrike.current.set(key, now);
            el.classList.remove("pill-struck");
            void el.offsetWidth;
            el.classList.add("pill-struck");
          }
        });
      }
    };

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bolts.current = bolts.current.filter((b) => b.alpha > 0.01);

      for (const bolt of bolts.current) {
        ctx.beginPath();
        ctx.moveTo(bolt.pts[0].x, bolt.pts[0].y);
        for (let i = 1; i < bolt.pts.length; i++) {
          ctx.lineTo(bolt.pts[i].x, bolt.pts[i].y);
        }
        ctx.strokeStyle = `rgba(245,166,35,${bolt.alpha * 0.18})`;
        ctx.lineWidth = bolt.width * 5;
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.strokeStyle = `rgba(255,220,100,${bolt.alpha})`;
        ctx.lineWidth = bolt.width;
        ctx.stroke();

        bolt.alpha -= bolt.decay;
      }

      checkPillStrikes();

      raf.current = requestAnimationFrame(draw);
    };
    raf.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseenter", onEnter);
      section.removeEventListener("mouseleave", onLeave);
      clearInterval(spawnInterval);
      cancelAnimationFrame(raf.current);
    };
  }, [spawnBolt, sectionRef]);

  return canvasRef;
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function randomOffset() {
  const angle = Math.random() * Math.PI * 2;
  const distance = 180 + Math.random() * 260;
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance - 60,
    rotate: (Math.random() - 0.5) * 50,
  };
}

function Pill({
  label,
  delay,
  inView,
  pillRegistry,
}: {
  label: string;
  delay: number;
  inView: boolean;
  pillRegistry: React.RefObject<Map<string, HTMLSpanElement>>;
}) {
  const start = useMemo(randomOffset, []);
  const setRef = useCallback(
    (el: HTMLSpanElement | null) => {
      if (el) pillRegistry.current.set(label, el);
      else pillRegistry.current.delete(label);
    },
    [label, pillRegistry]
  );
  return (
    <span
      ref={setRef}
      className="group relative inline-flex cursor-default items-center overflow-hidden px-4 py-2 pill-strikable"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translate(0px, 0px) rotate(0deg)"
          : `translate(${start.x}px, ${start.y}px) rotate(${start.rotate}deg)`,
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        border: "1px solid rgba(245,166,35,0.25)",
        background: "transparent",
      }}
    >
      <span
        className="absolute inset-0 bg-gold transition-transform duration-400 ease-out"
        style={{ transform: "translateX(-101%)" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
        }}
      />
      <span
        className="relative z-10 mr-2 h-[5px] w-[5px] rounded-full bg-gold transition-colors duration-300 group-hover:bg-black"
        style={{ flexShrink: 0 }}
      />
      <span
        className="relative z-10 transition-colors duration-300 group-hover:text-black"
        style={{
          fontSize: "13px",
          fontWeight: 400,
          letterSpacing: "0.02em",
          color: "rgba(255,255,255,0.8)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {label}
      </span>
    </span>
  );
}

function SkillColumn({
  title,
  skills,
  from,
  pillRegistry,
}: {
  title: string;
  skills: string[];
  from: "left" | "right";
  pillRegistry: React.RefObject<Map<string, HTMLSpanElement>>;
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref}>
      <div
        style={{
          opacity: inView ? 1 : 0,
          transform: inView
            ? "translateX(0)"
            : from === "left"
            ? "translateX(-30px)"
            : "translateX(30px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-6 bg-gold" />
          <h3
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#f5a623",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {title}
          </h3>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {skills.map((s, i) => (
          <Pill key={s} label={s} delay={40 + i * 45} inView={inView} pillRegistry={pillRegistry} />
        ))}
      </div>
    </div>
  );
}

function ToolCard({
  label,
  Icon,
  delay,
  inView,
}: {
  label: string;
  Icon: React.ElementType;
  delay: number;
  inView: boolean;
}) {
  return (
    <div
      className="group relative flex flex-col items-center justify-center gap-3 overflow-hidden border border-gold/20 bg-black px-4 py-6 transition-colors duration-300 hover:border-gold/60"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      <span className="absolute inset-0 -translate-y-full bg-gold transition-transform duration-300 group-hover:translate-y-0" />
      <Icon
        className="relative z-10 text-gold transition-colors duration-300 group-hover:text-black"
        size={24}
      />
      <span
        className="relative z-10 transition-colors duration-300 group-hover:text-black"
        style={{
          fontSize: "12px",
          fontWeight: 500,
          letterSpacing: "0.05em",
          color: "rgba(255,255,255,0.7)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export function Skills() {
  const { ref: headingRef, inView: headingInView } = useInView(0.3);
  const { ref: toolsRef, inView: toolsInView } = useInView(0.1);

  const sectionRef = useRef<HTMLElement>(null);
  const pillRegistry = useRef<Map<string, HTMLSpanElement>>(new Map());
  const canvasRef = useLightning(sectionRef, pillRegistry);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "#0A0A0A" }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <style>{`
        .pill-strikable {
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1),
                      transform 0.7s cubic-bezier(0.22,1,0.36,1),
                      border-color 0.15s ease,
                      box-shadow 0.15s ease;
        }
        .pill-struck {
          animation: pillZap 0.5s ease-out;
        }
        @keyframes pillZap {
          0% {
            border-color: rgba(255,220,100,1);
            box-shadow: 0 0 18px 3px rgba(245,166,35,0.7);
            transform: scale(1.1);
          }
          60% {
            border-color: rgba(255,220,100,0.6);
            box-shadow: 0 0 10px 2px rgba(245,166,35,0.35);
          }
          100% {
            border-color: rgba(245,166,35,0.25);
            box-shadow: none;
            transform: scale(1);
          }
        }
      `}</style>

      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
        style={{ opacity: 0.015, zIndex: 0 }}
      >
        <span
          className="font-black uppercase text-white"
          style={{ fontSize: "18vw", letterSpacing: "-0.05em" }}
        >
          SKILLS
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6" style={{ zIndex: 2 }}>

        <div
          ref={headingRef}
          className="text-center mb-20"
          style={{
            opacity: headingInView ? 1 : 0,
            transform: headingInView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-16 bg-gold/30" />
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
              What I Do
            </span>
            <div className="h-px w-16 bg-gold/30" />
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
            Skills &amp;{" "}
            <span style={{ color: "#f5a623" }}>Expertise</span>
          </h2>

          <div className="mx-auto mt-5 h-px w-12 bg-gold/50" />
        </div>

        <div className="grid gap-16 md:grid-cols-2">
          <SkillColumn title="Automation & AI" skills={AUTOMATION} from="left" pillRegistry={pillRegistry} />
          <SkillColumn title="Development & Tech" skills={DEV} from="right" pillRegistry={pillRegistry} />
        </div>

        <div ref={toolsRef} className="mt-24">
          <div
            className="text-center mb-10"
            style={{
              opacity: toolsInView ? 1 : 0,
              transform: toolsInView ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gold/20" />
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Tools &amp; Technologies
              </span>
              <div className="h-px w-16 bg-gold/20" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {TOOLS.map(({ label, Icon }, i) => (
              <ToolCard
                key={label}
                label={label}
                Icon={Icon}
                delay={i * 80}
                inView={toolsInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}