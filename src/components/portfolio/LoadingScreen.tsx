import { useEffect, useRef, useState } from "react";
import portrait from "./hassan.png";

interface LoaderProps {
  onReady: (images: HTMLImageElement[]) => void;
}

const STATUSES = ["Preparing experience", "Loading assets", "Calibrating systems", "Almost ready"];
const NAME = "Hassan Rizwan";

export function LoadingScreen({ onReady }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [visibleChars, setVisibleChars] = useState(0);
  const [taglineVisible, setTaglineVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const loader = loaderRef.current;
    if (!canvas || !loader) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = loader.offsetWidth;
      canvas.height = loader.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.3,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.5 - 0.1,
      opacity: Math.random() * 0.5 + 0.1,
      life: Math.random(),
    }));

    let rafId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life += 0.003;
        if (p.y < 0 || p.life > 1) {
          p.y = canvas.height + 5;
          p.x = Math.random() * canvas.width;
          p.life = 0;
        }
        const alpha = p.opacity * Math.sin(p.life * Math.PI);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,166,35,${alpha})`;
        ctx.fill();
      });
      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Name letter reveal
  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setVisibleChars(i);
        if (i >= NAME.length) {
          clearInterval(interval);
          setTimeout(() => setTaglineVisible(true), 200);
        }
      }, 55);
      return () => clearInterval(interval);
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  // Frame preloading — same logic as before
  useEffect(() => {
    // Dynamically import FRAME_URLS to avoid circular deps
    import("@/lib/frames").then(({ FRAME_URLS }) => {
      let loaded = 0;
      const total = FRAME_URLS.length;
      const images: HTMLImageElement[] = new Array(total);
      let cancelled = false;

      if (total === 0) {
        setProgress(100);
        setDone(true);
        onReady([]);
        setTimeout(() => setHidden(true), 700);
        return;
      }

      FRAME_URLS.forEach((url, i) => {
        const img = new Image();
        img.decoding = "async";
        img.src = url;
        const bump = () => {
          if (cancelled) return;
          loaded += 1;
          images[i] = img;
          setProgress(Math.round((loaded / total) * 100));
          if (loaded === total) {
            setDone(true);
            onReady(images);
            setTimeout(() => setHidden(true), 700);
          }
        };
        img.onload = bump;
        img.onerror = bump;
      });

      return () => { cancelled = true; };
    });
  }, [onReady]);

  if (hidden) return null;

  const statusIndex = Math.floor((progress / 100) * (STATUSES.length - 1));

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100] overflow-hidden flex flex-col items-center justify-center bg-black"
      style={{ opacity: done ? 0 : 1, pointerEvents: done ? "none" : "auto", transition: "opacity 0.7s ease" }}
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(245,166,35,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Structural lines */}
      <div className="absolute pointer-events-none" style={{ top: "20%", left: 0, right: 0, height: "1px", background: "rgba(245,166,35,0.08)" }} />
      <div className="absolute pointer-events-none" style={{ bottom: "20%", left: 0, right: 0, height: "1px", background: "rgba(245,166,35,0.08)" }} />
      <div className="absolute pointer-events-none" style={{ left: "20%", top: 0, bottom: 0, width: "1px", background: "rgba(245,166,35,0.08)" }} />
      <div className="absolute pointer-events-none" style={{ right: "20%", top: 0, bottom: 0, width: "1px", background: "rgba(245,166,35,0.08)" }} />

      {/* Scanning line */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(245,166,35,0.6), transparent)",
          animation: "scanLine 3s linear infinite",
        }}
      />

      {/* Corner brackets */}
      {[["top-6 left-6 border-t border-l", "tl"], ["top-6 right-6 border-t border-r", "tr"], ["bottom-6 left-6 border-b border-l", "bl"], ["bottom-6 right-6 border-b border-r", "br"]].map(([cls]) => (
        <div key={cls} className={`absolute w-7 h-7 pointer-events-none ${cls}`} style={{ borderColor: "#f5a623", borderWidth: "1.5px" }} />
      ))}

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* HR Logo */}
        <div
          className="w-[150px] h-[200px] rounded-[18px] overflow-hidden"
          style={{ animation: "logoPulse 2s ease-in-out infinite", boxShadow: "0 0 0 2px #f5a623" }}
        >
          <img
            src={portrait}
            alt="Hassan Rizwan"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center top" }}
          />
        </div>

        {/* Name reveal */}
        <div className="mt-8 flex overflow-hidden">
          {NAME.split("").map((char, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                width: char === " " ? "16px" : "auto",
                fontSize: "42px",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-1px",
                fontFamily: "inherit",
                opacity: i < visibleChars ? 1 : 0,
                transform: i < visibleChars ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}
            >
              {char === " " ? "" : char}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <p
          className="mt-2 text-[11px] tracking-[0.35em] uppercase"
          style={{
            color: "#f5a623",
            opacity: taglineVisible ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        >
          AI Automation · Full Stack Dev
        </p>

        {/* Progress bar */}
        <div className="mt-10 w-[280px]">
          <div className="flex justify-between mb-2">
            <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
              Initializing
            </span>
            <span className="text-[11px] font-bold tabular-nums" style={{ color: "#f5a623" }}>
              {progress}%
            </span>
          </div>
          <div className="relative h-[2px]" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div
              className="h-full relative"
              style={{
                width: `${progress}%`,
                background: "#f5a623",
                transition: "width 0.15s ease",
              }}
            >
              <div
                className="absolute right-[-3px] top-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full"
                style={{ background: "#f5a623", boxShadow: "0 0 8px 2px rgba(245,166,35,0.6)" }}
              />
            </div>
          </div>
          <p className="mt-3 text-[9px] tracking-[0.25em] uppercase" style={{ color: "rgba(255,255,255,0.25)", minHeight: "14px" }}>
            {STATUSES[Math.min(statusIndex, STATUSES.length - 1)]}
          </p>
        </div>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes scanLine { 0% { top: -2px; } 100% { top: 100%; } }
        @keyframes logoPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(245,166,35,0.4), 0 0 0 0 rgba(245,166,35,0.15); }
          50% { box-shadow: 0 0 0 12px rgba(245,166,35,0.15), 0 0 0 24px rgba(245,166,35,0.05); }
        }
      `}</style>
    </div>
  );
}