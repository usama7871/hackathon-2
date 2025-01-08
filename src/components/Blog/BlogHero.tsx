"use client";
import HeroLayout from "../common/HeroLayout";

export default function BlogHero() {
  return (
    <HeroLayout
      title="Our Blog"
      backgroundImage="/18.jpg"
      breadcrumbs={[
        { label: "Home" },
        { label: "Blog", isActive: true }
      ]}
    />
  );
} 