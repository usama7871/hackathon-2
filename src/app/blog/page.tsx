"use client";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Loader2 } from "lucide-react";

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="w-8 h-8 animate-spin text-[#B88E2F]" />
  </div>
);

// Dynamic imports with loading states
const BlogHero = dynamic(() => import("@/components/Blog/BlogHero"), {
  loading: () => <LoadingSpinner />
});

const BlogGrid = dynamic(() => import("@/components/Blog/BlogGrid"), {
  loading: () => <LoadingSpinner />
});

const NewsletterSignup = dynamic(() => import("@/components/common/NewsletterSignup"), {
  loading: () => <LoadingSpinner />
});

export default function BlogPage() {
  return (
    <main className="w-full">
      <Suspense fallback={<LoadingSpinner />}>
        <BlogHero />
        <div className="section-spacing" />
        <BlogGrid />
        <div className="section-spacing" />
        <NewsletterSignup />
      </Suspense>
    </main>
  );
} 