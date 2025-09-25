import React from "react";
import {
  Code,
  Database,
  Palette,
  Globe,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  Target,
  Users,
  Feather,
} from "lucide-react";

// Data for the component. You can move this to an external file if you wish.
const aboutData = {
  personal: {
    name: "John Wesley L", // Replace with your name
    bio: "A passionate Full-Stack Developer with a knack for turning complex problems into beautiful, intuitive, and high-performance digital experiences. I thrive on building things from the ground up and seeing ideas come to life on the web.",
    email: "johnwesley8113@gmail.com",
    phone: "+91 9841958457",
    location: "Chennai, India",
    // Use a professional, high-quality image of yourself
    profileImage:
      "https://media.licdn.com/dms/image/v2/D5603AQE9NzsI3qyoTg/profile-displayphoto-crop_800_800/B56ZhF_rxTHMAI-/0/1753520980946?e=1761782400&v=beta&t=Co8Ggl05fgJnqE0VbnbH7XVtynlAgrJ2PzYvloPPY5s",
  },
  principles: [
    {
      icon: Target,
      title: "Purpose-Driven",
      description:
        "Code with a clear goal, ensuring every feature serves the end-user.",
    },
    {
      icon: Users,
      title: "User-Centric",
      description:
        "Design and build with the user's experience as the top priority.",
    },
    {
      icon: Feather,
      title: "Elegant & Simple",
      description: "Strive for simplicity in design and elegance in code.",
    },
  ],
  timeline: [
    {
      icon: GraduationCap,
      date: "2022 - present",
      title: "B.Tech in Artificial Intelligence and Data Science",
      description:
        "Graduated with honors, focusing on software engineering and web technologies.",
    },
    {
      icon: Briefcase,
      date: "2025",
      title: "Frontend Development Intern at DocFacet",
      description:
        "Honed my skills in React and Tailwind CSS building responsive UIs for large-scale applications.",
    },
    // {
    //   icon: Briefcase,
    //   date: "2023 - Present",
    //   title: "Full-Stack Developer at Innovate LLC",
    //   description:
    //     "Building end-to-end solutions, from database design to deployment.",
    // },
    {
      icon: Sparkles,
      date: "Ongoing",
      title: "Exploring New Horizons",
      description:
        "Continuously learning new technologies and contributing to open-source projects.",
    },
  ],
  skills: [
    {
      icon: Code,
      title: "Frontend Development",
      description: "Building responsive and interactive user interfaces.",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
    },
    {
      icon: Database,
      title: "Backend Development",
      description: "Creating robust server-side applications and APIs.",
      technologies: ["Node.js", "Python", "MySQL", "MongoDB", "REST APIs"],
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Designing intuitive and beautiful user experiences.",
      technologies: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    },
    {
      icon: Globe,
      title: "Deployment & DevOps",
      description: "Ensuring applications are scalable and reliable.",
      technologies: ["Docker", "Vercel", "AWS", "CI/CD"],
    },
  ],
};

export const AboutSection = () => {
  const TimelineItem = ({ item, isLast }) => (
    <div className="flex gap-6">
      <div className="flex flex-col items-center">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-800 border-2 border-green-500 flex items-center justify-center">
          <item.icon className="w-6 h-6 text-green-400" />
        </div>
        {!isLast && <div className="w-0.5 flex-grow bg-gray-700/50 mt-2"></div>}
      </div>
      <div className="pb-10">
        <p className="text-sm text-gray-400 mb-1">{item.date}</p>
        <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
        <p className="text-gray-400">{item.description}</p>
      </div>
    </div>
  );

  return (
    <section
      id="about"
      className="relative py-20 md:py-32 px-4 bg-black text-white overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-900/40 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-1/2 right-0 w-96 h-96 bg-emerald-900/40 rounded-full blur-3xl opacity-20 animate-pulse animation-delay-4000" />
      <div className="absolute bottom-0 -left-32 w-96 h-96 bg-teal-900/30 rounded-full blur-3xl opacity-20 animate-pulse animation-delay-2000" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-24 md:space-y-32">
        {/* --- Header Section --- */}
        <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-center">
          <div className="md:col-span-2 rounded-lg overflow-hidden">
            <img
              src={aboutData.personal.profileImage}
              alt={aboutData.personal.name}
              className="w-full h-auto object-cover aspect-square rounded-xl border-2 border-gray-800 shadow-lg shadow-green-900/20"
            />
          </div>
          <div className="md:col-span-3">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mb-6"></div>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {aboutData.personal.bio}
            </p>
          </div>
        </div>

        {/* --- My Guiding Principles --- */}
        <div>
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
            My Guiding Principles
          </h3>
          <div className="grid sm:grid-cols-3 gap-8">
            {aboutData.principles.map((principle) => (
              <div
                key={principle.title}
                className="text-center p-6 bg-gray-900/50 border border-gray-800 rounded-lg"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gray-800 rounded-full">
                    <principle.icon className="w-8 h-8 text-green-400" />
                  </div>
                </div>
                <h4 className="text-xl font-semibold mb-2">
                  {principle.title}
                </h4>
                <p className="text-gray-400">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- Journey Timeline & Tech Arsenal --- */}
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left Column: Timeline */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl md:text-4xl font-bold mb-8">My Journey</h3>
            <div className="relative">
              {aboutData.timeline.map((item, index) => (
                <TimelineItem
                  key={index}
                  item={item}
                  isLast={index === aboutData.timeline.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Skills */}
          <div className="lg:col-span-3">
            <h3 className="text-3xl md:text-4xl font-bold mb-8">
              My Tech Arsenal
            </h3>
            <div className="space-y-6">
              {aboutData.skills.map((skill) => (
                <div
                  key={skill.title}
                  className="p-6 bg-gray-900/50 border border-gray-800 rounded-lg transition-transform hover:scale-105"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-gray-800 rounded-md">
                      <skill.icon className="w-6 h-6 text-green-400" />
                    </div>
                    <h4 className="text-xl font-semibold text-white">
                      {skill.title}
                    </h4>
                  </div>
                  <p className="text-gray-400 mb-4">{skill.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {skill.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Contact Information --- */}
        <div>
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Let's Connect
          </h3>
          <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
            <a
              href={`mailto:${aboutData.personal.email}`}
              className="p-4 group"
            >
              <Mail className="w-10 h-10 mx-auto mb-2 text-gray-500 group-hover:text-green-400 transition-colors" />
              <span className="text-gray-300 group-hover:text-white transition-colors">
                {aboutData.personal.email}
              </span>
            </a>
            <a href={`tel:${aboutData.personal.phone}`} className="p-4 group">
              <Phone className="w-10 h-10 mx-auto mb-2 text-gray-500 group-hover:text-green-400 transition-colors" />
              <span className="text-gray-300 group-hover:text-white transition-colors">
                {aboutData.personal.phone}
              </span>
            </a>
            <div className="p-4 group">
              <MapPin className="w-10 h-10 mx-auto mb-2 text-gray-500 group-hover:text-green-400 transition-colors" />
              <span className="text-gray-300 group-hover:text-white transition-colors">
                {aboutData.personal.location}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
