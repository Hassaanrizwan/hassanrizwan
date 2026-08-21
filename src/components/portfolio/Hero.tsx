import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { FRAME_URLS } from "@/lib/frames";

interface HeroProps {
  images: HTMLImageElement[] | null;
}

const TEXT_REVEAL_THRESHOLD = 0.6;

export function Hero({ images }: HeroProps) {
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

    const iw = img.naturalWidth || 1280;
    const ih = img.naturalHeight || 720;
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;
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
    const revealFrameIndex = Math.floor(FRAME_URLS.length * TEXT_REVEAL_THRESHOLD);

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = total > 0 ? scrolled / total : 0;
      const idx = Math.min(
        FRAME_URLS.length - 1,
        Math.floor(progress * (FRAME_URLS.length - 1))
      );

      frameRef.current = idx;

      clearTimeout(textPhaseTimeout);
      textPhaseTimeout = setTimeout(() => {
        setTextPhase(idx >= revealFrameIndex ? 1 : 0);
      }, 30);
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
      style={{ height: "400vh", backgroundColor: "#000" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ display: "block" }}
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0) 60%)",
            opacity: textPhase ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        />

        <div className="pointer-events-none absolute inset-0 flex items-center">
          <div className="pointer-events-auto w-full max-w-7xl mx-auto px-6 md:px-10">
            <div
              className="max-w-xl transition-all duration-700 ease-out"
              style={{
                opacity: textPhase ? 1 : 0,
                transform: textPhase ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <h1 className="font-display text-5xl font-bold leading-[0.95] text-white md:text-7xl">
                Hassan Rizwan
              </h1>
              <p className="mt-4 text-xl font-medium text-gold md:text-2xl">
                AI Automation Specialist
              </p>
              <p className="mt-1 text-lg font-medium text-white md:text-[22px]">
                Full Stack Web Developer
              </p>
              <div className="mt-6 h-px w-24 bg-gold/60" />
              <p
                className="mt-4 text-sm md:text-base"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                8,000+ professionals trust my work — built at 18.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() =>
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="rounded-md bg-gold px-6 py-3 text-sm font-semibold text-black transition-all hover:gold-glow"
                >
                  View My Work
                </button>
                <button
                  onClick={() =>
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="rounded-md border border-gold bg-transparent px-6 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-black"
                >
                  Let's Connect
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-gold"
          style={{
            opacity: textPhase ? 0 : 0.9,
            transition: "opacity 0.4s ease",
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Scroll
            </span>
            <ChevronDown className="animate-bounce-soft" size={22} />
          </div>
        </div>
      </div>
    </section>
  );
}