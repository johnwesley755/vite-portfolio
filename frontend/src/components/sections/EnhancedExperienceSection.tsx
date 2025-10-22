import React, { useState } from "react";
import { useInteraction } from "../../lib/interaction-context";
import {
  Award,
  Code,
  Sparkles,
  GraduationCap,
  Briefcase,
  Calendar,
  ChevronRight,
  Trophy,
  Shield,
  Rocket,
} from "lucide-react";
import { portfolioData } from "../../data/portfolio"; // Adjust this import path

// A basic Badge component replacement
const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block px-3 py-1 text-xs font-semibold text-teal-200 bg-teal-900/50 border border-teal-700/50 rounded-full">
    {children}
  </span>
);

// ✅ NEW: Background effects component for a cleaner main component
const BackgroundFX = () => (
  <>
    <div className="absolute inset-0 -z-10">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-50"></div>

      {/* Floating Orbs with Green/Teal Gradients */}
      <div className="absolute top-0 -left-1/4 w-[40rem] h-[40rem] bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-0 -right-1/4 w-[40rem] h-[40rem] bg-gradient-to-tl from-teal-500/20 to-blue-500/10 rounded-full blur-3xl animate-float-slow animation-delay-4000"></div>

      {/* Drifting Shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 border-2 border-teal-500/20 rounded-full animate-spin-slow-reverse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 border-2 border-green-500/10 rounded-full animate-spin-slow"></div>
      <div className="absolute top-1/2 left-1/2 h-px w-96 bg-gradient-to-r from-transparent via-green-500/50 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
    </div>
    <div className="absolute inset-0 -z-20 bg-black"></div>

    <style>{`
      @keyframes float-slow {
        0% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(20px, 40px) rotate(45deg); }
        50% { transform: translate(-20px, -30px) rotate(90deg); }
        75% { transform: translate(30px, -20px) rotate(135deg); }
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
      .animation-delay-4000 {
        animation-delay: 4s;
      }
    `}</style>
  </>
);

export const EnhancedExperienceSection = () => {
  const [activeExp, setActiveExp] = useState<number | null>(
    portfolioData.experiences[0]?.id || null
  );
  const experiences = portfolioData.experiences;
  const { selectedSkill } = useInteraction();

  const getIconComponent = (iconName?: string) => {
    const icons: { [key: string]: React.ElementType } = {
      Award,
      Code,
      Sparkles,
      Trophy,
      Shield,
      Rocket,
    };
    return icons[iconName || ""] || Award;
  };

  const typeDetails: {
    [key: string]: { icon: React.ReactNode; color: string };
  } = {
    certification: {
      icon: <Award className="h-5 w-5" />,
      color: "text-blue-400",
    },
    education: {
      icon: <GraduationCap className="h-5 w-5" />,
      color: "text-green-400",
    },
    hackathon: {
      icon: <Trophy className="h-5 w-5" />,
      color: "text-yellow-400",
    },
    work: { icon: <Briefcase className="h-5 w-5" />, color: "text-purple-400" },
  };

  return (
    <section id="experience" className="relative py-24 overflow-hidden">
      <BackgroundFX />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            My Journey
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            A timeline of key certifications, educational milestones, and
            competitive achievements.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-teal-500/50 via-green-500/50 to-transparent rounded-full"></div>

          <div className="space-y-16">
            {(selectedSkill
              ? experiences.filter((e) =>
                  e.skills.some((s) =>
                    s.toLowerCase().includes(selectedSkill.toLowerCase())
                  )
                )
              : experiences
            ).map((exp, index) => {
              const IconComponent = getIconComponent(exp.icon);
              const isEven = index % 2 === 0;
              const isActive = activeExp === exp.id;
              const detail = typeDetails[exp.type] || typeDetails.certification;

              const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
              const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                });
              };

              const imageSide = (
                <div className="w-full md:w-5/12 hidden md:flex items-center justify-center">
                  <div
                    className="w-full p-4 group"
                    style={{ perspective: "1000px" }}
                  >
                    <img
                      src={exp.image}
                      alt={`${exp.title} Image`}
                      className="w-full h-auto object-cover rounded-2xl shadow-xl shadow-black/50 border border-gray-800 transition-transform duration-500 ease-out group-hover:transform-[rotateY(var(--rotate-y,0))_rotateX(var(--rotate-x,0))_scale(1.05)]"
                      onMouseMove={(e) => {
                        const img = e.currentTarget;
                        const rect = img.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const rotateX = -1 * ((y / rect.height) * 2 - 1) * 10;
                        const rotateY = ((x / rect.width) * 2 - 1) * 10;
                        img.style.setProperty("--rotate-x", `${rotateX}deg`);
                        img.style.setProperty("--rotate-y", `${rotateY}deg`);
                      }}
                      onMouseLeave={(e) => {
                        const img = e.currentTarget;
                        img.style.setProperty("--rotate-x", "0deg");
                        img.style.setProperty("--rotate-y", "0deg");
                      }}
                    />
                  </div>
                </div>
              );

              const contentSide = (
                <div className={`w-full md:w-5/12 ml-10 md:ml-0`}>
                  <div
                    className="relative bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl p-6 group cursor-pointer transition-all duration-300 hover:border-teal-500/50 hover:bg-gray-900/80"
                    onClick={() => setActiveExp(isActive ? null : exp.id)}
                    onMouseMove={handleMouseMove}
                  >
                    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(20, 184, 166, 0.15), transparent 80%)`,
                        }}
                      ></div>
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gray-800/50 flex items-center justify-center border border-gray-700/50 group-hover:scale-105 group-hover:border-teal-500/50 transition-all duration-300">
                          <IconComponent
                            className={`w-8 h-8 ${detail.color}`}
                          />
                        </div>
                        <div className="flex-grow">
                          <p
                            className={`text-sm font-bold uppercase tracking-wider mb-1 ${detail.color}`}
                          >
                            {exp.organization}
                          </p>
                          <h3 className="text-xl font-bold text-white mb-2">
                            {exp.title}
                          </h3>
                          <div className="flex items-center gap-4 text-gray-400 text-sm">
                            <span className="flex items-center gap-1.5">
                              {detail.icon}{" "}
                              <span className="capitalize">{exp.type}</span>
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-4 w-4" /> {exp.period}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed text-base my-4">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <Badge key={skill}>{skill}</Badge>
                        ))}
                      </div>
                      <div
                        className={`transition-all duration-500 ease-in-out overflow-hidden ${
                          isActive
                            ? "max-h-96 opacity-100 mt-4"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="pt-4 border-t border-gray-800/50">
                          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                            Key Achievements
                          </h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <li
                                key={i}
                                className="flex items-start text-sm text-gray-300"
                              >
                                <ChevronRight className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-teal-400" />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="text-center mt-4 text-xs text-gray-500 group-hover:text-teal-400 transition-colors">
                        Click to {isActive ? "collapse" : "see achievements"}
                        <ChevronRight
                          className={`inline-block h-3 w-3 ml-1 transition-transform ${
                            isActive ? "rotate-90" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );

              return (
                <div
                  key={exp.id}
                  className={`relative flex items-center ${
                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 bg-gray-800 rounded-full border-2 border-gray-700 flex items-center justify-center z-10">
                    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                      <div className={`p-0.5 ${detail.color} animate-pulse`}>
                        {React.cloneElement(detail.icon as React.ReactElement, {
                          className: "w-3 h-3",
                        })}
                      </div>
                    </div>
                  </div>
                  {contentSide}
                  {imageSide}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
