"use client";
import HeroLayout from "../common/HeroLayout";

export default function BlogHero() {
  return (
    <HeroLayout
      title="Latest Articles"
      backgroundImage="/18.jpg"
      breadcrumbs={[
        { label: "Home" },
        { label: "Blog", isActive: true }
      ]}
    />
  );
}