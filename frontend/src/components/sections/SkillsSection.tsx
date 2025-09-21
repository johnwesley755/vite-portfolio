import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Palette,
  Server,
  Database,
  Wrench,
  Smartphone,
  Cloud,
  GitBranch,
  Monitor,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";
import { portfolioData } from "../../data/portfolio";

// Background with Modern Geometric Shapes
const EnhancedBackgroundShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(20, 184, 166, 0.3) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Modern geometric shapes */}
      <div className="absolute top-32 right-32 w-72 h-72 opacity-10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.6" />
              <stop offset="100%" stopColor="white" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <polygon
            points="100,20 170,60 170,140 100,180 30,140 30,60"
            fill="url(#grad1)"
          />
          <polygon
            points="100,40 150,70 150,130 100,160 50,130 50,70"
            fill="none"
            stroke="white"
            strokeWidth="1"
            opacity="0.3"
          />
        </svg>
      </div>

      <div className="absolute bottom-40 left-32 w-64 h-64 opacity-8">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="white" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <rect
            x="40"
            y="40"
            width="40"
            height="40"
            fill="url(#grad2)"
            transform="rotate(45 60 60)"
          />
          <rect
            x="80"
            y="80"
            width="60"
            height="60"
            fill="none"
            stroke="white"
            strokeWidth="1"
            opacity="0.3"
            transform="rotate(45 110 110)"
          />
        </svg>
      </div>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-20"
          animate={{
            y: [0, -60, 0],
            x: [0, Math.sin(i) * 30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 6 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
          style={{
            left: `${10 + i * 7}%`,
            top: `${20 + Math.sin(i * 2) * 30}%`,
          }}
        />
      ))}

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>
    </div>
  );
};

// Skill Badge Component
const EnhancedSkillBadge = ({ skill, delay = 0 }) => {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        delay,
        duration: 0.6,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{
        scale: 1.05,
        y: -5,
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }}
    >
      <div className="relative p-4 bg-black/70 border border-gray-700/40 rounded-2xl backdrop-blur-sm group-hover:border-teal-500/60 transition-all duration-500 overflow-hidden">
        <div className="relative flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 p-2.5 bg-gray-950/80 rounded-xl group-hover:bg-gray-900/80 transition-all duration-300 shadow-lg flex items-center justify-center">
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 filter drop-shadow-sm"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  (target.nextElementSibling as HTMLElement).style.display =
                    "flex";
                }}
              />
              <div className="w-full h-full bg-gray-800 rounded-lg hidden items-center justify-center shadow-inner">
                <Code2 className="w-6 h-6 text-gray-300" />
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h4 className="text-white font-semibold text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-teal-400 group-hover:bg-clip-text transition-colors duration-300">
              {skill.name}
            </h4>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl" />
      </div>
    </motion.div>
  );
};

// Category Box Component
const EnhancedCategoryBox = ({ category, skills, icon, delay = 0 }) => {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 25,
      }}
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }}
    >
      <div className="relative h-full p-8 bg-gray-950/80 backdrop-blur-xl border border-gray-800/50 rounded-3xl group-hover:border-teal-500/70 transition-all duration-700 overflow-hidden shadow-2xl">
        <div className="relative">
          <div className="flex items-center gap-5 mb-8">
            <div className="relative p-4 bg-gray-900/80 rounded-2xl group-hover:bg-teal-900/50 transition-all duration-500 shadow-lg">
              <div className="text-teal-400 group-hover:text-green-300 group-hover:scale-110 transition-all duration-300">
                {icon}
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-teal-400 group-hover:bg-clip-text transition-colors duration-300">
                {category}
              </h3>
              <div className="text-sm text-gray-400 font-medium bg-gray-900/50 px-3 py-1 rounded-full inline-block border border-gray-700/50">
                {skills.length}{" "}
                {skills.length === 1 ? "Technology" : "Technologies"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <EnhancedSkillBadge
                key={skill.name}
                skill={skill}
                delay={delay + index * 0.08}
              />
            ))}
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 rounded-3xl" />
      </div>
    </motion.div>
  );
};

