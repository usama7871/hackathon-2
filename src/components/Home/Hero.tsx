"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import HeroImage from "@/Pictures/Hero.png";
import Link from "next/link"; // Import Link
export default function Hero() {
  return (
    <main className="relative w-full min-h-screen mt-[100px]">
      {/* Container with max width */}
      <div className="relative max-w-[1440px] mx-auto">
        {/* Background Image Container */}
        <div className="relative w-full h-[716px] lg:h-[716.83px]">
          <Image
            src={HeroImage}
            alt="Hero Image"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute z-10 bg-[#FFF3E3] p-6 md:p-8 lg:p-12 shadow-xl rounded-[10px] 
            top-1/2 left-4 right-4 -translate-y-1/2
            lg:left-auto lg:right-[50px] lg:top-[253px] lg:translate-y-0
            lg:w-[643px] lg:h-[443px]
            transform hover:scale-[1.02] transition-transform duration-300"
        >
          {/* Content */}
          <motion.h6
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm font-bold uppercase text-black mb-4"
          >
            New Arrival
          </motion.h6>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#B88E2F] mb-6"
          >
            Discover Our
            <br />
            New Collection
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-base md:text-lg text-black/80 mb-8 max-w-xl"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
          </motion.p>
        {/* Updated Buy Now Button */}
        <Link href="/shop">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#B88E2F] hover:bg-[#A07B2A] text-white font-bold 
              py-3 px-8 rounded-lg transition-all duration-300
              border-2 border-[#B88E2F] hover:border-[#A07B2A]
              shadow-lg hover:shadow-xl"
          >
            Buy Now
          </motion.button>
         </Link>
          {/* Decorative Elements */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#B88E2F]/10 rounded-full"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute -top-4 -left-4 w-16 h-16 bg-[#B88E2F]/10 rounded-full"
          />
        </motion.div>
      </div>
    </main>
  );
}