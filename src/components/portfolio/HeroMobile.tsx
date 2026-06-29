import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { FRAME_URLS_MOBILE } from "@/lib/frames-mobile";

interface HeroMobileProps {
  images: HTMLImageElement[] | null;
}

export function HeroMobile({ images }: HeroMobileProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);
  const [textPhase, setTextPhase] = useState(0);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
    }
  };

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !images || !images.length) return;
    const img = images[Math.max(0, Math.min(images.length - 1, index))];
    if (!img || !img.complete) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cw, ch);

    const iw = img.naturalWidth || 720;
    const ih = img.naturalHeight || 1280;
    const scale = Math.max(cw / iw, ch / ih) * 1.4;
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) * 0.75;
    const dy = (ch - dh) * 0.3;
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  const startLoop = () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    let lastFrame = -1;
    const loop = () => {
      const current = frameRef.current;
      if (current !== lastFrame) {
        drawFrame(current);
        lastFrame = current;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    if (!images) return;
    resizeCanvas();
    drawFrame(0);
    startLoop();

    let textPhaseTimeout: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = total > 0 ? scrolled / total : 0;
      const idx = Math.min(
        FRAME_URLS_MOBILE.length - 1,
        Math.floor(progress * (FRAME_URLS_MOBILE.length - 1))
      );

      frameRef.current = idx;

      clearTimeout(textPhaseTimeout);
      textPhaseTimeout = setTimeout(() => {
        setTextPhase(idx >= Math.floor(FRAME_URLS_MOBILE.length * 0.65) ? 1 : 0);
      }, 50);
    };

    const onResize = () => {
      resizeCanvas();
      drawFrame(frameRef.current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      isRunningRef.current = false;
      clearTimeout(textPhaseTimeout);
    };
  }, [images]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "350vh", backgroundColor: "#000" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ display: "block" }}
        />

        {/* Gradient */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0) 75%)",
            opacity: textPhase ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        />

        {/* Text */}
        <div className="pointer-events-none absolute inset-0 flex items-end">
          <div className="pointer-events-auto w-full px-6 pb-8">
            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: textPhase ? 1 : 0,
                transform: textPhase ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {/* Top label */}
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px w-6 bg-gold" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
                · Available for Work
                </span>
              </div>

              {/* Name */}
              <h1 className="font-display text-5xl font-bold leading-tight text-white">
                Hassan<br />Rizwan
              </h1>

              {/* Roles */}
              <p className="mt-3 text-xl font-semibold text-gold">
                AI Automation Specialist
              </p>
              <p className="mt-1 text-lg font-medium text-white">
                Full Stack Web Developer
              </p>

              {/* Divider */}
              <div className="mt-4 h-px w-16 bg-gold/60" />

              {/* Stats row */}
              <div className="mt-4 flex gap-6">
                <div>
                  <div className="text-xl font-bold text-gold">50+</div>
                  <div className="text-[10px] uppercase tracking-wide text-white/50">Systems Built</div>
                </div>
                <div className="w-px bg-gold/20" />
                <div>
                  <div className="text-xl font-bold text-gold">8K+</div>
                  <div className="text-[10px] uppercase tracking-wide text-white/50">Professionals</div>
                </div>
                <div className="w-px bg-gold/20" />
                <div>
                  <div className="text-xl font-bold text-gold">2+</div>
                  <div className="text-[10px] uppercase tracking-wide text-white/50">Years Exp.</div>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Building AI-powered automation systems that solve real business problems — starting at 18.
              </p>

              {/* Buttons */}
              <div className="mt-6 flex gap-3 pb-2">
                <button
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                  className="flex-1 rounded-md bg-gold py-3 text-sm font-bold text-black"
                >
                  View My Work
                </button>
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="flex-1 rounded-md border border-gold bg-transparent py-3 text-sm font-bold text-gold"
                >
                  Let's Connect
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-gold"
          style={{ opacity: textPhase ? 0 : 0.9, transition: "opacity 0.4s ease" }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Scroll</span>
            <ChevronDown className="animate-bounce-soft" size={22} />
          </div>
        </div>
      </div>
    </section>
  );
}