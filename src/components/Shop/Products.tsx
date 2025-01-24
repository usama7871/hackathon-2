//src/components/Shop/Products.tsx
"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/sanity";
import ProductGrid from "./ProductGrid";
import { motion } from "framer-motion";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Product } from "@/types/product";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product"] {
        _id,
        name,
        price,
        salePrice,
        description,
        "image": image.asset->url,
        "images": images[].asset->url,
        features {
          highlights,
          specifications {
            dimensions,
            weight,
            material,
            color,
            warranty,
            inStock,
            stockCount
          }
        }
      }`;

      try {
        const data = await client.fetch(query);
        // Transform the data to match your Product type
        const transformedData = data.map((item: any) => ({
          id: item._id,
          name: item.name,
          price: item.price,
          salePrice: item.salePrice,
          description: item.description,
          image: item.image,
          images: item.images || [],
          features: item.features,
          isNew: false, // Set default values for missing fields
          isBestSeller: false,
          shippingInfo: {
            freeShipping: true,
            estimatedDays: 3,
            shippingCost: 0
          }
        }));
        setProducts(transformedData);
        setFilteredProducts(transformedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="relative">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B88E2F]"></div>
        </div>
      ) : (
        <ProductGrid data={filteredProducts} />
      )}
    </div>
  );
}