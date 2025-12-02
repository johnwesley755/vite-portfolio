"use client";
import React from "react";
import {
  NotepadTextDashed,
  Twitter,
  Linkedin,
  Github,
  Mail,
} from "lucide-react";
import { cn } from "../../lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  creatorName?: string;
  creatorUrl?: string;
  brandIcon?: React.ReactNode;
  className?: string;
}

export const Footer = ({
  brandName = "YourBrand",
  brandDescription = "Your description here",
  socialLinks = [],
  navLinks = [],
  creatorName,
  creatorUrl,
  brandIcon,
  className,
}: FooterProps) => {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY || 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Parallax tuning
  const bgTextTranslateY = scrollY * -0.05;
  const bgTextScale = 1 + scrollY * 0.00006;
  const iconTranslateY = scrollY * -0.09;
  const glowTranslateY = scrollY * -0.03;

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-black",
        className
      )}
    >
      <footer className="relative border-t border-gray-900 bg-black/95">
        {/* Soft glow rising from the footer */}
        <div
          className="pointer-events-none absolute inset-x-0 -top-32 h-64 bg-gradient-to-b from-white/15 via-white/5 to-transparent opacity-60 blur-xl"
          style={{
            transform: `translateY(${glowTranslateY}px)`,
          }}
        />

        {/* Large background text with parallax */}
        <div
          className="
            pointer-events-none select-none
            absolute inset-x-0
            bottom-[-4rem]
            flex justify-center
            bg-clip-text text-transparent
            bg-gradient-to-b from-white/20 via-white/10 to-transparent
            font-extrabold
            tracking-[-0.08em]
            leading-none
            will-change-transform
          "
          style={{
            fontSize: "clamp(4rem, 18vw, 15rem)",
            width: "230vw",
            transform: `translateY(${bgTextTranslateY}px) scale(${bgTextScale})`,
          }}
        >
          {brandName.toUpperCase()}
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-20 space-y-12">
          {/* Top CTA row */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3 max-w-xl">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                Portfolio · {new Date().getFullYear()}
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                Let&apos;s build something exceptional.
              </h2>
              <p className="text-gray-400 text-sm md:text-base">
                {brandDescription}
              </p>
            </div>

            {/* Center floating icon / badge */}
            <div
              className="flex items-center gap-3 md:gap-4 justify-start md:justify-end will-change-transform"
              style={{
                transform: `translateY(${iconTranslateY}px)`,
              }}
            >
              <div className="rounded-3xl border border-gray-800 bg-black/80 shadow-[0_0_40px_rgba(0,0,0,0.9)] px-4 py-3 flex items-center gap-3">
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-gray-950 flex items-center justify-center">
                  {brandIcon || (
                    <NotepadTextDashed className="w-6 h-6 text-gray-100" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-[0.21em] text-gray-500">
                    Portfolio
                  </span>
                  <span className="text-sm md:text-base text-white font-medium">
                    {brandName}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main grid: brand / nav / social */}
          <div className="grid gap-10 md:gap-12 md:grid-cols-[1.7fr,1.1fr] lg:grid-cols-[1.7fr,1fr,1fr]">
            {/* Brand & mini description */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
                {brandName}
              </h3>
              <p className="text-sm md:text-base text-gray-400 max-w-md">
                Creating clean interfaces and thoughtful experiences with a focus
                on clarity, motion and modern web technologies.
              </p>

              {/* Skill chips (purely visual) */}
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-3 py-1 text-xs rounded-full border border-gray-800 text-gray-300 bg-black/60">
                  Web Developer
                </span>
                <span className="px-3 py-1 text-xs rounded-full border border-gray-800 text-gray-300 bg-black/60">
                  UI / UX
                </span>
                <span className="px-3 py-1 text-xs rounded-full border border-gray-800 text-gray-300 bg-black/60">
                  React · TypeScript
                </span>
              </div>
            </div>

            {/* Navigation links */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold tracking-[0.22em] uppercase text-gray-500">
                Navigation
              </h4>
              {navLinks.length > 0 ? (
                <div className="flex flex-col gap-2 text-sm text-gray-400">
                  {navLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="hover:text-white hover:translate-x-1 transition-all duration-200"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Add your main sections here: Home, Work, About, Contact.
                </p>
              )}
            </div>

            {/* Social & contact */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold tracking-[0.22em] uppercase text-gray-500">
                Connect
              </h4>

              {socialLinks.length > 0 ? (
                <div className="flex gap-3">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-full border border-gray-800 bg-black/70 p-2 flex items-center justify-center hover:border-gray-200 hover:bg-white transition-all duration-200"
                    >
                      <span className="w-4 h-4 group-hover:text-black text-gray-300">
                        {link.icon}
                      </span>
                      <span className="sr-only">{link.label}</span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="flex gap-3 text-gray-400 text-sm">
                  <Twitter className="w-4 h-4 opacity-60" />
                  <Linkedin className="w-4 h-4 opacity-60" />
                  <Github className="w-4 h-4 opacity-60" />
                  <Mail className="w-4 h-4 opacity-60" />
                </div>
              )}

              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs md:text-sm text-gray-200 mt-3 px-3 py-2 rounded-full border border-gray-800 bg-black/70 hover:bg-white hover:text-black transition-all duration-200"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <Mail className="w-3 h-3" />
                </span>
                <span>Drop a message</span>
              </a>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-t border-gray-900/70 pt-6 mt-4">
            <p className="text-xs md:text-sm text-gray-500 text-center md:text-left">
              ©{new Date().getFullYear()} {brandName.toUpperCase()}. All rights
              reserved.
            </p>

            {creatorName && creatorUrl && (
              <a
                href={creatorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs md:text-sm text-gray-500 hover:text-white transition-colors duration-200 text-center md:text-right"
              >
                Crafted by {creatorName}
              </a>
            )}
          </div>
        </div>
      </footer>
    </section>
  );
};
