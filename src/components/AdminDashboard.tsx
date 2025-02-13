"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Users2, ShoppingCart, DollarSign, Box, Bell } from 'lucide-react';

// 3D Background Component
const SpaceBackground = () => {
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Stars radius={300} depth={60} count={1000} factor={7} saturation={0} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
    </Canvas>
  );
};

const AdminDashboard = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded]);

  if (loading) {
    return <div className="text-center text-gray-400">Loading...</div>;
  }

  const stats = [
    { title: "Total Sales", value: "$24,563", icon: DollarSign, trend: "+12.5%" },
    { title: "Active Users", value: "1,234", icon: Users2, trend: "+5.2%" },
    { title: "Products", value: "456", icon: Box, trend: "+3.8%" },
    { title: "Pending Orders", value: "23", icon: Box, trend: "-2.1%" },
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0A1B]">
      <div className="absolute inset-0 pointer-events-none">
        <SpaceBackground />
      </div>

      <div className="relative container mx-auto p-6">
        {user ? (
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-center"
            >
              <div>
                <h1 className="text-4xl font-bold text-[#FFD700] mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#B88E2F]">
                  Admin Dashboard
                </h1>
                <p className="text-gray-400">Welcome back, {user.firstName}!</p>
              </div>
              <div className="flex items-center gap-4">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 text-gray-300 border border-gray-700 transition-all duration-300"
                >
                  <Bell className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative bg-gray-800/70 backdrop-blur-lg p-6 rounded-xl border border-gray-700 hover:border-[#FFD700] transition-all duration-300 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex justify-between items-start">
                    <div>
                      <p className="text-gray-400 mb-1">{stat.title}</p>
                      <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                    </div>
                    <div className={`p-2 rounded-lg ${stat.trend.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className={`text-sm ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.trend} from last month
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { href: "/shop", icon: Box, title: "Products", desc: "Manage inventory" },
                { href: "/admin/orders", icon: ShoppingCart, title: "Orders", desc: "Track orders" },
                { href: "/admin/users", icon: Users2, title: "Customers", desc: "Manage users" },
                { href: "/admin/settings", icon: Box, title: "Settings", desc: "View Settings" }
              ].map((action, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={action.href} className="flex items-center gap-3 p-4 bg-gray-800/30 backdrop-blur-lg rounded-xl border border-gray-700 hover:border-[#FFD700] transition-all duration-300 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <action.icon className="w-6 h-6 text-[#FFD700] relative z-10" />
                    <div className="relative z-10">
                      <h3 className="text-white font-semibold">{action.title}</h3>
                      <p className="text-sm text-gray-400">{action.desc}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 bg-gray-800/30 backdrop-blur-lg rounded-xl border border-gray-700"
          >
            <p className="text-xl text-red-500">Please sign in to access the admin dashboard.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;