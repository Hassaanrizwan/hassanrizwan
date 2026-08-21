"use client";

import { Trophy, Users, Calendar } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ITEMS = [
  {
    Icon: Trophy,
    number: "50+",
    stat: "Real-World Automation Systems Built",
    desc: "Production-grade workflows deployed across CRM, AI, and operations.",
  },
  {
    Icon: Users,
    number: "8,000+",
    stat: "Professionals Trust My Work at Age 18",
    desc: "A community built on results, not marketing.",
  },
  {
    Icon: Calendar,
    number: "2+",
    stat: "Years Delivering Client-Ready Solutions",
    desc: "Hands-on building since day one. Shipping, not theorizing.",
  },
];

function useCountUp(target: string, active: boolean) {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!active) return;
    const num = parseInt(target.replace(/\D/g, ""), 10);
    const suffix = target.replace(/[\d]/g, "");
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(ease * num) + suffix);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target]);
  return display;
}

function StatCard({
  item,
  index,
  sectionVisible,
  mouse,
}: {
  item: (typeof ITEMS)[0];
  index: number;
  sectionVisible: boolean;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [cardVisible, setCardVisible] = useState(false);
  const count = useCountUp(item.number, cardVisible);
  const raf = useRef<number>(0);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setCardVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const animate = () => {
      const rect = card.getBoundingClientRect();
      const cx = mouse.current.x - rect.left;
      const cy = mouse.current.y - rect.top;
      const inside =
        cx >= -60 && cx <= rect.width + 60 && cy >= -60 && cy <= rect.height + 60;

      if (inside) {
        glow.style.opacity = "1";
        glow.style.left = cx + "px";
        glow.style.top = cy + "px";

        const rx = ((cy - rect.height / 2) / rect.height) * -8;
        const ry = ((cx - rect.width / 2) / rect.width) * 8;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
      } else {
        glow.style.opacity = "0";
        card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [mouse]);

  const { Icon } = item;

  return (
    <div
      ref={cardRef}
      style={{
        position: "relative",
        background: "#0d0d0d",
        border: "1px solid rgba(245,166,35,0.15)",
        padding: "40px 32px 36px",
        overflow: "hidden",
        transformStyle: "preserve-3d",
        transition:
          "transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease, opacity 0.7s cubic-bezier(0.22,1,0.36,1), translate 0.7s cubic-bezier(0.22,1,0.36,1)",
        opacity: cardVisible ? 1 : 0,
        translate: cardVisible
          ? "0 0"
          : index === 0
          ? "-60px 0"
          : index === 2
          ? "60px 0"
          : "0 40px",
        borderColor: "rgba(245,166,35,0.15)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245,166,35,0.5)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245,166,35,0.15)";
      }}
    >
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 70%)",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
          transition: "opacity 0.3s ease",
          opacity: 0,
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "2px",
          width: cardVisible ? "100%" : "0%",
          background: "linear-gradient(90deg, transparent, #f5a623 50%, transparent)",
          transition: "width 1s cubic-bezier(0.22,1,0.36,1) 0.3s",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "52px",
            height: "52px",
            border: "1px solid rgba(245,166,35,0.3)",
            marginBottom: "20px",
            background: "rgba(245,166,35,0.06)",
          }}
        >
          <Icon size={24} color="#f5a623" />
        </div>

        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(36px, 4vw, 52px)",
            fontWeight: 800,
            color: "#f5a623",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginBottom: "8px",
          }}
        >
          {count}
        </div>

        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.35,
            marginBottom: "10px",
          }}
        >
          {item.stat}
        </h3>

        <div
          style={{
            width: "32px",
            height: "1px",
            background: "rgba(245,166,35,0.4)",
            marginBottom: "12px",
          }}
        />

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.45)",
          }}
        >
          {item.desc}
        </p>
      </div>
    </div>
  );
}

