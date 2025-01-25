"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/Pictures/Logo.png";
import Link from "next/link";
import { MdPersonOutline } from "react-icons/md";
import { useUser } from "@clerk/nextjs";
import { CiSearch } from "react-icons/ci";
import { GoHeart } from "react-icons/go";
import { AiOutlineShoppingCart, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useCompare } from "@/context/CompareContext";
import { useWishlist } from "@/context/WishlistContext";
import { Scale } from "lucide-react"; // Updated import for Scale icon

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/sign-in", label: "Sign In" },
  { href: "/sign-up", label: "Sign Up" },
];

export default function Header() {
  const { setIsCartOpen, totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items: compareItems } = useCompare();
  const { wishlistItems } = useWishlist();
  const { user } = useUser();

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full h-[100px] bg-gradient-to-r from-black/70 via-gray-800/70 to-black/70 shadow-xl backdrop-blur-md z-50">
      <div className="container mx-auto max-w-[1440px] px-4 flex items-center justify-between h-full">
        {/* Logo */}
        <Link href="/">
          <Image
            src={Logo}
            alt="Logo"
            width={120}
            height={40}
            className="hover:opacity-90 transition-opacity duration-300"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-gray-200 text-lg font-semibold hover:text-cyan-300 transition-colors duration-300 hover:underline underline-offset-4"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Icons and Menu */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <button
              className="text-gray-200 text-2xl hover:text-[#2cffce] transition-transform duration-200 hover:scale-110"
              aria-label="User Account"
            >
              {user ? (
                <img
                  src={user.imageUrl}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full border border-cyan-300"
                />
              ) : (
                <MdPersonOutline />
              )}
            </button>
          </div>
          <button
            className="text-gray-200 text-2xl hover:text-[#24bde0] transition-transform duration-200 hover:scale-110"
            aria-label="Search"
          >
            <CiSearch />
          </button>
          <Link
            href="/wishlist"
            className="relative text-gray-200 text-2xl hover:text-[#ff1b1b] transition-transform duration-200 hover:scale-110"
            aria-label="Wishlist"
          >
            <GoHeart />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <Link
            href="/compare"
            className="relative text-white text-2xl hover:text-[#B88E2F] transition-transform duration-200 hover:scale-110"
            aria-label="Compare Products"
          >
            <Scale className="w-6 h-6" />
            {compareItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#B88E2F] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {compareItems.length}
              </span>
            )}
          </Link>
          <button
            onClick={handleCartClick}
            className="relative hover:scale-110 transition-transform duration-200"
            aria-label="Shopping Cart"
          >
            <AiOutlineShoppingCart className="w-6 h-6 text-gray-200 hover:text-[#B88E2F]" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <AiOutlineClose className="w-6 h-6 text-gray-200" />
            ) : (
              <AiOutlineMenu className="w-6 h-6 text-gray-200" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-gradient-to-r from-black/80 to-gray-800/80 shadow-md backdrop-blur-md"
          >
            <nav className="container mx-auto max-w-[1440px] px-4 py-4">
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Link
                      href={link.href}
                      className="block py-2 text-gray-200 font-medium hover:text-cyan-300 transition-colors duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
