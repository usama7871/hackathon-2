export interface BlogPost {
  title: string;
  content: string;
  author: string;
  authorBio: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
  relatedPosts: string[];
  slug?: string;
}

export interface CategoryPosts {
  [slug: string]: BlogPost;
}

export interface BlogContent {
  [category: string]: CategoryPosts;
} 