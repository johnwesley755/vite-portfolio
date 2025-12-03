import React, { useState, useEffect, Suspense, useRef, Component, ErrorInfo, ReactNode, useMemo } from "react";
import { useInteraction } from "../../lib/interaction-context"; 
import {
  Github,
  ArrowUpRight,
  Sparkles,
  Brain,
  Video,
  MessageCircle,
  ShoppingCart,
  Globe,
  Music,
  Star,
  Zap,
  FileText,
  Users,
  Code,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";
import { portfolioData } from "../../data/portfolio"; 
import { LinkPreview } from "../ui/link-preview"; 
import { AnimatedTooltip } from "../ui/animated-tooltip";

// SHADCN CARD & BUTTON IMPORTS
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/Card"; // Placeholder import
import { Button } from "../ui/Button"; // Reusing Button for Tabs/Filters

// --- SHADCN TABS IMPORTS (NEW) ---
// Assuming these are the standard shadcn components
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs"; // Placeholder import

// --- THREE.JS IMPORTS (For Background) ---
import * as THREE from 'three'; 
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera, OrbitControls, MeshDistortMaterial, Sphere } from "@react-three/drei"; 


// -------------------------------------------------------------------
// --- TYPE DEFINITIONS ---
// -------------------------------------------------------------------
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
  status: "Live" | "In Development" | "Archived";
  featured: boolean;
  stars: number;
  icon: string;
  size: "small" | "medium" | "large";
}

// -------------------------------------------------------------------
// --- 3D COMPONENTS AND LOGIC (FOR BACKGROUND) ---
// -------------------------------------------------------------------

// --- Error Boundary Component (Self-Contained) ---
interface ErrorBoundaryProps { children: ReactNode; }
interface ErrorBoundaryState { hasError: boolean; }

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in Three.js Canvas:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex justify-center items-center h-full text-red-400 bg-black/50 p-8">
          <p className="text-center text-lg font-semibold border border-red-500/50 p-4 rounded-lg bg-red-900/10 backdrop-blur-sm">
            ❌ **3D Background Failed.** <br />
            Check console for errors.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}


// --- Blob Component for Background ---
interface BlobProps {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  distort: number;
  rotationSpeed?: number;
}

const Blob: React.FC<BlobProps> = ({ position, scale, color, speed, distort, rotationSpeed = 0.5 }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.x = meshRef.current.rotation.y = meshRef.current.rotation.z += 0.002 * rotationSpeed; 
      // Slow floating movement
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.2) * 0.8; 
    }
  });

  return (
    <Sphere args={[1, 64, 64]} position={position} scale={scale} ref={meshRef}>
      <MeshDistortMaterial
        color={color}
        distort={distort} 
        speed={speed} 
        roughness={0.5}
        metalness={0.5}
      />
    </Sphere>
  );
};


// -------------------------------------------------------------------
// --- SKILL MAPPING AND ICON LOGIC ---
// -------------------------------------------------------------------
const skillMap = Object.values(portfolioData.skills).reduce(
  (acc, skillCategory) => {
    skillCategory.items.forEach((item: { name: string; icon: string; color?: string }) => {
      acc[item.name.toLowerCase()] = item;
      acc[item.name.toLowerCase().replace(/\s+/g, "")] = item; 
    });
    return acc;
  },
  {} as Record<string, { name: string; icon: string; color?: string }>
);

const getTooltipItems = (techStack: string[]) => {
  return techStack.slice(0, 4).map((techName, index) => {
    let normalizedName = techName.toLowerCase(); 
    let skill = skillMap[normalizedName];

    if (!skill) {
        normalizedName = techName.toLowerCase().replace(/\s+/g, ""); 
        skill = skillMap[normalizedName];
    }
    
    if (!skill) {
        normalizedName = techName.toLowerCase().replace(/-/g, "").replace(/\s+/g, ""); 
        skill = skillMap[normalizedName];
    }

    return {
      id: index + 1,
      name: skill ? skill.name : techName,
      designation: "Core Technology",
      image: skill
        ? skill.icon
        : "https://www.svgrepo.com/show/303255/react-logo.svg", 
    };
  });
};

// ICON MAPPING HELPER
const getIcon = (iconName: string) => {
  const baseClasses = "w-5 h-5";
  const icons: Record<string, React.ReactNode> = {
    brain: <Brain className={`${baseClasses} text-cyan-400`} />,
    video: <Video className={`${baseClasses} text-blue-400`} />,
    message: <MessageCircle className={`${baseClasses} text-purple-400`} />,
    shopping: <ShoppingCart className={`${baseClasses} text-orange-400`} />,
    globe: <Globe className={`${baseClasses} text-green-400`} />,
    music: <Music className={`${baseClasses} text-pink-400`} />,
    camera: <Zap className={`${baseClasses} text-yellow-400`} />,
    users: <Users className={`${baseClasses} text-red-400`} />,
    "file-text": <FileText className={`${baseClasses} text-indigo-400`} />,
    code: <Code className={`${baseClasses} text-lime-400`} />,
  };
  return icons[iconName] || <Globe className={`${baseClasses} text-gray-400`} />; 
};


