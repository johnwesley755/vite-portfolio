import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Download,
  ChevronRight,
  Mail,
  MapPin,
} from "lucide-react";
import { portfolioData } from "../../data/portfolio";
import resumePdf from "../../assets/resume.pdf";

export const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Function to handle resume download
  const handleDownload = () => {
    const resumeContent = "This is a placeholder for resume.";
    const blob = new Blob([resumeContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = resumePdf;
    a.download = "John Wesley.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden font-sans max-md:mt-20"
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {/* Dynamic gradient overlay that follows mouse */}
        <div
          className="absolute inset-0 opacity-20 transition-all duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(34, 197, 94, 0.4) 0%, rgba(16, 185, 129, 0.2) 30%, transparent 70%)`,
          }}
        />

        {/* Enhanced floating geometric shapes */}
        <div className="absolute top-16 left-8 w-40 h-40 border border-green-500/15 rotate-45 animate-pulse rounded-lg" />
        <div
          className="absolute bottom-20 right-16 w-32 h-32 border-2 border-green-500/20 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-3 h-24 bg-gradient-to-b from-green-500/30 to-transparent animate-pulse rounded-full"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-20 h-20 border border-green-500/10 rotate-12 animate-pulse"
          style={{ animationDelay: "3s" }}
        />

        {/* Enhanced grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-500/30 rounded-full animate-ping"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center min-h-screen py-20">
        <div className="container mx-auto px-6 lg:px-12 xl:px-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            {/* Left Content - Enhanced */}
            <div
              className={`lg:w-1/2 text-center lg:text-left space-y-8 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              {/* Enhanced Greeting */}
              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <div className="w-12 h-px bg-gradient-to-r from-green-500 to-transparent" />
                  <p className="text-md md:text-lg text-green-400 font-medium tracking-[0.2em] uppercase">
                    Hello, I'm
                  </p>
                </div>

                {/* Enhanced Name - FONT SIZE REDUCED */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
                  <span className="bg-gradient-to-r from-white via-green-100 to-gray-300 bg-clip-text text-transparent">
                    {portfolioData.personal.name.split(" ")[0]}
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-green-400 via-green-500 to-emerald-400 bg-clip-text text-transparent">
                    {portfolioData.personal.name.split(" ")[1]}
                  </span>
                  <span
                    className="inline-block ml-4 text-4xl md:text-5xl animate-bounce"
                    style={{ animationDelay: "2s" }}
                  >
                    👋
                  </span>
                </h1>

                {/* Enhanced accent elements */}
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" />
                  <div className="w-8 h-1 bg-green-500/50 rounded-full" />
                  <div className="w-4 h-1 bg-green-500/30 rounded-full" />
                </div>
              </div>

              {/* Enhanced Description - FONT SIZE REDUCED */}
              <div className="space-y-4">
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                  {portfolioData.personal.bio}
                </p>

                {/* Status */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>Available for opportunities</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Action Buttons - FONT SIZE & PADDING REDUCED */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                <button className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl text-black transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <a
                    href="#project"
                    className="relative z-10 flex items-center"
                  >
                    VIEW PROJECTS
                    <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </button>

                <button
                  onClick={handleDownload}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white border-2 border-gray-600 hover:border-green-500 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/10 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center">
                    <Download className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
                    DOWNLOAD RESUME
                  </span>
                </button>
              </div>

              {/* Enhanced Social Links */}
              <div className="flex items-center justify-center lg:justify-start space-x-6 pt-6">
                {[
                  {
                    icon: Github,
                    href: portfolioData.personal.github,
                    label: "GitHub",
                  },
                  {
                    icon: Linkedin,
                    href: portfolioData.personal.linkedin,
                    label: "LinkedIn",
                  },
                  {
                    icon: Twitter,
                    href: portfolioData.personal.twitter,
                    label: "Twitter",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 rounded-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/20 bg-gray-900/50 hover:bg-gray-800/50"
                    title={social.label}
                  >
                    <social.icon className="h-6 w-6 text-gray-400 group-hover:text-green-500 transition-colors duration-300" />
                    <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Content - Profile Image - SIZE REDUCED */}
            <div
              className={`lg:w-1/2 flex items-center justify-center mt-12 lg:mt-0 transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="relative w-full max-w-lg">
                {/* Main image container - SIZE REDUCED */}
                <div className="relative w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] mx-auto">
                  {/* Enhanced glowing border effect */}
                  <div className="absolute -inset-4 rounded-[3rem] blur-lg animate-pulse" />
                  <div className="absolute -inset-2 bg-gradient-to-r from-green-500/20 via-emerald-400/30 to-green-500/20 rounded-[2.5rem] blur-md" />

                  {/* Image container with enhanced styling */}
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 shadow-2xl">
                    <img
                      src={portfolioData.personal.avatar}
                      alt={portfolioData.personal.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />

                    {/* Enhanced overlay effects */}

                    {/* Enhanced corner accents */}

                    {/* Additional decorative elements */}
                  </div>

                  {/* Floating status indicator */}
                  <div className="absolute -bottom-6 left-8 flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-600 rounded-2xl shadow-xl backdrop-blur-sm">
                    <span className="text-sm text-gray-300 font-medium">
                      Available for work
                    </span>
                  </div>
                </div>

                {/* Enhanced decorative elements */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex flex-col items-center text-gray-500">
          <span className="text-xs mb-4 tracking-[0.2em] uppercase font-medium">
            Scroll Down
          </span>
          <div className="relative">
            <div className="w-px h-16 bg-gradient-to-b from-green-500 via-green-500/50 to-transparent" />
            <div className="absolute top-0 w-px h-8 bg-green-500 animate-pulse" />
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce mt-3 shadow-lg shadow-green-500/50" />
        </div>
      </div>
    </section>
  );
};
