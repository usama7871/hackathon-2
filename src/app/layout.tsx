import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CompareProvider } from "@/context/CompareContext";
import CartSidebar from "@/components/Cart/CartSidebar";
import QuickOrder from "@/components/Shop/QuickOrder";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Funiro - Furniture Store",
  description: "Discover beautiful furniture for your home",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <CartProvider>
          <WishlistProvider>
            <CompareProvider>
              <div className="flex flex-col min-h-screen bg-white">
                <Header />
                <main className="flex-grow pt-[100px]">{children}
                  <Analytics/>
                </main>
                <Footer />
                <CartSidebar />
                <QuickOrder />
              </div>
            </CompareProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
    