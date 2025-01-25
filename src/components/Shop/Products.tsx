"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/sanity"; // Importing the Sanity client
import ProductGrid from "./ProductGrid";
import { Product } from "@/types/product"; // Importing the Product type

interface ProductsProps {
  products: Product[];
}

export default function Products({ products }: ProductsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filter, setFilter] = useState("");

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
        setFilteredProducts(transformedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilter(value);
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="relative">
      <input 
        type="text" 
        placeholder="Filter by name" 
        value={filter} 
        onChange={handleFilterChange} 
        className="border p-2 mb-4"
      />
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