export function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionVisible, setSectionVisible] = useState(false);
  const mouse = useRef({ x: -999, y: -999 });

  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement[]>([]);
  const trailPositions = useRef<{ x: number; y: number }[]>([]);
  const TRAIL_COUNT = 8;
  const rafRef = useRef<number>(0);
  const ringPos = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setSectionVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(section);

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onEnter = () => {
      if (cursorDotRef.current) cursorDotRef.current.style.opacity = "1";
      if (cursorRingRef.current) cursorRingRef.current.style.opacity = "1";
      cursorTrailRef.current.forEach((t) => { if (t) t.style.opacity = "1"; });
    };
    const onLeave = () => {
      if (cursorDotRef.current) cursorDotRef.current.style.opacity = "0";
      if (cursorRingRef.current) cursorRingRef.current.style.opacity = "0";
      cursorTrailRef.current.forEach((t) => { if (t) t.style.opacity = "0"; });
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseenter", onEnter);
    section.addEventListener("mouseleave", onLeave);

    trailPositions.current = Array.from({ length: TRAIL_COUNT }, () => ({
      x: -999,
      y: -999,
    }));

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      const mx = mouse.current.x;
      const my = mouse.current.y;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = mx + "px";
        cursorDotRef.current.style.top = my + "px";
      }

      ringPos.current.x = lerp(ringPos.current.x, mx, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, my, 0.12);
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = ringPos.current.x + "px";
        cursorRingRef.current.style.top = ringPos.current.y + "px";
      }

      trailPositions.current[0] = {
        x: lerp(trailPositions.current[0]?.x ?? mx, mx, 0.28),
        y: lerp(trailPositions.current[0]?.y ?? my, my, 0.28),
      };
      for (let i = 1; i < TRAIL_COUNT; i++) {
        trailPositions.current[i] = {
          x: lerp(trailPositions.current[i]?.x ?? mx, trailPositions.current[i - 1].x, 0.35),
          y: lerp(trailPositions.current[i]?.y ?? my, trailPositions.current[i - 1].y, 0.35),
        };
      }
      cursorTrailRef.current.forEach((el, i) => {
        if (!el) return;
        const scale = 1 - i / TRAIL_COUNT;
        const alpha = (1 - i / TRAIL_COUNT) * 0.55;
        el.style.left = trailPositions.current[i].x + "px";
        el.style.top = trailPositions.current[i].y + "px";
        el.style.width = 6 * scale + "px";
        el.style.height = 6 * scale + "px";
        el.style.opacity = String(alpha);
      });

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      obs.disconnect();
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseenter", onEnter);
      section.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "#0A0A0A", cursor: "none" }}
    >
      <div
        ref={cursorDotRef}
        style={{
          position: "absolute",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "#f5a623",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
          zIndex: 100,
          opacity: 0,
          mixBlendMode: "screen",
        }}
      />

      <div
        ref={cursorRingRef}
        style={{
          position: "absolute",
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          border: "1.5px solid rgba(245,166,35,0.6)",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
          zIndex: 100,
          opacity: 0,
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
        }}
      />

      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) cursorTrailRef.current[i] = el; }}
          style={{
            position: "absolute",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#f5a623",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
            zIndex: 99,
            opacity: 0,
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          overflow: "hidden",
          opacity: 0.013,
        }}
      >
        <span
          style={{
            fontSize: "18vw",
            fontWeight: 900,
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: "-0.05em",
            whiteSpace: "nowrap",
          }}
        >
          RESULTS
        </span>
      </div>

      <div className="relative mx-auto max-w-6xl px-6" style={{ zIndex: 2 }}>

        <div
          className="text-center mb-20"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(28px)",
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
              Track Record
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
            Why Work{" "}
            <span style={{ color: "#f5a623" }}>With Me</span>
          </h2>

          <div style={{ margin: "20px auto 0", height: "1px", width: "48px", background: "rgba(245,166,35,0.5)" }} />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {ITEMS.map((item, i) => (
            <StatCard
              key={item.stat}
              item={item}
              index={i}
              sectionVisible={sectionVisible}
              mouse={mouse}
            />
          ))}
        </div>

        <div
          style={{
            marginTop: "64px",
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s",
          }}
        >
          <blockquote
            style={{
              position: "relative",
              border: "1px solid rgba(245,166,35,0.4)",
              background: "rgba(245,166,35,0.03)",
              padding: "48px 56px",
              maxWidth: "780px",
              margin: "0 auto",
              overflow: "hidden",
            }}
          >
            {[
              { top: 0, left: 0 },
              { top: 0, right: 0 },
              { bottom: 0, left: 0 },
              { bottom: 0, right: 0 },
            ].map((pos, i) => (
              <span
                key={i}
                style={{
                  position: "absolute",
                  width: "12px",
                  height: "12px",
                  ...pos,
                  borderTop: pos.top === 0 ? "2px solid #f5a623" : undefined,
                  borderBottom: pos.bottom === 0 ? "2px solid #f5a623" : undefined,
                  borderLeft: pos.left === 0 ? "2px solid #f5a623" : undefined,
                  borderRight: pos.right === 0 ? "2px solid #f5a623" : undefined,
                }}
              />
            ))}

            <span
              style={{
                position: "absolute",
                top: "12px",
                left: "20px",
                fontFamily: "Georgia, serif",
                fontSize: "80px",
                lineHeight: 1,
                color: "rgba(245,166,35,0.25)",
                userSelect: "none",
              }}
            >
              "
            </span>

            <p
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(17px, 2.2vw, 22px)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#ffffff",
                lineHeight: 1.65,
                textAlign: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              I don't just build automations —{" "}
              <span style={{ color: "#f5a623" }}>
                I build systems that work while you sleep.
              </span>
            </p>

            <span
              style={{
                position: "absolute",
                bottom: "0px",
                right: "20px",
                fontFamily: "Georgia, serif",
                fontSize: "80px",
                lineHeight: 1,
                color: "rgba(245,166,35,0.25)",
                userSelect: "none",
              }}
            >
              "
            </span>
          </blockquote>
        </div>

      </div>
    </section>
  );
}