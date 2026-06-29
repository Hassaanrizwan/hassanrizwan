"use client";

import { useState, useRef, useEffect } from "react";
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

/*
  SETUP (one-time):
  1. npm install @emailjs/browser
  2. Go to https://emailjs.com → create free account
  3. Add Email Service (Gmail) → copy Service ID
  4. Create Email Template with variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
     → copy Template ID
  5. Account → API Keys → copy Public Key
  6. Paste all three below (or move to .env.local)
*/
const EMAILJS_SERVICE_ID  = "service_652641m";
const EMAILJS_TEMPLATE_ID = "template_soj2ave";
const EMAILJS_PUBLIC_KEY  = "nRltt5CvVHoTTnb7X";

// ── Magnetic field line SVG background ───────────────────────────────────────
function FieldLines() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", opacity: 0.03,
      }}
    >
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#f5a623" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

// ── Floating label input ──────────────────────────────────────────────────────
function FloatingField({
  id, label, type = "text", value, onChange, required = true,
}: {
  id: string; label: string; type?: string;
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div style={{ position: "relative", paddingTop: "20px" }}>
      <label
        htmlFor={id}
        style={{
          position: "absolute",
          left: "16px",
          top: lifted ? "0px" : "32px",
          fontSize: lifted ? "10px" : "13px",
          letterSpacing: lifted ? "0.2em" : "0.05em",
          textTransform: "uppercase",
          color: lifted ? "#f5a623" : "rgba(255,255,255,0.35)",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          borderBottom: `1px solid ${focused ? "#f5a623" : "rgba(245,166,35,0.2)"}`,
          padding: "10px 16px 10px",
          fontSize: "14px",
          color: "#ffffff",
          fontFamily: "'Inter', sans-serif",
          outline: "none",
          transition: "border-color 0.3s ease",
          boxSizing: "border-box",
        }}
      />
      {/* Animated underline fill */}
      <span
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "2px",
          width: focused ? "100%" : "0%",
          background: "#f5a623",
          transition: "width 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      />
    </div>
  );
}

function FloatingTextarea({
  value, onChange,
}: { value: string; onChange: (v: string) => void }) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div style={{ position: "relative", paddingTop: "20px" }}>
      <label
        htmlFor="message"
        style={{
          position: "absolute",
          left: "16px",
          top: lifted ? "0px" : "30px",
          fontSize: lifted ? "10px" : "13px",
          letterSpacing: lifted ? "0.2em" : "0.05em",
          textTransform: "uppercase",
          color: lifted ? "#f5a623" : "rgba(255,255,255,0.35)",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
          pointerEvents: "none",
        }}
      >
        Message
      </label>
      <textarea
        id="message"
        required
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          borderBottom: `1px solid ${focused ? "#f5a623" : "rgba(245,166,35,0.2)"}`,
          padding: "10px 16px 10px",
          fontSize: "14px",
          color: "#ffffff",
          fontFamily: "'Inter', sans-serif",
          outline: "none",
          resize: "none",
          transition: "border-color 0.3s ease",
          boxSizing: "border-box",
        }}
      />
      <span
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "2px",
          width: focused ? "100%" : "0%",
          background: "#f5a623",
          transition: "width 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      />
    </div>
  );
}

