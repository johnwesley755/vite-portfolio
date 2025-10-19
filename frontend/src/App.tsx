import React, { useState, useEffect } from "react";
import { Header } from "./components/sections/Header";
import { HeroSection } from "./components/sections/HeroSection";
import { AboutSection } from "./components/sections/AboutSection";
import { SkillsSection } from "./components/sections/SkillsSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import { EnhancedExperienceSection } from "./components/sections/EnhancedExperienceSection";
import { ContactSection } from "./components/sections/ContactSection";
import { Footer } from "./components/sections/Footer";
import { ScrollToTopButton } from "./components/ui/ScrollToTopButton";
import { VisitorCounter } from "./components/ui/VisitorCounter";
import { Chatbot } from "./components/ui/Chatbot";
import IntegrationsSection from "./components/sections/IntegrationsSection";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sections = [
        "hero",
        "about",
        "skills",
        "projects",
        "experience",
        "contact",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <main>
        <div className="pt-24 flex justify-center">
          <VisitorCounter />
        </div>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <IntegrationsSection />
        <EnhancedExperienceSection />
        <ContactSection />
      </main>

      <Footer />

      <ScrollToTopButton
        showScrollTop={showScrollTop}
        scrollToTop={scrollToTop}
      />
      <Chatbot />
    </div>
  );
};

export default Portfolio;
