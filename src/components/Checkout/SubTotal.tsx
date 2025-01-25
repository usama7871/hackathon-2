"use client";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaShippingFast } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";

export default function Subtotal() {
  const { items, totalPrice } = useCart();
  const TAX_RATE = 0.1; // 10% tax rate
  const [shippingMethod, setShippingMethod] = useState("free");

  // Calculate shipping cost based on the selected method
  const shippingCost = shippingMethod === "free" ? 0 : 10; // $10 for express shipping

  // Calculate total price including tax and shipping
  const subtotal = totalPrice;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + shippingCost;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 p-8 rounded-lg shadow-xl border border-indigo-500 text-white"
    >
      <h2 className="text-3xl font-extrabold text-center mb-6 tracking-wider">
        <span className="text-cyan-400">Order</span> Summary
      </h2>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-gradient-to-r from-indigo-800 to-purple-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg border border-indigo-600"
              />
              <div>
                <p className="font-medium text-cyan-300">{item.name}</p>
                <p className="text-sm text-cyan-400">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="font-medium text-cyan-200">
              {formatPrice.toRupiah(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Summary Calculations */}
      <div className="space-y-4 border-t border-indigo-600 pt-4">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-cyan-300">Subtotal</span>
          <span className="font-medium text-cyan-400">
            {formatPrice.toRupiah(subtotal)}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between items-center">
          <span className="text-cyan-300">Shipping</span>
          <div className="flex items-center gap-2">
            <select
              value={shippingMethod}
              onChange={(e) => setShippingMethod(e.target.value)}
              className="p-2 bg-indigo-700 border border-cyan-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            >
              <option value="free">Free Shipping</option>
              <option value="express">Express Shipping ($10)</option>
            </select>
            <span className="font-medium text-cyan-400">
              {formatPrice.toRupiah(shippingCost)}
            </span>
          </div>
        </div>

        {/* Tax */}
        <div className="flex justify-between items-center">
          <span className="text-cyan-300">Tax (10%)</span>
          <span className="font-medium text-cyan-400">
            {formatPrice.toRupiah(tax)}
          </span>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center font-bold text-xl border-t border-indigo-600 pt-3 mt-2">
          <span className="text-cyan-400">Total</span>
          <span className="text-cyan-400">{formatPrice.toRupiah(total)}</span>
        </div>
      </div>

      {/* Animated Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl focus:ring-4 focus:ring-cyan-500 transition-all duration-300 flex items-center justify-center gap-2"
      >
        <BsCartCheck size={24} /> Proceed to Checkout
      </motion.button>
    </motion.div>
  );
}
