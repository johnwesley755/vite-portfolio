import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  MapPin,
  Linkedin,
  CheckCircle,
  AlertCircle,
  Send,
  FileText,
  ArrowLeft,
  User,
  MessageSquare,
  Twitter,
  Github,
  Globe,
} from "lucide-react";
import { portfolioData } from "../../data/portfolio";
import { BackgroundBeams } from "../ui/background-beams";

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
  const { personal } = portfolioData;

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
        error: "Email service not configured. Contact me directly.",
      });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      to_name: personal.name,
      message: formData.message,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: "", email: "", message: "" });
      setTimeout(
        () => setStatus({ loading: false, success: false, error: null }),
        3000
      );
    } catch (err) {
      console.error("EmailJS send error:", err);
      setStatus({
        loading: false,
        success: false,
        error: "Failed to send message. Try again later.",
      });
    }
  };

  const InputIcon: React.FC<{ type: "name" | "email" | "message" }> = ({
    type,
  }) => {
    if (type === "name")
      return (
        <User className="h-5 w-5 text-blue-300/70 absolute left-4 top-1/2 transform -translate-y-1/2" />
      );
    if (type === "email")
      return (
        <Mail className="h-5 w-5 text-blue-300/70 absolute left-4 top-1/2 transform -translate-y-1/2" />
      );
    if (type === "message")
      return (
        <MessageSquare className="h-5 w-5 text-blue-300/70 absolute left-4 top-4" />
      );
    return null;
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen overflow-hidden bg-black text-white flex items-center"
    >
      {/* BACKGROUND BEAMS INTEGRATION */}
      <div
        aria-hidden
        className="absolute inset-0 h-full z-0 pointer-events-none"
      >
        <BackgroundBeams className="absolute inset-0 h-full" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16">
        {/* Header with elegant styling */}
        <div className="mb-16 text-center">
          <div className="inline-block mb-4">
            <p className="text-xs font-mono tracking-[0.3em] text-blue-400/80 uppercase relative">
              <span className="relative z-10">Initiate Contact</span>
              <span className="absolute inset-0 block blur-sm bg-blue-500/20 -z-10" />
            </p>
          </div>
          <h2 className="text-6xl md:text-7xl font-thin tracking-wide mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-24 h-[1px] mx-auto bg-gradient-to-r from-transparent via-blue-400/50 to-transparent mb-6" />
          <p className="text-gray-400/90 max-w-xl mx-auto text-sm tracking-wide leading-relaxed">
            Open to collaboration across dimensions. Whether it's a project,
            opportunity, or just to say hello — transmit your message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* FORM CARD */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-xl">
              {/* Glow effects */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-50" />

              <div className="relative bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50 border border-blue-500/10 rounded-2xl p-10 shadow-2xl backdrop-blur-md">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-blue-500/30 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-blue-500/30 rounded-br-2xl" />

                <div className="flex flex-col gap-6">
                  {/* Location badge */}
                  <div className="flex items-center gap-4 pb-6 border-b border-blue-500/10">
                    <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20">
                      <MapPin className="h-5 w-5 text-blue-300" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">
                        Coordinates
                      </p>
                      <p className="font-light text-gray-200">
                        {personal.location || "Earth"}
                      </p>
                    </div>
                  </div>

                  {/* Status messages */}
                  {status.success && (
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-emerald-300 animate-pulse">
                      <CheckCircle className="h-5 w-5" />
                      <span className="text-sm font-light">
                        Transmission successful
                      </span>
                    </div>
                  )}
                  {status.error && (
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/5 border border-red-500/20 text-red-300">
                      <AlertCircle className="h-5 w-5" />
                      <span className="text-sm font-light">{status.error}</span>
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                      <InputIcon type="name" />
                      <input
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-950/40 border border-blue-500/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/30 focus:bg-slate-950/60 transition-all duration-300"
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-red-400 font-light">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <InputIcon type="email" />
                      <input
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@domain.com"
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-950/40 border border-blue-500/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/30 focus:bg-slate-950/60 transition-all duration-300"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-red-400 font-light">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <InputIcon type="message" />
                      <textarea
                        name="message"
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Your message across the void..."
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-950/40 border border-blue-500/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/30 focus:bg-slate-950/60 transition-all duration-300 resize-none"
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-xs text-red-400 font-light">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-4 items-center pt-2">
                      <button
                        type="submit"
                        disabled={status.loading}
                        className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-light tracking-wide shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {status.loading ? (
                          <>
                            <div className="relative z-10 animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                            <span className="relative z-10 text-sm">
                              Transmitting...
                            </span>
                          </>
                        ) : (
                          <>
                            <Send className="relative z-10 h-4 w-4" />
                            <span className="relative z-10 text-sm">
                              Send Message
                            </span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ name: "", email: "", message: "" })
                        }
                        className="ml-auto text-sm text-gray-400 hover:text-blue-300 transition-colors duration-300 font-light"
                      >
                        Reset
                      </button>
                    </div>
                  </form>

                  {/* Social links */}
                  <div className="mt-6 pt-6 flex items-center justify-between text-sm border-t border-blue-500/10">
                    <div className="flex items-center gap-4">
                      <a
                        href={personal.linkedin || "#"}
                        aria-label="LinkedIn"
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a
                        href={personal.twitter || "#"}
                        aria-label="Twitter"
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a
                        href={personal.github || "#"}
                        aria-label="Github"
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    </div>

                    <div className="flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors duration-300 cursor-pointer">
                      <FileText className="h-4 w-4" />
                      <span className="text-xs font-light">Resume</span>
                      <ArrowLeft className="h-3 w-3 rotate-180 opacity-60" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NETWORK STATUS CARD - Replacing Globe */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-3xl blur-2xl opacity-60" />

              <div className="relative w-full h-[520px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50 border border-blue-500/10 shadow-2xl backdrop-blur-sm">
                {/* Corner accents */}
                <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-blue-500/20 rounded-tr-2xl z-20" />
                <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-blue-500/20 rounded-bl-2xl z-20" />

                <div className="absolute inset-0 p-8 flex flex-col z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p className="text-xs text-blue-400/70 uppercase tracking-wider mb-1">
                        Network Status
                      </p>
                      <h3 className="text-white text-3xl font-thin tracking-wide">
                        Global Reach
                      </h3>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <p className="text-xs text-emerald-400 font-light">
                          Online
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 font-mono">24/7</p>
                    </div>
                  </div>

                  {/* Animated Globe Icon Replacement */}
                  <div className="flex-1 relative flex items-center justify-center">
                    <div className="relative">
                      {/* Pulsing rings */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-64 h-64 rounded-full border-2 border-blue-500/20 animate-ping" style={{ animationDuration: '3s' }} />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 rounded-full border-2 border-indigo-500/30 animate-ping" style={{ animationDuration: '2s' }} />
                      </div>
                      
                      {/* Center globe icon */}
                      <div className="relative z-10 flex items-center justify-center">
                        <div className="p-8 rounded-full bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border-2 border-blue-500/30 backdrop-blur-sm">
                          <Globe className="h-32 w-32 text-blue-400 animate-pulse" />
                        </div>
                      </div>

                      {/* Floating connection points */}
                      <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
                      <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '1s' }} />
                      <div className="absolute bottom-1/4 right-1/3 w-3 h-3 rounded-full bg-blue-300 animate-pulse" style={{ animationDelay: '1.5s' }} />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-3 rounded-lg bg-slate-900/40 border border-blue-500/10">
                      <p className="text-2xl font-light text-blue-400">24/7</p>
                      <p className="text-xs text-gray-500 mt-1">Available</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-slate-900/40 border border-blue-500/10">
                      <p className="text-2xl font-light text-indigo-400">∞</p>
                      <p className="text-xs text-gray-500 mt-1">Reach</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-slate-900/40 border border-blue-500/10">
                      <p className="text-2xl font-light text-purple-400">100%</p>
                      <p className="text-xs text-gray-500 mt-1">Uptime</p>
                    </div>
                  </div>
                </div>

                {/* Info text */}
                <div className="absolute bottom-6 left-8 right-8 text-center text-xs text-gray-500 z-20 font-light">
                  <span>Optimized for performance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 100% 0; }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          50% {
            transform: translateY(-100px) translateX(50px);
          }
        }
        
        .animate-float {
          animation: float 15s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}