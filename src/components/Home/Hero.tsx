"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import HeroImage from "../../Pictures/Hero.png";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { FC } from "react";

interface BubbleConfig {
  position: [number, number, number];
  scale: number;
  color: string;
  opacity: number;
}

const FloatingBubbles: FC = () => {
  const bubbleConfigs: BubbleConfig[] = [
    { position: [-2, 1, -3], scale: 1, color: "#88C0D0", opacity: 0.5 },
    { position: [1.5, 2, -2], scale: 1.5, color: "#8FBCBB", opacity: 0.4 },
    { position: [0, -1, -4], scale: 2, color: "#5E81AC", opacity: 0.3 },
  ];

  return (
    <>
      {bubbleConfigs.map((bubble, index) => (
        <Sphere
          key={index}
          args={[1, 32, 32]}
          position={bubble.position}
          scale={bubble.scale}
        >
          <meshStandardMaterial
            color={bubble.color}
            transparent
            opacity={bubble.opacity}
          />
        </Sphere>
      ))}
    </>
  );
};

export default function Hero(): JSX.Element {
  return (
    <main className="relative w-full min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center">
      <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[80vh] flex items-center justify-center">
          <Image
            src={HeroImage}
            alt="Hero Image"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute z-10 bg-gradient-to-r from-[#88C0D0] to-[#5E81AC] p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl rounded-2xl lg:rounded-[30px]
            w-[calc(100%-32px)] sm:w-[90%] md:w-[80%] lg:w-[643px]
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            lg:left-auto lg:right-[5%] lg:translate-x-0
            transform hover:scale-[1.02] transition-transform duration-300"
        >
          {/* Content remains the same but with responsive text sizing */}
          <motion.h6
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xs sm:text-sm font-bold uppercase text-white mb-2 sm:mb-4 tracking-widest"
          >
            New Arrival
          </motion.h6>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight"
          >
            Discover Our
            <br />
            New Collection
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-xl"
          >
            Explore the latest trends and styles that redefine fashion. Elevate your wardrobe with our new collection.
          </motion.p>
          
          <Link href="/shop">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05, backgroundColor: "#5E81AC" }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#88C0D0] text-white font-bold 
                py-2 sm:py-3 px-6 sm:px-8 rounded-full transition-all duration-300
                text-sm sm:text-base
                border-2 border-transparent hover:border-[#5E81AC]
                shadow-lg hover:shadow-xl"
            >
              Buy Now
            </motion.button>
          </Link>

          {/* Decorative elements */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-28 sm:h-28 bg-[#88C0D0]/20 rounded-full blur-md"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute -top-4 -left-4 w-12 h-12 sm:w-20 sm:h-20 bg-[#88C0D0]/20 rounded-full blur-md"
          />
        </motion.div>

        {/* Responsive 3D Canvas */}
        <div className="absolute inset-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={1} />
            <FloatingBubbles />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </main>
  );
}