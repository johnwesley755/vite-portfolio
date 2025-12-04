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
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {exp.title} - {exp.organization}
                </h3>
                <p className="text-base md:text-lg font-medium text-neutral-300 mb-3">
                    {exp.description}
                </p>

                {/* Achievements List */}
                {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside text-sm md:text-base text-neutral-400 mb-3 ml-4">
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

// Simplified Background - No Heavy Animations
const BackgroundFX = () => (
  <>
    {/* Base Black Background */}
    <div className="absolute inset-0 -z-20 bg-black"></div> 
    
    <div className="absolute inset-0 -z-10">
      {/* Grid Pattern (Subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30"></div>
      
      {/* Simple Static Gradient Overlay - No Animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 via-transparent to-purple-500/5"></div>
    </div>
  </>
);


export const EnhancedExperienceSection = () => {
  return (
    <section 
        id="experience" 
        className="w-full min-h-[300vh] bg-black overflow-hidden flex flex-col items-center justify-start relative pt-12 pb-20" 
    >
        <BackgroundFX />

        {/* Section Header - Centered and Large */}
        <div className="relative z-50 w-full max-w-7xl mx-auto px-4 mb-16">
            <div className="text-center">
                <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
                    Experience
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto">
                    My professional journey and key achievements
                </p>
            </div>
        </div>

        {/* Timeline Content */}
        <div className="relative z-50 w-full"> 
            <div className="w-full"> 
                <Timeline data={timelineData} />
            </div>
        </div>
    </section>
  );
};