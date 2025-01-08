"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin, Copy, ChevronLeft, Tag as TagIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import BlogCard from '@/components/Blog/BlogCard';

// Mock data for the blog post
const BLOG_POST = {
  id: 1,
  slug: 'minimalist-furniture',
  title: "The Art of Minimalist Furniture Design",
  excerpt: "Discover how minimalist furniture can transform your living space into a serene and functional environment.",
  content: `
    <p>Minimalist furniture design is more than just a style; it's a philosophy that emphasizes the beauty of simplicity and functionality. In this comprehensive guide, we'll explore the principles of minimalist furniture design and how it can transform your living space.</p>

    <h2>The Origins of Minimalist Design</h2>
    <p>Minimalism in furniture design emerged from the modernist movement of the early 20th century. Pioneers like Ludwig Mies van der Rohe and his famous motto "less is more" laid the foundation for what would become one of the most influential design movements.</p>

    <h2>Key Principles of Minimalist Furniture</h2>
    <ul>
      <li>Simplicity in form and function</li>
      <li>Clean lines and geometric shapes</li>
      <li>High-quality materials</li>
      <li>Neutral color palettes</li>
      <li>Emphasis on functionality</li>
    </ul>

    <h2>Choosing Materials</h2>
    <p>In minimalist furniture design, material selection plays a crucial role. Natural materials like wood, metal, and glass are often used for their timeless appeal and durability. The focus is on letting the material's natural beauty shine through without excessive ornamentation.</p>

    <h2>Space and Proportion</h2>
    <p>Minimalist furniture is designed to create a sense of space and airiness in a room. Pieces are often elevated off the ground on slim legs, creating visual lightness. Proportions are carefully considered to ensure each piece complements the space without overwhelming it.</p>

    <h2>Practical Applications</h2>
    <p>When incorporating minimalist furniture into your home, consider these practical tips:</p>
    <ul>
      <li>Start with essential pieces</li>
      <li>Choose multi-functional furniture</li>
      <li>Maintain consistent styling</li>
      <li>Focus on quality over quantity</li>
    </ul>
  `,
  image: "/1.jpg",
  date: "March 15, 2024",
  category: "Design",
  author: "John Doe",
  authorImage: "/author.jpg",
  readTime: "8 min",
  tags: ["Minimalism", "Design", "Furniture"],
  relatedPosts: [
    {
      id: 2,
      slug: 'sustainable-furniture',
      title: "Sustainable Furniture: A Guide to Eco-Friendly Living",
      excerpt: "Learn how to choose sustainable furniture that's both beautiful and environmentally responsible.",
      image: "/2.jpg",
      date: "March 10, 2024",
      category: "Sustainability",
      author: "Jane Smith",
      readTime: "6 min",
      tags: ["Sustainability", "Eco-Friendly", "Furniture"]
    },
    // Add more related posts...
  ]
};

export default function BlogPost() {
  const [mounted, setMounted] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const text = `Check out this article: ${BLOG_POST.title}`;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(BLOG_POST.title)}`, '_blank');
        break;
      case 'copy':
        await navigator.clipboard.writeText(url);
        setShowShareTooltip(true);
        setTimeout(() => setShowShareTooltip(false), 2000);
        break;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/blog" className="inline-flex items-center text-gray-600 hover:text-[#B88E2F] mb-8">
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Blog
      </Link>

      <article className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Hero Section */}
        <div className="relative h-[400px] md:h-[500px]">
          <Image
            src={BLOG_POST.image}
            alt={BLOG_POST.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-6 left-6">
            <motion.span
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-[#B88E2F] text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg"
            >
              {BLOG_POST.category}
            </motion.span>
          </div>

          {/* Title and Metadata */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            >
              {BLOG_POST.title}
            </motion.h1>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center gap-4 text-sm md:text-base"
            >
              <div className="flex items-center gap-2">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                  <User className="w-6 h-6 text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <span>{BLOG_POST.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{BLOG_POST.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{BLOG_POST.readTime}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {BLOG_POST.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag.toLowerCase()}`}
                className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <TagIcon className="w-3 h-3" />
                {tag}
              </Link>
            ))}
          </div>

          {/* Article Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: BLOG_POST.content }}
          />

          {/* Share Section */}
          <div className="border-t mt-12 pt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Share this article</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleShare('facebook')}
                  className="text-gray-600 hover:text-[#1877F2] transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="text-gray-600 hover:text-[#1DA1F2] transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="text-gray-600 hover:text-[#0A66C2] transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => handleShare('copy')}
                    className="text-gray-600 hover:text-[#B88E2F] transition-colors"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  {showShareTooltip && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded">
                      Copied!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {BLOG_POST.relatedPosts && BLOG_POST.relatedPosts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POST.relatedPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
} 