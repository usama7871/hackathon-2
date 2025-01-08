"use client";
import { motion } from "framer-motion";

export default function ContactHero() {
  return (
    <section className="relative py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Contact Us
        </h1>
        <div className="flex flex-col items-center justify-center space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto px-4"
          >
            Get in touch with us for any questions about our products or services.
            We're here to help you create your perfect space.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 text-sm text-gray-500"
          >
            <span>Home</span>
            <span>/</span>
            <span className="text-[#B88E2F]">Contact</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#B88E2F] rounded-full 
          mix-blend-multiply filter blur-3xl opacity-5 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#B88E2F] rounded-full 
          mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#B88E2F] rounded-full 
          mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-4000" />
      </div>
    </section>
  );
} 