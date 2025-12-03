import React from "react";
import { Footer } from "../ui/modern-animated-footer";
import {
  Twitter,
  Linkedin,
  Github,
  Mail,
  NotepadTextDashed,
} from "lucide-react";

export default function FooterDemo() {
  // Social links are retained from your original file
  const socialLinks = [
    {
      icon: <Twitter className="w-6 h-6" />,
      href: "https://x.com/JohnWesley97513",
      label: "Twitter",
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      href: "https://www.linkedin.com/in/john-wesley-6707ab258/",
      label: "LinkedIn",
    },
    {
      icon: <Github className="w-6 h-6" />,
      href: "https://github.com/johnwesley755",
      label: "GitHub",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      href: "mailto:johnwesley8113@gmail.com",
      label: "Email",
    },
  ];

  // 🚀 UPDATED Navigation links to match the Header's section IDs
  // Note: The href uses a '#' prefix common for smooth scrolling section links.
  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <Footer
      brandName="JOHN WESLEY"
      brandDescription="John Wesley's Portfolio"
      socialLinks={socialLinks}
      navLinks={navLinks}
      creatorName="John Wesley"
      creatorUrl="johnwesley8113@gmail.com"
      brandIcon={<NotepadTextDashed className="w-8 sm:w-10 md:w-14 h-8 sm:h-10 md:h-14 text-background drop-shadow-lg" />}
    />
  );
}