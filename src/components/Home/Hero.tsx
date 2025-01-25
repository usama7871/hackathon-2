"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import HeroImage from "../../Pictures/Hero.png"; // Corrected path
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

export default function Hero() {
  return (
    <main className="relative w-full min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="relative max-w-[1440px] mx-auto">
        <div className="relative w-full h-auto lg:h-[80vh]">
          <Image
            src={HeroImage}
            alt="Hero Image"
            fill
            priority
            className="object-cover brightness-75 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute z-10 bg-gradient-to-r from-[#88C0D0] to-[#5E81AC] p-6 md:p-8 lg:p-12 shadow-2xl rounded-[30px] 
            top-1/2 left-4 right-4 -translate-y-1/2
            lg:left-auto lg:right-[50px] lg:top-[50%] lg:translate-y-[-50%]
            lg:w-[643px] lg:h-auto
            transform hover:scale-[1.02] transition-transform duration-300"
        >
          <motion.h6
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm font-bold uppercase text-white mb-4 tracking-widest"
          >
            New Arrival
          </motion.h6>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
          >
            Discover Our
            <br />
            New Collection
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-xl"
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
                py-3 px-8 rounded-full transition-all duration-300
                border-2 border-transparent hover:border-[#5E81AC]
                shadow-lg hover:shadow-xl"
            >
              Buy Now
            </motion.button>
          </Link>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="absolute -bottom-4 -right-4 w-28 h-28 bg-[#88C0D0]/20 rounded-full blur-md"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute -top-4 -left-4 w-20 h-20 bg-[#88C0D0]/20 rounded-full blur-md"
          />
        </motion.div>

        {/* 3D Canvas for Floating Bubbles */}
        <div className="absolute inset-0 pointer-events-none">
          <Canvas>
            <ambientLight intensity={0.9} />
            <pointLight position={[10, 10, 10]} />
            <FloatingBubbles />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </main>
  );
}