// -------------------------------------------------------------------
// --- PROJECT CARD COMPONENT (SHADCN STRUCTURE) ---
// -------------------------------------------------------------------

const ProjectCard: React.FC<{ project: Project; index: number }> = ({
    project,
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement>(null);
  
    const tooltipItems = useMemo(
      () => getTooltipItems(project.techStack),
      [project.techStack]
    );
  
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    };
  
    // Card classes 
    const cardClasses = `group relative overflow-hidden backdrop-blur-sm border transition-all duration-300 hover:-translate-y-2 hover:z-20 rounded-2xl shadow-xl hover:shadow-2xl col-span-1 row-span-1 bg-black/95 border-purple-500/30 hover:border-purple-400/60 hover:shadow-purple-500/30`;
  
    return (
      // ADDED MOTION WRAPPER FOR INDIVIDUAL CARD APPEARANCE
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card
          ref={cardRef}
          className={cardClasses}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
        >
          {/* Enhanced Glow Effect (Focal highlight) */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.15), transparent 70%)`,
            }}
          />
        
          {/* Ambient Light Border (More pronounced hover) */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 blur-xl" />
          </div>
        
          {/* Content Container (CardContent/CardHeader equivalent structure) */}
          <CardContent className="p-0 relative h-full flex flex-col">
            {/* Image Section (CardHeader equivalent structure for media) */}
            <div className={`relative overflow-hidden h-64 min-h-[16rem] rounded-t-[1.125rem]`}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-[1.05] group-hover:brightness-[1.2]" 
              />
              {/* Stronger overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" /> 
          
              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-transparent via-white/30 to-transparent" />
          
              {/* Top-left: Featured/Status Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {project.featured && (
                  <div className="px-4 py-1.5 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 rounded-full text-xs font-extrabold text-gray-900 flex items-center gap-1.5 shadow-2xl shadow-yellow-500/50">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    <span className="tracking-widest">FEATURED</span>
                  </div>
                )}
                <div
                  className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-xl backdrop-blur-lg border border-white/20 ${
                    project.status === "Live"
                      ? "bg-gradient-to-r from-green-500/80 to-teal-500/80 text-white"
                      : project.status === "In Development"
                      ? "bg-gradient-to-r from-amber-500/80 to-red-500/80 text-white"
                      : "bg-gradient-to-r from-gray-500/80 to-gray-600/80 text-white"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      project.status === "Live" ? "bg-lime-300" : "bg-white"
                    } animate-pulse shadow-lg`}
                    style={{
                      boxShadow:
                        project.status === "Live"
                          ? "0 0 6px rgba(190, 242, 100, 1)"
                          : "0 0 6px rgba(255, 255, 255, 0.8)",
                    }}
                  />
                  <span className="tracking-wider">{project.status}</span>
                </div>
              </div>
          
              {/* Bottom-left: Stars/Popularity */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
                <div className="px-4 py-2 bg-black/70 backdrop-blur-md rounded-xl text-xs text-white flex items-center gap-2 border border-yellow-400/40 shadow-xl hover:border-yellow-400/70 transition-all duration-300 group/stars">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 group-hover/stars:scale-110 transition-transform" />
                  <span className="font-extrabold text-sm">{project.stars}</span>
                </div>
              </div>
          
              {/* Bottom-right: Category */}
              <div className="absolute bottom-4 right-4 z-10">
                <div className="px-4 py-2 bg-black/70 backdrop-blur-md rounded-xl text-xs text-blue-300 border border-blue-400/40 font-semibold shadow-xl hover:border-blue-400/70 transition-all duration-300">
                  <span className="tracking-wide uppercase">{project.category}</span>
                </div>
              </div>
            </div>
        
            {/* Content Section (CardContent) */}
            <div className="flex-1 flex flex-col p-6 sm:p-7">
              <div className="flex items-start gap-4 mb-4">
                {/* Icon Box */}
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border border-blue-400/40 transition-all duration-300 group-hover:scale-[1.15] group-hover:rotate-3 shadow-xl group-hover:shadow-blue-500/50">
                  {getIcon(project.icon)}
                </div>
                <div className="flex-1">
                  {/* Title */}
                  <CardTitle className="font-extrabold text-2xl text-white leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-cyan-300 group-hover:bg-clip-text transition-all duration-200 tracking-tighter">
                    {project.title}
                  </CardTitle>
                  {/* Role/Year */}
                  <p className="text-xs text-gray-400 mt-1 tracking-wider uppercase font-medium">
                    {project.role} | {project.year} 
                  </p>
                </div>
              </div>
          
              {/* Description */}
              <CardDescription className="text-gray-300 text-sm leading-relaxed mb-6 flex-1 tracking-wide">
                {project.description}
              </CardDescription>
          
              {/* Tech Stack with AnimatedTooltip */}
              <div className="flex flex-wrap gap-2 mb-8 h-12 justify-start items-center">
                {/* Added a label for context */}
                <span className="text-gray-500 text-xs font-semibold mr-2">Stack:</span>
                <AnimatedTooltip items={tooltipItems} />
              </div>
          
              {/* Enhanced Two-button layout (CardFooter equivalent structure) */}
              <div className="mt-auto flex gap-4">
                {/* 1. Live Demo Button - Primary Action Style */}
                <LinkPreview url={project.demoLink} className="p-0 flex-1">
                  <div className="w-full relative group/btn cursor-pointer">
                    {/* Glow effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-75 group-hover/btn:opacity-100 transition duration-300 animate-pulse" />
          
                    {/* Button */}
                    <div className="relative inline-flex w-full items-center justify-center gap-2 font-extrabold rounded-xl transition-all duration-200 overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-5 py-3.5 text-sm shadow-2xl">
                      {/* Shine effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          
                      <span className="relative tracking-wider">Live Demo</span>
                      <ArrowUpRight className="relative w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-200" />
                    </div>
                  </div>
                </LinkPreview>
          
                {/* 2. View GitHub Button - Secondary Action Style */}
                <LinkPreview url={project.githubLink} className="p-0 flex-1">
                  <div className="w-full relative group/btn cursor-pointer">
                    {/* Subtle glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl blur opacity-50 group-hover/btn:opacity-75 transition duration-300" />
          
                    {/* Button */}
                    <div className="relative inline-flex w-full items-center justify-center gap-2 font-bold rounded-xl transition-all duration-200 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border-2 border-gray-700 hover:border-gray-500 text-white px-5 py-3.5 text-sm shadow-xl">
                      {/* Shine effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
                      <Github className="relative w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-200" />
                      <span className="relative tracking-wide">View Code</span>
                    </div>
                  </div>
                </LinkPreview>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };


// PROJECT GRID COMPONENT - WRAPPED IN MOTION
const ProjectGrid: React.FC<{ filteredProjects: Project[] }> = ({
  filteredProjects,
}) => {
  // Animation variants for the container (staggering effect)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger the appearance of each card
        delayChildren: 0.2,
      },
    },
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-12 gap-y-14"
    > 
      {filteredProjects.map((project, index) => (
        // ProjectCard now uses the individual motion wrapper inside it
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </motion.div>
  );
};

// MAIN PROJECTS SECTION COMPONENT
const ProjectsSection: React.FC = () => {
  // Tabs component uses a string value, so we'll adjust the state.
  const [filter, setFilter] = useState<string>("all");
  const { selectedSkill } = useInteraction(); 

  const projectsData: Project[] = portfolioData.projects as Project[];

  // Define categories and their properties
  const uniqueCategories = [
    ...new Set(projectsData.map((p) => p.category)),
  ];
  
  const categoryLabelMap: Record<string, string> = {
    "Web App": "Web Apps",
    "AI/ML": "AI & ML",
    "E-Commerce": "E-Commerce",
  };
  
  const categories = [
    { name: "all", label: "All Projects", count: projectsData.length },
    ...uniqueCategories.map(cat => ({
      name: cat,
      label: categoryLabelMap[cat] || `${cat}`,
      count: projectsData.filter((p) => p.category === cat).length,
    })),
  ];


  // Filtering logic
  const byCategory =
    filter === "all"
      ? projectsData
      : projectsData.filter((project) => project.category === filter);

  const filteredProjects = selectedSkill
    ? byCategory.filter((p) =>
      p.techStack.some((t) =>
        t.toLowerCase().replace(/\s+/g, "").includes(selectedSkill.toLowerCase().replace(/\s+/g, ""))
      )
    )
    : byCategory;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showBackground, setShowBackground] = useState(false);
  useEffect(() => {
    const t = containerRef.current;
    if (!t) return;
    const io = new IntersectionObserver((entries) => {
      setShowBackground(entries[0].isIntersecting);
    }, { rootMargin: "-20% 0px -20% 0px", threshold: 0.1 });
    io.observe(t);
    return () => io.disconnect();
  }, []);

  return (
    
      <section
        ref={containerRef}
        className="w-full min-h-screen relative overflow-hidden bg-gray-950/90" 
        id="projects"
      >
        {/* Added an overall subtle background gradient for aesthetic depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(10, 14, 21, 0.05),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.05),transparent_60%)]" />

        {/* --- 3D Background Layer (Z-0) --- 
              Opacity set to 50% for good subtle visibility.
        */}
        <div className="absolute inset-0 z-0 opacity-50"> 
            <ErrorBoundary>
                {showBackground && (
                <Canvas 
                    shadows 
                    dpr={[1, 1]} 
                    gl={{ alpha: true, antialias: true }}
                    className="bg-transparent"
                >
                    {/* Camera: FOV adjusted to 45 */}
                    <PerspectiveCamera makeDefault position={[0, 0, 30]} fov={45} /> 
                    
                    {/* Lighting: Increased intensity for visibility. */}
                    <ambientLight intensity={0.5} /> 
                    <directionalLight position={[10, 10, 10]} intensity={0.7} castShadow />
                    
                    {/* Blobs for abstract background movement */}
                    <Suspense fallback={null}>
                        <Blob position={[10, 8, -22]} scale={4} color="#5A00FF" speed={0.6} distort={0.5} rotationSpeed={0.3} />
                    </Suspense>

                    
                    {/* Orbit controls */}
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.1}
                        maxDistance={35}
                        minDistance={25}
                    />
                    

                </Canvas>
                )}
            </ErrorBoundary>
        </div>
        {/* --- Background Overlay Layer (Z-10) --- */}
        <div className="absolute inset-0 z-10 pointer-events-none">
             {/* Radial fade to blur edges and focus content */}
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.9)_100%)]" />
        </div>
        

        {/* --- Content Layer (Z-20) --- */}
        <div className="max-w-7xl mx-auto relative z-20 px-4 pt-20 pb-40">
          <div className="text-center mb-20">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-6xl sm:text-7xl md:text-8xl font-black mb-6 tracking-tight"
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              <span className="bg-gradient-to-r from-white via-white to-slate-500 font-sans font-extrabold bg-clip-text text-transparent drop-shadow-lg">
                Digital Creations
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto tracking-wide font-light"
              style={{ letterSpacing: "0.05em" }}
            >
              Exploring the universe of innovation through code, design, and passion.
            </motion.p>
          </div>

          {/* Filter Buttons (Replaced with Shadcn Tabs) */}
          <div className="flex flex-col items-center mb-16">
            <Tabs 
              value={filter} 
              onValueChange={setFilter} 
              className="w-full max-w-fit flex justify-center" // Added for centering and control
            >
              <TabsList className="flex flex-wrap h-auto p-1 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-lg shadow-2xl">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category.name} 
                    value={category.name}
                    // Adjusted classes for better Shadcn-like appearance and hover effects
                    className="relative inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 gap-2 data-[state=active]:bg-black/80 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-700/50 hover:text-white text-gray-400 group"
                  >
                    <span className="relative z-10">{category.label}</span>
                    <span
                      className={`relative z-10 px-2 py-0.5 rounded-full text-xs font-extrabold transition-all duration-300 ${
                        filter === category.name
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-gray-300 group-hover:bg-blue-500/80"
                      }`}
                    >
                      {category.count}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* TabsContent is technically not needed here since the filter changes the grid, 
                  but included for proper Tabs component structure if content switching was required. 
                  We'll use it to wrap the grid/empty state for conceptual completeness, though it's filtered dynamically. 
                  However, based on the original logic (filtering outside), we'll skip TabsContent and keep the grid outside for simplicity and better motion control.
              */}

            </Tabs>
            
            {/* Selected Skill Filter Badge */}
            {selectedSkill && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-6 px-5 py-3 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-cyan-200 border-2 border-blue-500/50 tracking-wide backdrop-blur-md shadow-lg"
                style={{ letterSpacing: "0.025em" }}
              >
                <Code className="w-4 h-4 inline-block mr-2 align-text-bottom" />
                Filter by Skill: **{selectedSkill}**
              </motion.span>
            )}
          </div>

          <ProjectGrid filteredProjects={filteredProjects} />
          
          {/* Fallback/Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20 border border-dashed border-gray-700 rounded-xl bg-gray-900/50 mt-10">
              <Heart className="w-10 h-10 text-red-500 mx-auto mb-4 opacity-50" />
              <p className="text-xl text-gray-400 font-semibold">
                  No projects found for the current selection.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                  Try a different filter or skill combination.
              </p>
            </div>
          )}
        </div>
      </section>
    
  );
};
  
export default ProjectsSection;