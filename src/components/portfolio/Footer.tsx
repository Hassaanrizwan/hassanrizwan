import { Github, Linkedin, ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "About",        href: "#about" },
  { label: "Services",     href: "#services" },
  { label: "Projects",     href: "#projects" },
  { label: "Skills",       href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact",      href: "#contact" },
];

const SOCIALS = [
  {
    Icon: Github,
    href: "https://github.com/hassanrizwan247",
    label: "GitHub",
  },
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/hassan-rizwan-6a6934281/",
    label: "LinkedIn",
  },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll reveal
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Show scroll-to-top after scrolling down
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      ref={footerRef}
      style={{
        background: "#080808",
        borderTop: "1px solid rgba(245,166,35,0.12)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute", bottom: 0, left: "50%",
        transform: "translateX(-50%)",
        width: "600px", height: "200px",
        background: "radial-gradient(ellipse at center bottom, rgba(245,166,35,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Faint bg text */}
      <div style={{
        position: "absolute", inset: 0, display: "flex",
        alignItems: "center", justifyContent: "center",
        pointerEvents: "none", overflow: "hidden", opacity: 0.018,
      }}>
        <span style={{
          fontSize: "18vw", fontWeight: 900, color: "#ffffff",
          textTransform: "uppercase", letterSpacing: "-0.05em",
          whiteSpace: "nowrap", fontFamily: "'Inter', sans-serif",
        }}>
          HASSAN
        </span>
      </div>

      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: "1200px", margin: "0 auto", padding: "64px 24px 40px",
      }}>

        {/* Top row: name + nav */}
        <div
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-3"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: "1 / 2" }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "20px", fontWeight: 800,
              color: "#ffffff", letterSpacing: "-0.02em",
              marginBottom: "10px",
            }}>
              Hassan Rizwan
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px", fontWeight: 500,
              color: "#f5a623", letterSpacing: "0.08em",
              textTransform: "uppercase", marginBottom: "20px",
            }}>
              AI Automation Specialist &amp; Full Stack Developer
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px", lineHeight: 1.7,
              color: "rgba(255,255,255,0.35)",
              maxWidth: "280px",
            }}>
              Building systems that work while you sleep. Based in Pakistan, serving clients globally.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "10px", fontWeight: 600,
              letterSpacing: "0.25em", textTransform: "uppercase",
              color: "rgba(245,166,35,0.5)", marginBottom: "20px",
            }}>
              Navigation
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {NAV_LINKS.map((link, i) => (
                <li key={link.label} style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-16px)",
                  transition: `opacity 0.5s ease ${i * 60 + 200}ms, transform 0.5s ease ${i * 60 + 200}ms`,
                }}>
                  <NavLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + socials */}
          <div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "10px", fontWeight: 600,
              letterSpacing: "0.25em", textTransform: "uppercase",
              color: "rgba(245,166,35,0.5)", marginBottom: "20px",
            }}>
              Connect
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
              <a
                href="mailto:htfsh12345@gmail.com"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px", color: "rgba(255,255,255,0.5)",
                  textDecoration: "none", transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f5a623")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >
                htfsh12345@gmail.com
              </a>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px", color: "rgba(255,255,255,0.35)",
              }}>
                Pakistan · Available for remote work
              </span>
            </div>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "12px" }}>
              {SOCIALS.map(({ Icon, href, label }, i) => (
                <SocialIcon key={label} Icon={Icon} href={href} label={label} delay={i * 80 + 400} visible={visible} />
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            margin: "48px 0 28px",
            height: "1px",
            background: "rgba(245,166,35,0.12)",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.5s",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, transparent 0%, rgba(245,166,35,0.5) 50%, transparent 100%)",
            transform: visible ? "translateX(0%)" : "translateX(-100%)",
            transition: "transform 1s cubic-bezier(0.22,1,0.36,1) 0.6s",
          }} />
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "12px",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.7s",
          }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px", letterSpacing: "0.2em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.2)",
          }}>
            © 2025 Hassan Rizwan · All Rights Reserved
          </p>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px", letterSpacing: "0.05em",
            color: "rgba(255,255,255,0.15)",
          }}>
            Built with Next.js · Deployed on Vercel
          </p>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        style={{
          position: "fixed", bottom: "32px", right: "32px",
          width: "44px", height: "44px",
          border: "1px solid rgba(245,166,35,0.5)",
          background: "#080808", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 50,
          opacity: showScrollTop ? 1 : 0,
          transform: showScrollTop ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          pointerEvents: showScrollTop ? "auto" : "none",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#f5a623";
          (e.currentTarget.querySelector("svg") as SVGElement).style.color = "#000";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#080808";
          (e.currentTarget.querySelector("svg") as SVGElement).style.color = "#f5a623";
        }}
      >
        <ArrowUp size={16} color="#f5a623" style={{ transition: "color 0.3s ease" }} />
      </button>
    </footer>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "13px",
        color: hovered ? "#f5a623" : "rgba(255,255,255,0.45)",
        textDecoration: "none",
        display: "flex", alignItems: "center", gap: "8px",
        transition: "color 0.3s ease",
      }}
    >
      <span style={{
        display: "inline-block", width: hovered ? "16px" : "8px",
        height: "1px", background: "#f5a623",
        transition: "width 0.3s cubic-bezier(0.22,1,0.36,1)",
        flexShrink: 0,
      }} />
      {label}
    </a>
  );
}

function SocialIcon({ Icon, href, label, delay, visible }: {
  Icon: React.ElementType; href: string; label: string; delay: number; visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: "40px", height: "40px",
        border: `1px solid ${hovered ? "#f5a623" : "rgba(245,166,35,0.3)"}`,
        background: hovered ? "#f5a623" : "transparent",
        transition: "all 0.3s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <Icon size={16} color={hovered ? "#000" : "#f5a623"} style={{ transition: "color 0.3s ease" }} />
    </a>
  );
}
