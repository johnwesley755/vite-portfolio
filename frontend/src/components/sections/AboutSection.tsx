import React, { useRef, useEffect, useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import * as THREE from 'three';
import { Download, ChevronRight } from 'lucide-react';
// Assuming portfolioData is available via relative path
import { portfolioData } from "../../data/portfolio";

// --- DATA EXTRACTION & TYPES ---
interface PersonalData {
  name: string;
  title: string;
  bio: string;
  resume: string;
  github: string;
  linkedin: string;
  twitter: string;
  image: string; 
}
const data = portfolioData as { personal: PersonalData };
const typedPortfolioData = data.personal;
const nameParts = typedPortfolioData.name.split(" ");
const firstName = nameParts.length > 0 ? nameParts[0] : "";
const lastName = nameParts.slice(1).join(" ");

// Utility to safely get the image path (assuming a property named 'image' exists in personal data)
const getPortfolioImage = () => {
    return typedPortfolioData.image || "/images/default-avatar.webp"; // Fallback to a default image
}
// --- END DATA EXTRACTION ---

// --- Animated Background Component ---
const AnimatedGridBackground: React.FC = () => (
    <>
        {/* Dynamic Grid Pattern Layer (Mimicking HeroSection style) */}
        <div className="absolute inset-0 z-0 opacity-10 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0,rgba(255,255,255,0.03)_2px,transparent_2px,transparent_14px)]" />

        {/* Radial Gradient for depth */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)]" />
    </>
);

