import React from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// A simple, stylish SVG logo component
const Logo = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 3.5L38.5 14V31.5L21 42L3.5 31.5V14L21 3.5Z"
      stroke="url(#paint0_linear_101_2)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 24.5V42"
      stroke="url(#paint1_linear_101_2)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.5 14L21 24.5L38.5 14"
      stroke="url(#paint2_linear_101_2)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_101_2"
        x1="21"
        y1="3.5"
        x2="21"
        y2="42"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#10B981" />
        <stop offset="1" stopColor="#34D399" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_101_2"
        x1="21.5"
        y1="24.5"
        x2="21.5"
        y2="42"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F9FAFB" />
        <stop offset="1" stopColor="#D1D5DB" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_101_2"
        x1="21"
        y1="14"
        x2="21"
        y2="24.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#E5E7EB" />
      </linearGradient>
    </defs>
  </svg>
);

export const Header = ({
  activeSection,
  setActiveSection,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-gray-800/60 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Name */}
          <div className="flex items-center space-x-4">
            <Logo />
            <div className="text-xl font-semibold bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text text-transparent tracking-wide">
              John Wesley
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-2 bg-gray-900/50 p-2 rounded-full border border-gray-700/50">
              {navItems.map((item) => (
                <li key={item.id} className="relative">
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 relative z-10 ${
                      activeSection === item.id
                        ? "text-black"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full z-0"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-black/90 border-t border-gray-800/60 backdrop-blur-xl"
          >
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? "text-white bg-green-500/20"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
