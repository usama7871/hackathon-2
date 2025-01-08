"use client";

import ProductGrid from "./ProductGrid";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ArrowUpDown } from "lucide-react";

interface ProductsProps {
  products?: any[];
}

export default function Products({ products }: ProductsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  useEffect(() => {
    setIsVisible(true);
    setMounted(true);
  }, []);

  const defaultProducts = [
    {
      id: "1",
      name: "Syltherine",
      price: 2500000,
      salePrice: 2000000,
      salePercentage: 20,
      image: "/Hero.png",
      description: "Stylish cafe chair",
    },
    {
      id: "2",
      name: "Jane Smith",
      price: 2500000,
      salePrice: 1250000,
      salePercentage: 50,
      image: "/images.png",
      description: "A creative designer's masterpiece.",
    },
    {
      id: "3",
      name: "Sam Wilson",
      price: 2500000,
      salePrice: 1250000,
      salePercentage: 50,
      image: "/images.png",
      description: "A creative designer's masterpiece.",
    },
  ];

  const displayProducts = products || defaultProducts;

  // Filter and sort products
  useEffect(() => {
    let result = displayProducts;

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    if (sortBy === "price-low-to-high") {
      result = result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (sortBy === "price-high-to-low") {
      result = result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    } else if (sortBy === "name-a-z") {
      result = result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-z-a") {
      result = result.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredProducts(result);
  }, [searchTerm, sortBy, displayProducts]);

  return (
    <div className="relative">
      {/* Filter and Sort Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white shadow-sm"
      >
        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Sort Dropdown */}
        <div className="relative w-full sm:w-48">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] appearance-none"
          >
            <option value="default">Sort by</option>
            <option value="price-low-to-high">Price: Low to High</option>
            <option value="price-high-to-low">Price: High to Low</option>
            <option value="name-a-z">Name: A to Z</option>
            <option value="name-z-a">Name: Z to A</option>
          </select>
          <ArrowUpDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </motion.div>

      {/* Product Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <ProductGrid data={filteredProducts} />
      </motion.div>

      {/* No Results Message */}
      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <p className="text-gray-600 text-lg">
            No products match your current filters. Try adjusting your search criteria.
          </p>
        </motion.div>
      )}

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-200 rounded-full 
          mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-200 rounded-full 
          mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-pink-200 rounded-full 
          mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>
    </div>
  );
}