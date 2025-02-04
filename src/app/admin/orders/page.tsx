"use client";
import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/formatPrice';
import { CartItem } from '@/types/cart';

interface OrderDetails {
  isOpen: boolean;
  orderId: string | null;
}

export default function OrdersManagementPage() {
  const { user } = useUser();
  const { 
    items, 
    total, 
    subtotal, 
    tax, 
    shippingCost,
    clearCart,
    updateQuantity,
    removeFromCart 
  } = useCart();

  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    isOpen: false,
    orderId: null,
  });

  // Mock orders using actual cart data
  const mockOrders = [
    {
      id: '1',
      date: new Date().toISOString(),
      status: 'processing' as const,
      items: items,
      total: total,
      subtotal: subtotal,
      tax: tax,
      shippingCost: shippingCost,
      customer: {
        name: user?.firstName || 'Guest',
        email: user?.emailAddresses[0]?.emailAddress || 'N/A',
      },
    }
  ];

  const StatusBadge = ({ status }: { status: string }) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm ${statusColors[status as keyof typeof statusColors]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const OrderDetailsModal = ({ order }: { order: typeof mockOrders[0] }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Order Details #{order.id}</h3>
          <button 
            onClick={() => setOrderDetails({ isOpen: false, orderId: null })}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold">Customer Information</h4>
              <p>Name: {order.customer.name}</p>
              <p>Email: {order.customer.email}</p>
            </div>
            <div>
              <h4 className="font-semibold">Order Summary</h4>
              <p>Status: <StatusBadge status={order.status} /></p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Items</h4>
            <div className="space-y-2">
              {order.items.map((item: CartItem) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Color: {item.color} | Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">{formatPrice.toRupiah(formatPrice.toNumber(item.price) * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 border-t pt-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatPrice.toRupiah(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{formatPrice.toRupiah(order.shippingCost)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>{formatPrice.toRupiah(order.tax)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>{formatPrice.toRupiah(order.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-[#B88E2F]">Order Management</h1>
      {user ? (
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl">Manage Orders</h2>
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Clear All Orders
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">#{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                      <div className="text-sm text-gray-500">{order.customer.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatPrice.toRupiah(order.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button 
                        onClick={() => setOrderDetails({ isOpen: true, orderId: order.id })}
                        className="text-blue-600 hover:text-blue-900 mr-2"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orderDetails.isOpen && orderDetails.orderId && (
            <OrderDetailsModal 
              order={mockOrders.find(order => order.id === orderDetails.orderId)!}
            />
          )}
        </div>
      ) : (
        <p className="text-red-500">Please sign in to access order management.</p>
      )}
    </div>
  );
}