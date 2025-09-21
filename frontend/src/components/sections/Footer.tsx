import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";
import { portfolioData } from "../../data/portfolio";

export const Footer = () => {
  return (
    <footer className="border-t border-gray-800/50 py-12 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
              {portfolioData.personal.name}
            </div>
            <p className="text-gray-400">
              © 2025 {portfolioData.personal.name}. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-6">
            {[
              { icon: Github, href: portfolioData.personal.github },
              { icon: Linkedin, href: portfolioData.personal.linkedin },
              { icon: Twitter, href: portfolioData.personal.twitter },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800/50"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800/50 text-center">
          <p className="text-gray-500 text-sm">
            Built with React, TypeScript & Tailwind CSS • Designed with passion
            in Chennai, India
          </p>
        </div>
      </div>
    </footer>
  );
};
