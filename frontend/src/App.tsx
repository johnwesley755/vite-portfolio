import React, { useState, useEffect } from "react";
import { Header } from "./components/sections/Header";
import { HeroSection } from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import SkillsSection from "./components/sections/SkillsSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import { EnhancedExperienceSection } from "./components/sections/EnhancedExperienceSection";
import ContactSection from "./components/sections/ContactSection";
import FooterDemo from "./components/sections/Footer"; // Assuming FooterDemo is the default export of a file named Footer.tsx
import { ScrollToTopButton } from "./components/ui/ScrollToTopButton";

import { Chatbot } from "./components/ui/Chatbot";
import IntegrationsSection from "./components/sections/IntegrationsSection";

const Portfolio = () => {
  // State for active section, menu, and scroll button visibility
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Define the section IDs used for scroll tracking
  const sectionIds = [
    "hero",
    "about",
    "skills",
    "projects",
    "integrations",
    "experience",
    "contact",
  ];

  useEffect(() => {
    const handleScroll = () => {
      // 1. Show/Hide Scroll-to-Top Button
      setShowScrollTop(window.scrollY > 400);

      // 2. Determine Active Section for Navigation Highlight
      const current = sectionIds.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section top is near the top of the viewport (e.g., within 100px)
          // and if the section is still visible on the screen.
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      // Update the active section state if a match is found
      if (current) setActiveSection(current);
    };

    // Attach and clean up the scroll listener
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array means this runs only on mount and unmount

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
        {/*
          FIX: Each section is now wrapped in a div with the corresponding 'id'
          required by the scroll-tracking logic in useEffect.
        */}
        <div id="hero">
          <HeroSection />
        </div>

        <div id="about">
          <AboutSection />
        </div>

        <div id="skills">
          <SkillsSection />
        </div>

        <div id="projects">
          <ProjectsSection />
        </div>

        <div id="integrations">
          <IntegrationsSection />
        </div>
        
        <div id="experience">
          <EnhancedExperienceSection />
        </div>

        <div id="contact">
          <ContactSection />
        </div>
      </main>

      {/* FooterDemo is now correctly imported and used */}
      <FooterDemo />

      <ScrollToTopButton
        showScrollTop={showScrollTop}
        scrollToTop={scrollToTop}
      />
      
      <Chatbot />
    </div>
  );
};

export default Portfolio;