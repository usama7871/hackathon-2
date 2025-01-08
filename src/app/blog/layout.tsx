"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Tag, Clock } from 'lucide-react';

const categories = [
  { name: "Design", count: 12 },
  { name: "Interior", count: 8 },
  { name: "Sustainability", count: 6 },
  { name: "Furniture", count: 15 },
  { name: "Minimalism", count: 9 }
];

const recentPosts = [
  {
    title: "The Art of Minimalist Furniture Design",
    date: "March 15, 2024",
    slug: "minimalist-furniture"
  },
  {
    title: "Sustainable Materials in Modern Furniture",
    date: "March 14, 2024",
    slug: "sustainable-materials"
  },
  {
    title: "Creating the Perfect Living Room Layout",
    date: "March 13, 2024",
    slug: "perfect-living-room"
  }
];

const tags = [
  "Furniture", "Design", "Interior", "Minimal", 
  "Modern", "Sustainable", "Eco-friendly", "Luxury",
  "Comfort", "Style", "Traditional", "Contemporary"
];

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="lg:w-2/3">
            {children}
          </main>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-8">
            {/* Categories */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Categories</h2>
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      href={`/blog/category/${category.name.toLowerCase()}`}
                      className="flex items-center justify-between hover:text-[#B88E2F] transition-colors"
                    >
                      <span>{category.name}</span>
                      <span className="text-gray-500">({category.count})</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Posts */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block group"
                  >
                    <article className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-gray-400 mt-1" />
                      <div>
                        <h3 className="font-medium group-hover:text-[#B88E2F] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-500">{post.date}</p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags Cloud */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Popular Tags</h2>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag.toLowerCase()}`}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-[#B88E2F] hover:text-white transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-[#B88E2F] p-6 rounded-lg text-white">
              <h2 className="text-xl font-bold mb-2">Subscribe to Our Newsletter</h2>
              <p className="text-white/80 mb-4">
                Get the latest posts delivered right to your inbox.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-white text-[#B88E2F] rounded-lg font-medium hover:bg-white/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
} 