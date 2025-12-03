import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PerspectiveCamera } from '@react-three/drei';
import { Badge } from '../ui/Badge';


// 3D Background Model - LARGER SI
const SkillsModel = () => {
  const modelRef = useRef(null);
  const { scene } = useGLTF('/models/glass-hologram.glb');

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      scale={10} 
      position={[0, 0, 0]} 
    />
  );
};

// Skills data with ALL icons preserved
const skillsData = [
  { 
    name: "Python", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    color: "#3776AB" 
  },
  { 
    name: "Django", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain-wordmark.svg",
    color: "#FFFFFF" 
  },
  { 
    name: "React", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB" 
  },
  { 
    name: "Docker", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    color: "#2496ED" 
  },
  { 
    name: "MySQL", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    color: "#4479A1" 
  },
  { 
    name: "MongoDB", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: "#47A248" 
  },
  { 
    name: "TypeScript", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "#3178C6" 
  },
  { 
    name: "Flutter", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
    color: "#02569B" 
  },
  { 
    name: "WebRTC", 
    logo: "https://webrtc.github.io/webrtc-org/assets/images/webrtc-logo-vert-retro-255x305.png",
    color: "#333333" 
  },
  { 
    name: "JavaScript", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "#F7DF1E" 
  },
  { 
    name: "Gemini API", 
    logo: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg",
    color: "#4285F4" 
  },
  { 
    name: "Socket.io", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original-wordmark.svg",
    color: "#FFFFFF" 
  },
  { 
    name: "Node.js", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#339933" 
  },
  { 
    name: "Firebase", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    color: "#FFCA28" 
  },
  { 
    name: "FastAPI", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    color: "#009688" 
  },
  { 
    name: "Tailwind CSS", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    color: "#06B6D4" 
  },
  { 
    name: "HTML5", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    color: "#E34F26" 
  },
  { 
    name: "CSS3", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    color: "#1572B6" 
  },
  { 
    name: "Express", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg",
    color: "#FFFFFF" 
  },
  { 
    name: "Flask", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original-wordmark.svg",
    color: "#FFFFFF" 
  },
  { 
    name: "TensorFlow", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    color: "#FF6F00" 
  },
  { 
    name: "Supabase", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
    color: "#3ECF8E" 
  },
  { 
    name: "Git", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "#F05032" 
  },
  { 
    name: "GitHub", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original-wordmark.svg",
    color: "#FFFFFF" 
  },
  { 
    name: "VS Code", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    color: "#007ACC" 
  },
  { 
    name: "Figma", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    color: "#F24E1E" 
  },
  { 
    name: "EasyOCR", 
    logo: "https://raw.githubusercontent.com/JaidedAI/EasyOCR/master/examples/easyocr_framework.jpeg",
    color: "#FF6B6B" 
  },
  { 
    name: "Shadcn UI", 
    logo: "https://ui.shadcn.com/apple-touch-icon.png",
    color: "#000000" 
  },
];

const SkillsSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showCanvas, setShowCanvas] = useState(false);
  useEffect(() => {
    const t = containerRef.current;
    if (!t) return;
    const io = new IntersectionObserver((entries) => {
      setShowCanvas(entries[0].isIntersecting);
    }, { rootMargin: "-20% 0px -20% 0px", threshold: 0.1 });
    io.observe(t);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-black overflow-hidden py-20 lg:py-32">
      {/* 3D Model Background - MUCH LARGER AND MORE VISIBLE */}
      <div className="absolute inset-0 w-full h-full mt-80">
        {showCanvas && (
        <Canvas 
          shadows 
          dpr={[1, 1]} 
          gl={{ alpha: true, antialias: true }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.25 }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={60} />
          
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          
          <SkillsModel />
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
          
          <Environment preset="city" intensity={2} />
        </Canvas>
        )}
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all duration-300 text-xs uppercase tracking-wider px-4 py-1.5 mb-6">
            Skills & Experience
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Working with Latest
            <br />
            <span className="text-white">
              Technologies & Stack
            </span>
          </h2>
        </div>

        {/* Skills Grid - Enhanced with glassmorphism and animations */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 md:gap-10 lg:gap-14 max-w-6xl mx-auto">
          {skillsData.map((skill, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-4 group cursor-default"
              style={{
                animation: `fadeInUp 0.6s ease-out ${idx * 0.05}s both`
              }}
            >
              {/* Icon Container with Glow Effect */}
              <div className="relative">
                {/* Glow Background */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{
                    background: `radial-gradient(circle, ${skill.color}40 0%, transparent 70%)`
                  }}
                />
                
                {/* Main Icon Container */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl rounded-2xl border border-zinc-800/50 group-hover:border-zinc-700/80 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 overflow-hidden p-3 shadow-2xl">
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon */}
                  <img 
                    src={skill.logo} 
                    alt={skill.name}
                    className="w-full h-full object-contain relative z-10 group-hover:scale-105 transition-transform duration-500"
                    style={{ 
                      filter: skill.color === "#FFFFFF" ? "brightness(0) invert(1)" : "none"
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  
                  {/* Corner Accent */}
                  <div 
                    className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${skill.color} 0%, transparent 70%)`
                    }}
                  />
                </div>
              </div>
              
              {/* Label */}
              <div className="text-center">
                <div className="text-zinc-300 group-hover:text-white font-medium text-sm md:text-base transition-colors duration-300">
                  {skill.name}
                </div>
                {/* Underline Effect */}
                <div 
                  className="h-0.5 w-0 group-hover:w-full mx-auto mt-1 rounded-full transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* CSS Animation Keyframes */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default SkillsSection;