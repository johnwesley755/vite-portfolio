import React from "react";
import { ArrowUp } from "lucide-react";

export const ScrollToTopButton = ({ showScrollTop, scrollToTop }) => {
  if (!showScrollTop) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-4 bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/80 text-white rounded-2xl shadow-2xl transition-all duration-300 hover:scale-110 z-50 border border-gray-700/50"
    >
      <ArrowUp size={20} />
    </button>
  );
};
