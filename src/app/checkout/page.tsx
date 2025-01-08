"use client";
import BillingDetails from '@/components/Checkout/BillingDetails';
import Subtotal from '@/components/Checkout/SubTotal';
import PaymentMethod from '@/components/Checkout/PaymentMethod';
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

const Checkout = () => {
  const [mounted, setMounted] = useState(false);
  const { items } = useCart();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // Redirect if cart is empty
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  if (!mounted) return null;

  return (
    <div>      
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-sm text-gray-500 mt-2">Home &gt; Checkout</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <BillingDetails />
          </div>
          <div>
            <Subtotal />
            <PaymentMethod />
          </div>
        </div>
      </main>      
    </div>
  );
};

export default Checkout;