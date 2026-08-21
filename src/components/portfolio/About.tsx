import portrait from "@/assets/hassan-potrait.png";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 50, suffix: "+", label: "Automation Systems Built" },
  { value: 2, suffix: "+", label: "Years of Experience" },
  { value: 8000, suffix: "+", label: "Professionals Who Trust My Work" },
  { value: 18, suffix: "", label: "Age When It All Started" },
];

function useCountUp(target: number, started: boolean, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;

    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [started, target, duration]);

  return count;
}

function StatCard({
  value,
  suffix,
  label,
  started,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  started: boolean;
  delay: number;
}) {
  const count = useCountUp(value, started);

  const display =
    value >= 1000
      ? `${(count / 1000).toFixed(count >= 1000 ? 0 : 1)}K`
      : `${count}`;

  return (
    <div
      className="group relative overflow-hidden border border-gold/20 bg-white/[0.02] p-5 transition-all duration-500 hover:border-gold/60 hover:bg-white/[0.05]"
      style={{
        opacity: started ? 1 : 0,
        transform: started
          ? "translateY(0)"
          : "translateY(30px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, border-color 0.3s, background 0.3s`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      <div className="absolute left-0 top-0 h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />

      <div
        className="text-3xl font-black text-gold md:text-4xl"
        style={{
          fontFamily:
            "'Bebas Neue', 'Anton', 'Impact', sans-serif",
          letterSpacing: "0.05em",
          lineHeight: 1,
        }}
      >
        {display}
        {suffix}
      </div>

      <div className="mt-2 text-xs leading-snug text-white/50">
        {label}
      </div>
    </div>
  );
}

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const [inView, setInView] = useState(false);
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });
  const [isHoveringImage, setIsHoveringImage] =
    useState(false);
  const [scanActive, setScanActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const interval = setInterval(() => {
      setScanActive(true);

      setTimeout(() => {
        setScanActive(false);
      }, 1200);
    }, 4000);

    return () => clearInterval(interval);
  }, [inView]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect =
      imageRef.current?.getBoundingClientRect();

    if (!rect) return;

    const x =
      ((e.clientX - rect.left) / rect.width - 0.5) * 12;

    const y =
      ((e.clientY - rect.top) / rect.height - 0.5) * 12;

    setMousePos({ x, y });
  };

  const words =
    "I'm Hassan Rizwan, an AI Automation Specialist and Full Stack Web Developer from Pakistan with 2+ years of hands-on experience. I've engineered 50+ automation workflows across CRM, AI, and productivity platforms — specializing in GoHighLevel CRM automation and n8n workflow engineering. What makes me different — I built all of this starting at 18 years old, earning the trust of 8,000+ professionals along the way.".split(
      " "
    );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
        style={{ opacity: 0.025 }}
      >
        <span className="font-display text-[20vw] font-black uppercase tracking-tighter text-white">
          HR
        </span>
      </div>

      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gold"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.05,
              animation: `float ${
                Math.random() * 6 + 4
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 md:grid-cols-2 md:items-center md:gap-20">
          <div
            className="relative mx-auto w-full max-w-sm md:max-w-none"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView
                ? "translateX(0)"
                : "translateX(-40px)",
              transition:
                "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <div
              className="absolute -right-4 -top-4 z-20 border border-gold/40 bg-black px-3 py-2 md:-right-6 md:-top-6"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView
                  ? "translateY(0) rotate(3deg)"
                  : "translateY(-20px) rotate(3deg)",
                transition:
                  "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s",
              }}
            >
              <div className="text-xs font-bold text-gold">
                Available
              </div>
              <div className="text-[10px] text-white/40">
                for Work
              </div>
            </div>

            <div
              className="absolute -bottom-4 -left-4 z-20 border border-gold/40 bg-black px-3 py-2 md:-bottom-6 md:-left-6"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView
                  ? "translateY(0) rotate(-2deg)"
                  : "translateY(20px) rotate(-2deg)",
                transition:
                  "opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s",
              }}
            >
              <div className="text-xs font-bold text-gold">
                Pakistan 🇵🇰
              </div>
              <div className="text-[10px] text-white/40">
                Based
              </div>
            </div>

            <div className="absolute -left-2 -top-2 z-10 h-8 w-8 border-l-2 border-t-2 border-gold" />

            <div className="absolute -bottom-2 -right-2 z-10 h-8 w-8 border-b-2 border-r-2 border-gold" />

            <div
              ref={imageRef}
              className="relative overflow-hidden"
              style={{
                transform: isHoveringImage
                  ? `perspective(800px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`
                  : "perspective(800px) rotateY(0deg) rotateX(0deg)",
                transition: isHoveringImage
                  ? "transform 0.1s ease"
                  : "transform 0.5s ease",
              }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() =>
                setIsHoveringImage(true)
              }
              onMouseLeave={() => {
                setIsHoveringImage(false);
                setMousePos({ x: 0, y: 0 });
              }}
            >
              <div
                className="pointer-events-none absolute inset-x-0 z-10 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"
                style={{
                  top: scanActive ? "100%" : "-2px",
                  transition: scanActive
                    ? "top 1.2s linear"
                    : "none",
                  opacity: 0.8,
                }}
              />

              <div
                className="pointer-events-none absolute inset-0 z-10 bg-gold/10 transition-opacity duration-300"
                style={{
                  opacity: isHoveringImage ? 1 : 0,
                }}
              />

              <div className="aspect-[4/5] w-full bg-black">
                <img
                  src={portrait}
                  alt="Hassan Rizwan"
                  className="h-full w-full object-cover transition-transform duration-700"
                  style={{
                    objectPosition: "center 25%",
                    transform: isHoveringImage
                      ? "scale(1.04)"
                      : "scale(1)",
                    opacity: 1,
                    transition:
                      "opacity 0.6s ease, transform 0.7s ease",
                  }}
                />
              </div>
            </div>

            <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full bg-gold/20" />
          </div>

          <div>
            <div
              className="flex items-center gap-3"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView
                  ? "translateY(0)"
                  : "translateY(20px)",
                transition:
                  "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
              }}
            >
              <div className="h-px w-8 bg-gold" />

              <span className="text-xs uppercase tracking-[0.3em] text-gold">
                About Me
              </span>
            </div>

            <div
              className="group relative mt-4 overflow-hidden"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView
                  ? "translateY(0)"
                  : "translateY(20px)",
                transition:
                  "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
              }}
            >
              <h2 className="font-display text-4xl font-black text-white md:text-6xl">
                Hassan
                <br className="hidden md:block" /> Rizwan
              </h2>

              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </div>

            <p
              className="mt-4 text-lg font-semibold text-gold md:text-xl"
              style={{
                opacity: inView ? 1 : 0,
                transition:
                  "opacity 0.6s ease 0.4s",
              }}
            >
              AI Automation Specialist · Full Stack Developer
            </p>

            <p className="mt-5 text-sm leading-relaxed text-white/50 md:text-base">
              {words.map((word, i) => (
                <span
                  key={i}
                  className="inline-block"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView
                      ? "translateY(0)"
                      : "translateY(8px)",
                    transition: `opacity 0.4s ease ${
                      0.5 + i * 0.02
                    }s, transform 0.4s ease ${
                      0.5 + i * 0.02
                    }s`,
                    marginRight: "4px",
                  }}
                >
                  {word}
                </span>
              ))}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
              {STATS.map((s, i) => (
                <StatCard
                  key={s.label}
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                  started={inView}
                  delay={600 + i * 100}
                />
              ))}
            </div>

            <div
              className="mt-10 flex flex-wrap gap-3"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView
                  ? "translateY(0)"
                  : "translateY(20px)",
                transition:
                  "opacity 0.6s ease 1s, transform 0.6s ease 1s",
              }}
            >
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
                className="group relative overflow-hidden rounded-none bg-gold px-6 py-3 text-sm font-bold text-black transition-all"
              >
                <span className="relative z-10">
                  Work With Me
                </span>

                <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0" />
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
                className="border border-gold/40 px-6 py-3 text-sm font-bold text-gold transition-all hover:border-gold hover:bg-gold/10"
              >
                View Projects
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-12px);
          }
        }
      `}</style>
    </section>
  );
}