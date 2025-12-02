// "use client";

// import { motion } from "framer-motion";
// import { Circle } from "lucide-react";
// import { cn } from "@/lib/utils";

// /**
//  * Low-level component for rendering an elegant, animated shape.
//  * This component is intended to be used by HeroGeometric for the background effect.
//  */
// function ElegantShape({
//   className,
//   delay = 0,
//   width = 400,
//   height = 100,
//   rotate = 0,
//   gradient = "from-white/[0.08]",
// }: {
//   className?: string;
//   delay?: number;
//   width?: number;
//   height?: number;
//   rotate?: number;
//   gradient?: string;
// }) {
//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//         y: -150,
//         rotate: rotate - 15,
//       }}
//       animate={{
//         opacity: 1,
//         y: 0,
//         rotate: rotate,
//       }}
//       transition={{
//         duration: 2.4,
//         delay,
//         ease: [0.23, 0.86, 0.39, 0.96],
//         opacity: { duration: 1.2 },
//       }}
//       className={cn("absolute", className)}
//     >
//       <motion.div
//         animate={{
//           y: [0, 15, 0],
//         }}
//         transition={{
//           duration: 12,
//           repeat: Number.POSITIVE_INFINITY,
//           ease: "easeInOut",
//         }}
//         style={{
//           width,
//           height,
//         }}
//         className="relative"
//       >
//         <div
//           className={cn(
//             "absolute inset-0 rounded-full",
//             "bg-gradient-to-r to-transparent",
//             gradient,
//             "backdrop-blur-[2px] border-2 border-white/[0.15]",
//             "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
//             "after:absolute after:inset-0 after:rounded-full",
//             "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
//           )}
//         />
//       </motion.div>
//     </motion.div>
//   );
// }

// /**
//  * The main Hero component with geometric background and title/badge content.
//  */
// function HeroGeometric({
//   badge = "Design Collective",
//   title1 = "Elevate Your Digital Vision",
//   title2 = "Crafting Exceptional Websites",
//   image,
//   children,
// }: {
//   badge?: string;
//   title1?: string;
//   title2?: string;
//   image?: string;
//   children?: React.ReactNode;
// }) {
//   const fadeUpVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: (i: number) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 1,
//         delay: 0.5 + i * 0.2,
//         ease: [0.25, 0.4, 0.25, 1],
//       },
//     }),
//   };

//   return (
//     <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
//       {/* Background Gradients and Blur */}
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

//       {/* Geometric Shapes */}
//       <div className="absolute inset-0 overflow-hidden">
//         <ElegantShape
//           delay={0.3}
//           width={600}
//           height={140}
//           rotate={12}
//           gradient="from-indigo-500/[0.15]"
//           className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
//         />

//         <ElegantShape
//           delay={0.5}
//           width={500}
//           height={120}
//           rotate={-15}
//           gradient="from-rose-500/[0.15]"
//           className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
//         />

//         <ElegantShape
//           delay={0.4}
//           width={300}
//           height={80}
//           rotate={-8}
//           gradient="from-violet-500/[0.15]"
//           className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
//         />

//         <ElegantShape
//           delay={0.6}
//           width={200}
//           height={60}
//           rotate={20}
//           gradient="from-amber-500/[0.15]"
//           className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
//         />

//         <ElegantShape
//           delay={0.7}
//           width={150}
//           height={40}
//           rotate={-25}
//           gradient="from-cyan-500/[0.15]"
//           className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
//         />
//       </div>

//       {/* Hero Content */}
//       <div className="relative z-10 container mx-auto px-4 md:px-6">
//         <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24">
//           {/* Left Column: Text */}
//           <div className="flex-1 text-left">
//             <motion.div
//               custom={0}
//               variants={fadeUpVariants}
//               initial="hidden"
//               animate="visible"
//               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
//             >
//               <Circle className="h-2 w-2 fill-rose-500/80" />
//               <span className="text-sm text-white/60 tracking-wide">
//                 {badge}
//               </span>
//             </motion.div>

//             <motion.div
//               custom={1}
//               variants={fadeUpVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
//                 <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
//                   {title1}
//                 </span>
//                 <br />
//                 <span
//                   className={cn(
//                     "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 ",
//                     "text-2xl sm:text-4xl md:text-6xl"
//                   )}
//                 >
//                   {title2}
//                 </span>
//               </h1>
//             </motion.div>

//             {children}
//           </div>

//           {/* Right Column: Image */}
//           {image && (
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 1, delay: 0.5 }}
//               className="flex-1 relative max-w-md w-full"
//             >
//               <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
//                 <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-rose-500/20 mix-blend-overlay z-10" />
//                 <img
//                   src={image}
//                   alt="Profile"
//                   className="w-full h-auto object-cover"
//                 />
//               </div>
//               {/* Decorative elements behind image */}
//               <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-rose-500/20 blur-2xl -z-10 rounded-full opacity-50" />
//             </motion.div>
//           )}
//         </div>
//       </div>

//       {/* Bottom Fade to Match Background */}
//       <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
//     </div>
//   );
// }
// export { HeroGeometric };



"use client";

import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Sub Component: ElegantShape ---
function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

// --- Main Component: HeroGeometric ---
interface HeroGeometricProps {
    badge?: string;
    title1: string;
    title2: string;
    image?: string; // Optional image prop for an avatar
    children: React.ReactNode;
}

const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            delay: 0.5 + i * 0.2,
            ease: [0.25, 0.4, 0.25, 1],
        },
    }),
};

/**
 * A visually striking, dark-themed hero section with animated geometric shapes.
 * It acts as a wrapper for your main HeroSection content.
 */
function HeroGeometric({
    badge = "Design Collective",
    title1,
    title2,
    image,
    children,
}: HeroGeometricProps) {

    return (
        // The container uses flex-start alignment to support left-aligned content
        <div className="relative min-h-screen w-full flex items-start justify-center overflow-hidden bg-[#030303] pt-28 md:pt-40">
            {/* Subtle background glow/blur */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

            {/* Container for the animated shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-indigo-500/[0.15]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />
                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-rose-500/[0.15]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />
                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-violet-500/[0.15]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />
                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-amber-500/[0.15]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />
                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-cyan-500/[0.15]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />
            </div>

            {/* Main Content (Text and Children) - Left Aligned */}
            <div className="relative z-10 container mx-auto px-6 md:px-12 w-full">
                <div className="max-w-4xl w-full text-left"> 
                    
                    {/* Image/Avatar */}
                    {image && (
                        <motion.div
                            custom={0}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            className="mb-8"
                        >
                            <img 
                                src={image} 
                                alt="Profile Avatar" 
                                className="h-28 w-28 rounded-full object-cover border-4 border-white/10 shadow-xl"
                            />
                        </motion.div>
                    )}

                    {/* Badge */}
                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6"
                    >
                        <Circle className="h-2 w-2 fill-rose-500/80" />
                        <span className="text-sm text-white/60 tracking-wide font-medium">
                            {badge}
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.div
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 tracking-tight leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                                {title1}
                            </span>
                            <br />
                            <span
                                className={cn(
                                    "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 "
                                )}
                            >
                                {title2}
                            </span>
                        </h1>
                    </motion.div>

                    {/* Bio, Buttons, and Social Links (passed via children) */}
                    <div className="mt-10">
                        {children}
                    </div>
                </div>
            </div>

            {/* Overlay gradient to fade bottom into black */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
        </div>
    );
}

export { HeroGeometric };