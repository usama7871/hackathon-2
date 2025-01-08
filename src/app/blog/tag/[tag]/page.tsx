import Link from 'next/link';
import { ArrowLeft, Tag } from 'lucide-react';

// Mock blog posts data organized by tags
const BLOG_POSTS_BY_TAG = {
  minimalism: [
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
      id: 13,
      slug: 'japanese-minimalism',
      title: "Japanese Minimalism in Modern Furniture",
      excerpt: "How Japanese minimalist principles influence contemporary furniture design.",
      image: "/3.jpg",
      date: "March 3, 2024",
      category: "Design",
      author: "Yuki Tanaka",
      readTime: "9 min",
      tags: ["Minimalism", "Design", "Culture"]
    }
  ],
  'sustainable-design': [
    {
      id: 2,
      slug: 'sustainable-materials',
      title: "Sustainable Materials in Modern Furniture",
      excerpt: "Exploring eco-friendly materials and their impact on contemporary furniture design.",
      image: "/2.jpg",
      date: "March 14, 2024",
      category: "Sustainability",
      author: "Jane Smith",
      readTime: "6 min",
      tags: ["Sustainable Design", "Materials", "Eco-Friendly"]
    },
    {
      id: 9,
      slug: 'eco-friendly-production',
      title: "Eco-Friendly Furniture Production",
      excerpt: "How sustainable manufacturing practices are shaping the furniture industry.",
      image: "/5.jpg",
      date: "March 7, 2024",
      category: "Sustainability",
      author: "Tom Green",
      readTime: "8 min",
      tags: ["Sustainable Design", "Manufacturing", "Eco-Friendly"]
    }
  ],
  'interior-design': [
    {
      id: 3,
      slug: 'perfect-living-room',
      title: "Creating the Perfect Living Room Layout",
      excerpt: "Tips and tricks for arranging your furniture to maximize space and comfort.",
      image: "/3.jpg",
      date: "March 13, 2024",
      category: "Interior Design",
      author: "Mike Johnson",
      readTime: "10 min",
      tags: ["Interior Design", "Space Planning", "Living Room"]
    },
    {
      id: 8,
      slug: 'lighting-design',
      title: "The Impact of Lighting in Interior Design",
      excerpt: "How proper lighting can transform your interior spaces.",
      image: "/4.jpg",
      date: "March 8, 2024",
      category: "Interior Design",
      author: "Sarah Parker",
      readTime: "11 min",
      tags: ["Interior Design", "Lighting", "Design"]
    }
  ]
};

const tagDescriptions = {
  minimalism: "Explore the beauty of simplicity in furniture design. Discover how minimalist principles can create serene and functional living spaces.",
  'sustainable-design': "Learn about eco-friendly furniture design and sustainable practices. From materials to manufacturing, discover how to make environmentally conscious choices.",
  'interior-design': "Get inspired by interior design tips and trends. Learn how to create beautiful, functional spaces that reflect your personal style."
};

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = params.tag.toLowerCase();
  const posts = BLOG_POSTS_BY_TAG[tag as keyof typeof BLOG_POSTS_BY_TAG] || [];
  const description = tagDescriptions[tag as keyof typeof tagDescriptions] || '';

  const formattedTag = tag
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <Link 
          href="/blog"
          className="inline-flex items-center text-gray-600 hover:text-[#B88E2F] mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to All Posts
        </Link>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <Tag className="w-8 h-8 text-[#B88E2F]" />
            <h1 className="text-4xl font-bold">{formattedTag}</h1>
          </div>
          <p className="text-gray-600 text-lg mb-8">{description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <div key={post.id}>
                <Link href={`/blog/${post.slug}`}>
                  <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative h-48">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#B88E2F] text-white px-3 py-1 rounded-full text-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 hover:text-[#B88E2F] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200" />
                        <span className="text-sm text-gray-600">{post.author}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <Tag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No Posts Found</h2>
              <p className="text-gray-600">
                We couldn't find any posts with this tag. Try checking out other tags!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 