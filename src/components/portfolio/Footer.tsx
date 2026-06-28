import { Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-black py-12 text-center">
      <div className="mx-auto max-w-5xl px-6">
        <p className="font-display text-base font-semibold text-white">
          Hassan Rizwan — <span className="text-gold">AI Automation Specialist &amp; Full Stack Developer</span>
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <a
            href="https://github.com/hassanrizwan247"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center border border-gold/40 text-gold transition-all hover:bg-gold hover:text-black"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/hassan-rizwan-6a6934281/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center border border-gold/40 text-gold transition-all hover:bg-gold hover:text-black"
          >
            <Linkedin size={18} />
          </a>
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          © 2025 All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