// Three.js Belt Conveyor Component (Logic remains the same, only the container in AboutSection changes)
const BeltConveyorScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    device?: any;
    clock?: THREE.Clock;
    gu?: any;
    postprocessing?: any;
    animationId?: number;
    orangeLights?: THREE.PointLight[];
  }>({});

  useEffect(() => {
    if (!canvasRef.current) return;

    // Utility function to merge geometries
    const mergeBufferGeometries = (geometries: THREE.BufferGeometry[]) => {
      const merged = new THREE.BufferGeometry();
      let totalVertices = 0;
      let totalIndices = 0;

      geometries.forEach(geo => {
        totalVertices += geo.attributes.position.count;
        if (geo.index) totalIndices += geo.index.count;
      });

      const positions = new Float32Array(totalVertices * 3);
      const normals = new Float32Array(totalVertices * 3);
      const indices: number[] = [];
      
      let vertexOffset = 0;

      geometries.forEach(geo => {
        const pos = geo.attributes.position;
        const norm = geo.attributes.normal;
        
        positions.set(pos.array as Float32Array, vertexOffset * 3);
        if (norm) normals.set(norm.array as Float32Array, vertexOffset * 3);
        
        if (geo.index) {
          const idx = geo.index.array;
          for (let i = 0; i < idx.length; i++) {
            indices.push(idx[i] + vertexOffset);
          }
        }
        
        vertexOffset += pos.count;
      });

      merged.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      merged.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
      merged.setIndex(indices);
      
      return merged;
    };

    // LightEmitterCurve Class
    class LightEmitterCurve extends THREE.Curve<THREE.Vector3> {
      radius: number;
      height: number;
      turns: number;

      constructor(radius: number, turns: number, height: number) {
        super();
        this.radius = radius;
        this.height = height;
        this.turns = turns;
      }

      getPoint(t: number, optionalTarget = new THREE.Vector3()) {
        const angle = -Math.PI * 2 * this.turns * t;
        const y = this.height * t;
        return optionalTarget.setFromCylindricalCoords(this.radius, angle, y);
      }
    }

    // LightEmitters Class
    class LightEmitters extends THREE.Object3D {
      constructor(gu: any, count: number, maxR: number, height: number, turns: number, m: THREE.Material) {
        super();
        const gsBall: THREE.BufferGeometry[] = [];
        const gsEmitter: THREE.BufferGeometry[] = [];
        const start = maxR / 4;
        const totalWidth = maxR * 0.9 - start;
        const step = totalWidth / (count - 1);

        for (let i = 0; i < count; i++) {
          const shift = start + step * i;

          const gBall = new THREE.SphereGeometry(0.05, 64, 32, 0, Math.PI * 2, 0, Math.PI * 0.5);
          gBall.translate(0, 0, shift);
          gsBall.push(gBall);

          const lightEmitterCurve = new LightEmitterCurve(shift, turns, height);
          const gEmitter = new THREE.TubeGeometry(lightEmitterCurve, 200, 0.025, 16);
          gsEmitter.push(gEmitter);
        }

        const gBalls = mergeBufferGeometries(gsBall);
        const balls = new THREE.Mesh(gBalls, (m as THREE.Material).clone());
        (balls as any).userData.nonGlowing = true;
        this.add(balls);

        const gEmitters = mergeBufferGeometries(gsEmitter);
        const mEmitters = new THREE.MeshBasicMaterial({
          side: THREE.DoubleSide,
          color: new THREE.Color(10, 2.5, 0), // Super bright orange
          transparent: false,
        });
        mEmitters.toneMapped = false;
        const emitters = new THREE.Mesh(gEmitters, mEmitters);
        this.add(emitters);
      }
    }

    // Belt Class
    class Belt extends THREE.Mesh {
      uniforms: any;

      constructor(gu: any, mainSize: number, rBig: number, rSmall: number, width: number, m: THREE.Material) {
        const m1 = (m as THREE.MeshLambertMaterial).clone();
        m1.color.set("gray");

        const hSize = mainSize;
        const path = new THREE.Shape()
          .absarc(0, 0, rBig, Math.PI * 1.5, Math.PI)
          .absarc(-hSize + rSmall, -hSize + rSmall, rSmall, Math.PI, Math.PI * 1.5)
          .lineTo(0, -hSize);

        const segs = 500;
        const pathPts = path.getSpacedPoints(segs).reverse();
        const g = new THREE.BoxGeometry(segs, 0.01, width, segs, 1, 1).translate(segs * 0.5, 0.005, 0);

        const vPrev = new THREE.Vector2();
        const vCurr = new THREE.Vector2();
        const vNext = new THREE.Vector2();
        const vCP = new THREE.Vector2();
        const vCN = new THREE.Vector2();
        const v2 = new THREE.Vector2();
        const cntr = new THREE.Vector2();

        const pos = g.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const idxCurr = Math.round(pos.getX(i));
          const idxPrev = idxCurr === 0 ? segs - 1 : idxCurr - 1;
          const idxNext = idxCurr === segs ? 1 : idxCurr + 1;
          vPrev.copy(pathPts[idxPrev]);
          vCurr.copy(pathPts[idxCurr]);
          vNext.copy(pathPts[idxNext]);
          vCP.subVectors(vPrev, vCurr);
          vCN.subVectors(vNext, vCurr);
          const aCP = vCP.angle();
          const aCN = vCN.angle();
          const hA = Math.PI * 0.5 - (aCP - aCN) * 0.5;
          const aspect = Math.cos(hA);
          v2.set(vCurr.x, vCurr.y).multiplyScalar(pos.getY(i) / aspect);
          v2.rotateAround(cntr, hA).add(vCurr);
          pos.setXY(i, v2.x, v2.y);
        }
        g.rotateX(-Math.PI * 0.5);
        g.computeVertexNormals();
        
        super(g, m1);
        this.castShadow = true;
        this.receiveShadow = true;
        this.uniforms = {
          time: { value: 0 },
          angularSpeed: { value: 0 }
        };
      }
    }

    // Roller Class
    class Roller extends THREE.Mesh {
      constructor(r: number, h: number, roundR: number, m: THREE.Material) {
        const m1 = (m as THREE.Material).clone();
        const profile = new THREE.Path()
          .moveTo(0, 0)
          .lineTo(r - roundR, 0)
          .absarc(r - roundR, roundR, roundR, Math.PI * 1.5, Math.PI * 2)
          .absarc(r - roundR, h - roundR, roundR, 0, Math.PI * 0.5)
          .lineTo(0, h);
        const g = new THREE.LatheGeometry(profile.getPoints(50), 100);
        super(g, m1);
        this.castShadow = true;
        this.receiveShadow = true;
      }
    }

    // Base Class
    class Base extends THREE.Mesh {
      constructor(w: number, h: number, R: number, roundR: number, m: THREE.Material) {
        const angleStep = Math.PI * 0.5;
        const wwr = w - R - roundR;
        const shape = new THREE.Shape()
          .absarc(wwr, wwr, R, angleStep * 0, angleStep * 1)
          .absarc(-wwr, wwr, R, angleStep * 1, angleStep * 2)
          .absarc(-wwr, -wwr, R, angleStep * 2, angleStep * 3)
          .absarc(wwr, -wwr, R, angleStep * 3, angleStep * 4);

        const g = new THREE.ExtrudeGeometry(shape, { 
          depth: h - roundR * 2, 
          bevelEnabled: true, 
          bevelThickness: roundR, 
          bevelSize: roundR, 
          bevelSegments: 10, 
          curveSegments: 20 
        });
        g.translate(0, 0, roundR);
        g.rotateX(-Math.PI * 0.5);
        super(g, (m as THREE.Material).clone());
        this.castShadow = true;
        this.receiveShadow = true;
      }
    }

    // Device Class
    class Device extends THREE.Object3D {
      update: (t: number) => void;

      constructor(gu: any) {
        super();
        const m = new THREE.MeshLambertMaterial({ color: new THREE.Color().setScalar(0.5) });
        const base = new Base(4, 1, 0.5, 0.05, m);

        const rBig = 3.75;
        const rSmall = 0.5;

        const lightEmitters = new LightEmitters(gu, 15, rBig, rBig * 3, 1.25, m);
        lightEmitters.position.set(0, 0.25, 0);

        const rollerBig = new Roller(rBig, 0.25, 0.05, m);
        (rollerBig.material as THREE.MeshLambertMaterial).color.multiplyScalar(0.6);
        rollerBig.position.set(0, 1, 0);
        rollerBig.add(lightEmitters);
        base.add(rollerBig);

        const rotationIndicator = new THREE.Mesh(
          new THREE.SphereGeometry(0.05, 64, 16, 0, Math.PI * 2, 0, Math.PI * 0.5),
          new THREE.MeshBasicMaterial({ color: new THREE.Color(0, 0.5, 1) })
        );
        rotationIndicator.position.set(0.35, 0.25, 0);
        const rollerSmall = new Roller(rSmall, 0.25, 0.05, m);
        (rollerSmall.material as THREE.MeshLambertMaterial).color.multiplyScalar(0.6);
        rollerSmall.position.set(-3.25, 1, 3.25);
        rollerSmall.add(rotationIndicator);
        base.add(rollerSmall);

        const belt = new Belt(gu, rBig, rBig, rSmall, 0.125, m);
        belt.position.set(0, 1.125, 0);
        base.add(belt);

        this.add(base);

        const gearRatio = rBig / rSmall;
        const angularSpeed = Math.PI;
        belt.uniforms.angularSpeed.value = angularSpeed;
        
        this.update = (t: number) => {
          const time = t * angularSpeed;
          rollerSmall.rotation.y = time;
          rollerBig.rotation.y = time / gearRatio;
          belt.uniforms.time.value = t;
        };

        [rollerSmall, rollerBig, base].forEach(o => {
          (o as any).userData.nonGlowing = true;
        });
      }
    }

    // Table Class
    class Table extends THREE.Mesh {
      constructor(gu: any, bgColor: number) {
        const g = new THREE.PlaneGeometry(20, 20).rotateX(-Math.PI * 0.5);
        const m = new THREE.MeshLambertMaterial({
          color: new THREE.Color().setScalar(0.3).getHex(),
        });
        super(g, m);
        this.receiveShadow = true;
      }
    }

    // Initialize Scene
    const bgColor = new THREE.Color(0x0a0604); // Very dark brown/black

    const scene = new THREE.Scene();
    scene.background = bgColor;
    scene.fog = new THREE.FogExp2(bgColor.getHex(), 0.05);
    
    const camera = new THREE.PerspectiveCamera(
      45,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      1,
      1000
    );
    // Initial camera position (will be slightly modified by auto-rotation)
    camera.position.set(-5, 5, 10).setLength(18); 

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      alpha: true // Crucial for background effect
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2.0;
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting setup for dramatic glow
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.15);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0;
    directionalLight.shadow.camera.far = 20;
    directionalLight.position.set(10, 20, 10).setLength(10);
    
    // Multiple orange point lights for intense glow
    const orangeLight1 = new THREE.PointLight(0xff4500, 3, 20);
    orangeLight1.position.set(0, 5, 0);
    
    const orangeLight2 = new THREE.PointLight(0xff6600, 2.5, 18);
    orangeLight2.position.set(2, 6, 2);
    
    const orangeLight3 = new THREE.PointLight(0xff3300, 2, 15);
    orangeLight3.position.set(-2, 4, -2);
    
    const ambientLight = new THREE.AmbientLight(0x1a1410, 0.1);
    
    scene.add(directionalLight, orangeLight1, orangeLight2, orangeLight3, ambientLight);

    const gu = {
      globalBloom: { value: 0 }
    };

    const device = new Device(gu);
    scene.add(device);
    
    const table = new Table(gu, bgColor.getHex());
    scene.add(table);

    const clock = new THREE.Clock();

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      device,
      clock,
      gu,
      orangeLights: [orangeLight1, orangeLight2, orangeLight3]
    };

    // Animation loop with dynamic lighting
    const animate = () => {
      const t = clock.getElapsedTime();
      device.update(t);
      
      // Animate orange lights dynamically for dramatic effect
      if (sceneRef.current.orangeLights) {
        const [light1, light2, light3] = sceneRef.current.orangeLights;
        
        light1.position.y = 5 + Math.sin(t * 2) * 0.8;
        light1.intensity = 3 + Math.sin(t * 3) * 0.5;
        
        light2.position.set(
          Math.cos(t * 0.8) * 3,
          6 + Math.sin(t * 1.5) * 0.5,
          Math.sin(t * 0.8) * 3
        );
        light2.intensity = 2.5 + Math.cos(t * 2) * 0.3;
        
        light3.position.set(
          -Math.cos(t * 1.2) * 2,
          4 + Math.cos(t * 1.8) * 0.4,
          -Math.sin(t * 1.2) * 2
        );
        light3.intensity = 2 + Math.sin(t * 2.5) * 0.4;
      }
      
      renderer.render(scene, camera);
      
      sceneRef.current.animationId = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current || !sceneRef.current.camera || !sceneRef.current.renderer) return;
      
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      
      sceneRef.current.camera.aspect = width / height;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Auto-rotation
    let autoRotateAngle = 0;
    const rotationInterval = setInterval(() => {
      if (camera) {
        autoRotateAngle += 0.003;
        const radius = 18;
        camera.position.x = Math.sin(autoRotateAngle) * radius;
        camera.position.z = Math.cos(autoRotateAngle) * radius;
        camera.lookAt(0, 4, 0);
      }
    }, 16);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(rotationInterval);
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      if (sceneRef.current.renderer) {
        sceneRef.current.renderer.dispose();
      }
      if (sceneRef.current.scene) {
        sceneRef.current.scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry?.dispose();
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach(mat => mat.dispose());
              } else {
                object.material.dispose();
              }
            }
          }
        });
      }
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

