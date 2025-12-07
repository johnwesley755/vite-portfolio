import React, { useRef, Suspense } from "react";
import {
  Award,
  Code,
  Sparkles,
  GraduationCap,
  Briefcase,
  Calendar,
  Trophy,
  Rocket,
  Clock,
  FileText,
  User,
  Shield,
} from "lucide-react";
import { portfolioData } from "../../data/portfolio";
import { Timeline, type TimelineEntry } from "../ui/timeline";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// Mock Context Hook (kept for safety)
const useInteraction = () => ({ selectedSkill: "" });

const getIconComponent = (iconName: string): React.ElementType => {
  const icons: { [key: string]: React.ElementType } = {
    Award,
    Code,
    Sparkles,
    Trophy,
    Briefcase,
    Calendar,
    Rocket,
    Clock,
    FileText,
    User,
    Shield,
    GraduationCap,
  };
  return icons[iconName] || Award;
};

// --- DATA MAPPING FUNCTION ---
// NOTE: we allow an optional `liveDemos` field on each experience.
type ExperienceFromPortfolio = (typeof portfolioData.experiences)[number] & {
  liveDemos?: { label?: string; url: string }[];
};

const mapExperienceToTimeline = (
  experiences: ExperienceFromPortfolio[]
): TimelineEntry[] => {
  return experiences.map((exp) => ({
    title: exp.period,
    content: (
      <div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
          {exp.title} - {exp.organization}
        </h3>
        <p className="text-base md:text-lg font-medium text-neutral-300 mb-3">
          {exp.description}
        </p>

        {/* Achievements List */}
        {exp.achievements && exp.achievements.length > 0 && (
          <ul className="list-disc list-inside text-sm md:text-base text-neutral-400 mb-3 ml-4">
            {exp.achievements.map((ach, i) => (
              <li key={i} className="text-neutral-400">
                {ach}
              </li>
            ))}
          </ul>
        )}

        {/* Tech Stack Pills */}
        {exp.skills && (
          <div className="flex flex-wrap gap-2 mt-2">
            {exp.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-medium bg-teal-800/50 text-teal-300 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Render iframe for symposium entries with liveDemos, otherwise show image */}
        {exp.liveDemos && exp.liveDemos.length > 0 ? (
          <iframe
            src={exp.liveDemos[0].url}
            title={exp.title}
            className="mt-6 w-full md:w-[600px] h-[400px] rounded-lg shadow-xl border-2 border-amber-500/30"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        ) : (
          exp.image && (
            <img
              src={exp.image}
              alt={exp.title}
              className="mt-6 w-full md:w-96 h-auto max-h-60 object-cover rounded-lg shadow-xl"
            />
          )
        )}

        {/* 🔗 Optional Live Demo Buttons (ONLY when `liveDemos` exists) */}
        {exp.liveDemos && exp.liveDemos.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-4">
            {exp.liveDemos.map((demo, i) => (
              <a
                key={i}
                href={demo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide text-black bg-gradient-to-r from-amber-400 to-yellow-300 shadow-[0_0_40px_rgba(250,204,21,0.35)] hover:shadow-[0_0_55px_rgba(250,204,21,0.6)] hover:from-amber-300 hover:to-yellow-200 transition-all duration-200"
              >
                <Rocket className="w-4 h-4" />
                <span>{demo.label ?? `Live Demo ${i + 1}`}</span>
                <ArrowTopRightIcon />
              </a>
            ))}
          </div>
        )}
      </div>
    ),
  }));
};

// Small icon for the live demo button (simple inline component)
const ArrowTopRightIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M7 17L17 7M9 7H17V15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const timelineData = mapExperienceToTimeline(
  portfolioData.experiences as ExperienceFromPortfolio[]
);

// --- 3D Blob Component ---
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
        transparent={true}
        opacity={0.3}
      />
    </Sphere>
  );
};

// Background with 3D Blobs
const BackgroundFX = () => (
  <>
    {/* Base Black Background */}
    <div className="absolute inset-0 -z-20 bg-black"></div>

    {/* 3D Blobs Canvas */}
    <div className="absolute inset-0 z-0">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "low-power",
          stencil: false,
          depth: true,
        }}
        performance={{ min: 0.5 }}
        className="bg-transparent"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={25} />

        <ambientLight intensity={0.8} />
        <hemisphereLight args={["#8dc6ff", "#1a1a1a", 0.9]} />
        <directionalLight position={[5, 10, 5]} intensity={1.4} castShadow />

        <Suspense fallback={null}>
          <Blob
            position={[-3, -6, -12]}
            scale={1.2}
            color="#F59E0B"
            speed={0.9}
            distort={0.4}
            rotationSpeed={0.4}
          />
          <Blob
            position={[2.3, -3, -14]}
            scale={1.2}
            color="#FB923C"
            speed={1.1}
            distort={0.5}
            rotationSpeed={0.5}
          />
          <Blob
            position={[3, 5, -10]}
            scale={1}
            color="#FBBF24"
            speed={0.7}
            distort={0.4}
            rotationSpeed={0.3}
          />
          <Blob
            position={[-3, 1, -13]}
            scale={1.2}
            color="#F97316"
            speed={0.8}
            distort={0.45}
            rotationSpeed={0.35}
          />
        </Suspense>
      </Canvas>
    </div>

    <div className="absolute inset-0 -z-10">
      {/* Grid Pattern (Subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30"></div>

      {/* Golden tinge overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-orange-500/5" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(251, 191, 36, 0.08) 0%, transparent 60%)",
        }}
      />
    </div>
  </>
);

export const EnhancedExperienceSection = () => {
  return (
    <section
      id="experience"
      className="w-full min-h-[300vh] bg-black overflow-hidden flex flex-col items-center justify-start relative pt-12 pb-20"
    >
      <BackgroundFX />

      {/* Section Header - Centered and Large */}
      <div className="relative z-50 w-full max-w-7xl mx-auto px-4 mb-16">
        <div className="text-center">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
            Experience
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto">
            My professional journey and key achievements
          </p>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="relative z-50 w-full">
        <div className="w-full">
          <Timeline data={timelineData} />
        </div>
      </div>
    </section>
  );
};
