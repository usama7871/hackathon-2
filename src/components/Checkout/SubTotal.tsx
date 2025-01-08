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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center hover:bg-gray-50 p-2 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="font-medium text-gray-900">
              {formatPrice.toRupiah(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Summary Calculations */}
      <div className="space-y-3 border-t pt-4">
        {/* Subtotal */}
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">{formatPrice.toRupiah(subtotal)}</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <div className="flex items-center gap-2">
            <select
              value={shippingMethod}
              onChange={(e) => setShippingMethod(e.target.value)}
              className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            >
              <option value="free">Free Shipping</option>
              <option value="express">Express Shipping ($10)</option>
            </select>
            <span className="text-gray-900">
              {formatPrice.toRupiah(shippingCost)}
            </span>
          </div>
        </div>

        {/* Tax */}
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (10%)</span>
          <span className="text-gray-900">{formatPrice.toRupiah(tax)}</span>
        </div>

        {/* Total */}
        <div className="flex justify-between font-bold text-lg border-t pt-3 mt-2">
          <span className="text-gray-900">Total</span>
          <span className="text-gray-900">{formatPrice.toRupiah(total)}</span>
        </div>
      </div>
    </div>
  );
}