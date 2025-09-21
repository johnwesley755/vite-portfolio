import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  CheckCircle,
  AlertCircle,
  Send,
  User,
  MessageSquare,
} from "lucide-react";
import { portfolioData } from "../../data/portfolio"; // Adjust import path

// Background Component (re-used for consistency)
const BackgroundFX = () => (
  <>
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-50"></div>
      <div className="absolute top-0 -left-1/4 w-[40rem] h-[40rem] bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-0 -right-1/4 w-[40rem] h-[40rem] bg-gradient-to-tl from-teal-500/20 to-blue-500/10 rounded-full blur-3xl animate-float-slow animation-delay-4000"></div>
    </div>
    <div className="absolute inset-0 -z-20 bg-black"></div>
    <style>{`
      @keyframes float-slow {
        0% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(30px, -40px);
        }
        100% {
          transform: translate(0, 0);
        }
      }
      .animate-float-slow {
        animation: float-slow 15s ease-in-out infinite;
      }
      .animation-delay-4000 {
        animation-delay: 4s;
      }
    `}</style>
  </>
);

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null as string | null,
  });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { personal } = portfolioData;
  const socialLinks = [
    { icon: Github, href: personal.github, label: "GitHub" },
    { icon: Linkedin, href: personal.linkedin, label: "LinkedIn" },
    { icon: Twitter, href: personal.twitter, label: "Twitter" },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for the field being edited
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Reset status on new submission
    setStatus({ loading: false, success: false, error: null });

    if (!validateForm()) {
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        loading: false,
        success: false,
        error:
          "Email service is not configured correctly. Please contact me directly.",
      });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      to_name: "John Wesley", // Or your name
      message: formData.message,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: "", email: "", message: "" });
      setTimeout(
        () => setStatus({ loading: false, success: false, error: null }),
        5000
      );
    } catch (error) {
      console.error("EmailJS send error:", error);
      setStatus({
        loading: false,
        success: false,
        error: "Failed to send message. Please try again later.",
      });
    }
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <BackgroundFX />
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            Let's Collaborate
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Have a project in mind or just want to connect? Drop me a line.
          </p>
        </div>

        <div
          onMouseMove={handleMouseMove}
          className="relative group bg-black/40 backdrop-blur-xl border border-teal-500/20 rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/40"
        >
          {/* Aurora Effect */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(20, 184, 166, 0.15), transparent 80%)`,
              }}
            ></div>
          </div>

          <div className="relative z-10 grid md:grid-cols-3 gap-12">
            {/* Left Column: Contact Info */}
            <div className="md:col-span-1 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Get In Touch
                </h3>
                <p className="text-gray-400">
                  Find me on these platforms or send a direct message.
                </p>
              </div>
              <div className="space-y-4">
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group/link"
                >
                  <div className="w-10 h-10 flex-shrink-0 bg-gray-800/50 rounded-lg flex items-center justify-center border border-gray-700/50 group-hover/link:bg-teal-500/20 group-hover/link:border-teal-500/50">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span>{personal.email}</span>
                </a>
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-10 h-10 flex-shrink-0 bg-gray-800/50 rounded-lg flex items-center justify-center border border-gray-700/50">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span>{personal.location}</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">
                  Connect Socially
                </h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-3 rounded-full bg-gray-800/50 border border-gray-700/50 hover:bg-teal-500/20 hover:border-teal-500/50 hover:scale-110 transition-all duration-300"
                    >
                      <social.icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Status Messages */}
                {status.success && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 text-green-300">
                    <CheckCircle className="h-5 w-5" /> Message sent
                    successfully! I'll be in touch soon.
                  </div>
                )}
                {status.error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-300">
                    <AlertCircle className="h-5 w-5" /> {status.error}
                  </div>
                )}

                <div className="relative group/input">
                  <User className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within/input:text-teal-400 transition-colors" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status.loading}
                    className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 transition-all"
                    placeholder="Your Name"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1 ml-2">
                    {errors.name}
                  </p>
                )}

                <div className="relative group/input">
                  <Mail className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within/input:text-teal-400 transition-colors" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={status.loading}
                    className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1 ml-2">
                    {errors.email}
                  </p>
                )}

                <div className="relative group/input">
                  <MessageSquare className="absolute top-5 left-4 w-5 h-5 text-gray-500 group-focus-within/input:text-teal-400 transition-colors" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={status.loading}
                    rows={5}
                    className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 transition-all resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1 ml-2">
                    {errors.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status.loading}
                  className="relative w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-green-500 text-white font-bold rounded-lg overflow-hidden group/btn hover:from-teal-400 hover:to-green-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
                  <div className="relative z-10 flex items-center justify-center gap-2 w-full">
                    {status.loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
