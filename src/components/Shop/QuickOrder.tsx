"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, X, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";

export default function QuickOrder() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Simulate loading state
  const { addToCart } = useCart();

  // Simulate search with a delay
  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 10);//no of products to list 

  const handleQuickAdd = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.image,
      quantity: 1,
    });
    setSearchTerm("");
    setIsOpen(false); // Close modal after adding to cart
  };

  // Simulate loading for search results
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500); // Simulate API delay
  };

  return (
    <>
      {/* Quick Order Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed right-6 bottom-6 bg-[#B88E2F] text-white p-4 rounded-full shadow-lg z-40
          hover:bg-[#9A7B2C] transition-colors duration-300"
      >
        <ShoppingCart className="w-6 h-6" />
      </motion.button>

      {/* Quick Order Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-[600px] p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Quick Order</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Search Input */}
              <div className="relative mb-6">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search products..."
                  className="w-full px-4 py-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>

              {/* Search Results */}
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {isLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="w-8 h-8 text-[#B88E2F] animate-spin" />
                  </div>
                ) : (
                  <>
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg group"
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold group-hover:text-[#B88E2F] transition-colors">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            {product.salePrice ? (
                              <>
                                <span className="text-red-600 font-bold">
                                  {formatPrice.toRupiah(product.salePrice)}
                                </span>
                                <span className="text-sm text-gray-400 line-through">
                                  {formatPrice.toRupiah(product.price)}
                                </span>
                              </>
                            ) : (
                              <span className="font-bold">
                                {formatPrice.toRupiah(product.price)}
                              </span>
                            )}
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleQuickAdd(product)}
                          className="px-4 py-2 bg-[#B88E2F] text-white rounded-lg hover:bg-[#9A7B2C] transition-colors"
                        >
                          Add
                        </motion.button>
                      </motion.div>
                    ))}

                    {searchTerm && filteredProducts.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No products found
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}