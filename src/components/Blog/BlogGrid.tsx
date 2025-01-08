"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Search, Filter, ChevronDown, X, Calendar, Tag as TagIcon } from 'lucide-react';
import BlogCard from './BlogCard';

// Extended blog posts data
const BLOG_POSTS = [
  {
    id: 1,
    slug: 'minimalist-furniture',
    title: "The Art of Minimalist Furniture Design",
    excerpt: "Discover how minimalist furniture can transform your living space into a serene and functional environment.",
    image: "/1.jpg",
    date: "March 15, 2024",
    category: "Design",
    author: "John Doe",
    readTime: "8 min",
    tags: ["Minimalism", "Design", "Furniture"]
  },
  {
    id: 2,
    slug: 'sustainable-materials',
    title: "Sustainable Materials in Modern Furniture",
    excerpt: "Exploring eco-friendly materials and their impact on contemporary furniture design.",
    image: "/2.jpg",
    date: "March 14, 2024",
    category: "Sustainability",
    author: "Jane Smith",
    readTime: "6 min"
  },
  {
    id: 3,
    slug: 'perfect-living-room',
    title: "Creating the Perfect Living Room Layout",
    excerpt: "Tips and tricks for arranging your furniture to maximize space and comfort.",
    image: "/3.jpg",
    date: "March 13, 2024",
    category: "Interior Design",
    author: "Mike Johnson",
    readTime: "10 min"
  },
  {
    id: 4,
    slug: 'scandinavian-design',
    title: "The History of Scandinavian Design",
    excerpt: "A journey through the evolution of Scandinavian furniture and its influence on modern design.",
    image: "/4.jpg",
    date: "March 12, 2024",
    category: "History",
    author: "Sarah Wilson",
    readTime: "12 min"
  },
  {
    id: 5,
    slug: 'color-theory',
    title: "Color Theory in Furniture Selection",
    excerpt: "Understanding how to use color theory to create harmonious interior spaces.",
    image: "/5.jpg",
    date: "March 11, 2024",
    category: "Design",
    author: "Alex Brown",
    readTime: "7 min"
  },
  {
    id: 6,
    slug: 'small-spaces',
    title: "Furniture Solutions for Small Spaces",
    excerpt: "Smart furniture choices and arrangements for maximizing small living spaces.",
    image: "/6.jpg",
    date: "March 10, 2024",
    category: "Interior Design",
    author: "Emma Davis",
    readTime: "9 min"
  }
];

const categories = ["All", "Design", "Sustainability", "Interior Design", "History"];
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'title_asc', label: 'Title A-Z' },
  { value: 'title_desc', label: 'Title Z-A' }
];

export default function BlogGrid() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const postsPerPage = 6;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset page when filters change
  }, [searchQuery, selectedCategory, sortBy, selectedTags]);

  if (!mounted) return null;

  // Get unique tags from all posts
  const allTags = Array.from(
    new Set(BLOG_POSTS.flatMap(post => post.tags || []))
  ).sort();

  // Filter and sort posts
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = (
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => post.tags?.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'title_asc':
        return a.title.localeCompare(b.title);
      case 'title_desc':
        return b.title.localeCompare(a.title);
      default: // 'newest'
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white p-6 rounded-xl shadow-sm"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-80 pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            {/* Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent appearance-none bg-white"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t">
                {/* Categories */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedCategory === category
                            ? 'bg-[#B88E2F] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagToggle(tag)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedTags.includes(tag)
                            ? 'bg-[#B88E2F] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <TagIcon className="w-3 h-3" />
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <p>
          Showing {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, filteredPosts.length)} of {filteredPosts.length} results
        </p>
        {(selectedCategory !== 'All' || selectedTags.length > 0 || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedTags([]);
              setSearchQuery('');
            }}
            className="text-[#B88E2F] hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Posts Found</h2>
          <p className="text-gray-600">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {/* Previous Page */}
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded transition-colors ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded transition-colors ${
                currentPage === i + 1
                  ? 'bg-[#B88E2F] text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* Next Page */}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded transition-colors ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
} 