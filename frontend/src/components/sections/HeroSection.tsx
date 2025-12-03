// src/components/HeroSection.tsx
import React, {
  useState,
  useEffect,
  Suspense,
  useRef,
  Component,
  type ErrorInfo,
  type ReactNode,
} from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Download,
  ChevronRight,
  Code,
} from "lucide-react";
import { portfolioData } from "../../data/portfolio";
import { motion } from "framer-motion";
import * as THREE from "three"; // Import THREE for ref typing
import { Center } from "@react-three/drei";
// Importing UI components (ensure these paths are correct in your project)
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

// --- THREE.JS IMPORTS ---
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  useGLTF,
  PerspectiveCamera,
  OrbitControls,
  MeshDistortMaterial,
  Sphere,
} from "@react-three/drei";
const MODEL_PATH = import.meta.env.BASE_URL + "models/webdev.glb";

// -------------------------------------------------------------------
// --- TYPE DEFINITIONS AND DATA EXTRACTION ---
// -------------------------------------------------------------------
interface PersonalData {
  name: string;
  title: string;
  bio: string;
  resume: string;
  github: string;
  linkedin: string;
  twitter: string;
}
const data = portfolioData as { personal: PersonalData };
const typedPortfolioData = data.personal;

const nameParts = typedPortfolioData.name.split(" ");
const firstName = nameParts.length > 0 ? nameParts[0] : "";
const lastName = nameParts.slice(1).join(" ");

// -------------------------------------------------------------------
// --- SVG BACKGROUND DATA URI & STYLE ---
// -------------------------------------------------------------------
// The provided SVG content encoded for use in Tailwind CSS/CSS background
const SVG_WAVE_PATTERN = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 1000 120'><rect fill='%23000000' width='1000' height='120'/><g fill='none' stroke='%23222' stroke-width='10' stroke-opacity='1'><path d='M-500 75c0 0 125-30 250-30S0 75 0 75s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/><path d='M-500 45c0 0 125-30 250-30S0 45 0 45s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/><path d='M-500 105c0 0 125-30 250-30S0 105 0 105s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/><path d='M-500 15c0 0 125-30 250-30S0 15 0 15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/><path d='M-500-15c0 0 125-30 250-30S0-15 0-15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/><path d='M-500 135c0 0 125-30 250-30S0 135 0 135s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/></g></svg>`;
const SVG_STYLE = {
  backgroundImage: `url("${SVG_WAVE_PATTERN}")`,
  backgroundSize: "100% 120px", // Stretch width, maintain original height
  backgroundRepeat: "repeat-y", // Repeat vertically
};

// -------------------------------------------------------------------
// --- 3D MODEL COMPONENTS AND ERROR HANDLING ---
// -------------------------------------------------------------------

// Animation variants for the content
const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.5 + i * 0.2,
      ease: [0.25, 0.4, 0.25, 1] as any,
    },
  }),
};

// --- Error Boundary Component (Self-Contained) ---
interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}

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
            ❌ **Model Failed to Load.** <br />
            Please check if "{MODEL_PATH}" is accessible.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- Animated 3D Model Component ---
const Hero3DModel: React.FC = () => {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_PATH);

  // State to check if we are on a large screen
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)"); // Tailwind's 'lg' breakpoint
    const handleResize = () => setIsLargeScreen(mediaQuery.matches);

    // Initial check
    handleResize();

    // Listen for changes
    mediaQuery.addListener(handleResize);
    return () => mediaQuery.removeListener(handleResize);
  }, []);

  // Determine position based on screen size
  const modelPosition: [number, number, number] = isLargeScreen
    ? [5, 0, 0]
    : [0, 0, 0];

  useFrame((state) => {
    if (modelRef.current) {
      // Gentle horizontal rotation
      modelRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      // Gentle floating animation
      modelRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
    }
  });

  return (
    // REMOVED scene.clone() to prevent memory issues
    <Center position={modelPosition}>
      <primitive ref={modelRef} object={scene} scale={1} />
    </Center>
  );
};

// Preload the model to prevent loading delays
useGLTF.preload(MODEL_PATH);

// --- Blob Component for Background ---
interface BlobProps {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  distort: number;
  rotationSpeed?: number;
}

