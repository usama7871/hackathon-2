//src/app/admin/orders/page.tsx 
"use client";
import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/formatPrice';

// Define the Order interface
interface Order {
  id: string;
  date: string;
  status: string;
  items: Array<{
    id: string;
    name: string;
    image: string;
    color: string;
    quantity: number;
    price: number; // Assuming price is a number
  }>;
  total: number;
  subtotal: number;
  tax: number;
  shippingCost: number;
  customer: {
    name: string;
    email: string;
  };
}

export default function OrdersManagementPage() {
  const { user } = useUser();
  const { items, total, subtotal, tax, shippingCost } = useCart();
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);

  const mockOrders = [
    {
      id: '1',
      date: new Date().toISOString(),
      status: 'processing',
      items: items.map(item => ({
        ...item,
        color: item.color || 'defaultColor', // Provide a default color if undefined
      })),
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

  const OrderDetailsModal = ({ order }: { order: Order }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold">Order Details #{order.id}</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold">Customer Information</h4>
              <p>Name: {order.customer.name}</p>
              <p>Email: {order.customer.email}</p>
            </div>
            <div>
              <h4 className="font-semibold">Order Summary</h4>
              <p>Status: {order.status}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Items</h4>
            <div className="space-y-2">
              {order.items.map((item) => (
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
      <h1 className="text-3xl font-bold mb-4 text-[#FFD700]">Order Management</h1>
      {user ? (
        <div className="bg-gray-800 p-4 rounded-lg shadow">
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
                      <span className={`px-3 py-1 rounded-full text-sm ${order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatPrice.toRupiah(order.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button 
                        onClick={() => setOrderDetails(order)}
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

          {orderDetails && <OrderDetailsModal order={orderDetails} />}
        </div>
      ) : (
        <p className="text-red-500">Please sign in to access order management.</p>
      )}
    </div>
  );
}