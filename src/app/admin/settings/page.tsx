//src/app/admin/settings/page.tsx
"use client";
import React from 'react';
import { useUser } from '@clerk/nextjs';

export default function SettingsPage() {
  const { user } = useUser();

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-[#B88E2F]">Account Settings</h1>
      {user ? (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-2xl mb-4">Manage Settings</h2>
          {/* Add settings management functionality here */}
          <p className="text-gray-600">Settings interface coming soon...</p>
        </div>
      ) : (
        <p className="text-red-500">Please sign in to access settings.</p>
      )}
    </div>
  );
}