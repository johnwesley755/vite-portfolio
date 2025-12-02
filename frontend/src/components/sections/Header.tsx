import React from "react";
import { Home, User, Code, Briefcase, Mail, Award } from "lucide-react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

// Monochromatic stylish SVG logo component
const Logo = () => (
  <motion.svg
    width="32"
    height="32"
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    whileHover={{ rotate: 360, scale: 1.1 }}
    transition={{ duration: 0.6 }}
  >
    <path
      d="M21 3.5L38.5 14V31.5L21 42L3.5 31.5V14L21 3.5Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white"
    />
    <path
      d="M21 24.5V42"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gray-400"
    />
    <path
      d="M3.5 14L21 24.5L38.5 14"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gray-300"
    />
  </motion.svg>
);

export const Header = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Award },
    { id: "projects", label: "Projects", icon: Code },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop Floating Dock - Bottom Center */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden md:block fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-white/5 rounded-3xl blur-2xl"></div>
          
          {/* Dock container */}
          <div className="relative flex items-center gap-2 px-4 py-3 bg-black/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
            {/* Logo on the left */}
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    onClick={() => scrollToSection("hero")}
                    className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 group relative"
                    whileHover={{ scale: 1.1, y: -8 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Logo />
                    {activeSection === "hero" && (
                      <motion.div
                        layoutId="dock-indicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent 
                  side="top" 
                  className="bg-white text-black border-none font-medium"
                >
                  Home
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Vertical divider */}
            <div className="w-px h-8 bg-white/10 mx-1"></div>

            {/* Navigation items */}
            <TooltipProvider delayDuration={0}>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <Tooltip key={item.id}>
                    <TooltipTrigger asChild>
                      <motion.button
                        onClick={() => scrollToSection(item.id)}
                        className={`relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 group ${
                          isActive 
                            ? "bg-white text-black" 
                            : "bg-white/5 text-white hover:bg-white/10"
                        }`}
                        whileHover={{ scale: 1.1, y: -8 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-5 h-5" />
                        {isActive && (
                          <motion.div
                            layoutId="dock-indicator"
                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </motion.button>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="bg-white text-black border-none font-medium"
                    >
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </TooltipProvider>
          </div>
        </div>
      </motion.div>

      {/* Mobile Floating Dock - Bottom Center (Compact) */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md"
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-2 bg-white/5 rounded-3xl blur-xl"></div>
          
          {/* Compact dock container */}
          <div className="relative flex items-center justify-between gap-1 px-3 py-2.5 bg-black/90 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-2xl transition-all duration-300 flex-1 ${
                    isActive 
                      ? "bg-white text-black" 
                      : "bg-transparent text-white/70 active:bg-white/10"
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className={`w-5 h-5 ${isActive ? '' : 'mb-0.5'}`} />
                  {isActive && (
                    <>
                      <span className="text-[10px] font-medium tracking-tight">
                        {item.label}
                      </span>
                      <motion.div
                        layoutId="mobile-dock-indicator"
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    </>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
};