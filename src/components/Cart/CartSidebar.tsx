"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/formatPrice';
import Image from 'next/image';

export default function CartSidebar() {
  const router = useRouter();
  const { 
    isCartOpen, 
    setIsCartOpen, 
    items, 
    removeFromCart, 
    updateQuantity,
    total 
  } = useCart();

  const sidebarVariants = {
    closed: { x: "-100%", opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleViewCart = () => {
    setIsCartOpen(false);
    router.push('/cart');
  };

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      >
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={sidebarVariants}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed left-0 top-0 h-full w-[420px] bg-gradient-to-r from-[#0A1A2B] via-[#2E3C4E] to-[#1D2A39] text-white shadow-2xl rounded-r-lg flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-[#FFD700]" />
              <h2 className="text-2xl font-semibold tracking-wider">Cart</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-gray-600 mb-4" />
                <p className="text-gray-400">Your cart is empty</p>
              </div>
            ) : (
              items.map((item) => (
                <motion.div
                  key={item.id}
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                  transition={{ delay: 0.1 }}
                  className="flex gap-4 p-4 rounded-lg bg-gray-800 shadow-md hover:bg-gray-700 transition-all"
                >
                  <div className="relative w-20 h-20 rounded-md overflow-hidden border-2 border-gray-700">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-[#FFD700]">{formatPrice.toRupiah(item.price)}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, Math.max(0, item.quantity - 1))
                          }
                          className="p-1 hover:bg-gray-600 transition"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-600 transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:bg-red-600/10 rounded-full transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium">Total:</span>
                <span className="text-2xl font-bold text-[#FFD700]">
                  {formatPrice.toRupiah(total)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleViewCart}
                  className="px-4 py-3 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition"
                >
                  View Cart
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    router.push("/checkout");
                  }}
                  className="px-4 py-3 bg-[#FFD700] rounded-lg text-gray-800 font-semibold hover:bg-yellow-400 transition"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
