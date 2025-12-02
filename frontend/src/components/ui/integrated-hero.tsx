// src/components/ui/integrated-hero.tsx
import React from "react";
import { motion } from "framer-motion";
import { Circle, Github, Linkedin, Twitter, Download, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Re-export HeroGeometric and ElegantShape logic from shape-landing-hero.tsx
// To keep things clean, we embed the necessary logic here since this is a single integrated file
// In a real project, you would import HeroGeometric and ElegantShape.

// --- Embedded ElegantShape & HeroGeometric Logic Start ---

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate: rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.5 + i * 0.2,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

/**
 * Modified Hero component that allows for custom content via children.
 */
function CustomHeroGeometric({
  badge = "Kokonut UI", // From demo.tsx
  title1 = "Elevate Your", // From demo.tsx
  title2 = "Digital Vision", // From demo.tsx
  children,
}: {
  badge?: string;
  title1?: string;
  title2?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
      {/* Background Gradients and Blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* These shapes are the background UI you wanted to integrate */}
        <ElegantShape delay={0.3} width={600} height={140} rotate={12} gradient="from-indigo-500/[0.15]" className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]" />
        <ElegantShape delay={0.5} width={500} height={120} rotate={-15} gradient="from-rose-500/[0.15]" className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]" />
        <ElegantShape delay={0.4} width={300} height={80} rotate={-8} gradient="from-violet-500/[0.15]" className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]" />
        <ElegantShape delay={0.6} width={200} height={60} rotate={20} gradient="from-amber-500/[0.15]" className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]" />
        <ElegantShape delay={0.7} width={150} height={40} rotate={-25} gradient="from-cyan-500/[0.15]" className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]" />
      </div>

      {/* Hero Content Wrapper */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Badge (from the new component) */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
          >
            <Circle className="h-2 w-2 fill-rose-500/80" />
            <span className="text-sm text-white/60 tracking-wide">
              {badge}
            </span>
          </motion.div>

          {/* Titles (from the new component) - Using the titles from the demo/request */}
          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                {title1}
              </span>
              <br />
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 "
                )}
              >
                {title2}
              </span>
            </h1>
          </motion.div>

          {/* This is where your portfolio-specific children will be rendered */}
          {children}

        </div>
      </div>

      {/* Bottom Fade to Match Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  );
}

// --- Embedded ElegantShape & HeroGeometric Logic End ---


/**
 * Your Integrated Hero Section.
 * This replaces the original HeroSection and integrates the new UI components.
 * The content (bio, buttons, social links) is maintained.
 */
export const HeroSection = ({ portfolioData, resumePdf, isVisible, handleDownload }: any) => {

  // Your original bio, buttons, and social links content
  const portfolioContent = (
    <>
      <motion.div
        custom={2}
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
      >
        <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
          {/* Using the bio from your original component's props */}
          {portfolioData.personal.bio}
        </p>
      </motion.div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
        <button className="group relative inline-flex items-center justify-center px-9 py-4 text-base font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl text-black transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 overflow-hidden">
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
          className="group relative inline-flex items-center justify-center px-9 py-4 text-base font-bold text-white border-2 border-gray-600 hover:border-green-500 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/10 overflow-hidden backdrop-blur-sm bg-black/30"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 flex items-center">
            <Download className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
            DOWNLOAD RESUME
          </span>
        </button>
      </div>

      {/* Social Links */}
      <div className="flex items-center justify-center space-x-6 pt-7">
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
            className="group relative p-3 rounded-xl border border-gray-600/50 hover:border-green-500/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/20 backdrop-blur-sm bg-black/30 hover:bg-black/40"
            title={social.label}
          >
            <social.icon className="h-6 w-6 text-gray-300 group-hover:text-green-500 transition-colors duration-300" />
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />
          </a>
        ))}
      </div>

      {/* Status indicator */}
      <div className="flex items-center justify-center pt-5">
        <div className="flex items-center gap-3 px-7 py-3 bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-600/50 rounded-2xl shadow-xl backdrop-blur-md">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-base text-gray-200 font-medium">
            Available for work
          </span>
        </div>
      </div>
    </>
  );

  return (
    <section id="hero" className="font-sans max-md:mt-20">
      <CustomHeroGeometric
        badge="Kokonut UI"
        title1="Elevate Your"
        title2="Digital Vision"
      >
        {portfolioContent}
      </CustomHeroGeometric>
    </section>
  );
};