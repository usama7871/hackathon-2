// src/components/Checkout/PaymentMethod.tsx
"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const paymentMethods = [
  {
    id: "credit-card",
    name: "Credit Card",
    icon: "/bank.png",
    description: "Pay with Visa, Mastercard, or American Express",
  },
  {
    id: "easypaisa",
    name: "EasyPaisa",
    icon: "/easypaisa.png",
    description: "Pay using your EasyPaisa account",
  },
  {
    id: "jazzcash",
    name: "JazzCash",
    icon: "/jazzcash.png",
    description: "Pay using your JazzCash account",
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: "/paypal.png",
    description: "Pay securely with PayPal",
  },
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
  const [selectedMethod, setSelectedMethod] = useState("credit-card");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
  const [mobileNumber, setMobileNumber] = useState("");
  const [bankDetails, setBankDetails] = useState({ accountNumber: "", accountHolder: "", bankName: "" });

  const router = useRouter();
  const { clearCart } = useCart();

  const handlePayment = async () => {
    setIsProcessing(true);
    setError("");

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          const isSuccess = Math.random() < 0.9;
          if (isSuccess) {
            resolve("Payment successful");
          } else {
            reject("Payment failed. Please try again.");
          }
        }, 2000);
      });

      clearCart();
      router.push("/checkout/success");
    } catch (err) {
      setError(err as string);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case "credit-card":
        return (
          <div className="space-y-4 mt-4">
            <input
              type="text"
              placeholder="Card Number"
              value={cardDetails.number}
              onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
              />
              <input
                type="text"
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
              />
            </div>
          </div>
        );
      case "easypaisa":
      case "jazzcash":
        return (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            />
          </div>
        );
      case "bank-account":
        return (
          <div className="space-y-4 mt-4">
            <input
              type="text"
              placeholder="Account Number"
              value={bankDetails.accountNumber}
              onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            />
            <input
              type="text"
              placeholder="Account Holder Name"
              value={bankDetails.accountHolder}
              onChange={(e) => setBankDetails({ ...bankDetails, accountHolder: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            />
            <input
              type="text"
              placeholder="Bank Name"
              value={bankDetails.bankName}
              onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            />
          </div>
        );
      case "paypal":
        return (
          <div className="mt-4">
            <button
              onClick={() => window.open("https://www.paypal.com", "_blank")}
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Log in to PayPal
            </button>
          </div>
        );
      default:
        return null;
    }
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
              transition-colors duration-200 ${
                selectedMethod === method.id
                  ? "border-[#B88E2F] bg-[#B88E2F]/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            onClick={() => setSelectedMethod(method.id)}
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
            {selectedMethod === method.id && (
              <CheckCircle className="w-5 h-5 text-[#B88E2F]" />
            )}
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
