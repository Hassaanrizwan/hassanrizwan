import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState, useEffect } from "react";
import { LoadingScreen } from "@/components/portfolio/LoadingScreen";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { HeroMobile } from "@/components/portfolio/HeroMobile";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Services } from "@/components/portfolio/Services";
import { Achievements } from "@/components/portfolio/Achievements";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { useReveal } from "@/components/portfolio/useReveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hassan Rizwan — AI Automation Specialist & Full Stack Developer" },
      {
        name: "description",
        content:
          "Hassan Rizwan — AI Automation Specialist, CRM Automation Expert, and Full Stack Web Developer from Pakistan. 50+ automation systems, trusted by 8,000+ professionals.",
      },
      { property: "og:title", content: "Hassan Rizwan — AI Automation Specialist" },
      {
        property: "og:description",
        content:
          "Premium portfolio of Hassan Rizwan. AI Automation, CRM Automation, and Full Stack Web Development.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [desktopImages, setDesktopImages] = useState<HTMLImageElement[] | null>(null);
  const [mobileImages, setMobileImages] = useState<HTMLImageElement[] | null>(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  const onDesktopReady = useCallback((imgs: HTMLImageElement[]) => setDesktopImages(imgs), []);
  const onMobileReady = useCallback((imgs: HTMLImageElement[]) => setMobileImages(imgs), []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useReveal();

  return (
    <div className="min-h-screen bg-black text-white">
      <LoadingScreen
        onDesktopReady={onDesktopReady}
        onMobileReady={onMobileReady}
      />
      <Navbar />
      <main>
        {isMobile ? (
          <HeroMobile images={mobileImages} />
        ) : (
          <Hero images={desktopImages} />
        )}
        <About />
        <Skills />
        <Projects />
        <Services />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}