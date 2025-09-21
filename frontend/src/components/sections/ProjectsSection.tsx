import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, Github, ArrowUpRight, Sparkles, Brain, Video, MessageCircle, ShoppingCart, Globe, Music, Star, Eye, Zap, Heart } from 'lucide-react';

// INTERFACE DEFINITION
interface Project {
  id: number;
  title: string;
  year: string;
  description: string;
  image: string;
  role: string;
  techStack: string[];
  demoLink: string;
  githubLink: string;
  category: string;
  status: string;
  featured: boolean;
  stars: number;
  icon: string;
  size: 'small' | 'medium' | 'large';
}

// PROJECTS DATA
const projectsData: Project[] = [
    {
    id: 1,
    title: "AI Calling Agent",
    year: "2025",
    description: "Intelligent call automation with context awareness and personalized conversation flows that adapt in real-time to user preferences",
    image: "https://www.intervuebox.ai/wp-content/uploads/2025/06/how-cut-candidate-no-shows-ai-calling-agents.png",
    role: "Full Stack Web Development",
    techStack: ["React", "Node.js", "Express", "Gemini API"],
    demoLink: "https://ai-calling-agent-ashen.vercel.app/",
    githubLink: "https://github.com/johnwesley755/ai-calling-agent",
    category: "AI/ML",
    status: "Live",
    featured: true,
    stars: 267,
    icon: "brain",
    size: "large"
  },
  {
    id: 2,
    title: "Smart E-Commerce Hub",
    year: "2024",
    description: "AI-powered e-commerce platform with intelligent product recommendations and immersive shopping experiences",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format",
    role: "Full Stack Web Development",
    techStack: ["React", "Tailwind CSS", "Firebase", "Shadcn UI"],
    demoLink: "https://vutoria-bb1e7.web.app/",
    githubLink: "https://github.com/johnwesley755/vutoria-demo-store",
    category: "E-Commerce",
    status: "Live",
    featured: true,
    stars: 203,
    icon: "shopping",
    size: "large"
  },
  {
    id: 3,
    title: "AI Text-to-Video Generation",
    year: "2025",
    description: "Revolutionary application converting text prompts into stunning AI-generated videos",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&auto=format",
    role: "Full Stack and AI/ML",
    techStack: ["Python", "Flask", "React", "Diffusion models"],
    demoLink: "https://shorts-video-alpha.vercel.app/",
    githubLink: "https://github.com/johnwesley755/shorts-video",
    category: "AI/ML",
    status: "Beta",
    featured: false,
    stars: 174,
    icon: "video",
    size: "medium"
  },
  {
    id: 4,
    title: "Real-time Chat Platform",
    year: "2025",
    description: "Next-generation messaging platform with end-to-end encryption and real-time presence",
    image: "https://files.ably.io/ghost/prod/2023/01/build-a-realtime-chat-app-from-scratch--1-.png",
    role: "Full Stack Web Development",
    techStack: ["React", "Node.js", "Express", "Socket.io"],
    demoLink: "https://chat-app-beta-six-31.vercel.app/",
    githubLink: "https://github.com/johnwesley755/chat-application",
    category: "Web App",
    status: "Live",
    featured: false,
    stars: 156,
    icon: "message",
    size: "medium"
  },
  {
    id: 5,
    title: "Video Conferencing Application",
    year: "2025",
    description: "Enterprise-grade video conferencing with crystal-clear audio and screen sharing",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop&auto=format",
    role: "Full Stack Web Development",
    techStack: ["React", "Node.js", "Firebase", "WebRTC"],
    demoLink: "https://video-conferencing-app-eoid.vercel.app/",
    githubLink: "https://github.com/johnwesley755/video-conferencing-app",
    category: "Web App",
    status: "Live",
    featured: false,
    stars: 267,
    icon: "video",
    size: "small"
  },
  {
    id: 6,
    title: "Namma Isai Music",
    year: "2024",
    description: "Immersive music streaming with spatial audio and dynamic visualizations",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&auto=format",
    role: "Frontend Development",
    techStack: ["HTML", "CSS", "JavaScript", "Firebase"],
    demoLink: "https://namma-isai-music.vercel.app/",
    githubLink: "https://github.com/johnwesley755/namma-isai-music",
    category: "Web App",
    status: "Live",
    featured: false,
    stars: 128,
    icon: "music",
    size: "small"
  },
  {
    id: 7,
    title: "Car Dealership Platform",
    year: "2025",
    description: "Full-stack automotive platform with dealership exploration and reviews",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop&auto=format",
    role: "Full Stack Web Development",
    techStack: ["React", "MongoDB", "Django", "Express"],
    demoLink: "https://car-dealership-application.onrender.com",
    githubLink: "https://github.com/johnwesley755/car-dealership-application",
    category: "Web App",
    status: "Live",
    featured: false,
    stars: 167,
    icon: "globe",
    size: "small"
  },
  {
    id: 8,
    title: "Product Pricing Application",
    year: "2025",
    description: "Intelligent pricing with market analysis and dynamic recommendations",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format",
    role: "Full Stack Web Development",
    techStack: ["React", "Node.js", "Django", "Docker"],
    demoLink: "https://github.com/johnwesley755/dealer-evaluation-application",
    githubLink: "https://github.com/johnwesley755/dealer-evaluation-application",
    category: "Web App",
    status: "Beta",
    featured: false,
    stars: 137,
    icon: "globe",
    size: "small"
  }
];

