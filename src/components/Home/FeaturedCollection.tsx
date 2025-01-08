"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  items: number;
  category: string;
  price: string;
}

const collections: Collection[] = [
  {
    id: '1',
    title: 'Modern Minimalist',
    description: 'Clean lines and simple elegance',
    image: '/4.jpg',
    items: 45,
    category: 'Living Room',
    price: 'Starting from $1,299'
  },
  {
    id: '2',
    title: 'Scandinavian',
    description: 'Functional beauty meets comfort',
    image: '/5.jpg',
    items: 32,
    category: 'Bedroom',
    price: 'Starting from $899'
  },
  {
    id: '3',
    title: 'Industrial Chic',
    description: 'Raw materials, refined style',
    image: '/9.jpg',
    items: 28,
    category: 'Office',
    price: 'Starting from $1,499'
  }
];

export default function FeaturedCollection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="max-w-[1440px] mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Featured Collections
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our carefully curated collections, designed to transform your space
          into a haven of style and comfort.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {collections.map((collection, index) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            onHoverStart={() => setHoveredId(collection.id)}
            onHoverEnd={() => setHoveredId(null)}
            className="relative group cursor-pointer"
          >
            <div className="relative h-[500px] overflow-hidden rounded-2xl">
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                className="object-cover transition-transform duration-700 
                  group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-8 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: hoveredId === collection.id ? 1 : 0.9,
                  y: hoveredId === collection.id ? 0 : 10
                }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm font-medium text-[#B88E2F] mb-2">
                  {collection.category}
                </p>
                <h3 className="text-3xl font-bold mb-3">
                  {collection.title}
                </h3>
                <p className="text-lg text-gray-200 mb-4">
                  {collection.description}
                </p>
                <p className="text-[#B88E2F] font-medium mb-6">
                  {collection.price}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {collection.items} items
                  </span>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-[#B88E2F] bg-white/10 backdrop-blur-sm
                      px-4 py-2 rounded-full hover:bg-[#B88E2F] hover:text-white transition-all
                      duration-300"
                  >
                    View Collection
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 