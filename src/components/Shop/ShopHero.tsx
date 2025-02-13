"use client";
import HeroLayout from "../common/HeroLayout";

export default function ShopHero() {
  return (
    <HeroLayout
      title="Our Collection"
      backgroundImage="/16.jpg"
      breadcrumbs={[
        { label: "Home" },
        { label: "Shop", isActive: true }
      ]}
    />
  );
}