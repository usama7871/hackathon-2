//src/components/common/HeroLayout.tsx
"use client";
import { motion } from "framer-motion";

interface HeroLayoutProps {
  title: string;
  backgroundImage: string;
  breadcrumbs: { label: string; isActive?: boolean }[];
}

export default function HeroLayout({ title, backgroundImage, breadcrumbs }: HeroLayoutProps) {
  return (
    <div className="relative h-[400px] overflow-hidden">
      {/* Background with Parallax */}
      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transform hover:scale-105 transition-transform duration-3000"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      </motion.div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 relative"
          >
            {/* Decorative Line */}
            <div className="absolute -left-10 top-1/2 w-8 h-1 bg-[--primary]" />
            {title}
            <div className="absolute -right-10 top-1/2 w-8 h-1 bg-[--primary]" />
          </motion.h1>

          {/* Breadcrumbs */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center space-x-3 text-white/90"
          >
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.label} className="flex items-center">
                {index > 0 && (
                  <span className="mx-3 text-white/50">/</span>
                )}
                <span 
                  className={`
                    ${crumb.isActive 
                      ? 'text-[--primary] font-semibold' 
                      : 'hover:text-[--primary] transition-colors'}
                  `}
                >
                  {crumb.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-20"
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 border-2 border-[--primary] rounded-full animate-ping" />
              <div className="absolute inset-0 border-2 border-[--primary] rounded-full animate-pulse" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 