import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [heroActive, setHeroActive] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const hero = document.getElementById("home");

      if (hero) {
        const rect = hero.getBoundingClientRect();
        setHeroActive(rect.bottom > window.innerHeight * 0.1);
      }

      const offsets = LINKS.map((l) => {
        const el = document.getElementById(l.id);

        if (!el) return { id: l.id, top: Infinity };

        return {
          id: l.id,
          top: Math.abs(el.getBoundingClientRect().top - 120),
        };
      });

      offsets.sort((a, b) => a.top - b.top);

      setActive(offsets[0].id);

      const total =
        document.documentElement.scrollHeight - window.innerHeight;

      setProgress((window.scrollY / total) * 100);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);

    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
        style={{
          background: scrolled
            ? "linear-gradient(180deg, rgba(10,10,10,.78), rgba(10,10,10,.55))"
            : "rgba(0,0,0,.18)",

          backdropFilter: scrolled
            ? "blur(18px) saturate(180%)"
            : "blur(4px)",

          borderBottom: "1px solid rgba(245,166,35,.12)",

          opacity: heroActive ? 0 : 1,
          pointerEvents: heroActive ? "none" : "auto",
        }}
      >
        {/* Scroll Progress */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gold"
          style={{
            width: `${progress}%`,
            transition: "width .15s linear",
          }}
        />

        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-8">

          {/* Logo */}

          <button
            onClick={() => scrollTo("home")}
            className="group relative overflow-hidden rounded-lg bg-gold px-3 py-2 font-bold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(245,166,35,.55)]"
          >
            HR
          </button>

          {/* Desktop */}

          <ul className="hidden items-center gap-10 md:flex">
            {LINKS.map((item) => (
              <li key={item.id} className="relative">
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    active === item.id
                      ? "text-black"
                      : "text-white hover:text-gold"
                  }`}
                >
                  {active === item.id && (
                    <motion.div
                      layoutId="active-pill"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 35,
                      }}
                      className="absolute inset-0 -z-10 rounded-full bg-gold"
                    />
                  )}

                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right */}

          <div className="hidden items-center gap-5 md:flex">

            <div className="flex items-center gap-2 text-xs text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Available
            </div>

            <button
              onClick={() => scrollTo("contact")}
              className="group flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(245,166,35,.55)]"
            >
              Hire Me

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* Mobile */}

          <button
            onClick={() => setOpen(true)}
            className="text-gold md:hidden"
          >
            <Menu size={28} />
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}

      <div
        className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl transition-all duration-300 md:hidden"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-6 top-6 text-gold"
        >
          <X size={30} />
        </button>

        <ul className="space-y-8">
          {LINKS.map((item, i) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={
                open
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {}
              }
              transition={{
                delay: i * 0.08,
              }}
            >
              <button
                onClick={() => scrollTo(item.id)}
                className="text-3xl font-semibold text-white hover:text-gold"
              >
                {item.label}
              </button>
            </motion.li>
          ))}

          <motion.button
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: open ? 1 : 0,
            }}
            transition={{
              delay: 0.5,
            }}
            onClick={() => scrollTo("contact")}
            className="mt-8 rounded-full bg-gold px-8 py-3 font-semibold text-black"
          >
            Hire Me
          </motion.button>
        </ul>
      </div>
    </>
  );
}