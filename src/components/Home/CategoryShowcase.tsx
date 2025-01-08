"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Tag } from "lucide-react";

interface Category {
  id: string;
  name: string;
  image: string;
  itemCount: number;
  featured: boolean;
  priceRange: string;
  description: string;
}

const categories: Category[] = [
  {
    id: "1",
    name: "Living Room",
    image: "/7.jpg",
    itemCount: 152,
    featured: true,
    priceRange: "$899 - $4,999",
    description: "Modern comfort for your family gatherings",
  },
  {
    id: "2",
    name: "Bedroom",
    image: "/8.jpg",
    itemCount: 98,
    featured: false,
    priceRange: "$599 - $3,999",
    description: "Peaceful retreats for perfect rest",
  },
  {
    id: "3",
    name: "Dining Room",
    image: "/10.jpg",
    itemCount: 87,
    featured: false,
    priceRange: "$799 - $5,999",
    description: "Elegant spaces for memorable meals",
  },
  {
    id: "4",
    name: "Office",
    image: "/19.jpg",
    itemCount: 76,
    featured: true,
    priceRange: "$499 - $2,999",
    description: "Professional style meets functionality",
  },
  {
    id: "5",
    name: "Outdoor",
    image: "/20.jpg",
    itemCount: 65,
    featured: false,
    priceRange: "$299 - $1,999",
    description: "Durable elegance for your outdoor space",
  },
];

export default function CategoryShowcase() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="max-w-[1440px] mx-auto px-4 py-16">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Explore Our Categories
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover furniture for every room in your home, thoughtfully designed
          to blend style with functionality.
        </p>
      </motion.div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`relative ${
              category.featured ? "md:col-span-2 aspect-[2/1]" : "aspect-square"
            }`}
            onMouseEnter={() => setHoveredId(category.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="group h-full overflow-hidden rounded-2xl relative">
              {/* Category Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Category Details */}
              <motion.div
                className="absolute inset-0 p-8 flex flex-col justify-end"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: hoveredId === category.id ? 1 : 0.9,
                  y: hoveredId === category.id ? 0 : 10,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col text-white">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">{category.name}</h3>
                      <p className="text-base text-gray-200 mb-2">{category.description}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 45 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 hover:bg-[#B88E2F] hover:border-transparent transition-colors"
                    >
                      <ArrowUpRight className="w-6 h-6" />
                    </motion.button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-[#B88E2F]" />
                      <span className="text-[#B88E2F] font-medium">{category.priceRange}</span>
                    </div>
                    <span className="text-sm text-gray-300">{category.itemCount} items</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call-to-Action Button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-12 text-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-[#B88E2F] text-white rounded-full hover:bg-[#A07B2A] transition-colors inline-flex items-center gap-2"
        >
          View All Categories
          <ArrowUpRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  );
}
