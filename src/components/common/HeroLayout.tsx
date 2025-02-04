// src/components/common/HeroLayout.tsx
"use client";

import { motion } from "framer-motion";
import { IconContext } from "react-icons";
import { FaRocket, FaStar } from "react-icons/fa";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

interface HeroLayoutProps {
  title: string;
  backgroundImage: string;
  breadcrumbs: { label: string; isActive?: boolean }[];
}

export default function HeroLayout({ title, backgroundImage, breadcrumbs }: HeroLayoutProps): JSX.Element {
  return (
    <div className="relative h-[600px] overflow-hidden md:h-[80vh]">
      {/* Parallax Background */}
      <Parallax pages={1.5} className="absolute inset-0" style={{ height: '100vh' }}>
        <ParallaxLayer
          offset={0}
          speed={0.3}
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <ParallaxLayer
          offset={0}
          speed={0.8}
          style={{
            background: "linear-gradient(135deg, rgba(0,0,0,0.6), transparent)",
          }}
        />
      </Parallax>

      {/* Decorative Stars */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[3px] h-[3px] bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, delay: Math.random() * 1.5 }}
          />
        ))}
      </motion.div>

      {/* Content Section */}
      <div className="relative h-full container mx-auto px-4">
        <div className="flex flex-col items-center justify-center h-full text-center">
          {/* Title with 3D effect */}
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-7xl font-extrabold text-white tracking-widest mb-6"
            style={{
              textShadow: "0 2px 10px rgba(255, 255, 255, 0.5)",
              letterSpacing: "2px",
            }}
          >
            {title}
          </motion.h1>

          {/* Animated Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center space-x-3 text-gray-300 text-lg"
          >
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.label} className="flex items-center">
                {index > 0 && <span className="mx-3 text-gray-500">/</span>}
                <span
                  className={`${
                    crumb.isActive
                      ? "text-[--primary] font-bold"
                      : "hover:text-[--primary] transition-colors duration-300"
                  }`}
                >
                  {crumb.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Futuristic Icon Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center mt-10 gap-6"
          >
            <IconContext.Provider value={{ color: "#B88E2F", size: "40px" }}>
              <FaRocket className="animate-bounce" />
              <FaStar className="animate-spin-slow" />
            </IconContext.Provider>
          </motion.div>

          {/* Decorative Circular Ripples */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-40"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 border-4 border-[--primary] rounded-full animate-ping" />
              <div className="absolute inset-0 border-4 border-[--primary] rounded-full animate-pulse" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
