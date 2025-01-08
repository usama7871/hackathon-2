"use client";
import Image from "next/image";
import InnerPeace from "@/Pictures/inner.png";
import SideInner from "@/Pictures/Sideinner.png";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SlideSection() {
  return (
    <section className="w-full bg-[#FCF8F3] py-24">
      <div className="max-w-[1440px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-10"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Side Content */}
            <div className="flex-1 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-6 text-gray-900">
                  50+ Beautiful Rooms{" "}
                  <span className="text-[#B88E2F]">Inspiration</span>
                </h2>
                <p className="text-lg text-gray-600">
                  Our designers already created a lot of beautiful prototypes of
                  rooms that will inspire you and will give you amazing ideas for
                  your own rooms.
                </p>
              </motion.div>

              <Link href="/blog">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="group relative inline-flex items-center gap-2 px-8 py-4 
                    bg-[#B88E2F] text-white rounded-lg overflow-hidden transition-all 
                    duration-300 hover:shadow-lg hover:bg-[#A07B2A]"
                >
                  Explore More
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </Link>
            </div>

            {/* Right Side Images */}
            <div className="flex-1 flex flex-col md:flex-row gap-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-xl"
              >
                <Image
                  src={InnerPeace}
                  alt="Inner Peace Room"
                  width={400}
                  height={400}
                  className="object-cover rounded-xl transition-transform 
                    duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-xl"
              >
                <Image
                  src={SideInner}
                  alt="Side Inner Room"
                  width={400}
                  height={400}
                  className="object-cover rounded-xl transition-transform 
                    duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}