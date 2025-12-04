import React from "react";
import {
  Award,
  Code,
  Sparkles,
  GraduationCap,
  Briefcase,
  Calendar,
  Trophy,
  Rocket,
  Clock,
  FileText,
  User,
  Shield,
} from "lucide-react";
import { portfolioData } from "../../data/portfolio"; 
import { Timeline, type TimelineEntry } from "../ui/timeline"; 

// Mock Context Hook (kept for safety)
const useInteraction = () => ({ selectedSkill: "" }); 

const getIconComponent = (iconName: string): React.ElementType => {
  const icons: { [key: string]: React.ElementType } = {
    Award,
    Code,
    Sparkles,
    Trophy,
    Briefcase,
    Calendar,
    Rocket,
    Clock,
    FileText,
    User,
    Shield,
    GraduationCap,
  };
  return icons[iconName] || Award;
};

// --- DATA MAPPING FUNCTION ---
const mapExperienceToTimeline = (experiences: typeof portfolioData.experiences): TimelineEntry[] => {
    return experiences.map((exp) => ({
        title: exp.period,
        content: (
            <div>
                <h3 className="text-xl font-bold text-white mb-2">
                    {exp.title} - {exp.organization}
                </h3>
                <p className="text-base font-medium text-neutral-300 mb-3">
                    {exp.description}
                </p>

                {/* Achievements List */}
                {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside text-sm text-neutral-400 mb-3 ml-4">
                        {exp.achievements.map((ach, i) => (
                            <li key={i} className="text-neutral-400">
                                {ach}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Tech Stack Pills */}
                {exp.skills && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {exp.skills.map((skill, i) => (
                            <span 
                                key={i} 
                                className="px-3 py-1 text-xs font-medium bg-teal-800/50 text-teal-300 rounded-full"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                )}
                
                {/* Optional: Render an image if available */}
                {exp.image && (
                    <img 
                        src={exp.image} 
                        alt={exp.title} 
                        className="mt-6 w-full md:w-96 h-auto max-h-60 object-cover rounded-lg shadow-xl" 
                    />
                )}
            </div>
        ),
    }));
};

const timelineData = mapExperienceToTimeline(portfolioData.experiences);

// ENHANCED 3D Blobs Background Component
const BackgroundFX = () => (
  <>
    {/* Base Black Background */}
    <div className="absolute inset-0 -z-20 bg-black"></div> 
    
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Grid Pattern (Subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30"></div>

      {/* --- ENHANCED 3D FLOATING BLOBS --- */}
      
      {/* Large Teal/Cyan Blob - Top Left */}
      <div className="blob blob-1 absolute -top-48 -left-48 w-[800px] h-[800px] bg-gradient-to-br from-teal-500/50 via-cyan-500/40 to-blue-500/30 rounded-full animate-blob-float"></div>
      
      {/* Large Purple/Pink Blob - Top Right */}
      <div className="blob blob-2 absolute -top-32 -right-32 w-[700px] h-[700px] bg-gradient-to-bl from-purple-500/45 via-pink-500/35 to-indigo-500/30 rounded-full animate-blob-float-delayed"></div>
      
      {/* Medium Green/Emerald Blob - Middle Left */}
      <div className="blob blob-3 absolute top-1/3 -left-64 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/50 via-green-500/40 to-teal-500/30 rounded-full animate-blob-pulse"></div>
      
      {/* Medium Orange/Red Blob - Middle Right */}
      <div className="blob blob-4 absolute top-1/2 -right-48 w-[550px] h-[550px] bg-gradient-to-tl from-orange-500/40 via-red-500/35 to-pink-500/30 rounded-full animate-blob-float-slow"></div>
      
      {/* Large Blue/Indigo Blob - Bottom Left */}
      <div className="blob blob-5 absolute -bottom-40 -left-56 w-[750px] h-[750px] bg-gradient-to-tr from-blue-500/45 via-indigo-500/40 to-purple-500/30 rounded-full animate-blob-float"></div>
      
      {/* Large Pink/Purple Blob - Bottom Right */}
      <div className="blob blob-6 absolute -bottom-48 -right-64 w-[700px] h-[700px] bg-gradient-to-tl from-pink-500/50 via-purple-500/40 to-indigo-500/35 rounded-full animate-blob-pulse-delayed"></div>
      
      {/* Small Accent Blobs */}
      <div className="blob blob-7 absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-yellow-500/30 via-amber-500/25 to-orange-500/20 rounded-full animate-blob-float-slow"></div>
      
      <div className="blob blob-8 absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-gradient-to-bl from-cyan-500/35 via-blue-500/30 to-indigo-500/25 rounded-full animate-blob-pulse"></div>
      
      {/* --- END ENHANCED 3D FLOATING BLOBS --- */}

      {/* Drifting Shapes (Kept subtle) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-teal-500/10 rounded-full animate-spin-slow-reverse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 border border-green-500/5 rounded-full animate-spin-slow"></div>
      <div className="absolute top-1/2 left-1/2 h-px w-96 bg-gradient-to-r from-transparent via-green-500/30 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
    </div>

    {/* ENHANCED STYLE BLOCK FOR 3D BLOB ANIMATIONS */}
    <style>{`
      /* 3D Blob Base Styling - INCREASED VISIBILITY */
      .blob {
        position: absolute;
        filter: blur(100px);
        opacity: 0.9;
        mix-blend-mode: screen;
        will-change: transform;
      }

      /* Floating Animation - Main */
      @keyframes blob-float {
        0%, 100% { 
          transform: translate(0, 0) scale(1) rotate(0deg);
        }
        25% { 
          transform: translate(50px, -80px) scale(1.1) rotate(90deg);
        }
        50% { 
          transform: translate(-60px, 70px) scale(0.95) rotate(180deg);
        }
        75% { 
          transform: translate(70px, 50px) scale(1.05) rotate(270deg);
        }
      }
      .animate-blob-float {
        animation: blob-float 25s ease-in-out infinite;
      }

      /* Floating Animation - Delayed */
      .animate-blob-float-delayed {
        animation: blob-float 28s ease-in-out infinite;
        animation-delay: 5s;
      }

      /* Floating Animation - Slow */
      .animate-blob-float-slow {
        animation: blob-float 35s ease-in-out infinite;
        animation-delay: 3s;
      }

      /* Pulse Animation - Main */
      @keyframes blob-pulse {
        0%, 100% { 
          transform: scale(1) rotate(0deg);
          opacity: 0.8;
        }
        50% { 
          transform: scale(1.15) rotate(180deg);
          opacity: 1;
        }
      }
      .animate-blob-pulse {
        animation: blob-pulse 20s ease-in-out infinite;
      }

      /* Pulse Animation - Delayed */
      .animate-blob-pulse-delayed {
        animation: blob-pulse 22s ease-in-out infinite;
        animation-delay: 4s;
      }

      /* Spin Animations */
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .animate-spin-slow {
        animation: spin-slow 25s linear infinite;
      }
      .animate-spin-slow-reverse {
         animation: spin-slow 30s linear infinite reverse;
      }
    `}</style>
  </>
);


export const EnhancedExperienceSection = () => {
  return (
    <section 
        id="experience" 
        className="w-full min-h-[300vh] bg-black overflow-hidden flex items-start justify-center relative pt-12" 
    >
        <BackgroundFX />

        <div className="relative z-50 w-full"> 
            <div className="w-full"> 
                <Timeline data={timelineData} />
            </div>
        </div>
    </section>
  );
};