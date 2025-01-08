"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  productImage: string;
  productName: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Interior Designer",
    avatar: "/13.jpg",
    rating: 5,
    text: "The quality of furniture exceeded my expectations. The attention to detail and craftsmanship is outstanding. My clients are always impressed with the pieces I select from this collection.",
    productImage: "/1.jpg",
    productName: "Modern Sofa Set",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Home Owner",
    avatar: "/15.jpg",
    rating: 5,
    text: "Transformed our living space completely. The furniture not only looks stunning but is incredibly comfortable. The customer service was exceptional throughout the entire process.",
    productImage: "/2.jpg",
    productName: "Dining Collection",
  },
  {
    id: "3",
    name: "Emma Davis",
    role: "Architect",
    avatar: "/17.jpg",
    rating: 5,
    text: "As an architect, I appreciate the perfect blend of form and function. These pieces are both beautiful and practical. The quality is evident in every detail, from the materials to the finish.",
    productImage: "/3.jpg",
    productName: "Bedroom Suite",
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, currentIndex]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setIsAutoPlaying(false);
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  };

  return (
    <section className="max-w-[1440px] mx-auto px-4 py-16 relative overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Real experiences from our valued customers who have transformed their spaces with our
          furniture.
        </p>
      </motion.div>

      {/* Testimonial Slider */}
      <div className="relative h-[500px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute w-full"
          >
            <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="relative h-[300px] rounded-xl overflow-hidden group">
                  <Image
                    src={testimonials[currentIndex].productImage}
                    alt={testimonials[currentIndex].productName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-medium">{testimonials[currentIndex].productName}</p>
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="flex flex-col justify-between">
                  <div>
                    <Quote className="w-12 h-12 text-[#B88E2F] opacity-20 mb-6" />
                    <p className="text-xl text-gray-700 mb-8 italic leading-relaxed">
                      "{testimonials[currentIndex].text}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={testimonials[currentIndex].avatar}
                        alt={testimonials[currentIndex].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                      <div className="flex gap-1 mt-2">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-[#B88E2F]" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full 
          bg-white shadow-lg flex items-center justify-center text-gray-600 
          hover:text-[#B88E2F] hover:bg-gray-50 transition-colors z-10"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full 
          bg-white shadow-lg flex items-center justify-center text-gray-600 
          hover:text-[#B88E2F] hover:bg-gray-50 transition-colors z-10"
          onClick={() => paginate(1)}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-8 bg-[#B88E2F]" : "bg-gray-300"
            }`}
            onClick={() => {
              setIsAutoPlaying(false);
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </section>
  );
}