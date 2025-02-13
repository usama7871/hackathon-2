//src/app/admin/users/page.tsx
"use client";
import React, { useState } from 'react';
import { useUser, useClerk, UserProfile } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

interface TabType {
  id: string;
  label: string;
}

const tabs: TabType[] = [
  { id: 'profile', label: 'Profile' },
  { id: 'security', label: 'Security' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'activity', label: 'Activity' },
];

export default function UsersManagementPage() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [activeTab, setActiveTab] = useState('profile');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  const UserProfileCard = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        {user?.imageUrl && (
          <div className="relative w-20 h-20">
            <Image
              src={user.imageUrl}
              alt="Profile"
              fill
              className="rounded-full object-cover"
            />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold">{user?.fullName || 'User'}</h2>
          <p className="text-gray-600">{user?.primaryEmailAddress?.emailAddress}</p>
          <p className="text-sm text-gray-500">Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
        </div>
      </div>
    </div>
  );

  const TabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Full Name</p>
                  <p className="font-medium">{user?.fullName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-medium">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
                <div>
                  <p className="text-gray-600">Username</p>
                  <p className="font-medium">{user?.username || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Phone</p>
                  <p className="font-medium">{user?.phoneNumbers?.[0]?.phoneNumber || 'Not set'}</p>
                </div>
              </div>
              <button
                onClick={() => setIsProfileOpen(true)}
                className="mt-4 bg-[#B88E2F] text-white px-4 py-2 rounded hover:bg-[#9A7B2C] transition-colors"
              >
                Edit Profile
              </button>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Security Settings</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <button className="bg-[#B88E2F] text-white px-4 py-2 rounded hover:bg-[#9A7B2C]">
                  Enable 2FA
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Password</h4>
                  <p className="text-sm text-gray-500">Change your password</p>
                </div>
                <button className="bg-[#B88E2F] text-white px-4 py-2 rounded hover:bg-[#9A7B2C]">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">User Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-gray-500">Receive email updates about your account</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#B88E2F] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B88E2F]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Marketing Communications</h4>
                  <p className="text-sm text-gray-500">Receive marketing updates and promotions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#B88E2F] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B88E2F]"></div>
                </label>
              </div>
            </div>
          </div>
        );

      case 'activity':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {/* Mock activity data - replace with real data */}
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center space-x-4 border-b pb-4">
                  <div className="w-10 h-10 bg-[#B88E2F] rounded-full flex items-center justify-center text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Profile Updated</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#B88E2F]">User Management</h1>
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Sign Out
        </button>
      </div>

      {user ? (
        <div className="space-y-6">
          <UserProfileCard />

          <div className="bg-white rounded-lg shadow-md">
            <div className="border-b">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-[#B88E2F] text-[#B88E2F]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              <TabContent />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">Please sign in to access user management.</p>
          <Link
            href="/sign-in"
            className="bg-[#B88E2F] text-white px-6 py-3 rounded-lg hover:bg-[#9A7B2C] transition-colors"
          >
            Sign In
          </Link>
        </div>
      )}

      {isProfileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Edit Profile</h2>
              <button
                onClick={() => setIsProfileOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <UserProfile />
          </div>
        </div>
      )}
    </div>
  );
}