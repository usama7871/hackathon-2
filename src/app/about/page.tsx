//src/app/about/page.tsx
"use client";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-[1440px] px-4 py-12 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8 text-[#FFD700]">About Us</h1>
      <p className="text-gray-300 mb-4">
        Welcome to <span className="font-bold text-[#FFD700]">Furniro</span>, your number one source for all things furniture. We're dedicated to giving you the very best of modern furniture, with a focus on quality, customer service, and uniqueness.
      </p>
      <div className="flex flex-col md:flex-row md:space-x-8 mb-8">
        <div className="md:w-1/2">
          <img src="/16.jpg" alt="About Us" className="rounded-lg shadow-lg" />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Our Journey</h2>
          <p className="text-gray-300">
            Founded in 2023, Funiro has come a long way from its beginnings. When we first started out, our passion for eco-friendly furniture drove us to do tons of research, so that Funiro can offer you the world's most advanced furniture. We now serve customers all over the world and are thrilled that we're able to turn our passion into our own website.
          </p>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
      <p className="text-gray-300 mb-4">
        At Funiro, our mission is to provide high-quality, sustainable furniture that enhances your living space while being kind to the planet. We believe in creating products that not only look good but also contribute to a better future.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
      <ul className="list-disc list-inside text-gray-300 mb-4">
        <li>🌱 Eco-friendly materials</li>
        <li>🛠️ Customizable options</li>
        <li>🚚 Fast and reliable shipping</li>
        <li>💬 Excellent customer support</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
      <p className="text-gray-300 mb-4">
        We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
      </p>
      <div className="text-center">
        <a href="/contact" className="bg-[#FFD700] text-gray-900 px-6 py-3 rounded hover:bg-[#B88E2F] transition-colors">
          Contact Us
        </a>
      </div>
    </div>
  );
}