// ICON MAPPING HELPER
const getIcon = (iconName: string) => {
  const icons: Record<string, React.ReactNode> = {
    brain: <Brain className="w-5 h-5 text-emerald-400" />,
    video: <Video className="w-5 h-5 text-teal-400" />,
    message: <MessageCircle className="w-5 h-5 text-green-400" />,
    shopping: <ShoppingCart className="w-5 h-5 text-emerald-400" />,
    globe: <Globe className="w-5 h-5 text-teal-400" />,
    music: <Music className="w-5 h-5 text-green-400" />,
  };
  return icons[iconName] || <Globe className="w-5 h-5 text-emerald-400" />;
};

// PROJECT CARD COMPONENT
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };
  
  // ✅ **IMPROVEMENT 1: Simplified Card Sizing Logic**
  // We now use the 'size' property from the data for a cleaner, more declarative layout.
  const getCardClasses = () => {
    const baseClasses = `group relative overflow-hidden bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl rounded-3xl border-emerald-500/20 hover:border-emerald-400/50`;
    
    switch (project.size) {
      case 'large':
        return `${baseClasses} col-span-1 sm:col-span-2 lg:col-span-2 row-span-1 lg:row-span-2 hover:shadow-emerald-500/20`;
      case 'medium':
        return `${baseClasses} col-span-1 sm:col-span-2 lg:col-span-2 row-span-1 hover:shadow-teal-500/20`;
      case 'small':
      default:
        return `${baseClasses} col-span-1 row-span-1 hover:shadow-green-500/20`;
    }
  };

  const cardSizeClasses = getCardClasses();

  return (
    <div
      ref={cardRef}
      className={`${cardSizeClasses} ${!isVisible ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      {/* Holographic Glow Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.15), transparent 60%)`,
        }}
      />

      {/* Content Container */}
      <div className="relative h-full flex flex-col">
        {/* Image Section */}
        <div className={`relative overflow-hidden h-60 rounded-t-3xl`}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {project.featured && (
              <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-xs font-bold text-black flex items-center gap-1 shadow-lg">
                <Sparkles className="w-3 h-3" /> Featured
              </div>
            )}
            <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg ${project.status === 'Live' ? 'bg-green-500/80 text-white' : 'bg-amber-500/80 text-black'}`}>
              <div className={`w-2 h-2 rounded-full ${project.status === 'Live' ? 'bg-white' : 'bg-black/50'} animate-pulse`} />
              {project.status}
            </div>
          </div>

          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100 z-10">
            <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-emerald-500 transition-colors">
              <ExternalLink className="w-4 h-4 text-white" />
            </a>
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-gray-600 transition-colors">
              <Github className="w-4 h-4 text-white" />
            </a>
          </div>

          <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
            <div className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-xs text-white flex items-center gap-1 border border-yellow-400/30">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="font-bold">{project.stars}</span>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 z-10">
            <div className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-xs text-green-300 border border-green-400/30 font-semibold">
              {project.category}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col p-6">
          <div className="flex items-start gap-4 mb-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              {getIcon(project.icon)}
            </div>
            <div>
              <h3 className="font-bold text-lg text-white leading-tight group-hover:text-emerald-400 transition-colors">{project.title}</h3>
              <p className="text-xs text-gray-400">{project.role}</p>
            </div>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.slice(0, 4).map((tech) => (
              <span key={tech} className="px-3 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-400/20 rounded-md text-xs font-medium">
                {tech}
              </span>
            ))}
          </div>

          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto w-full inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 group/cta relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-emerald-500/40 hover:shadow-lg text-white px-6 py-3 text-sm"
          >
            <div className="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            Explore Project
            <ArrowUpRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};

// MAIN PROJECTS SECTION COMPONENT
const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  
  const categories = [
    { name: 'all', label: '✨ All Projects', count: projectsData.length },
    { name: 'Web App', label: '🌐 Web Apps', count: projectsData.filter(p => p.category === 'Web App').length },
    { name: 'AI/ML', label: '🤖 AI & ML', count: projectsData.filter(p => p.category === 'AI/ML').length },
    { name: 'E-Commerce', label: '🛒 E-Commerce', count: projectsData.filter(p => p.category === 'E-Commerce').length },
  ];
  
  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);

  return (
    <section className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="projects">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.1),rgba(255,255,255,0))]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-4">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
              Digital Creations
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A curated collection of my work, from intelligent AI applications to polished web experiences.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setFilter(category.name)}
              className={`group px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2.5 border-2 ${
                filter === category.name
                  ? 'bg-emerald-500 text-white border-emerald-500'
                  : 'bg-black/40 text-gray-300 hover:text-white border-gray-700 hover:border-emerald-500'
              }`}
            >
              {category.label}
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-colors ${
                filter === category.name ? 'bg-white/20 text-white' : 'bg-gray-700 text-gray-300 group-hover:bg-emerald-500/50'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* ✅ **IMPROVEMENT 2: The Corrected Masonry Grid** */}
        {/* 'grid-flow-dense' intelligently fills gaps. 'auto-rows' helps create a more consistent vertical rhythm. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 [grid-auto-flow:dense]">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;