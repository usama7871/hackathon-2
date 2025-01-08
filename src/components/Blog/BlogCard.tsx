"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
  slug?: string;
}

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-lg h-[400px] animate-pulse">
        <div className="h-48 bg-gray-200" />
        <div className="p-6 space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <Link href={`/blog/${post.slug || post.id}`}>
        <div className="relative h-56 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <motion.span 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-[#B88E2F] text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg"
            >
              {post.category}
            </motion.span>
          </div>
        </div>

        <div className="p-6">
          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Title & Excerpt */}
          <h3 className="text-xl font-bold mb-2 group-hover:text-[#B88E2F] transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Author & Read More */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                <User className="w-5 h-5 text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <span className="text-sm text-gray-600">{post.author}</span>
            </div>
            
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              className="flex items-center gap-1 text-[#B88E2F] font-medium"
            >
              Read More
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </Link>

      {/* Hover Effect Overlay */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 border-2 border-[#B88E2F] rounded-xl pointer-events-none"
        style={{ opacity: 0 }}
      />
    </motion.div>
  );
} 