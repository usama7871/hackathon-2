"use client";
import dynamic from 'next/dynamic';
import { Suspense, useContext } from 'react';
import { Loader2 } from "lucide-react";
import { useUser } from '@clerk/nextjs'; // Import useUser from Clerk

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="w-8 h-8 animate-spin text-[#B88E2F]" />
  </div>
);

// Dynamic imports with loading states
const ContactHero = dynamic(() => import('../../components/Contact/ContactHero'), {
  loading: () => <LoadingSpinner />
});

const ContactForm = dynamic(() => import('../../components/Contact/ContactForm'), {
  loading: () => <LoadingSpinner />
});

const ContactInfo = dynamic(() => import('../../components/Contact/ContactInfo'), {
  loading: () => <LoadingSpinner />
});

const MapSection = dynamic(() => import('../../components/Contact/MapSection'), {
  loading: () => <LoadingSpinner />
});

const TestimonialCarousel = dynamic(() => import('../../components/Home/TestimonialCarousel'), {
  loading: () => <LoadingSpinner />
});

const NewsletterSignup = dynamic(() => import('../../components/common/NewsletterSignup'), {
  loading: () => <LoadingSpinner />
});

export default function ContactPage() {
  const { user } = useUser(); // Get user from Clerk

  return (
    <main className="w-full">
      <Suspense fallback={<LoadingSpinner />}>
        {/* Full width hero */}
        <div className="w-full bg-[#F9F1E7]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <ContactHero />
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ContactInfo />
          </div>
        </div>

        {user ? (
          <>
            {/* Contact Form Section */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
              <div className="max-w-3xl mx-auto">
                <ContactForm />
              </div>
            </div>

            {/* Map Section */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <MapSection />
              </div>
            </div>
          </>
        ) : (
          <div>Please log in to access the contact form.</div>
        )}

        {/* Testimonials Section */}
        <div className="w-full bg-white">
          <div className="max-w-[1440px] mx-auto">
            <TestimonialCarousel />
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="w-full">
          <div className="max-w-[1440px] mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </Suspense>
    </main>
  );
}
