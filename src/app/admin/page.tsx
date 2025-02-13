//src/app/admin/page.tsx
"use client";
import dynamic from 'next/dynamic';
import { Loader2 } from "lucide-react";

const AdminDashboard = dynamic(() => import("@/components/AdminDashboard"), {
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="w-8 h-8 animate-spin text-[#B88E2F]" />
    </div>
  ),
});

export default function AdminPage() {
  return (
    <div>
      <AdminDashboard />
    </div>
  );
}
