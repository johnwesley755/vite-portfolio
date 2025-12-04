import React, { useState, useEffect, useRef, useCallback } from "react";
// Essential imports
import emailjs from "@emailjs/browser";
import {
  Mail,
  MapPin,
  Linkedin,
  CheckCircle,
  AlertCircle,
  Send,
  FileText,
  ArrowRight,
  User,
  MessageSquare,
  Twitter,
  Github,
  Globe,
  Zap,
} from "lucide-react";
// 🆕 Globe.GL Import
import ReactGlobe from "react-globe.gl";
// 🆕 Background Beams Import
import { BackgroundBeams } from "../ui/background-beams";

// RE-IMPORTED: Using the external portfolioData file (Ensure this file path is correct)
import { portfolioData } from "../../data/portfolio";

// =================================================================
// 1. Globe Data (Sample Arcs)
// =================================================================

const ARCS_DATA = [
  // New York -> London
  { startLat: 40.7128, startLng: -74.006, endLat: 51.5074, endLng: 0.1278, color: ['#6366F1', '#D1D5DB'], label: "NY -> London" },
  // Sydney -> Tokyo
  { startLat: -33.8688, startLng: 151.2093, endLat: 35.6895, endLng: 139.6917, color: ['#6366F1', '#FBBF24'], label: "Sydney -> Tokyo" },
  // Paris -> Rio de Janeiro
  { startLat: 48.8566, startLng: 2.3522, endLat: -22.9068, endLng: -43.1729, color: ['#6366F1', '#EF4444'], label: "Paris -> Rio" },
  // San Francisco -> Berlin
  { startLat: 37.7749, startLng: -122.4194, endLat: 52.5200, endLng: 13.4050, color: ['#6366F1', '#10B981'], label: "SF -> Berlin" },
];

// =================================================================
// 2. Globe Component Implementation (Size set by parent)
// =================================================================

const GLOBE_IMAGE_URL = '//unpkg.com/three-globe/example/img/earth-night.jpg';

const GlobeComponent = ({ width, height }) => {
  const globeEl = useRef();

  useEffect(() => {
    if (globeEl.current) {
      const controls = globeEl.current.controls();
      
      // Auto-Rotation and interaction control (DISABLING ZOOM/PAN)
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.3;
      controls.enableZoom = false; // Disabled
      controls.enablePan = false;  // Disabled
    }
  }, []);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden relative shadow-2xl bg-black">
      <ReactGlobe
        ref={globeEl}
        globeImageUrl={GLOBE_IMAGE_URL}
        width={width}
        height={height}
        backgroundColor="rgba(0,0,0,0)"
        
        // Globe styling
        showAtmosphere={true}
        atmosphereColor="#6366F1"
        atmosphereAltitude={0.25}

        // Arc Layer Configuration
        arcsData={ARCS_DATA}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={4}
        arcDashAnimateTime={2500}
        arcAltitude={0.4}
        arcStroke={0.5}

        pointOfView={{ lat: 30, lng: 0, altitude: 2.2 }}
      />
      
      <p className="absolute bottom-4 left-4 z-10 text-gray-400 text-sm font-mono tracking-wider">
        [Interactive Global Network]
      </p>
    </div>
  );
};

// =================================================================
// 3. Background Components (Parallax & Blobs)
// =================================================================

const ParallaxBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div
      className="absolute inset-0 bg-repeat opacity-[0.05] transition-transform duration-75 ease-out"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        transform: "translateY(var(--scroll-y, 0)) scale(1.05)",
      }}
    />
  </div>
);

const BlobBackground = () => (
    <div className="absolute inset-0 pointer-events-none z-0">
        <div className="blob blob-1 bg-indigo-500/10" />
        <div className="blob blob-2 bg-pink-500/10" />
    </div>
);


