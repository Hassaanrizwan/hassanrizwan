import { useState } from "react";
import { Mail, Github, Linkedin, MapPin, Send } from "lucide-react";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    const subject = encodeURIComponent(form.subject || "New project inquiry");
    window.location.href = `mailto:htfsh12345@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="section-pad" style={{ background: "#0A0A0A" }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal text-center">
          <h2 className="heading-underline mx-auto font-display text-4xl font-bold text-white md:text-5xl">
            Let's Build Something
          </h2>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="reveal">
            <h3 className="font-display text-2xl font-semibold text-gold">
              Get In Touch
            </h3>
            <p className="mt-4 max-w-md text-muted-foreground">
              Whether you need a custom automation system, a CRM overhaul, or a
              full stack web application — I'm ready to build it. Let's talk.
            </p>

            <ul className="mt-10 space-y-5">
              <li className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center border border-gold/40 text-gold">
                  <Mail size={18} />
                </span>
                <a
                  href="mailto:htfsh12345@gmail.com"
                  className="text-white transition-colors hover:text-gold"
                >
                  htfsh12345@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center border border-gold/40 text-gold">
                  <Github size={18} />
                </span>
                <a
                  href="https://github.com/hassanrizwan247"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white transition-colors hover:text-gold"
                >
                  github.com/hassanrizwan247
                </a>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center border border-gold/40 text-gold">
                  <Linkedin size={18} />
                </span>
                <a
                  href="https://www.linkedin.com/in/hassan-rizwan-6a6934281/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white transition-colors hover:text-gold"
                >
                  linkedin.com/in/hassan-rizwan
                </a>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center border border-gold/40 text-gold">
                  <MapPin size={18} />
                </span>
                <span className="text-white">Pakistan</span>
              </li>
            </ul>
          </div>

          <form onSubmit={onSubmit} className="reveal space-y-5">
            {(["name", "email", "subject"] as const).map((field) => (
              <Field
                key={field}
                id={field}
                type={field === "email" ? "email" : "text"}
                label={field[0].toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={(v) => setForm((f) => ({ ...f, [field]: v }))}
              />
            ))}
            <div>
              <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="w-full resize-none border border-gold/40 bg-black px-4 py-3 text-white outline-none transition-all focus:border-gold focus:gold-glow"
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 bg-gold py-4 font-semibold text-black transition-all hover:brightness-90"
            >
              <Send size={16} />
              {sent ? "Opening your email…" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  type,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gold/40 bg-black px-4 py-3 text-white outline-none transition-all focus:border-gold focus:gold-glow"
      />
    </div>
  );
}
