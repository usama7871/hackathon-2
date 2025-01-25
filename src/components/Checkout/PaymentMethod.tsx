"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext"; // Corrected import statement
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { createPaymentIntent } from "@/utils/stripe"; // Corrected import statement

const paymentMethods = [
  {
    id: "bank-account",
    name: "Bank Transfer",
    icon: "/bank.png",
    description: "Transfer directly from your bank account",
  },
];

export default function PaymentMethod() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [bankDetails, setBankDetails] = useState({ accountNumber: "", accountHolder: "", bankName: "" });

  const router = useRouter();
  const { clearCart } = useCart();

  const handlePayment = async () => {
    setIsProcessing(true);
    setError("");

    // Basic validation
    if (!bankDetails.accountNumber || !bankDetails.accountHolder || !bankDetails.bankName) {
      setError("Please fill in all fields.");
      setIsProcessing(false);
      return;
    }

    try {
      const amount = 1000; // Replace with the actual amount to be charged
      const clientSecret = await createPaymentIntent(amount); // Create payment intent with Stripe

      // Here you would confirm the payment with Stripe using the clientSecret
      // This is a placeholder for the actual Stripe confirmation logic

      clearCart();
      router.push("/checkout/success");
    } catch (err) {
      setError(err as string);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderPaymentForm = () => {
    return (
      <div className="space-y-4 mt-4">
        <input
          type="text"
          placeholder="Account Number"
          value={bankDetails.accountNumber}
          onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
          autoComplete="on"
        />
        <input
          type="text"
          placeholder="Account Holder Name"
          value={bankDetails.accountHolder}
          onChange={(e) => setBankDetails({ ...bankDetails, accountHolder: e.target.value })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
          autoComplete="on"
        />
        <input
          type="text"
          placeholder="Bank Name"
          value={bankDetails.bankName}
          onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
          autoComplete="on"
        />
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Payment Method</h2>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <motion.div
            key={method.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`relative flex items-center p-4 rounded-lg border-2 cursor-pointer
              transition-colors duration-200 border-[#B88E2F] bg-[#B88E2F]/5`}
          >
            <div className="flex items-center gap-4 flex-1">
              <Image
                src={method.icon}
                alt={method.name}
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <div>
                <h3 className="font-medium text-gray-900">{method.name}</h3>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            </div>
            <CheckCircle className="w-5 h-5 text-[#B88E2F]" />
          </motion.div>
        ))}
      </div>

      {renderPaymentForm()}

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className={`w-full py-3 rounded-lg text-white font-medium
          transition-all duration-200 relative overflow-hidden
          ${
            isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#B88E2F] hover:bg-[#A07B2A]"
          }`}
      >
        <span className={`flex items-center justify-center gap-2 ${
          isProcessing ? "opacity-0" : "opacity-100"
        }`}>
          Pay Now
        </span>
        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        )}
      </button>
    </div>
  );
}