// Main Skills Section Component
export const SkillsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const categoryIcons: { [key: string]: React.ReactElement } = {
    Frontend: <Monitor className="w-10 h-10" />,
    Backend: <Server className="w-10 h-10" />,
    Database: <Database className="w-10 h-10" />,
    Tools: <Wrench className="w-10 h-10" />,
    Mobile: <Smartphone className="w-10 h-10" />,
    Cloud: <Cloud className="w-10 h-10" />,
    DevOps: <GitBranch className="w-10 h-10" />,
    Design: <Palette className="w-10 h-10" />,
    Framework: <Layers className="w-10 h-10" />,
    Language: <Code2 className="w-10 h-10" />,
  };

  const skillCategories = React.useMemo(() => {
    if (!portfolioData.skills) return [];

    return Object.entries(portfolioData.skills)
      .filter(([_, data]) => data.items && Array.isArray(data.items))
      .map(([category, data]) => ({
        category,
        skills: data.items,
        icon: categoryIcons[category] || <Code2 className="w-10 h-10" />,
      }));
  }, []);

  const totalSkills = skillCategories.reduce(
    (total, cat) => total + cat.skills.length,
    0
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen py-20 px-4 bg-gradient-to-br from-black via-gray-950 to-black overflow-hidden font-sans"
    >
      <div className="absolute inset-0">
        <EnhancedBackgroundShapes />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-teal-950/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-green-950/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-block mb-8"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="inline-flex items-center gap-3 px-6 py-3 bg-gray-950/90 border border-gray-700/60 rounded-full text-gray-300 text-sm font-bold tracking-wide backdrop-blur-sm shadow-lg">
              <Sparkles className="w-4 h-4 text-teal-400" />
              TECHNICAL EXPERTISE
              <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50" />
            </span>
          </motion.div>

          {/* UPDATED: Heading is now on a single line */}
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tight"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              delay: 0.3,
              duration: 1,
              type: "spring",
              stiffness: 120,
            }}
          >
            <span className="text-white">Skills & </span>
            <span className="bg-gradient-to-r from-green-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
              Technologies
            </span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            A comprehensive arsenal of cutting-edge technologies and tools that
            I leverage to craft exceptional digital experiences and build
            scalable, high-performance solutions.
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-8 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <motion.div
              className="text-center px-8 py-4 bg-gray-950/80 border border-gray-700/50 rounded-2xl backdrop-blur-sm shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="text-3xl font-black text-white mb-1"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 1, duration: 0.5, type: "spring" }}
              >
                {totalSkills}+
              </motion.div>
              <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                Technologies
              </div>
            </motion.div>

            <div className="w-px h-20 bg-gradient-to-b from-transparent via-gray-700 to-transparent" />

            <motion.div
              className="text-center px-8 py-4 bg-gray-950/80 border border-gray-700/50 rounded-2xl backdrop-blur-sm shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="text-3xl font-black text-white mb-1"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
              >
                {skillCategories.length}
              </motion.div>
              <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                Categories
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex items-center justify-center mt-16"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.9, duration: 1.2 }}
          >
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
            <motion.div
              className="mx-6 p-3 bg-gray-950/90 border border-gray-700/60 rounded-full backdrop-blur-sm shadow-lg"
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-5 h-5 text-teal-400" />
            </motion.div>
            <div className="h-px w-32 bg-gradient-to-l from-transparent via-green-500/50 to-transparent" />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {skillCategories.length > 0 ? (
            skillCategories.map((categoryData, index) => (
              <EnhancedCategoryBox
                key={categoryData.category}
                category={categoryData.category}
                skills={categoryData.skills}
                icon={categoryData.icon}
                delay={index * 0.15}
              />
            ))
          ) : (
            <motion.div
              className="col-span-full text-center py-20"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              <div className="p-12 bg-gray-950/80 border border-gray-800/60 rounded-3xl max-w-lg mx-auto backdrop-blur-sm shadow-2xl">
                <div className="p-6 bg-gray-900/80 rounded-2xl mb-6 inline-block">
                  <Code2 className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Loading Skills...
                </h3>
                <p className="text-gray-400">
                  Technical expertise will be displayed here
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
