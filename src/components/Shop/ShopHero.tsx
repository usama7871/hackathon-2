"use client";
import HeroLayout from "../common/HeroLayout";

export default function ShopHero() {
  return (
    <HeroLayout
      title="Shop"
      backgroundImage="/18.jpg"
      breadcrumbs={[
        { label: "Home" },
        { label: "Shop", isActive: true }
      ]}
    />
  );
} 