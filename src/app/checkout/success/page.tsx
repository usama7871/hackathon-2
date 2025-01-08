"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home if accessed directly without checkout
    const hasOrderComplete = sessionStorage.getItem('orderComplete');
    if (!hasOrderComplete) {
      router.push('/');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Order Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. We&apos;ll send you a confirmation email shortly.
          </p>
          <div className="space-y-4">
            <Link
              href="/shop"
              className="block w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              href="/account/orders"
              className="block w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              View Order Status
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 