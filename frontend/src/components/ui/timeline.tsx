// File location: components/ui/timeline.tsx

"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null); 
  const containerRef = useRef<HTMLDivElement>(null); 
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      // Calculate the dynamic height of the timeline content container
      // Add extra padding to ensure the line extends to the last item
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height + 100); // Add 100px extra to ensure line reaches the end
    }
    
    // Recalculate height on window resize to ensure line length is correct
    const handleResize = () => {
        if (ref.current) {
            setHeight(ref.current.getBoundingClientRect().height + 100);
        }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, [ref]);

  // Track scroll on the entire window since the EnhancedExperienceSection is forcing scroll
  const { scrollYProgress } = useScroll({
    target: containerRef, 
    // Start animation earlier and end when container bottom reaches viewport bottom
    offset: ["start 20%", "end 90%"], // Adjusted to ensure full animation coverage
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const contentParallax = useTransform(scrollYProgress, [0, 1], [0, 150]); 
  const titleParallax = useTransform(scrollYProgress, [0, 1], [0, 300]); 

  return (
    <div
      // Added overflow-hidden here to explicitly prevent internal scrollbars
      className="w-full bg-transparent font-sans md:px-10 overflow-hidden" 
      ref={containerRef}
    >

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            {/* STICKY DOT AND TITLE (Parallax Applied) */}
            <motion.div
              style={{ y: titleParallax }} 
              className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full"
            >
              {/* Dot container */}
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-gradient-to-br from-orange-300 via-red-400 to-yellow-500 dark:bg-black flex items-center justify-center">
                {/* Inner dot */}
                <div className="h-4 w-4 rounded-full bg-neutral-300 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              {/* Desktop Title */}
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500 ">
                {item.title}
              </h3>
            </motion.div>

            {/* CONTENT BLOCK (Parallax Applied) */}
            <motion.div
              style={{ y: contentParallax }} 
              className="relative pl-20 pr-4 md:pl-4 w-full"
            >
              {/* Mobile Title */}
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {item.content}{" "} 
            </motion.div>
          </div>
        ))}

        {/* --- Scroll Line --- */}
        <div
          style={{
            height: height + "px",
          }}
          // Static gray background line
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          {/* Animated gradient progress line */}
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-orange-500 via-yellow-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
