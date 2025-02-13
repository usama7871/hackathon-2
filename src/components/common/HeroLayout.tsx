"use client";
import { motion, useAnimation } from "framer-motion";
import { IconContext } from "react-icons";
import { FaRocket } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeroLayoutProps {
  title: string;
  backgroundImage: string;
  breadcrumbs: { label: string; isActive?: boolean }[];
}

export default function HeroLayout({ title, backgroundImage, breadcrumbs }: HeroLayoutProps): JSX.Element {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();
  const [mounted, setMounted] = useState(false);

  // Handle mouse movement
  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 15,
        y: (e.clientY / window.innerHeight) * 15,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle glitch animation
  useEffect(() => {
    if (!mounted) return;

    let isAnimating = true;

    const glitchAnimation = async () => {
      while (isAnimating) {
        await controls.start({
          clipPath: [
            "inset(0% 0% 0% 0%)",
            "inset(20% 0% 30% 0%)",
            "inset(0% 0% 0% 0%)",
          ],
          x: [0, -5, 5, 0],
          transition: { duration: 0.2 }
        });
        await new Promise(resolve => setTimeout(resolve, Math.random() * 5000 + 3000));
      }
    };

    glitchAnimation();

    return () => {
      isAnimating = false;
    };
  }, [controls, mounted]);

  // Rest of the component remains the same...

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      {/* Animated Background with Glitch Effect */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        animate={controls}
      />

      {/* Enhanced Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
      
      {/* Cyber Grid */}
      <div className="absolute inset-0">
        <div className="h-full w-full grid grid-cols-12 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="relative h-full">
              <div className="absolute inset-0 border-r border-[#B88E2F]/10" />
              <motion.div
                className="absolute top-0 h-full w-0.5 bg-[#B88E2F]/20"
                animate={{
                  y: ["0%", "100%"],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-${i % 3 + 1} h-${i % 3 + 1} 
                       ${i % 2 === 0 ? 'bg-[#B88E2F]/30' : 'bg-white/30'} 
                       rounded-full blur-[1px]`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * 500,
              scale: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * 500,
              scale: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative h-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center h-full text-center">
          {/* Holographic Title Effect */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 
                       tracking-wider z-10 relative"
              style={{
                textShadow: `
                  0 0 10px rgba(184, 142, 47, 0.5),
                  0 0 20px rgba(184, 142, 47, 0.3),
                  0 0 30px rgba(184, 142, 47, 0.2)
                `,
              }}
            >
              {title}
            </motion.h1>
            
            {/* Holographic Lines */}
            <motion.div
              className="absolute -inset-x-8 -inset-y-4 bg-gradient-to-r from-transparent 
                       via-[#B88E2F]/10 to-transparent rounded-lg opacity-50"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Enhanced Breadcrumbs */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex flex-wrap justify-center items-center gap-2 text-base sm:text-lg"
          >
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.label} className="flex items-center">
                {index > 0 && (
                  <motion.span
                    className="mx-3 text-[#B88E2F]"
                    animate={{
                      rotate: [0, 180, 360],
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    ⬡
                  </motion.span>
                )}
                <Link
                  href={index === 0 ? "/" : `/${crumb.label.toLowerCase()}`}
                  className={`relative group ${
                    crumb.isActive
                      ? "text-[#B88E2F] font-semibold"
                      : "text-gray-200"
                  }`}
                >
                  <span className="relative z-10">{crumb.label}</span>
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#B88E2F] 
                             via-white to-[#B88E2F] group-hover:w-full w-0"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </div>
            ))}
          </motion.nav>

          {/* Floating Icon with Enhanced Effects */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <IconContext.Provider value={{ color: "#B88E2F", size: "32px" }}>
              <motion.div
                animate={{
                  y: [-5, 5, -5],
                  filter: [
                    "drop-shadow(0 0 10px rgba(184, 142, 47, 0.5))",
                    "drop-shadow(0 0 20px rgba(184, 142, 47, 0.7))",
                    "drop-shadow(0 0 10px rgba(184, 142, 47, 0.5))"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaRocket className="transform -rotate-45" />
              </motion.div>
            </IconContext.Provider>
          </motion.div>
        </div>
      </div>
    </div>
  );
}