// Main About Section - Enhanced Background and Functional Buttons
const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const [offsetY, setOffsetY] = useState(0); // State for scroll offset
  
  // Intersection Observer logic to trigger 3D canvas rendering
  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;
    const io = new IntersectionObserver((entries) => {
      setShowCanvas(entries[0].isIntersecting); 
    }, { rootMargin: "-20% 0px -20% 0px", threshold: 0.05 });
    io.observe(target);
    return () => io.disconnect();
  }, []);

  // Parallax Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
        if (containerRef.current) {
            const sectionTop = containerRef.current.getBoundingClientRect().top;
            const viewportHeight = window.innerHeight;

            // Calculate how far the section is from the top of the viewport
            // When section is at top (0), scrollFactor = 0
            // When section is fully below the viewport (viewportHeight), scrollFactor = 1
            const scrollFactor = (viewportHeight - sectionTop) / (viewportHeight + containerRef.current.offsetHeight);

            // Apply a small parallax effect: move the background only 10% of the content's scroll speed
            const parallaxAmount = -scrollFactor * 100; // Max 100px vertical shift up
            setOffsetY(parallaxAmount);
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call to set position correctly

    return () => window.removeEventListener('scroll', handleScroll);
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

  const handleViewProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <section 
        id="about"
        ref={containerRef} 
        className="relative w-full min-h-screen bg-black overflow-hidden py-16 lg:py-24"
    >
        <AnimatedGridBackground />
        
        {/* ** 3D Model as Background Layer with Parallax ** The transform property applies the calculated scroll offset (offsetY) 
            to create the parallax illusion.
        */}
        <div 
            className="absolute inset-0 z-10 opacity-30 transform scale-125 transition-opacity duration-1000"
            style={{ transform: `scale(1.25) translateY(${offsetY}px)` }}
        >
            {showCanvas && <BeltConveyorScene />}
        </div>
        {/* ** End 3D Model Background ** */}

      <div className="relative max-w-[95%] xl:max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 z-20"> {/* Higher Z-index for content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - About Content */}
          <div className="space-y-8 z-10">
            <div>
              <Badge className="bg-yellow-500/20 text-yellow-300 border border-yellow-400/40 hover:bg-yellow-500/30 transition-all duration-300 text-sm px-4 py-1.5">
                About {firstName}
              </Badge>
            </div>

            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]">
                Crafting Digital
                <br />
                <span className="relative inline-block mt-2">
                  <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-yellow-400 bg-clip-text text-transparent">
                    Experiences
                  </span>
                  <div className="absolute -bottom-3 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full" />
                </span>
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-zinc-200 text-lg md:text-xl leading-relaxed">
                {typedPortfolioData.bio || "I'm a passionate web developer and designer who believes that great digital products are born at the intersection of beautiful design and powerful technology. My journey in web development has evolved into a deep passion for creating experiences that people love to use."}
              </p>
              
              <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
                What drives me is the challenge of turning complex problems into elegant, intuitive 
                solutions. I thrive on building interfaces that not only look stunning but feel natural 
                to interact with. Every project is an opportunity to push boundaries, experiment with 
                new technologies, and craft something that makes a real impact.
              </p>

              <p className="text-zinc-400 text-base leading-relaxed italic border-l-2 border-yellow-400/50 pl-6 py-2">
                "The best way to predict the future is to create it. And I create it one line of code 
                at a time."
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-6">
              <Button
                onClick={handleViewProjects}
                className="group bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white border-0 shadow-2xl shadow-yellow-500/50 hover:shadow-yellow-500/70 transition-all duration-300 hover:scale-105 hover:-translate-y-1 px-8 py-6 text-base font-medium"
              >
                <span className="flex items-center gap-2">
                    View My Projects
                    <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
              <Button
                onClick={handleDownload}
                variant="outline"
                className="group border-2 border-zinc-600 bg-zinc-900/50 text-zinc-200 hover:bg-zinc-800 hover:text-white hover:border-zinc-500 transition-all duration-300 hover:scale-105 px-8 py-6 text-base font-medium backdrop-blur-sm"
              >
                <span className="flex items-center gap-2">
                    <Download className="mr-1 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                    Download Resume
                </span>
              </Button>
            </div>
          </div>

          {/* Right Column - Portfolio Image */}
          <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] xl:h-[800px] z-20 flex items-center justify-center">
            <img 
              src={getPortfolioImage()}
              alt={`${firstName} ${lastName} - Portfolio Headshot`}
              className="w-full h-full object-cover rounded-xl border border-zinc-700/50 shadow-2xl shadow-yellow-500/20 transition-all duration-500 hover:scale-[1.01] hover:shadow-yellow-500/40"
              style={{ objectPosition: 'center top' }}
              loading="lazy"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;