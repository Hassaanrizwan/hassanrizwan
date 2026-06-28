import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

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
  const [heroActive, setHeroActive] = useState(true); // ← new

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // Hide navbar while hero animation is playing
      const hero = document.getElementById("home");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setHeroActive(rect.bottom > window.innerHeight * 0.1);
      }

      // Active section detection
      const offsets = LINKS.map((l) => {
        const el = document.getElementById(l.id);
        if (!el) return { id: l.id, top: Infinity };
        const top = Math.abs(el.getBoundingClientRect().top - 120);
        return { id: l.id, top };
      });
      offsets.sort((a, b) => a.top - b.top);
      setActive(offsets[0].id);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 border-b transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(0,0,0,0.65)" : "rgba(0,0,0,0.2)",
          backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "blur(4px)",
          borderColor: "rgba(245,166,35,0.2)",
          opacity: heroActive ? 0 : 1,                        // ← new
          pointerEvents: heroActive ? "none" : "auto",        // ← new
          transition: "opacity 0.4s ease, background-color 0.3s, backdrop-filter 0.3s",
        }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button
            onClick={() => scrollTo("home")}
            className="flex h-10 w-10 items-center justify-center rounded-md bg-gold font-display text-base font-bold text-black transition-transform hover:scale-105"
            aria-label="Home"
          >
            HR
          </button>

          <ul className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => scrollTo(l.id)}
                  data-active={active === l.id}
                  className="nav-link nav-link-underline text-sm font-medium tracking-wide"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <button
              onClick={() => scrollTo("contact")}
              className="rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-black transition-all hover:gold-glow"
            >
              Hire Me
            </button>
          </div>

          <button
            className="md:hidden text-gold"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black transition-all duration-300 md:hidden"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <button
          className="absolute right-6 top-6 text-gold"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <X size={28} />
        </button>
        <ul className="flex flex-col items-center gap-8">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => scrollTo(l.id)}
                className="font-display text-3xl font-semibold text-white transition-colors hover:text-gold"
              >
                {l.label}
              </button>
            </li>
          ))}
          <li className="mt-4">
            <button
              onClick={() => scrollTo("contact")}
              className="rounded-md bg-gold px-8 py-3 text-base font-semibold text-black"
            >
              Hire Me
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}