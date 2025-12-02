import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PerspectiveCamera } from '@react-three/drei';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import * as THREE from 'three';

// 3D Model Component
const AboutModel: React.FC = () => {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/About.glb');

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
    }
  });

  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      scale={0.5} 
      position={[0, -2, 0]} 
    />
  );
};

// Main About Section - NO PARALLAX
const AboutSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden py-20 lg:py-32">
      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Column - About Content */}
          <div className="space-y-8 z-10">
            {/* Badge */}
            <div>
              <Badge className="bg-blue-500/20 text-blue-300 border border-blue-400/40 hover:bg-blue-500/30 transition-all duration-300 text-sm px-4 py-1.5">
                About Me
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]">
                Crafting Digital
                <br />
                <span className="relative inline-block mt-2">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Experiences
                  </span>
                  <div className="absolute -bottom-3 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full" />
                </span>
              </h2>
            </div>

            {/* About Paragraphs */}
            <div className="space-y-6">
              <p className="text-zinc-200 text-lg md:text-xl leading-relaxed">
                I'm a passionate web developer and designer who believes that great digital products 
                are born at the intersection of beautiful design and powerful technology. My journey 
                in web development started with a simple curiosity about how things work on the internet, 
                and it has evolved into a deep passion for creating experiences that people love to use.
              </p>
              
              <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
                What drives me is the challenge of turning complex problems into elegant, intuitive 
                solutions. I thrive on building interfaces that not only look stunning but feel natural 
                to interact with. Every project is an opportunity to push boundaries, experiment with 
                new technologies, and craft something that makes a real impact.
              </p>

              <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
                When I'm not coding, you'll find me exploring the latest web technologies, contributing 
                to open-source projects, or sketching out ideas for my next creative endeavor. I believe 
                in continuous learning and staying curious—it's what keeps my work fresh and exciting.
              </p>

              <p className="text-zinc-400 text-base leading-relaxed italic border-l-2 border-blue-400/50 pl-6 py-2">
                "The best way to predict the future is to create it. And I create it one line of code 
                at a time."
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-6">
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300 hover:scale-105 hover:-translate-y-1 px-8 py-6 text-base font-medium"
              >
                View My Projects
              </Button>
              <Button
                variant="outline"
                className="border-2 border-zinc-600 bg-zinc-900/50 text-zinc-200 hover:bg-zinc-800 hover:text-white hover:border-zinc-500 transition-all duration-300 hover:scale-105 px-8 py-6 text-base font-medium backdrop-blur-sm"
              >
                Download Resume
              </Button>
            </div>
          </div>

          {/* Right Column - 3D Model with MAXIMUM LIGHTING */}
          <div className="relative w-full h-[600px] lg:h-[800px] z-10 flex items-center justify-center">
            {/* Canvas with EXTREME BRIGHT LIGHTING */}
            <div className="w-full h-full">
              <Canvas shadows dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
                {/* Camera positioned to show full model */}
                <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={40} />
                
                {/* MAXIMUM LIGHTING - EXTREMELY BRIGHT */}
                <ambientLight intensity={3.5} />

                
                <AboutModel />
                
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  minPolarAngle={Math.PI / 6}
                  maxPolarAngle={Math.PI / 1.8}
                  autoRotate
                  autoRotateSpeed={0.8}
                  maxDistance={15}
                  minDistance={10}
                />
                
                <Environment preset="sunset" intensity={2.5} />
              </Canvas>
            </div>

            {/* Interaction hint */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
              <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-700 rounded-full px-6 py-3 shadow-2xl">
                <p className="text-zinc-300 text-sm font-medium flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-400"></span>
                  </span>
                  Drag to explore
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;