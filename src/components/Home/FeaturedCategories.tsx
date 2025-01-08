"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

const categories = [
  {
    id: 1,
    name: "Living Room",
    image: "/Hero.png",
    itemCount: 240,
    color: "from-blue-500/20 to-purple-500/20"
  },
  {
    id: 2,
    name: "Bedroom",
    image: "/images.png",
    itemCount: 185,
    color: "from-green-500/20 to-teal-500/20"
  },
  {
    id: 3,
    name: "Dining",
    image: "/1.jpg",
    itemCount: 150,
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    id: 4,
    name: "Office",
    image: "/11.jpg",
    itemCount: 120,
    color: "from-indigo-500/20 to-blue-500/20"
  }
];

export default function FeaturedCategories() {
  const router = useRouter();

  return (
    <section className="max-w-[1440px] mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">Featured Categories</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our curated collection of furniture categories, each designed to transform your space into something extraordinary.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="relative group cursor-pointer"
            onClick={() => router.push(`/shop?category=${category.name.toLowerCase()}`)}
          >
            <div className="relative h-[300px] rounded-2xl overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-b ${category.color} opacity-60 group-hover:opacity-70 transition-opacity`} />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-sm">{category.itemCount} items</p>
              </div>

              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
              >
                <span className="text-white text-2xl">→</span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 