// ── Contact link row ──────────────────────────────────────────────────────────
function ContactLink({
  Icon, href, label, delay, visible,
}: {
  Icon: React.ElementType; href?: string; label: string;
  delay: number; visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const Tag = href ? "a" : "div";
  return (
    <Tag
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noreferrer" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        textDecoration: "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-40px)",
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                     transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        cursor: href ? "pointer" : "default",
      }}
    >
      <span
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "42px", height: "42px", flexShrink: 0,
          border: `1px solid ${hovered ? "#f5a623" : "rgba(245,166,35,0.3)"}`,
          background: hovered ? "rgba(245,166,35,0.1)" : "transparent",
          transition: "all 0.3s ease",
        }}
      >
        <Icon size={16} color="#f5a623" />
      </span>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          color: hovered ? "#f5a623" : "rgba(255,255,255,0.7)",
          transition: "color 0.3s ease",
        }}
      >
        {label}
      </span>
    </Tag>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Scroll reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Custom cursor
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -999, y: -999 });
  const ringPos = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const show = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };
    const hide = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const onInputEnter = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "60px";
        ringRef.current.style.height = "60px";
        ringRef.current.style.borderColor = "rgba(245,166,35,0.8)";
        ringRef.current.style.mixBlendMode = "screen";
      }
    };
    const onInputLeave = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "40px";
        ringRef.current.style.height = "40px";
        ringRef.current.style.borderColor = "rgba(245,166,35,0.5)";
      }
    };

    const inputs = section.querySelectorAll("input, textarea, button, a");
    inputs.forEach((el) => {
      el.addEventListener("mouseenter", onInputEnter);
      el.addEventListener("mouseleave", onInputLeave);
    });

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseenter", show);
    section.addEventListener("mouseleave", hide);

    const animate = () => {
      const mx = mousePos.current.x;
      const my = mousePos.current.y;
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + "px";
        cursorRef.current.style.top = my + "px";
      }
      ringPos.current.x = lerp(ringPos.current.x, mx, 0.1);
      ringPos.current.y = lerp(ringPos.current.y, my, 0.1);
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + "px";
        ringRef.current.style.top = ringPos.current.y + "px";
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseenter", show);
      section.removeEventListener("mouseleave", hide);
      inputs.forEach((el) => {
        el.removeEventListener("mouseenter", onInputEnter);
        el.removeEventListener("mouseleave", onInputLeave);
      });
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Send via EmailJS
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject || "New project inquiry",
          message: form.message,
          to_email: "htfsh12345@gmail.com",
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "#0A0A0A", cursor: "none" }}
    >
      <FieldLines />

      {/* Cursor dot */}
      <div
        ref={cursorRef}
        style={{
          position: "absolute", width: "8px", height: "8px",
          borderRadius: "50%", background: "#f5a623",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none", zIndex: 100, opacity: 0,
          mixBlendMode: "screen",
        }}
      />
      {/* Cursor ring */}
      <div
        ref={ringRef}
        style={{
          position: "absolute", width: "40px", height: "40px",
          borderRadius: "50%", border: "1.5px solid rgba(245,166,35,0.5)",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none", zIndex: 100, opacity: 0,
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
        }}
      />

      {/* Ambient glow top-right */}
      <div
        style={{
          position: "absolute", top: "-120px", right: "-120px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6" style={{ zIndex: 2 }}>

        {/* Heading */}
        <div
          className="text-center mb-20"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div style={{ height: "1px", width: "60px", background: "rgba(245,166,35,0.3)" }} />
            <span style={{
              fontSize: "10px", fontWeight: 600, letterSpacing: "0.35em",
              textTransform: "uppercase", color: "#f5a623", fontFamily: "'Inter', sans-serif",
            }}>
              Get In Touch
            </span>
            <div style={{ height: "1px", width: "60px", background: "rgba(245,166,35,0.3)" }} />
          </div>
          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            fontWeight: 700, color: "#ffffff",
            letterSpacing: "-0.03em", lineHeight: 1.1,
          }}>
            Let's Build{" "}
            <span style={{ color: "#f5a623" }}>Something</span>
          </h2>
          <div style={{ margin: "20px auto 0", height: "1px", width: "48px", background: "rgba(245,166,35,0.5)" }} />
        </div>

        <div className="grid gap-16 md:grid-cols-2">

          {/* Left: info */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-50px)",
              transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s",
            }}
          >
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "15px",
              lineHeight: 1.8, color: "rgba(255,255,255,0.5)",
              marginBottom: "40px", maxWidth: "380px",
            }}>
              Whether you need a custom automation system, a CRM overhaul, or a
              full stack web application — I'm ready to build it. Let's talk.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <ContactLink Icon={Mail}     label="htfsh12345@gmail.com"           href="mailto:htfsh12345@gmail.com"                             delay={200} visible={visible} />
              <ContactLink Icon={Github}   label="github.com/hassanrizwan247"      href="https://github.com/hassanrizwan247"                      delay={280} visible={visible} />
              <ContactLink Icon={Linkedin} label="linkedin.com/in/hassan-rizwan"   href="https://www.linkedin.com/in/hassan-rizwan-6a6934281/"    delay={360} visible={visible} />
              <ContactLink Icon={MapPin}   label="Pakistan"                                                                                        delay={440} visible={visible} />
            </div>

            {/* Decorative quote */}
            <div
              style={{
                marginTop: "48px",
                borderLeft: "2px solid rgba(245,166,35,0.4)",
                paddingLeft: "20px",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
              }}
            >
              <p style={{
                fontFamily: "Georgia, serif", fontStyle: "italic",
                fontSize: "15px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7,
              }}>
                "Response time: usually within a few hours."
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(50px)",
              transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s",
            }}
          >
            <form
              ref={formRef}
              onSubmit={onSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "32px" }}
            >
              <div className="grid gap-8 sm:grid-cols-2">
                <FloatingField id="name"    label="Name"    value={form.name}    onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
                <FloatingField id="email"   label="Email"   type="email" value={form.email}   onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
              </div>
              <FloatingField   id="subject" label="Subject" value={form.subject} onChange={(v) => setForm((f) => ({ ...f, subject: v }))} required={false} />
              <FloatingTextarea value={form.message} onChange={(v) => setForm((f) => ({ ...f, message: v }))} />

              {/* Status messages */}
              {status === "success" && (
                <div style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "14px 16px", border: "1px solid rgba(34,197,94,0.3)",
                  background: "rgba(34,197,94,0.05)", borderRadius: "2px",
                }}>
                  <CheckCircle size={16} color="#22c55e" />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#22c55e" }}>
                    Message sent! I'll get back to you soon.
                  </span>
                </div>
              )}
              {status === "error" && (
                <div style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "14px 16px", border: "1px solid rgba(239,68,68,0.3)",
                  background: "rgba(239,68,68,0.05)", borderRadius: "2px",
                }}>
                  <AlertCircle size={16} color="#ef4444" />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#ef4444" }}>
                    Something went wrong. Email me directly at htfsh12345@gmail.com
                  </span>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  position: "relative",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: "10px",
                  width: "100%", padding: "18px",
                  background: status === "sending" ? "rgba(245,166,35,0.5)" : "#f5a623",
                  border: "none", cursor: status === "sending" ? "not-allowed" : "pointer",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px", fontWeight: 700,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "#000000",
                  overflow: "hidden",
                  transition: "background 0.3s ease",
                }}
                className="group"
              >
                {/* Shimmer sweep on hover */}
                <span
                  style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                    transform: "translateX(-100%)",
                    transition: "transform 0.5s ease",
                  }}
                  className="group-hover:translate-x-full"
                />
                {status === "sending" ? (
                  <>
                    <span
                      style={{
                        width: "14px", height: "14px", border: "2px solid #000",
                        borderTopColor: "transparent", borderRadius: "50%",
                        animation: "spin 0.7s linear infinite",
                      }}
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </button>

              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: "11px",
                color: "rgba(255,255,255,0.2)", textAlign: "center", letterSpacing: "0.05em",
              }}>
                Powered by EmailJS · Your message goes directly to my inbox
              </p>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #0a0a0a inset !important;
          -webkit-text-fill-color: #ffffff !important;
        }
      `}</style>
    </section>
  );
}