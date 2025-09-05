import React, { useState, useEffect } from "react";
import {
  Github,
  AlertCircle,
  Linkedin,
  Twitter,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  Star,
  Award,
  Code,
  Sparkles,
  ChevronRight,
  Menu,
  X,
  Smartphone,
  ArrowUp,
  Calendar,
  User,
  Briefcase,
  GraduationCap,
  Eye,
  Send,
  Zap,
  Target,
  Layers,
  Globe,
  Database,
  Server,
  Palette,
  Users,
  Coffee,
} from "lucide-react";
import ibmImg from "./assets/ibm.png";
import uiuxImg from "./assets/uiux.jpg";
import courseraImg from "./assets/java.jpeg";
import { href } from "react-router-dom";
import resumePdf from "./assets/resume.pdf";
// Portfolio Data
const portfolioData = {
  personal: {
    name: "John Wesley",
    title: "Full Stack Developer",
    subtitle:
      "Building exceptional digital experiences with cutting-edge technology",
    bio: "Passionate full-stack developer with expertise in modern web technologies, AI integration, and user-centered design. I create scalable applications that solve real-world problems and deliver exceptional user experiences.",
    email: "johnwesley8113@gmail.com",
    phone: "+91 9841958457",
    location: "Chennai, Tamil Nadu, IN",
    github: "https://github.com/johnwesley755",
    linkedin: "https://www.linkedin.com/in/john-wesley-6707ab258/",
    twitter: "https://x.com/JohnWesley97513",
    resume: resumePdf,
    avatar:
      "https://media.licdn.com/dms/image/v2/D5603AQE9NzsI3qyoTg/profile-displayphoto-scale_400_400/B56ZhF_rxTHMAg-/0/1753520981046?e=1759363200&v=beta&t=GEncn8R5EcyxOQGtePYm4ye5UPbaDvo51zYJiS80Dy4",
  },
  skills: {
    Frontend: {
      items: [
        { name: "React", icon: "⚛️", color: "#61DAFB" },
        { name: "JavaScript", icon: "🟨", color: "#F7DF1E" },
        { name: "TypeScript", icon: "🔷", color: "#3178C6" },
        { name: "HTML5", icon: "🔶", color: "#E34F26" },
        { name: "CSS3", icon: "🎨", color: "#1572B6" },
        { name: "Tailwind", icon: "💨", color: "#06B6D4" },
      ],
      gradient: "from-gray-800 via-gray-700 to-gray-600",
    },
    Backend: {
      items: [
        { name: "Node.js", icon: "🟢", color: "#339933" },
        { name: "Express", icon: "⚡", color: "#000000" },
        { name: "Python", icon: "🐍", color: "#3776AB" },
        { name: "API Design", icon: "🔗", color: "#FF6B6B" },
        { name: "REST", icon: "📡", color: "#4ECDC4" },
      ],
      gradient: "from-gray-700 via-gray-600 to-gray-500",
    },
    Database: {
      items: [
        { name: "MongoDB", icon: "🍃", color: "#47A248" },
        { name: "MySQL", icon: "🐬", color: "#4479A1" },
        { name: "Firebase", icon: "🔥", color: "#FFCA28" },
      ],
      gradient: "from-gray-600 via-gray-500 to-gray-400",
    },
    Tools: {
      items: [
        { name: "Git", icon: "📝", color: "#F05032" },
        { name: "GitHub", icon: "🐙", color: "#181717" },
        { name: "VS Code", icon: "💻", color: "#007ACC" },
        { name: "Figma", icon: "🎯", color: "#F24E1E" },
        { name: "Postman", icon: "📮", color: "#FF6C37" },
      ],
      gradient: "from-gray-500 via-gray-400 to-gray-300",
    },
  },
  projects: [
    {
      id: 1,
      title: "AI Calling Agent",
      year: "2025",
      description:
        "Intelligent call automation with context awareness and personalized conversation flows that adapt in real-time to user preferences",
      image:
        "https://www.intervuebox.ai/wp-content/uploads/2025/06/how-cut-candidate-no-shows-ai-calling-agents.png",
      role: "Full Stack Web Development",
      techStack: ["React", "Node.js", "Express", "Gemini API"],
      demoLink: "https://ai-calling-agent-ashen.vercel.app/",
      githubLink: "https://github.com/johnwesley755/ai-calling-agent",
      category: "Web App",
      status: "Live",
      featured: true,
      stars: 267,
    },

    {
      id: 2,
      title: "AI Text-to-Video Generation",
      year: "2025",
      description:
        "Developed application converting text prompts into AI-generated videos using advanced diffusion models",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop",
      role: "Full Stack and AI/ML",
      techStack: ["Python", "Flask", "React", "Diffusion models"],
      demoLink: "https://shorts-video-alpha.vercel.app/",
      githubLink: "https://github.com/johnwesley755/shorts-video",
      category: "AI/ML",
      status: "Beta",
      featured: false,
      stars: 174,
    },
    {
      id: 3,
      title: "Chat Application",
      year: "2025",
      description:
        "Architected secure real-time messaging platform with authentication and stores user's data in MongoDB with instant messaging capabilities",
      image:
        "https://files.ably.io/ghost/prod/2023/01/build-a-realtime-chat-app-from-scratch--1-.png",
      role: "Full Stack Web Development",
      techStack: ["React", "Node.js", "Express", "Socket.io"],
      demoLink: "https://chat-app-beta-six-31.vercel.app/",
      githubLink: "https://github.com/johnwesley755/chat-application",
      category: "Web App",
      status: "Live",
      featured: true,
      stars: 156,
    },
    {
      id: 4,
      title: "E-Commerce Platform",
      year: "2024",
      description:
        "Modern e-commerce solution with AI-powered recommendations, real-time inventory management, and seamless payment integration.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      role: "Full Stack Web Development",
      techStack: ["React", "Tailwind CSS", "Firebase", "Shadcn UI"],
      demoLink: "https://vutoria-bb1e7.web.app/",
      githubLink: "https://github.com/johnwesley755/vutoria-demo-store",
      category: "E-Commerce",
      status: "Live",
      featured: true,
      stars: 203,
    },
    {
      id: 5,
      title: "AI Image to Text Generator",
      year: "2024",
      description:
        "A web app that extracts text from images and generates context-aware responses using advanced natural language processing",
      image:
        "https://www.aiseesoft.com/images/tutorial/jpg-to-text/jpg-to-text.jpg",
      role: "AI Developer",
      techStack: ["Python", "FastAPI", "React", "WebSocket"],
      demoLink: "https://example.com/project5",
      githubLink: "https://github.com/johnwesley755/image-to-text",
      category: "AI/ML",
      status: "Beta",
      featured: false,
      stars: 174,
    },
    {
      id: 6,
      title: "Video Conferencing Application",
      year: "2025",
      description:
        "Built browser-based video conferencing solution enabling seamless peer-to-peer communication",
      image:
        "https://kumospace.mo.cloudinary.net/https://content.kumospace.com/hubfs/Blog/Why%20Businesses%20Need%20Secure%20Video%20Conferencing%20and%20How%20to%20Get%20Started/Secure-Video-Conferencing.jpg?tx=w_responsive:fallback-max-width_1212;fallback-max-width-mobile_720",
      role: "Full Stack Web Development",
      techStack: ["React", "Node.js", "Firebase", "WebRTC"],
      demoLink: "https://video-conferencing-app-eoid.vercel.app/",
      githubLink: "https://github.com/johnwesley755/video-conferencing-app",
      category: "Web App",
      status: "Live",
      featured: true,
      stars: 267,
    },
    {
      id: 7,
      title: "Car Dealership Application",
      year: "2025",
      description:
        "A full-stack web application that allows users to explore car dealerships, view dealer details, and submit reviews with sentiment analysis.",
      image:
        "https://img.freepik.com/free-vector/isometric-devops-illustration_52683-84175.jpg?ga=GA1.1.1436923625.1750582702&semt=ais_hybrid&w=740",
      role: "Full Stack Web Development",
      techStack: ["React", "MongoDB", "Django", "Express"],
      demoLink: "https://car-dealership-application.onrender.com",
      githubLink: "https://github.com/johnwesley755/car-dealership-application",
      category: "Web App",
      status: "Live",
      featured: true,
      stars: 167,
    },

    {
      id: 8,
      title: "Product Pricing Application",
      year: "2025",
      description:
        "Built browser-based video conferencing solution enabling seamless peer-to-peer communication",
      image:
        "https://img.freepik.com/free-vector/gradient-api-illustration_23-2149368725.jpg?ga=GA1.1.1436923625.1750582702&semt=ais_hybrid&w=740",
      role: "Full Stack Web Development",
      techStack: ["React", "Node.js", "Django", "Express", "Docker"],
      demoLink:
        "https://github.com/johnwesley755/dealer-evaluation-application",
      githubLink:
        "https://github.com/johnwesley755/dealer-evaluation-application",
      category: "Web App",
      status: "Beta",
      featured: true,
      stars: 137,
    },
    {
      id: 9,
      title: "Namma Isai",
      year: "2024",
      description:
        "A custom-built music player with playlists, local storage, and responsive UI. Features include audio visualization, custom themes, and seamless playback controls.",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop",
      role: "Frontend Development",
      techStack: ["HTML", "CSS", "JavaScript", "Firebase"],
      demoLink: "https://namma-isai-music.vercel.app/",
      githubLink: "https://github.com/johnwesley755/namma-isai-music",
      category: "Web App",
      status: "Live",
      featured: true,
      stars: 128,
    },
  ],
  experiences: [
    {
      id: 1,
      title: "IBM Full Stack Developer Certification",
      organization: "IBM",
      period: "2025",
      type: "certification",
      description:
        "Comprehensive full-stack development program covering microservices architecture, cloud deployment, DevOps practices, and enterprise-level application development.",
      skills: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Docker",
        "Kubernetes",
        "Django",
      ],
      icon: "Award",
      achievements: [
        "Completed 12 hands-on labs",
        "Built 3 full-stack projects",
        "Scored 95% on final assessment",
        "Certified in cloud deployment",
      ],
    },
    {
      id: 2,
      title: "Frontend for Java Full Stack Development",
      organization: "Coursera",
      period: "2025",
      type: "certification",
      description:
        "Advanced frontend development course focusing on modern JavaScript frameworks, responsive design, and integration with Java backend systems.",
      skills: ["HTML", "CSS", "Javascript", "Angular", "Bootstrap"],
      icon: "Code",
      achievements: [
        "Built responsive web applications",
        "Mastered Angular framework",
        "Implemented dynamic user interfaces",
        "Integrated with REST APIs",
      ],
    },
    {
      id: 3,
      title: "Google UX Design Certification",
      organization: "Google",
      period: "2025",
      type: "education",
      description:
        "Comprehensive UX design program covering user research, prototyping, design systems, accessibility standards, and user-centered design methodology.",
      skills: [
        "Figma",
        "UI Design",
        "User Research",
        "Prototyping",
        "Accessibility",
        "Wireframing",
      ],
      icon: "Sparkles",
      achievements: [
        "Completed 6 real-world projects",
        "Developed professional UX portfolio",
        "Mastered design thinking process",
        "Certified in accessibility standards",
      ],
    },
  ],
};