const Blob: React.FC<BlobProps> = ({
  position,
  scale,
  color,
  speed,
  distort,
  rotationSpeed = 0.5,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.x =
        meshRef.current.rotation.y =
        meshRef.current.rotation.z +=
          0.005 * rotationSpeed;
      // Gentle floating
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
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

// --- Logo Component ---
const Logo: React.FC = () => (
  <div className="flex items-center space-x-2 text-white font-black text-xl md:text-2xl tracking-widest cursor-default">
    <Code className="h-6 w-6 text-gray-400" />
    <span className="hidden sm:inline">{firstName}</span>
    <span className="hidden sm:inline text-gray-400">{lastName}</span>
    <span className="sm:hidden">
      {firstName[0]}
      {lastName[0]}
    </span>
  </div>
);

// -------------------------------------------------------------------
// --- HEADER COMPONENT ---
// -------------------------------------------------------------------
const Header: React.FC<{ onDownload: () => void }> = ({ onDownload }) => (
  <header className="absolute top-0 left-0 w-full z-30 p-4 md:p-6 backdrop-blur-sm bg-black/10">
    <div className="flex justify-between items-center mx-auto max-w-7xl">
      <Logo />
      <Button
        onClick={onDownload}
        variant="outline"
        size="sm"
        className="group px-4 py-2.5 text-xs md:text-sm font-bold text-white border-2 border-white/20 hover:border-white transition-all duration-300 backdrop-blur-xl bg-white/5 hover:bg-white/10"
      >
        <Download className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
        VIEW RESUME
      </Button>
    </div>
  </header>
);

// -------------------------------------------------------------------
// --- HERO SECTION MAIN COMPONENT ---
// -------------------------------------------------------------------

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showHero3D, setShowHero3D] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [showBio, setShowBio] = useState(false);
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const target = heroRef.current;
    if (!target) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setShowHero3D(!prefersReduced && entry.isIntersecting);
      },
      { rootMargin: "-20% 0px -20% 0px", threshold: 0.1 }
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (showHero3D) {
      const t = setTimeout(() => setCanvasReady(true), 1200);
      return () => clearTimeout(t);
    }
  }, [showHero3D]);

  useEffect(() => {
    const t = setTimeout(() => setShowBio(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const handleDownload = () => {
    if (typedPortfolioData.resume) {
      const link = document.createElement("a");
      link.href = typedPortfolioData.resume;
      link.download = `${firstName}_${lastName}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("Resume path not found in portfolioData.");
    }
  };

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen bg-black overflow-hidden"
    >
      <Header onDownload={handleDownload} />

      {canvasReady && (
        <>
          <div className="absolute inset-0 z-0 opacity-10" style={SVG_STYLE} />
          <div className="absolute inset-0 z-0 opacity-10 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0,rgba(255,255,255,0.03)_2px,transparent_2px,transparent_14px)]" />
        </>
      )}

      <div className="absolute inset-0 z-0">
        {canvasReady && showHero3D && (
          <ErrorBoundary>
            <Canvas
              shadows
              dpr={[1, 1]}
              gl={{
                alpha: true,
                antialias: true,
                powerPreference: "low-power",
              }}
              className="bg-transparent"
            >
              <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={25} />

              <ambientLight intensity={0.8} />
              <hemisphereLight args={["#8dc6ff", "#1a1a1a", 0.9]} />
              <directionalLight
                position={[5, 10, 5]}
                intensity={1.4}
                castShadow
              />
              <pointLight
                position={[5, 2, 8]}
                intensity={1.6}
                color="#9bbcf7"
              />
              <pointLight
                position={[-6, -3, 6]}
                intensity={0.9}
                color="#88a9f2"
              />

              {/* Background blobs */}
              <Suspense fallback={null}>
                <Blob
                  position={[13, 5, -15]}
                  scale={3}
                  color="#2F004F"
                  speed={1.5}
                  distort={0.6}
                  rotationSpeed={0.7}
                />
                <Blob
                  position={[-5, -7, -18]}
                  scale={4}
                  color="#003D4D"
                  speed={1.2}
                  distort={0.7}
                  rotationSpeed={0.5}
                />
                <Blob
                  position={[18, -3, -28]}
                  scale={2.5}
                  color="#2F004F"
                  speed={0.9}
                  distort={0.5}
                  rotationSpeed={0.4}
                />
                <Blob
                  position={[-12, 8, -26]}
                  scale={2.8}
                  color="#003D4D"
                  speed={0.8}
                  distort={0.5}
                  rotationSpeed={0.4}
                />
                <Blob
                  position={[8, 10, -22]}
                  scale={2.2}
                  color="#2F004F"
                  speed={0.95}
                  distort={0.55}
                  rotationSpeed={0.5}
                />
                <Blob
                  position={[-16, 3, -30]}
                  scale={3.1}
                  color="#003D4D"
                  speed={0.85}
                  distort={0.5}
                  rotationSpeed={0.4}
                />
              </Suspense>

              <Suspense fallback={null}>
                <Hero3DModel />
              </Suspense>

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 1.8}
                autoRotate
                autoRotateSpeed={0.3}
                maxDistance={20}
                minDistance={15}
              />

              <> </>
            </Canvas>
          </ErrorBoundary>
        )}
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)]" />
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.4)]" />
      </div>

      <section
        id="hero-content"
        className="font-['Poppins'] relative z-20 w-full min-h-screen flex items-center px-4 pt-32 pb-24"
      >
        <div className="mx-auto w-full max-w-6xl lg:ml-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative z-10 text-center lg:text-left">
              <div className="space-y-4">
                <motion.div
                  custom={0.5}
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex justify-center lg:justify-start"
                >
                  <Badge
                    variant="outline"
                    className="px-6 py-2.5 text-[11px] font-bold tracking-[0.15em] uppercase bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border-white/20 text-white hover:bg-white/15 hover:border-white/30 transition-all duration-300 rounded-full shadow-lg"
                  >
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                    </span>
                    Available for work
                  </Badge>
                </motion.div>

                <motion.h1
                  custom={1}
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight tracking-tight whitespace-nowrap"
                >
                  <span className="text-white">
                    {firstName}{" "}
                    <span className="text-gray-400">{lastName}</span>
                  </span>
                </motion.h1>
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  style={{ transformOrigin: "left" }}
                  className="h-[2px] w-40 sm:w-56 bg-gradient-to-r from-cyan-400/50 via-blue-500/50 to-purple-500/50 rounded-full mx-auto lg:mx-0"
                />

                <motion.h2
                  custom={1.5}
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-300/90 leading-tight tracking-wide"
                >
                  {typedPortfolioData.title}
                </motion.h2>

                <div className="pt-2">
                  {showBio && (
                    <p className="text-base sm:text-lg lg:text-xl text-gray-400/90 leading-relaxed font-normal tracking-wide max-w-2xl md:max-w-3xl mx-auto lg:mx-0">
                      {typedPortfolioData.bio}
                    </p>
                  )}
                </div>

                <motion.div
                  custom={3}
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-6"
                >
                  <Button
                    asChild
                    size="lg"
                    className="group relative px-7 py-5 text-base font-bold bg-white text-black hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02] shadow-2xl overflow-hidden border-0"
                  >
                    <a href="#projects" className="flex items-center gap-2">
                      VIEW PROJECTS
                      <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </Button>

                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    size="lg"
                    className="group relative px-7 py-5 text-base font-bold text-white border-2 border-white/20 hover:border-white transition-all duration-300 hover:scale-[1.02] shadow-xl backdrop-blur-xl bg-white/5 hover:bg-white/10"
                  >
                    <Download className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                    DOWNLOAD RESUME
                  </Button>
                </motion.div>

                <motion.div
                  custom={4}
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center justify-center lg:justify-start gap-3 pt-6"
                >
                  {[
                    {
                      icon: Github,
                      href: typedPortfolioData.github,
                      label: "GitHub",
                    },
                    {
                      icon: Linkedin,
                      href: typedPortfolioData.linkedin,
                      label: "LinkedIn",
                    },
                    {
                      icon: Twitter,
                      href: typedPortfolioData.twitter,
                      label: "Twitter",
                    },
                  ].map((social, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="icon"
                      asChild
                      className="h-12 w-12 rounded-full border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-xl bg-white/5 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)]"
                    >
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={social.label}
                      >
                        <social.icon className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                      </a>
                    </Button>
                  ))}
                </motion.div>
              </div>
            </div>

            <div className="h-[300px] w-full relative z-10 pointer-events-none lg:h-[500px] mt-8 lg:mt-0"></div>
          </div>
        </div>
      </section>

      <div className="absolute bottom-12 right-1/2 translate-x-1/2 lg:right-12 lg:-translate-x-0 z-20">
        <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-700 rounded-full px-6 py-3 shadow-2xl">
          <p className="text-zinc-300 text-sm font-medium flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-400"></span>
            </span>
            Drag to explore 3D
          </p>
        </div>
      </div>
    </div>
  );
};
