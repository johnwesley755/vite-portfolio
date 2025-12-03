import React, { useState, useEffect } from "react";
import { Header } from "./components/sections/Header";
import { HeroSection } from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import SkillsSection from "./components/sections/SkillsSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import { EnhancedExperienceSection } from "./components/sections/EnhancedExperienceSection";
import ContactSection from "./components/sections/ContactSection";
import FooterDemo from "./components/sections/Footer"; // Assuming FooterDemo is the default export of a file named Footer.tsx


import { Chatbot } from "./components/ui/Chatbot";
import IntegrationsSection from "./components/sections/IntegrationsSection";

const Portfolio = () => {
  // State for active section, menu, and scroll button visibility
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

        <div id="about" style={{ contentVisibility: 'auto', containIntrinsicSize: '1000px 800px' }}>
          <AboutSection />
        </div>

        <div id="skills" style={{ contentVisibility: 'auto', containIntrinsicSize: '1000px 800px' }}>
          <SkillsSection />
        </div>

        <div id="projects" style={{ contentVisibility: 'auto', containIntrinsicSize: '1000px 800px' }}>
          <ProjectsSection />
        </div>

        {/* TEMPORARILY DISABLED - GitHub API causing performance issues */}
        {/* <div id="integrations">
          <IntegrationsSection />
        </div> */}
        
        <div id="experience" style={{ contentVisibility: 'auto', containIntrinsicSize: '1000px 800px' }}>
          <EnhancedExperienceSection />
        </div>

        <div id="contact" style={{ contentVisibility: 'auto', containIntrinsicSize: '1000px 800px' }}>
          <ContactSection />
        </div>
      </main>

      {/* FooterDemo is now correctly imported and used */}
      <FooterDemo />


      
      <Chatbot />
    </div>
  );
};

export default Portfolio;