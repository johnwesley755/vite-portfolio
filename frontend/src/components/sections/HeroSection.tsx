import React, { useState, useEffect, Suspense } from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Download,
  ChevronRight,
} from "lucide-react";
import { portfolioData } from "../../data/portfolio";
import resumePdf from "../../assets/resume.pdf";
import modelGlb from "../../../public/models/model.glb";
// React Three Fiber & Drei
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// 3D Model Loader - Medium scale for balanced visibility
function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={0.25} position={[0, -1, 0]} />;
}

export const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Function to handle resume download
  const handleDownload = () => {
    const resumeContent = "This is a placeholder for resume.";
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
      className="relative min-h-screen bg-black text-white overflow-hidden font-sans max-md:mt-20"
    >
      {/* Background 3D Model Canvas - Full Screen with Interactive Controls */}
      <div className="absolute inset-0 z-0 mt-40">
        <Canvas
          camera={{ position: [0, 0, 18], fov: 35 }}
          style={{ cursor: "grab" }}
          onPointerDown={(e) => (e.target.style.cursor = "grabbing")}
          onPointerUp={(e) => (e.target.style.cursor = "grab")}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <directionalLight position={[-5, -5, -5]} intensity={0.8} />
          <pointLight position={[0, 10, 5]} intensity={1.5} />
          <spotLight position={[10, 10, 10]} intensity={1.0} />
          <Suspense fallback={null}>
            <Model url={modelGlb} />
          </Suspense>
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={1.5}
            enableDamping={true}
            dampingFactor={0.02}
            maxDistance={30}
            minDistance={12}
            rotateSpeed={1.2}
            zoomSpeed={1.2}
            panSpeed={1.0}
            makeDefault
          />
        </Canvas>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/75" />
      </div>

      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 z-[1]">
        <div
          className="absolute inset-0 opacity-15 transition-all duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(34, 197, 94, 0.3) 0%, rgba(16, 185, 129, 0.15) 30%, transparent 70%)`,
          }}
        />

        <div className="absolute top-16 left-8 w-40 h-40 border border-green-500/10 rotate-45 animate-pulse rounded-lg" />
        <div
          className="absolute bottom-20 right-16 w-32 h-32 border-2 border-green-500/15 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-3 h-24 bg-gradient-to-b from-green-500/20 to-transparent animate-pulse rounded-full"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-20 h-20 border border-green-500/8 rotate-12 animate-pulse"
          style={{ animationDelay: "3s" }}
        />

        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-500/20 rounded-full animate-ping"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      {/* Main Content - Centered */}
      <div className="relative z-10 flex items-center justify-center min-h-screen py-20">
        <div className="container mx-auto px-6 lg:px-12 xl:px-16">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Centered Content */}
            <div
              className={`max-w-4xl space-y-7 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent" />
                  <p className="text-sm md:text-base text-green-400 font-medium tracking-[0.2em] uppercase">
                    Hello, I'm
                  </p>
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent" />
                </div>

                {/* Name - Medium sized */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight">
                  <span className="bg-gradient-to-r from-white via-green-100 to-gray-300 bg-clip-text text-transparent">
                    {portfolioData.personal.name.split(" ")[0]}
                  </span>
                  <span className="bg-gradient-to-r from-green-400 via-green-500 to-emerald-400 bg-clip-text text-transparent ml-4">
                    {portfolioData.personal.name.split(" ")[1]}
                  </span>
                  <span
                    className="inline-block ml-3 text-2xl md:text-4xl lg:text-5xl animate-bounce"
                    style={{ animationDelay: "2s" }}
                  >
                    👋
                  </span>
                </h1>

                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent rounded-full" />
                  <div className="w-8 h-1 bg-green-500/50 rounded-full" />
                  <div className="w-16 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent rounded-full" />
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-base md:text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-light backdrop-blur-sm bg-black/30 rounded-2xl p-5 border border-white/10">
                  {portfolioData.personal.bio}
                </p>

                <div className="flex items-center justify-center gap-6 text-gray-300">
                  <div className="flex items-center gap-2 backdrop-blur-sm bg-black/30 rounded-full px-5 py-2 border border-white/10">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm md:text-base">
                      Available for opportunities
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                <button className="group relative inline-flex items-center justify-center px-9 py-4 text-base font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl text-black transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <a
                    href="#project"
                    className="relative z-10 flex items-center"
                  >
                    VIEW PROJECTS
                    <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </button>

                <button
                  onClick={handleDownload}
                  className="group relative inline-flex items-center justify-center px-9 py-4 text-base font-bold text-white border-2 border-gray-600 hover:border-green-500 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/10 overflow-hidden backdrop-blur-sm bg-black/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center">
                    <Download className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
                    DOWNLOAD RESUME
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-center space-x-6 pt-7">
                {[
                  {
                    icon: Github,
                    href: portfolioData.personal.github,
                    label: "GitHub",
                  },
                  {
                    icon: Linkedin,
                    href: portfolioData.personal.linkedin,
                    label: "LinkedIn",
                  },
                  {
                    icon: Twitter,
                    href: portfolioData.personal.twitter,
                    label: "Twitter",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 rounded-xl border border-gray-600/50 hover:border-green-500/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/20 backdrop-blur-sm bg-black/30 hover:bg-black/40"
                    title={social.label}
                  >
                    <social.icon className="h-6 w-6 text-gray-300 group-hover:text-green-500 transition-colors duration-300" />
                    <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />
                  </a>
                ))}
              </div>

              {/* Status indicator */}
              <div className="flex items-center justify-center pt-5">
                <div className="flex items-center gap-3 px-7 py-3 bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-600/50 rounded-2xl shadow-xl backdrop-blur-md">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-base text-gray-200 font-medium">
                    Available for work
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
