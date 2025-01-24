"use client";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import { useState } from "react";

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
    <div className="bg-gradient-to-r from-indigo-50 to-white p-6 rounded-lg shadow-lg border border-indigo-200">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Order Summary</h2>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 object-cover rounded-lg border border-gray-200"
              />
              <div>
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="font-medium text-indigo-600">
              {formatPrice.toRupiah(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Summary Calculations */}
      <div className="space-y-4 border-t pt-4">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-indigo-700">
            {formatPrice.toRupiah(subtotal)}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Shipping</span>
          <div className="flex items-center gap-2">
            <select
              value={shippingMethod}
              onChange={(e) => setShippingMethod(e.target.value)}
              className="p-2 bg-white border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <option value="free">Free Shipping</option>
              <option value="express">Express Shipping ($10)</option>
            </select>
            <span className="font-medium text-indigo-700">
              {formatPrice.toRupiah(shippingCost)}
            </span>
          </div>
        </div>

        {/* Tax */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Tax (10%)</span>
          <span className="font-medium text-indigo-700">
            {formatPrice.toRupiah(tax)}
          </span>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center font-bold text-lg border-t pt-3 mt-2">
          <span className="text-indigo-800">Total</span>
          <span className="text-indigo-800">{formatPrice.toRupiah(total)}</span>
        </div>
      </div>

      {/* Animated Button */}
      <button
        className="w-full mt-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
