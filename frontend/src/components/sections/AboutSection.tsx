import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  Database,
  Palette,
  Globe,
  Mail,
  Phone,
  MapPin,
  Lightbulb,
  Layers,
  Rocket,
} from "lucide-react";
import { portfolioData } from "../../data/portfolio";

export const AboutSection = () => {
  const skills = [
    {
      icon: Code,
      title: "Frontend Development",
      description: "Building responsive and interactive user interfaces.",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      icon: Database,
      title: "Backend Development",
      description: "Creating robust server-side applications and APIs.",
      technologies: ["Node.js", "Python", "PostgreSQL", "MongoDB"],
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Designing intuitive and beautiful user experiences.",
      technologies: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    },
    {
      icon: Globe,
      title: "DevOps & Deployment",
      description: "Full-stack web applications with modern frameworks.",
      technologies: ["Docker", "AWS", "Vercel", "CI/CD"],
    },
  ];

  // Framer Motion animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const skillCardHover = {
    scale: 1.05,
    boxShadow: "0px 10px 30px rgba(0, 255, 150, 0.1)",
    borderColor: "rgba(34, 197, 94, 0.4)",
  };

  return (
    <motion.section
      id="about"
      className="relative py-20 md:py-32 px-4 bg-black text-white overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-900/40 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-900/40 rounded-full blur-3xl opacity-30 animate-pulse animation-delay-4000" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
            About Me
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            I transform complex ideas into elegant digital solutions, focusing
            on performance, user experience, and scalability.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mt-6"></div>
        </motion.div>

        {/* My Process Section */}
        <div className="mb-16 md:mb-24">
          <motion.h3
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            My Development Journey
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-10 md:gap-8 text-center">
            {/* Step 1: Ideation */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center"
            >
              <div className="relative w-full h-56 rounded-lg overflow-hidden mb-6 group">
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=60"
                  alt="Ideation and planning"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lightbulb className="w-16 h-16 text-green-400/80" />
                </div>
              </div>
              <h4 className="text-xl font-semibold mb-2">
                1. Ideation & Design
              </h4>
              <p className="text-gray-400">
                Transforming initial concepts into well-defined blueprints and
                intuitive UI/UX designs using tools like Figma.
              </p>
            </motion.div>

            {/* Step 2: Development */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center"
            >
              <div className="relative w-full h-56 rounded-lg overflow-hidden mb-6 group">
                <img
                  src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&auto=format&fit=crop&q=60"
                  alt="Code on a screen"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Layers className="w-16 h-16 text-green-400/80" />
                </div>
              </div>
              <h4 className="text-xl font-semibold mb-2">2. Development</h4>
              <p className="text-gray-400">
                Building robust frontend and backend systems with clean,
                efficient code and modern frameworks like React and Node.js.
              </p>
            </motion.div>

            {/* Step 3: Deployment */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center"
            >
              <div className="relative w-full h-56 rounded-lg overflow-hidden mb-6 group">
                <img
                  src="https://images.unsplash.com/photo-1573495627361-d9b87960b12d?w=600&auto=format&fit=crop&q=60"
                  alt="Team reviewing results"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Rocket className="w-16 h-16 text-green-400/80" />
                </div>
              </div>
              <h4 className="text-xl font-semibold mb-2">
                3. Deployment & Iteration
              </h4>
              <p className="text-gray-400">
                Deploying scalable applications on platforms like Vercel and
                AWS, ensuring reliability and continuous improvement.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Skills & Contact Section */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left Column - "What I Do" */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h3 className="text-3xl md:text-4xl font-bold mb-8">What I Do</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {skills.map((skill) => (
                <motion.div
                  key={skill.title}
                  className="p-6 bg-gray-900/50 border border-gray-800 rounded-lg"
                  whileHover={skillCardHover}
                  transition={{ type: "spring", stiffness: 300 }}
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
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Bio & Contact */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">My Story</h3>
              <p className="text-gray-300 leading-relaxed">
                {portfolioData.personal.bio}
              </p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Get In Touch
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    text: portfolioData.personal.email,
                    href: `mailto:${portfolioData.personal.email}`,
                  },
                  {
                    icon: Phone,
                    text: portfolioData.personal.phone,
                    href: `tel:${portfolioData.personal.phone}`,
                  },
                  {
                    icon: MapPin,
                    text: portfolioData.personal.location,
                    href: "#",
                  },
                ].map((contact) => (
                  <a
                    key={contact.text}
                    href={contact.href}
                    className="flex items-center gap-4 group p-2 rounded-md hover:bg-gray-800/50 transition-colors"
                  >
                    <contact.icon className="w-5 h-5 text-gray-500 group-hover:text-green-400 transition-colors" />
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      {contact.text}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