// =================================================================
// 4. Main Contact Section
// =================================================================

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState(
    {} as { name?: string; email?: string; message?: string }
  );
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null as string | null,
  });

  const [globeSize, setGlobeSize] = useState({ width: 0, height: 0 });
  const globeContainerRef = useRef<HTMLDivElement | null>(null);
  const { personal } = portfolioData;
  const contactRef = useRef<HTMLElement | null>(null);

  // Parallax Effect Implementation
  useEffect(() => {
    const handleScroll = () => {
      if (contactRef.current) {
        const sectionTop = contactRef.current.getBoundingClientRect().top;
        const slowScroll = sectionTop * 0.05;
        document.documentElement.style.setProperty(
          "--scroll-y",
          `${slowScroll}px`
        );
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Globe Resize Observer
  const resizeGlobe = useCallback(() => {
    if (globeContainerRef.current) {
      setGlobeSize({
        width: globeContainerRef.current.offsetWidth,
        height: globeContainerRef.current.offsetHeight,
      });
    }
  }, []);

  useEffect(() => {
    resizeGlobe();
    window.addEventListener('resize', resizeGlobe);
    return () => window.removeEventListener('resize', resizeGlobe);
  }, [resizeGlobe]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
    if (errors[name as keyof typeof errors]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim() || formData.name.length < 2) newErrors.name = "Name must be at least 2 characters.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email address.";
    if (!formData.message.trim() || formData.message.length < 10) newErrors.message = "Message must be at least 10 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ loading: false, success: false, error: null });
    if (!validateForm()) return;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      setStatus({ loading: false, success: false, error: "Email service not configured. Check environment variables." });
      return;
    }
    setStatus({ loading: true, success: false, error: null });
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      to_name: personal.name || "Recipient",
      message: formData.message,
    };
    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus({ loading: false, success: false, error: null }), 4000);
    } catch (err) {
      console.error("EmailJS send error:", err);
      setStatus({ loading: false, success: false, error: "Transmission failed. Check network or try again later." });
    }
  };

  const InputIcon: React.FC<{ type: "name" | "email" | "message" }> = ({ type }) => {
    const iconClass = "h-5 w-5 text-gray-400 absolute left-4";
    if (type === "name") return (<User className={`${iconClass} top-1/2 transform -translate-y-1/2`} />);
    if (type === "email") return (<Mail className={`${iconClass} top-1/2 transform -translate-y-1/2`} />);
    if (type === "message") return <MessageSquare className={`${iconClass} top-4`} />;
    return null;
  };
  

  return (
    <section
      id="contact"
      ref={contactRef}
      className="relative min-h-screen bg-black text-white flex flex-col justify-center items-center pt-24 pb-16 md:py-32 overflow-hidden"
    >
      {/* Background Effects */}
      <BackgroundBeams className="z-0" />
      <BlobBackground />
      <ParallaxBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* Header - Large, Professional Typography */}
        <div className="mb-16 md:mb-24 text-center">
          <p className="text-sm sm:text-lg font-light tracking-[0.2em] sm:tracking-[0.3em] text-gray-500 uppercase mb-4">
            — Initiate Global Collaboration —
          </p>
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-tight leading-none mb-6">
            <span
              className="typewriter-effect bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white relative after:content-[''] after:absolute after:bottom-[-8px] after:left-1/2 after:w-16 after:h-1 after:bg-white/50 after:rounded-full after:transform after:-translate-x-1/2"
            >
              GET IN TOUCH.
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-xl md:max-w-2xl mx-auto mt-6 md:mt-8 font-light leading-relaxed">
            I am available for new projects and professional inquiries. Let's build the future together.
          </p>
        </div>

        {/* Content Grid: Form (2/3) on Left, Globe (1/3) on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN (Form + Contact Channels) */}
          <div className="lg:col-span-2 relative order-2 lg:order-1">
            
            {/* 1. Form Card (Enhanced Professional UI) */}
            <div className="relative w-full p-6 sm:p-10 md:p-12 bg-black border border-gray-700/50 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6 md:mb-8 border-b border-gray-700/50 pb-4">
                Secure Inquiry Form
              </h3>
              
              {(status.success || status.error) && (
                <div className={`flex items-center gap-3 p-3 sm:p-4 mb-4 rounded-lg font-mono text-sm border-2 transition-all duration-300 shadow-lg 
                  ${status.success ? "bg-emerald-900/30 border-emerald-500/50 text-emerald-400" : "bg-red-900/30 border-red-500/50 text-red-400"}`
                }>
                  {status.success ? (<CheckCircle className="h-5 w-5" />) : (<AlertCircle className="h-5 w-5" />)}
                  <span className="font-light">
                    {status.success ? "Message received. A prompt response is guaranteed." : status.error}
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Name Input */}
                <div className="relative">
                  <InputIcon type="name" />
                  <input name="name" id="name" value={formData.name} onChange={handleChange} placeholder="Full Name / Company Name" className="w-full pl-14 pr-4 py-3 sm:py-4 bg-black/30 border border-gray-700/70 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all duration-300 text-base sm:text-lg font-light"/>
                  {errors.name && (<p className="mt-1.5 text-xs text-red-400 font-mono">{errors.name}</p>)}
                </div>

                {/* Email Input */}
                <div className="relative">
                  <InputIcon type="email" />
                  <input name="email" id="email" type="email" value={formData.email} onChange={handleChange} placeholder="Business Email Address" className="w-full pl-14 pr-4 py-3 sm:py-4 bg-black/30 border border-gray-700/70 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all duration-300 text-base sm:text-lg font-light"/>
                  {errors.email && (<p className="mt-1.5 text-xs text-red-400 font-mono">{errors.email}</p>)}
                </div>

                {/* Message Textarea */}
                <div className="relative">
                  <InputIcon type="message" />
                  <textarea name="message" id="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Your detailed proposal or request..." className="w-full pl-14 pr-4 py-4 bg-black/30 border border-gray-700/70 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all duration-300 resize-none text-base sm:text-lg font-light"/>
                  {errors.message && (<p className="mt-1.5 text-xs text-red-400 font-mono">{errors.message}</p>)}
                </div>

                {/* Submit and Reset Buttons */}
                <div className="flex flex-wrap gap-4 items-center pt-2">
                  <button type="submit" disabled={status.loading} className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3 sm:py-4 rounded-lg bg-indigo-500 text-white text-base sm:text-lg font-medium tracking-wide shadow-lg shadow-indigo-500/30 hover:bg-indigo-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {status.loading ? (
                      <><div className="relative z-10 animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" /><span className="relative z-10">SUBMITTING...</span></>
                    ) : (
                      <><Send className="relative z-10 h-5 w-5" /><span className="relative z-10">SEND MESSAGE</span></>
                    )}
                  </button>
                  <button type="button" onClick={() => { setFormData({ name: "", email: "", message: "" }); setErrors({}); setStatus({ loading: false, success: false, error: null }); }} className="ml-auto text-sm sm:text-lg text-gray-500 hover:text-indigo-400 transition-colors duration-300 font-light px-4 py-2 border border-transparent hover:border-gray-700/50 rounded-lg">
                    Reset Form
                  </button>
                </div>
              </form>
            </div>

            {/* 2. Contact Channels (Below form, Linear/Horizontal Layout) */}
            <div className="mt-8 p-6 sm:p-8 rounded-xl bg-black border border-gray-700/50 shadow-xl">
                <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-indigo-400"/> Direct Channels
                </h4>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    
                    {/* Location */}
                    <div className="flex items-center gap-4">
                        <MapPin className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        <div>
                            <p className="text-xs uppercase tracking-wider text-gray-600">Location</p>
                            <p className="text-base text-white font-light">{personal.location || "Global, Digital Sphere"}</p>
                        </div>
                    </div>
                    
                    {/* Status Indicator */}
                    <div className="flex items-center gap-4">
                        <Globe className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        <div>
                            <p className="text-xs uppercase tracking-wider text-gray-600">Status</p>
                            <p className="text-base text-emerald-400 font-light flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                Available
                            </p>
                        </div>
                    </div>

                    {/* Resume/Email Link */}
                    <div className="flex items-center gap-6 sm:ml-auto">
                        <a href={`mailto:${personal.email || '#'}`} className="group text-white text-sm font-light hover:text-indigo-400 transition-colors flex items-center gap-2">
                            <Send className="h-4 w-4" />
                            Direct Email
                        </a>
                        <a href={personal.resumeUrl || '#'} target="_blank" rel="noopener noreferrer" className="group text-gray-500 text-sm font-light hover:text-indigo-400 transition-colors flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            View CV
                        </a>
                    </div>
                </div>
            </div>

          </div>

          {/* RIGHT COLUMN (Globe + Social - Square Globe Container) */}
          <div className="lg:col-span-1 space-y-8 order-1 lg:order-2 flex flex-col items-center">
            
            {/* 3. 3D Globe Implementation (Square Container) */}
            <div 
                ref={globeContainerRef} 
                className="w-full aspect-square max-w-[600px] flex items-center justify-center relative bg-slate-900/50 border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden"
            >
                {/* Globe component is mounted here */}
                <GlobeComponent width={globeSize.width} height={globeSize.height} />
            </div>
            
            {/* 4. Social Links (Below the Globe) */}
            <div className="w-full p-6 rounded-xl bg-black border border-gray-700/50 shadow-xl">
                <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-4">Connect on:</h4>
                <div className="flex gap-4">
                    <a href={personal.linkedin || '#'} aria-label="LinkedIn" className="text-gray-500 hover:text-indigo-400 transition duration-300"><Linkedin className="h-6 w-6" /></a>
                    <a href={personal.twitter || '#'} aria-label="Twitter" className="text-gray-500 hover:text-indigo-400 transition duration-300"><Twitter className="h-6 w-6" /></a>
                    <a href={personal.github || '#'} aria-label="Github" className="text-gray-500 hover:text-indigo-400 transition duration-300"><Github className="h-6 w-6" /></a>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        /* Define the CSS variable used by the parallax background */
        :root {
            --scroll-y: 0px;
        }

        /* Typewriter Cursor Blink */
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: white }
        }

        .typewriter-effect {
            /* Adds the blinking cursor effect to simulate typing */
            border-right: 4px solid white;
            animation: 
              blink-caret 0.75s step-end infinite;
        }

        /* Blob Animation Keyframes */
        @keyframes move-blob-1 {
            0%, 100% { transform: translate(100px, 100px) scale(1); }
            50% { transform: translate(-50px, -50px) scale(1.1); }
        }
        @keyframes move-blob-2 {
            0%, 100% { transform: translate(-50px, -50px) scale(1); }
            50% { transform: translate(150px, 50px) scale(0.9); }
        }

        /* Blob Styling (Enhanced Visibility) */
        .blob {
            position: absolute;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            filter: blur(100px); 
            opacity: 0.5;      
            z-index: 0;
        }
        .blob-1 {
            top: 10%;
            left: 5%;
            animation: move-blob-1 25s infinite alternate;
        }
        .blob-2 {
            bottom: 5%;
            right: 15%;
            animation: move-blob-2 30s infinite alternate-reverse;
        }
        
        /* Ensure the globe canvas is above the main section background, but below the form content */
        #contact canvas {
            z-index: 10; 
        }
        
      `}</style>
    </section>
  );
}