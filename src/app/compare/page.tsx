//src/app/compare/page.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Loader2 } from "lucide-react";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[600px]">
    <Loader2 className="w-8 h-8 animate-spin text-[#B88E2F]" />
  </div>
);

const DynamicProductComparison = dynamic(
  () => import('@/components/Compare/ProductComparison'),
  {
    loading: () => <LoadingSpinner />,
    ssr: false
  }
);

export default function ComparePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-[1440px]">
      <Suspense fallback={<LoadingSpinner />}>
        <DynamicProductComparison isFullPage={true} />
      </Suspense>
    </div>
  );
} 