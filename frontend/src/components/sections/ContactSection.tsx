import React, { useState, useEffect, useRef } from "react";
// Essential imports kept
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

// RE-IMPORTED: Using the external portfolioData file as requested
import { portfolioData } from "../../data/portfolio";

// Custom component for the Parallax Subtle Background (Architectural Texture)
const ParallaxBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
        {/* Subtle fixed texture layer for depth and parallax */}
        <div 
            className="absolute inset-0 bg-repeat opacity-[0.03] transition-transform duration-75 ease-out"
             style={{ 
                 // Dark, professional grid pattern
                 backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
                 backgroundSize: "40px 40px",
                 // Parallax effect via CSS variable set by useEffect
                 transform: "translateY(var(--scroll-y, 0)) scale(1.05)",
             }}
        />
    </div>
);


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

  // USING IMPORTED DATA
  const { personal } = portfolioData;

  const contactRef = useRef<HTMLElement | null>(null);

  // Parallax Effect Implementation
  useEffect(() => {
    const handleScroll = () => {
        if (contactRef.current) {
            const sectionTop = contactRef.current.getBoundingClientRect().top;
            const slowScroll = sectionTop * 0.05; 
            document.documentElement.style.setProperty('--scroll-y', `${slowScroll}px`);
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
    if (errors[name as keyof typeof errors])
      setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim() || formData.name.length < 2)
      newErrors.name = "Name must be at least 2 characters.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email address.";
    if (!formData.message.trim() || formData.message.length < 10)
      newErrors.message = "Message must be at least 10 characters.";
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
      setStatus({
        loading: false,
        success: false,
        error: "Email service not configured. Check environment variables.",
      });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      to_name: personal.name || "Recipient", // Using personal.name
      message: formData.message,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: "", email: "", message: "" });
      setTimeout(
        () => setStatus({ loading: false, success: false, error: null }),
        4000 
      );
    } catch (err) {
      console.error("EmailJS send error:", err);
      setStatus({
        loading: false,
        success: false,
        error: "Transmission failed. Check network or try again later.",
      });
    }
  };

  // Input icon utility component
  const InputIcon: React.FC<{ type: "name" | "email" | "message" }> = ({
    type,
  }) => {
    const iconClass = "h-5 w-5 text-gray-400 absolute left-4";
    if (type === "name")
      return (
        <User className={`${iconClass} top-1/2 transform -translate-y-1/2`} />
      );
    if (type === "email")
      return (
        <Mail className={`${iconClass} top-1/2 transform -translate-y-1/2`} />
      );
    if (type === "message")
      return (
        <MessageSquare className={`${iconClass} top-4`} />
      );
    return null;
  };


  return (
    <section
      id="contact"
      ref={contactRef}
      className="relative min-h-screen bg-black text-white flex items-center pt-24 pb-16 md:py-32 overflow-hidden"
    >
      
      {/* Parallax Background Layer */}
      <ParallaxBackground />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        
        {/* Header - Large, Professional Typography (Responsive scaling) */}
        <div className="mb-16 md:mb-20 text-center">
          <p className="text-base sm:text-lg font-light tracking-[0.2em] sm:tracking-[0.3em] text-gray-500 uppercase mb-4">
            — Initiate Collaboration —
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-thin tracking-tight leading-snug mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white">
              Let's Create Impact.
            </span>
          </h2>
          <div className="w-16 md:w-20 h-0.5 mx-auto bg-gradient-to-r from-transparent via-gray-500/50 to-transparent" />
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-xl md:max-w-2xl mx-auto mt-6 md:mt-8 font-light leading-relaxed">
            I am available for new projects and professional inquiries. Please use the secure form below.
          </p>
        </div>

        {/* Content Grid (Responsive layout change) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          
          {/* Information Column (Left) - Uses imported data */}
          <div className="lg:col-span-1 space-y-6 p-6 sm:p-8 rounded-xl bg-slate-900/50 border border-gray-700/30 shadow-2xl">
            
            <h3 className="text-xl sm:text-2xl font-normal text-white border-b border-gray-700/50 pb-4 flex items-center gap-3">
                <Zap className="h-5 w-5 text-gray-400" />
                Contact Channels
            </h3>
            
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                    <div>
                        <p className="text-xs uppercase tracking-wider text-gray-600">Base Location</p>
                        <p className="text-base sm:text-lg text-white font-light">{personal.location || "Global, Digital Sphere"}</p>
                    </div>
                </div>
                
                <div className="flex items-start gap-4">
                    <Globe className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                    <div>
                        <p className="text-xs uppercase tracking-wider text-gray-600">Status</p>
                        <p className="text-base sm:text-lg text-emerald-400 font-light flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            Active (24/7)
                        </p>
                    </div>
                </div>

                {/* Resume Link - Uses imported data */}
                <div className="pt-4 border-t border-gray-700/30">
                  <a href={`mailto:${personal.email || '#'}`} className="group text-white text-base sm:text-lg font-light hover:text-gray-300 transition-colors flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Direct Email
                  </a>
                  <a href={personal.resumeUrl || '#'} target="_blank" rel="noopener noreferrer" className="group text-gray-500 text-sm font-light hover:text-gray-300 transition-colors flex items-center gap-2 mt-3">
                      <FileText className="h-4 w-4" />
                      View CV/Resume
                      <ArrowRight className="h-3 w-3 inline-block ml-1 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
            </div>

            {/* Social Links - Uses imported data */}
            <div className="pt-6 border-t border-gray-700/50">
                <h4 className="text-xs uppercase tracking-wider text-gray-600 mb-4">Connect on:</h4>
                <div className="flex gap-3">
                    <a href={personal.linkedin || '#'} aria-label="LinkedIn" className="text-gray-600 hover:text-white transition duration-300"><Linkedin className="h-5 w-5" /></a>
                    <a href={personal.twitter || '#'} aria-label="Twitter" className="text-gray-600 hover:text-white transition duration-300"><Twitter className="h-5 w-5" /></a>
                    <a href={personal.github || '#'} aria-label="Github" className="text-gray-600 hover:text-white transition duration-300"><Github className="h-5 w-5" /></a>
                </div>
            </div>
          </div>


          {/* Form Card (Right, spanning 2 columns) */}
          <div className="lg:col-span-2 relative">
            <div className="relative w-full p-6 sm:p-10 md:p-12 bg-slate-900/60 border border-gray-700/30 rounded-xl shadow-2xl">
            
              <h3 className="text-xl sm:text-2xl font-normal text-white mb-6 md:mb-8 border-b border-gray-700/20 pb-4">
                Secure Inquiry Form
              </h3>

              {/* Status messages */}
              {(status.success || status.error) && (
                <div className={`flex items-center gap-3 p-3 sm:p-4 mb-4 rounded-lg font-mono text-sm ${
                    status.success ? 'bg-emerald-600/10 border border-emerald-500/30 text-emerald-400' : 
                    'bg-red-600/10 border border-red-500/30 text-red-400'
                }`}>
                  {status.success ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                  <span className="font-light">
                    {status.success ? "Message received. A prompt response is guaranteed." : status.error}
                  </span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                
                {/* Name Input */}
                <div className="relative">
                  <InputIcon type="name" />
                  <input
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name / Company Name"
                    className="w-full pl-14 pr-4 py-3 sm:py-4 bg-slate-950/40 border border-gray-700/50 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white/50 focus:bg-slate-900/60 transition-all duration-300 text-base sm:text-lg font-light"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-400 font-mono">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div className="relative">
                  <InputIcon type="email" />
                  <input
                    name="email"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Business Email Address"
                    className="w-full pl-14 pr-4 py-3 sm:py-4 bg-slate-950/40 border border-gray-700/50 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white/50 focus:bg-slate-900/60 transition-all duration-300 text-base sm:text-lg font-light"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-400 font-mono">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message Textarea */}
                <div className="relative">
                  <InputIcon type="message" />
                  <textarea
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Your detailed proposal or request..."
                    className="w-full pl-14 pr-4 py-4 bg-slate-950/40 border border-gray-700/50 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white/50 focus:bg-slate-900/60 transition-all duration-300 resize-none text-base sm:text-lg font-light"
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-400 font-mono">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit and Reset Buttons */}
                <div className="flex flex-wrap gap-4 items-center pt-2">
                  <button
                    type="submit"
                    disabled={status.loading}
                    className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3 sm:py-4 rounded-lg bg-white text-black text-base sm:text-lg font-medium tracking-wide shadow-xl shadow-gray-800/25 hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {status.loading ? (
                      <>
                        <div className="relative z-10 animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent" />
                        <span className="relative z-10">
                          SUBMITTING...
                        </span>
                      </>
                    ) : (
                      <>
                        <Send className="relative z-10 h-5 w-5" />
                        <span className="relative z-10">
                          SEND MESSAGE
                        </span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                        setFormData({ name: "", email: "", message: "" });
                        setErrors({});
                        setStatus({ loading: false, success: false, error: null });
                    }}
                    className="ml-auto text-sm sm:text-lg text-gray-500 hover:text-white transition-colors duration-300 font-light px-4 py-2 border border-transparent hover:border-gray-700/50 rounded-lg"
                  >
                    Reset Form
                  </button>
                </div>
              </form>
            </div>
            {/* Added interaction hint for touch devices or general usability */}
            <div className="mt-4 text-center text-xs text-gray-500 font-light">
              All fields are required to ensure a professional response.
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

        /* Simplified keyframes */
        @keyframes pulse-white {
          0%, 100% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.1); }
          50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.2); }
        }
        
        .shadow-pulse {
          animation: pulse-white 5s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}