"use client";
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const images = [
  { src: "/1.jpg", alt: "Gallery Image 1" },
  { src: "/2.jpg", alt: "Gallery Image 2" },
  { src: "/3.jpg", alt: "Gallery Image 3" },
  { src: "/4.jpg", alt: "Gallery Image 4" },
  { src: "/5.jpg", alt: "Gallery Image 5" },
  { src: "/6.jpg", alt: "Gallery Image 6" }
];

export default function ImageGallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="w-full bg-[#FCF8F3] py-24">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Share your setup with
          </h2>
          <span className="text-4xl font-bold text-[#B88E2F]">#FuniroFurniture</span>
        </motion.div>

        {/* Hexagonal Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative aspect-square group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Hexagon Clip Path Container */}
              <div className="absolute inset-0 transform transition-transform duration-500 
                group-hover:scale-105 overflow-hidden"
                style={{
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 
                    group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent
                  transition-opacity duration-300 
                  ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}
                >
                  <div className="absolute bottom-8 left-0 right-0 text-center text-white">
                    <p className="text-lg font-semibold transform -rotate-0">
                      #FuniroFurniture
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Border */}
              <div className="absolute inset-0 transform transition-transform duration-500
                group-hover:scale-105"
                style={{
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  background: 'linear-gradient(45deg, #B88E2F, #A07B2A)',
                  opacity: 0.1
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#B88E2F]/5 
          rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#B88E2F]/5 
          rounded-full blur-3xl animate-float animation-delay-2000" />
      </div>
    </section>
  );
}
