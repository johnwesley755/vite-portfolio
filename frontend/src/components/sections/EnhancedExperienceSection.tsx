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

// ENHANCED BackgroundFX component with 3D gradient blobs
const BackgroundFX = () => (
  <>
    {/* Base Black Background */}
    <div className="absolute inset-0 -z-20 bg-black"></div> 
    
    <div className="absolute inset-0 -z-10">
      {/* Grid Pattern (Subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30"></div>

      {/* --- ENHANCED 3D FLOATING BLOBS --- */}
      
      {/* Primary Teal/Green Blob (Larger, more vivid) */}
      <div className="absolute top-0 -left-1/4 w-[60rem] h-[60rem] bg-gradient-to-br from-green-500/40 to-teal-500/40 rounded-full blur-[150px] animate-float-slow opacity-90"></div>
      
      {/* Secondary Blue/Teal Blob (Larger, slightly different timing) */}
      <div className="absolute bottom-0 -right-1/4 w-[50rem] h-[50rem] bg-gradient-to-tl from-teal-500/50 to-blue-500/30 rounded-full blur-[120px] animate-float-slow animation-delay-4000 opacity-90"></div>
      
      {/* Purple Blob (Middle left, for contrast) */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-500/30 rounded-full blur-[100px] animate-spin-slow-reverse" style={{ animationDelay: '2s' }}></div>
      
      {/* Red/Orange Blob (Bottom right, smaller accent) */}
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-red-500/25 rounded-full blur-[100px] animate-float-slow" style={{ animationDelay: '6s' }}></div>
      
      {/* --- END ENHANCED 3D FLOATING BLOBS --- */}

      {/* Drifting Shapes (Kept subtle) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-teal-500/10 rounded-full animate-spin-slow-reverse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 border border-green-500/5 rounded-full animate-spin-slow"></div>
      <div className="absolute top-1/2 left-1/2 h-px w-96 bg-gradient-to-r from-transparent via-green-500/30 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
    </div>

    {/* REINSTATING LOCAL STYLE BLOCK FOR TAILWIND 4.0 KEYFRAME SUPPORT */}
    <style>{`
      @keyframes float-slow {
        0% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(30px, 50px) rotate(45deg); } /* Increased movement */
        50% { transform: translate(-30px, -40px) rotate(90deg); }
        75% { transform: translate(40px, -30px) rotate(135deg); }
        100% { transform: translate(0, 0) rotate(180deg); }
      }
      .animate-float-slow {
        animation: float-slow 20s ease-in-out infinite;
      }
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
      /* This is a custom utility for animation-delay, typically defined in config */
      /* Since we can't use config, we must rely on inline style or a class defined globally */
      /* We will rely on inline style for delay: style={{ animationDelay: 'X' }} */
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