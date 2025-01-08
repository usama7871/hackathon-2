"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { formatPrice } from '@/utils/formatPrice';
import { CartItem } from '@/types/cart';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  totalItems: number;
  totalPrice: number;
  shippingCost: number;
  taxRate: number;
  subtotal: number;
  tax: number;
  total: number;  
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // Initialize cart from localStorage if available
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const shippingCost = 0; // Free shipping for now
  const taxRate = 0; // 0% tax rate

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items]);

  const addToCart = (product: CartItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => 
        item.id === product.id && item.color === product.color
      );
      
      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id && item.color === product.color
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...currentItems, { ...product, quantity: product.quantity || 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const calculateTotals = () => {
    const subtotal = items.reduce((total, item) => {
      const itemPrice = formatPrice.toNumber(item.price);
      return total + (itemPrice * item.quantity);
    }, 0);

    const tax = subtotal * taxRate;
    const total = subtotal + tax + shippingCost;

    return {
      subtotal,
      tax,
      total
    };
  };

  // Use the calculated totals in your context
  const { subtotal, tax, total } = calculateTotals();

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      totalItems,
      totalPrice: total,
      shippingCost,
      taxRate,
      subtotal,
      tax,
      total,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 