// UI Components
const Button = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  onClick,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:opacity-50 transform hover:scale-105";
  const variants = {
    default: "bg-white text-black hover:bg-gray-100 shadow-lg hover:shadow-xl",
    outline:
      "border-2 border-gray-600 text-white hover:bg-white hover:text-black hover:border-white",
    ghost: "text-white hover:bg-gray-800/50",
  };
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 py-3",
    lg: "h-13 px-8 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-gray-900/60 backdrop-blur-xl border border-gray-800/50 rounded-2xl hover:border-gray-700/50 transition-all duration-300 ${className}`}
  >
    {children}
  </div>
);

const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-gray-800/80 text-gray-200 border border-gray-700/50",
    outline: "border border-gray-600/50 text-gray-300 bg-gray-800/30",
    status: "bg-green-900/30 text-green-300 border border-green-800/50",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm ${variants[variant]}`}
    >
      {children}
    </span>
  );
};

// Header Component
const Header = ({
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
    <header className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-xl border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <div className="text-2xl font-bold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              John Wesley
            </div>
          </div>

          <nav className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? "text-white bg-gray-800/80 shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-gray-800/50 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? "text-white bg-gray-800/80"
                    : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
const HeroSection = () => {
  // Function to handle resume download
  const handleDownload = () => {
    const resumeContent = "This is a placeholder for Briant Larson's resume.";
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
      className="relative min-h-screen w-full bg-black text-white flex items-center font-sans max-md:mt-20 overflow-hidden"
    >
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.1); opacity: 0.7; }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes morphShape {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          50% { border-radius: 50% 40% 60% 30% / 40% 70% 50% 60%; }
          75% { border-radius: 40% 70% 50% 60% / 70% 50% 60% 30%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .float {
          animation: float 6s ease-in-out infinite;
        }
        .pulse-shape {
          animation: pulse 4s ease-in-out infinite;
        }
        .rotate {
          animation: rotate 20s linear infinite;
        }
        .morph {
          animation: morphShape 12s ease-in-out infinite;
        }
        .shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          animation: shimmer 2s infinite;
        }
        
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
        .delay-4 { animation-delay: 0.8s; }
        .delay-5 { animation-delay: 1s; }
        
        .glass-effect {
          background: rgba(55, 55, 55, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>

      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating circles */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-gray-800/20 rounded-full blur-3xl pulse-shape"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-700/15 rounded-full blur-3xl pulse-shape delay-2"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gray-600/10 rounded-full blur-2xl pulse-shape delay-4"></div>

        {/* Geometric shapes */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gray-800/25 rotate-45 blur-lg rotate"></div>
        <div className="absolute bottom-1/3 left-1/3 w-40 h-24 bg-gray-700/20 morph blur-md"></div>
        <div className="absolute top-3/4 right-1/5 w-28 h-28 bg-gray-600/15 rounded-full blur-sm float delay-3"></div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        ></div>

        {/* Diagonal lines */}
        <div className="absolute top-0 right-1/4 w-px h-64 bg-gradient-to-b from-gray-500/30 to-transparent transform rotate-12"></div>
        <div className="absolute bottom-0 left-1/5 w-px h-48 bg-gradient-to-t from-gray-500/30 to-transparent transform -rotate-12"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Column: Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <p className="text-xl md:text-3xl text-gray-400 fade-in delay-1 opacity-0 tracking-wide font-light">
              HELLO I'M
            </p>
            <h1 className="text-5xl md:text-9xl lg:text-9xl font-bold my-3 fade-in delay-2 opacity-0 tracking-wide">
              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                {portfolioData.personal.name.toUpperCase()}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 fade-in delay-3 opacity-0 leading-relaxed">
              {portfolioData.personal.bio}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 fade-in delay-4 opacity-0">
              <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gray-800 rounded-full overflow-hidden border border-gray-700 transition-all duration-300 hover:scale-105 hover:border-gray-500 shimmer">
                <span className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <a href="#project">
                  <span className="relative z-10 flex items-center">
                    VIEW PROJECTS
                    <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </a>
              </button>
              <button
                onClick={handleDownload}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-300 glass-effect rounded-full overflow-hidden border border-gray-700 transition-all duration-300 hover:scale-105 hover:border-gray-500 hover:text-white shimmer"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-gray-800/30 to-gray-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center">
                  <Download className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  DOWNLOAD RESUME
                </span>
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start space-x-4 mt-8 fade-in delay-5 opacity-0">
              {[
                { icon: Github, href: portfolioData.personal.github },
                { icon: Linkedin, href: portfolioData.personal.linkedin },
                { icon: Twitter, href: portfolioData.personal.twitter },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 rounded-full glass-effect border border-gray-800 hover:bg-white/5 transition-all duration-300 hover:scale-110 hover:border-gray-600"
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-700/20 to-gray-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <social.icon className="relative z-10 h-6 w-6 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Image & Visuals */}
          <div className="lg:w-1/2 flex items-center justify-center mt-10 lg:mt-0">
            <div className="relative w-full max-w-md fade-in delay-5 opacity-0">
              {/* Enhanced Background Glow Effect */}
              <div className="absolute -inset-12 bg-gradient-radial from-gray-700/40 via-gray-800/20 to-transparent rounded-full blur-3xl float delay-1000"></div>
              <div className="absolute -inset-8 bg-gradient-radial from-gray-600/30 via-gray-700/15 to-transparent rounded-full blur-2xl float delay-500"></div>

              <div className="relative w-full aspect-square p-2 rounded-full float">
                {/* Enhanced Spinning Border Gradient */}
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-800 via-gray-500 via-gray-600 to-gray-800 rotate"
                  style={{ animationDuration: "15s" }}
                ></div>
                <div
                  className="absolute inset-1 rounded-full bg-gradient-to-l from-gray-700 via-gray-400 to-gray-700 rotate"
                  style={{
                    animationDuration: "20s",
                    animationDirection: "reverse",
                  }}
                ></div>

                <div className="relative w-full h-full bg-black rounded-full p-2">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <img
                      src={portfolioData.personal.avatar}
                      alt={portfolioData.personal.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                    {/* Image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Floating accent elements around the image */}
              <div className="absolute -top-4 -right-4 w-6 h-6 bg-gray-600/40 rounded-full blur-sm float delay-2"></div>
              <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-gray-700/30 rounded-full blur-md float delay-4"></div>
              <div className="absolute top-1/4 -left-8 w-2 h-12 bg-gray-500/25 rounded-full blur-sm float delay-3"></div>
              <div className="absolute bottom-1/4 -right-8 w-3 h-8 bg-gray-600/35 rounded-full blur-sm float delay-1"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 fade-in delay-5 opacity-0">
        <div className="flex flex-col items-center text-gray-500">
          <div className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent mb-2"></div>
          <div className="w-1 h-1 bg-gray-600 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const skills = [
    {
      icon: Code,
      title: "Frontend Development",
      description: "Building responsive and interactive user interfaces",
      technologies: ["React", "Vue.js", "TypeScript", "Tailwind CSS"],
    },
    {
      icon: Database,
      title: "Backend Development",
      description: "Creating robust server-side applications and APIs",
      technologies: ["Node.js", "Python", "PostgreSQL", "MongoDB"],
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Designing intuitive and beautiful user experiences",
      technologies: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
    },
    {
      icon: Globe,
      title: "Web Development",
      description: "Full-stack web applications with modern frameworks",
      technologies: ["Next.js", "Express", "REST APIs", "GraphQL"],
    },
    // {
    //   icon: Smartphone,
    //   title: "Mobile Development",
    //   description: "Cross-platform mobile applications",
    //   technologies: ["React Native", "Flutter", "Expo", "Firebase"],
    // },
    // {
    //   icon: Zap,
    //   title: "DevOps & Deployment",
    //   description: "Efficient deployment and infrastructure management",
    //   technologies: ["AWS", "Docker", "Vercel", "CI/CD"],
    // },
  ];

  return (
    <section
      id="about"
      className="relative py-16 md:py-24 px-4 bg-gradient-to-b from-black via-gray-900/80 to-black overflow-hidden"
    >
      {/* Enhanced CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.1); opacity: 0.7; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .slide-in-left {
          animation: slideInLeft 0.6s ease-out forwards;
        }
        .slide-in-right {
          animation: slideInRight 0.6s ease-out forwards;
        }
        .float {
          animation: float 4s ease-in-out infinite;
        }
        .pulse-bg {
          animation: pulse 4s ease-in-out infinite;
        }
        .shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
          animation: shimmer 2s infinite;
        }
        
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
        
        .glass-card {
          background: rgba(31, 31, 31, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #ffffff 0%, #a1a1a1 50%, #6b7280 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-80 h-80 bg-gray-800/10 rounded-full blur-3xl pulse-bg"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-700/15 rounded-full blur-2xl pulse-bg delay-2"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gray-600/10 rounded-full blur-xl pulse-bg delay-4"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20 fade-in-up opacity-0">
          <div className="inline-block px-6 py-2 mb-6 text-sm font-medium text-gray-300 glass-card rounded-full">
            <span className="animate-pulse text-blue-400">●</span> Get to know
            me
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 gradient-text">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-600 to-gray-800 mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Crafting digital experiences with passion, precision, and
            cutting-edge technology
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start mb-16">
          {/* Left Column - Image and Bio */}
          <div className="space-y-8 slide-in-left opacity-0 delay-1">
            {/* Image Container */}
            <div className="relative group">
              {/* Glow effects */}
              <div className="absolute -inset-6 bg-gradient-to-r from-gray-700/20 via-gray-500/15 to-gray-700/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>

              {/* Main image */}
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=700&h=600&fit=crop"
                  alt="Coding workspace"
                  className="w-full h-[400px] md:h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                {/* Status badge */}
                <div className="absolute bottom-6 left-6 glass-card px-4 py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-white font-medium">
                      Available for Work
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Text */}
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                My Story
              </h3>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                {portfolioData.personal.bio}
              </p>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                With a strong foundation in both frontend and backend
                technologies, I specialize in creating seamless, scalable
                applications that not only meet business requirements but also
                deliver exceptional user experiences.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Get In Touch
              </h3>
              <div className="space-y-3">
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
                ].map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href}
                    className="flex items-center text-gray-300 group hover:text-white transition-all duration-300 p-3 rounded-lg hover:bg-gray-800/30"
                  >
                    <div className="p-2 bg-gray-800/50 rounded-lg mr-4 group-hover:bg-gray-700/50 transition-colors">
                      <contact.icon className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-medium text-sm md:text-base">
                      {contact.text}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Skills */}
          <div className="slide-in-right opacity-0 delay-2">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  What I Do
                </h3>
                <p className="text-gray-400 text-base md:text-lg">
                  Specialized skills and technologies I work with
                </p>
              </div>

              {/* Skills Grid */}
              <div className="grid gap-4 md:gap-6">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="group glass-card p-4 md:p-6 rounded-xl hover:bg-gray-800/30 transition-all duration-300 hover:scale-[1.02] shimmer relative overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                      <div className="flex-shrink-0">
                        <div className="p-3 bg-gray-800/50 rounded-lg group-hover:bg-gray-700/50 transition-colors">
                          <skill.icon className="h-5 w-5 md:h-6 md:w-6 text-gray-400 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg md:text-xl font-semibold text-white mb-2 group-hover:text-gray-100">
                          {skill.title}
                        </h4>
                        <p className="text-gray-400 mb-3 group-hover:text-gray-300 text-sm md:text-base">
                          {skill.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {skill.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs md:text-sm rounded-full group-hover:bg-gray-600/50 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Skills Section Component
const SkillsSection = () => {
  const skillIcons = {
    Frontend: <Palette className="h-8 w-8" />,
    Backend: <Server className="h-8 w-8" />,
    Database: <Database className="h-8 w-8" />,
    Tools: <Zap className="h-8 w-8" />,
  };

  return (
    <section id="skills" className="relative py-32 px-4 overflow-hidden">
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-black"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-gray-800/40 to-gray-700/40 border border-gray-600/30 text-gray-300 text-sm font-medium tracking-wider uppercase backdrop-blur-sm">
              Technical Expertise
            </span>
          </div>

          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-none">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent drop-shadow-2xl">
              Skills &
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Mastery across the full development stack with cutting-edge
            technologies
            <br />
            <span className="text-gray-400">and industry-leading tools</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-10">
          {Object.entries(portfolioData.skills).map(
            ([category, data], categoryIndex) => (
              <Card
                key={category}
                className="group relative overflow-hidden border-0 bg-gradient-to-br from-gray-800/40 via-gray-900/60 to-slate-900/40 backdrop-blur-xl hover:from-gray-700/60 hover:via-gray-800/80 hover:to-slate-800/60 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-gray-500/10"
                style={{
                  animationDelay: `${categoryIndex * 200}ms`,
                }}
              >
                {/* Card Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/0 via-gray-400/0 to-gray-500/0 group-hover:from-gray-400/10 group-hover:via-white/5 group-hover:to-gray-400/10 transition-all duration-500 rounded-xl"></div>

                {/* Border Gradient */}
                <div
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-600/20 via-gray-500/10 to-gray-600/20 group-hover:from-gray-400/40 group-hover:via-gray-300/30 group-hover:to-gray-400/40 transition-all duration-500"
                  style={{ padding: "1px" }}
                >
                  <div className="h-full w-full rounded-xl bg-gradient-to-br from-gray-800/80 via-gray-900/90 to-slate-900/80 backdrop-blur-sm"></div>
                </div>

                <div className="relative p-8 lg:p-10">
                  {/* Category Header */}
                  <div className="text-center mb-10">
                    <div className="relative inline-flex p-6 rounded-3xl bg-gradient-to-br from-gray-700/50 to-gray-800/70 group-hover:from-gray-600/40 group-hover:to-gray-700/60 text-gray-300 group-hover:text-white transition-all duration-500 mb-6 group-hover:scale-110 transform">
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-gray-400/0 to-gray-300/0 group-hover:from-gray-300/15 group-hover:to-white/10 transition-all duration-500"></div>
                      <div className="relative transform group-hover:scale-110 transition-transform duration-300">
                        {skillIcons[category]}
                      </div>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-200 group-hover:to-white group-hover:bg-clip-text transition-all duration-300">
                      {category}
                    </h3>

                    <div className="w-20 h-1 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 group-hover:from-gray-400 group-hover:via-gray-200 group-hover:to-gray-400 mx-auto rounded-full transition-all duration-500 group-hover:w-24 group-hover:h-1.5"></div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3">
                    {data.items.map((skill, index) => (
                      <div
                        key={skill.name}
                        className="group/skill transform hover:scale-105 transition-all duration-300"
                        style={{
                          animationDelay: `${
                            categoryIndex * 200 + index * 100
                          }ms`,
                        }}
                      >
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-800/20 via-gray-700/30 to-gray-800/20 hover:from-gray-700/20 hover:via-gray-600/30 hover:to-gray-700/20 transition-all duration-300 border border-gray-700/30 hover:border-gray-500/40 group-hover/skill:shadow-lg group-hover/skill:shadow-gray-500/10">
                          {/* Skill Item Glow */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400/0 to-transparent group-hover/skill:via-gray-300/8 transition-all duration-300"></div>

                          <div className="relative flex items-center justify-between p-4 lg:p-5">
                            <div className="flex items-center space-x-4">
                              <span className="text-2xl transform group-hover/skill:scale-125 group-hover/skill:rotate-12 transition-all duration-300 filter group-hover/skill:drop-shadow-lg">
                                {skill.icon}
                              </span>
                              <span className="text-gray-300 group-hover/skill:text-white font-semibold text-lg transition-colors duration-300">
                                {skill.name}
                              </span>
                            </div>

                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gray-500 to-gray-400 group-hover/skill:from-gray-300 group-hover/skill:to-white group-hover/skill:scale-150 transition-all duration-300 group-hover/skill:shadow-lg group-hover/skill:shadow-gray-300/50"></div>
                              <div className="w-1 h-1 rounded-full bg-gray-600 group-hover/skill:bg-gray-200 group-hover/skill:scale-125 transition-all duration-300 delay-75"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )
          )}
        </div>

        {/* Bottom Accent */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-gray-800/30 to-gray-700/30 border border-gray-600/20 backdrop-blur-sm">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
            <span className="text-gray-400 text-sm font-medium">
              Continuously evolving with latest technologies
            </span>
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 animate-pulse delay-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
// Projects Section Component
const ProjectsSection = () => {
  const [filter, setFilter] = useState("all");
  const categories = ["all", "Web App", "AI/ML", "E-Commerce"];
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = "https://github.com/johnwesley755"; // Redirects to GitHub
  };

  const filteredProjects =
    filter === "all"
      ? portfolioData.projects
      : portfolioData.projects.filter((project) => project.category === filter);

  return (
    <section id="project" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Showcasing innovative solutions built with modern technologies and
            best practices
          </p>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  filter === category
                    ? "bg-white text-black shadow-lg"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/50"
                }`}
              >
                {category === "all" ? "All Projects" : category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden group hover:bg-gray-800/40 transition-all duration-500 hover:scale-105"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Status and Stars overlay */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <Badge
                    variant={project.status === "Live" ? "status" : "default"}
                  >
                    {project.status}
                  </Badge>
                  <div className="flex items-center bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-white">
                    <Star className="h-4 w-4 mr-1 fill-current text-yellow-400" />
                    {project.stars}
                  </div>
                </div>

                {/* Quick actions */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-2">
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 text-white" />
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                    >
                      <Github className="h-4 w-4 text-white" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gray-100">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-400 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {project.year}
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-800/50">
                    <span className="text-sm text-gray-400">
                      {project.role}
                    </span>
                    <div className="flex space-x-4">
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-400 hover:text-white transition-colors"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Demo
                      </a>
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-400 hover:text-white transition-colors"
                      >
                        <Github className="h-4 w-4 mr-1" />
                        Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View all projects button */}
        <div className="text-center mt-16">
          <a href="https://github.com/johnwesley755" target="_blank">
            <Button variant="outline" size="lg">
              <Globe className="mr-2 h-5 w-5" />
              View All Projects
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

const EnhancedExperienceSection = () => {
  const [activeExp, setActiveExp] = useState(null);

  const experiences = [
    {
      id: 1,
      title: "IBM Full Stack Developer Certification",
      organization: "IBM",
      period: "2025",
      type: "certification",
      description:
        "Comprehensive full-stack development program covering microservices architecture, cloud deployment, DevOps practices, and enterprise-level application development.",
      skills: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Docker",
        "Kubernetes",
        "Django",
      ],
      icon: "Award",
      certImage: ibmImg,
      achievements: [
        "Completed 12 hands-on labs",
        "Built 3 full-stack projects",
        "Scored 95% on final assessment",
        "Certified in cloud deployment",
      ],
      credentialId: "IBM-2025-FS-001",
    },
    {
      id: 2,
      title: "Frontend for Java Full Stack Development",
      organization: "Coursera",
      period: "2025",
      type: "certification",
      description:
        "Advanced frontend development course focusing on modern JavaScript frameworks, responsive design, and integration with Java backend systems.",
      skills: ["HTML", "CSS", "Javascript", "Angular", "Bootstrap"],
      icon: "Code",
      certImage: courseraImg,
      achievements: [
        "Built responsive web applications",
        "Mastered Angular framework",
        "Implemented dynamic user interfaces",
        "Integrated with REST APIs",
      ],
      credentialId: "COURSERA-2025-FE-002",
    },
    {
      id: 3,
      title: "Google UX Design Certification",
      organization: "Google",
      period: "2025",
      type: "education",
      description:
        "Comprehensive UX design program covering user research, prototyping, design systems, accessibility standards, and user-centered design methodology.",
      skills: [
        "Figma",
        "UI Design",
        "User Research",
        "Prototyping",
        "Accessibility",
        "Wireframing",
      ],
      icon: "Sparkles",
      certImage: uiuxImg,
      achievements: [
        "Completed 6 real-world projects",
        "Developed professional UX portfolio",
        "Mastered design thinking process",
        "Certified in accessibility standards",
      ],
      credentialId: "GOOGLE-2025-UX-003",
    },
  ];

  const getIconComponent = (iconName) => {
    const icons = { Award, Code, Sparkles };
    return icons[iconName] || Award;
  };

  const typeIcons = {
    certification: <Award className="h-6 w-6" />,
    education: <GraduationCap className="h-6 w-6" />,
    work: <Briefcase className="h-6 w-6" />,
  };

  const Badge = ({ children, variant = "default" }) => {
    const variants = {
      default: "bg-gray-800/80 text-gray-200 border border-gray-700/50",
      outline: "border border-gray-600/50 text-gray-300 bg-gray-800/30",
    };

    return (
      <span
        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm ${variants[variant]}`}
      >
        {children}
      </span>
    );
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-gray-900/50 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Experience & Education
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Continuous learning and professional development in cutting-edge
            technologies
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800"></div>

          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => {
              const IconComponent = getIconComponent(exp.icon);
              const isEven = index % 2 === 0;
              const isActive = activeExp === exp.id;

              const imageSide = (
                <div className="w-full md:w-5/12 hidden md:flex items-center justify-center">
                  <div className="w-full p-4 group">
                    <img
                      src={exp.certImage}
                      alt={`${exp.title} Certificate`}
                      className="w-full h-auto object-cover rounded-2xl shadow-xl shadow-black/30 border border-gray-800/50 transform group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                </div>
              );

              const contentSide = (
                <div
                  className={`w-full md:w-5/12 ml-12 md:ml-0 ${
                    isEven ? "md:pr-8 lg:pr-16" : "md:pl-8 lg:pl-16"
                  }`}
                >
                  <div
                    className={`bg-gray-900/60 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 md:p-8 hover:border-gray-700/50 hover:bg-gray-800/50 transition-all duration-500 group cursor-pointer transform hover:scale-105 ${
                      isActive
                        ? "ring-2 ring-gray-500/50 shadow-2xl shadow-gray-500/10"
                        : ""
                    }`}
                    onClick={() => setActiveExp(isActive ? null : exp.id)}
                  >
                    <div className="flex flex-col space-y-6">
                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                            <IconComponent className="text-white w-8 h-8 md:w-10 md:h-10" />
                          </div>
                        </div>

                        <div className="flex-grow">
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-gray-100">
                            {exp.title}
                          </h3>
                          <p className="text-lg md:text-xl text-gray-300 mb-2">
                            {exp.organization}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 text-gray-400 text-sm">
                            <div className="flex items-center">
                              {typeIcons[exp.type]}
                              <span className="ml-2 capitalize">
                                {exp.type}
                              </span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {exp.period}
                            </div>
                            {exp.credentialId && (
                              <>
                                <span>•</span>
                                <span className="text-xs bg-gray-800/50 px-2 py-1 rounded">
                                  ID: {exp.credentialId}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                        {exp.description}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      {/* Expandable achievements */}
                      <div
                        className={`transition-all duration-500 overflow-hidden ${
                          isActive
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="pt-4 border-t border-gray-800/50">
                          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                            Key Achievements
                          </h4>
                          <div className="space-y-2">
                            {exp.achievements.map((achievement, achIndex) => (
                              <div
                                key={achIndex}
                                className="flex items-start text-sm text-gray-300"
                              >
                                <ChevronRight className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
                                <span>{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Expand indicator */}
                      <div className="flex justify-center pt-2">
                        <div className="text-gray-500 text-xs flex items-center">
                          Click to {isActive ? "collapse" : "expand"}
                          <ChevronRight
                            className={`h-3 w-3 ml-1 transition-transform ${
                              isActive ? "rotate-90" : ""
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );

              return (
                <div
                  key={exp.id}
                  className="relative flex justify-between items-center w-full"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 md:w-6 md:h-6 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full border-4 border-black z-10 shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full animate-pulse"></div>
                  </div>

                  {isEven ? (
                    <>
                      {contentSide}
                      {imageSide}
                    </>
                  ) : (
                    <>
                      {imageSide}
                      {contentSide}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-in;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};
// Contact Section Component
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      // Get API endpoint from environment variables
      const apiEndpoint =
        import.meta.env.VITE_API_URL || "http://localhost:5000";

      const response = await fetch(`${apiEndpoint}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: "", email: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus({ loading: false, success: false, error: null });
        }, 5000);
      } else {
        setStatus({
          loading: false,
          success: false,
          error: result.error || "Failed to send message",
        });
      }
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: "Network error. Please try again.",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      className="py-24 px-4 bg-gradient-to-b from-black to-gray-900/50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's discuss how we can work
            together to create exceptional digital experiences.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-8">
                Get In Touch
              </h3>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                I'm always excited to collaborate on innovative projects and
                explore new opportunities. Whether you have a project in mind or
                just want to connect, feel free to reach out.
              </p>
            </div>

            <div className="grid gap-6">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  content: "johnwesley8113@gmail.com", // Replace with your email
                  action: "mailto:johnwelsey8113@gmail.com",
                },
                {
                  icon: Phone,
                  title: "Phone",
                  content: "+91 98419 58457", // Replace with your phone
                  action: "tel:+919841958457",
                },
                {
                  icon: MapPin,
                  title: "Location",
                  content: "Chennai, India", // Replace with your location
                  action: null,
                },
              ].map((contact, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-800/30 border border-gray-700/50 rounded-xl hover:bg-gray-800/50 transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gray-800/50 flex items-center justify-center group-hover:bg-gray-700/50 transition-colors">
                        <contact.icon className="h-6 w-6 text-gray-400 group-hover:text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">
                        {contact.title}
                      </h4>
                      {contact.action ? (
                        <a
                          href={contact.action}
                          className="text-gray-300 hover:text-white transition-colors"
                        >
                          {contact.content}
                        </a>
                      ) : (
                        <p className="text-gray-300">{contact.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <h4 className="text-lg font-semibold text-white mb-6">
                Connect With Me
              </h4>
              <div className="flex space-x-4">
                {[
                  {
                    icon: Github,
                    href: "https://github.com/johnwesley755", // Replace with your GitHub
                    label: "GitHub",
                  },
                  {
                    icon: Linkedin,
                    href: "https://www.linkedin.com/in/john-wesley-6707ab258/", // Replace with your LinkedIn
                    label: "LinkedIn",
                  },
                  {
                    icon: Twitter,
                    href: "https://x.com/JohnWesley97513", // Replace with your Twitter
                    label: "Twitter",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-110"
                  >
                    <social.icon className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="p-8 bg-gray-800/30 border border-gray-700/50 rounded-xl">
              <h3 className="text-2xl font-bold text-white mb-6">
                Send a Message
              </h3>

              {/* Status Messages */}
              {status.success && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <p className="text-green-300">
                    Message sent successfully! I'll get back to you soon.
                  </p>
                </div>
              )}

              {status.error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <p className="text-red-300">{status.error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-gray-600/50 focus:ring-2 focus:ring-white/10 transition-colors"
                    placeholder="Enter your name"
                    required
                    disabled={status.loading}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-gray-600/50 focus:ring-2 focus:ring-white/10 transition-colors"
                    placeholder="Enter your email"
                    required
                    disabled={status.loading}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-gray-600/50 focus:ring-2 focus:ring-white/10 transition-colors resize-none"
                    placeholder="Tell me about your project or just say hello..."
                    required
                    disabled={status.loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {status.loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="border-t border-gray-800/50 py-12 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
              {portfolioData.personal.name}
            </div>
            <p className="text-gray-400">
              © 2025 {portfolioData.personal.name}. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-6">
            {[
              { icon: Github, href: portfolioData.personal.github },
              { icon: Linkedin, href: portfolioData.personal.linkedin },
              { icon: Twitter, href: portfolioData.personal.twitter },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800/50"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800/50 text-center">
          <p className="text-gray-500 text-sm">
            Built with React, TypeScript & Tailwind CSS • Designed with passion
            in Chennai, India
          </p>
        </div>
      </div>
    </footer>
  );
};

// Scroll to Top Button Component
const ScrollToTopButton = ({ showScrollTop, scrollToTop }) => {
  if (!showScrollTop) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-4 bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/80 text-white rounded-2xl shadow-2xl transition-all duration-300 hover:scale-110 z-50 border border-gray-700/50"
    >
      <ArrowUp size={20} />
    </button>
  );
};

// Main Portfolio Component
const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sections = [
        "hero",
        "about",
        "skills",
        "projects",
        "experience",
        "contact",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <EnhancedExperienceSection />
      <ContactSection />
      <Footer />

      <ScrollToTopButton
        showScrollTop={showScrollTop}
        scrollToTop={scrollToTop}
      />
    </div>
  );
};

export default Portfolio;
