import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import BlogGrid from '@/components/Blog/BlogGrid';

// Extended blog posts data with more posts per category
const BLOG_POSTS_BY_CATEGORY = {
  design: [
    {
      id: 1,
      slug: 'minimalist-furniture',
      title: "The Art of Minimalist Furniture Design",
      excerpt: "Discover how minimalist furniture can transform your living space into a serene and functional environment.",
      image: "/1.jpg",
      date: "March 15, 2024",
      category: "Design",
      author: "John Doe",
      readTime: "8 min"
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
      id: 7,
      slug: 'modern-design-trends',
      title: "Modern Furniture Design Trends 2024",
      excerpt: "Explore the latest trends shaping the future of furniture design.",
      image: "/2.jpg",
      date: "March 9, 2024",
      category: "Design",
      author: "Emma Wilson",
      readTime: "9 min"
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
      readTime: "10 min"
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
      readTime: "11 min"
    }
  ],
  sustainability: [
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
      id: 9,
      slug: 'eco-friendly-production',
      title: "Eco-Friendly Furniture Production",
      excerpt: "How sustainable manufacturing practices are shaping the furniture industry.",
      image: "/5.jpg",
      date: "March 7, 2024",
      category: "Sustainability",
      author: "Tom Green",
      readTime: "8 min"
    },
    {
      id: 10,
      slug: 'recycled-furniture',
      title: "The Beauty of Recycled Furniture",
      excerpt: "Discovering the artistic potential in recycled and upcycled furniture pieces.",
      image: "/1.jpg",
      date: "March 6, 2024",
      category: "Sustainability",
      author: "Lisa Chen",
      readTime: "7 min"
    }
  ],
  history: [
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
      id: 11,
      slug: 'art-deco-furniture',
      title: "The Art Deco Movement in Furniture",
      excerpt: "Exploring the glamorous and geometric styles of Art Deco furniture.",
      image: "/3.jpg",
      date: "March 5, 2024",
      category: "History",
      author: "David Miller",
      readTime: "10 min"
    },
    {
      id: 12,
      slug: 'victorian-furniture',
      title: "Victorian Era Furniture Styles",
      excerpt: "Understanding the ornate and elaborate designs of Victorian furniture.",
      image: "/6.jpg",
      date: "March 4, 2024",
      category: "History",
      author: "Rachel Adams",
      readTime: "11 min"
    }
  ]
};

const categoryDescriptions = {
  design: "Explore the latest trends and timeless principles in furniture design. From minimalist aesthetics to bold statements, discover how design shapes our living spaces.",
  'interior-design': "Learn about creating harmonious and functional interior spaces. Get expert tips on furniture arrangement, color coordination, and space optimization.",
  sustainability: "Discover eco-friendly furniture solutions and sustainable design practices. Learn about materials, manufacturing processes, and environmental impact.",
  history: "Journey through the rich history of furniture design. Explore different periods, styles, and cultural influences that shaped furniture evolution."
};

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category.toLowerCase();
  const posts = BLOG_POSTS_BY_CATEGORY[category as keyof typeof BLOG_POSTS_BY_CATEGORY] || [];
  const description = categoryDescriptions[category as keyof typeof categoryDescriptions] || '';

  const formattedCategory = category
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
          <h1 className="text-4xl font-bold mb-4">{formattedCategory}</h1>
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
        </div>
      </div>
    </div>
  );
} 