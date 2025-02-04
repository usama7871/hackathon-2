"use client";
import React from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

const AdminDashboard = () => {
  const { user } = useUser();

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-[#B88E2F]">Admin Dashboard</h1>
      {user ? (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-2xl">Welcome, {user.firstName}!</h2>
          <p className="mt-2 text-gray-700">Here you can track your account, orders, and status.</p>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="list-disc list-inside">
              <li><Link href="/admin/users" className="text-blue-500">User Management</Link></li>
              <li><Link href="/admin/orders" className="text-blue-500">Order Management</Link></li>
              <li><Link href="/admin/settings" className="text-blue-500">Account Settings</Link></li>
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-red-500">Please sign in to view your dashboard.</p>
      )}
    </div>
  );
};

export default AdminDashboard;