"use client";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/Shop/ProductCard";

export default function WishlistPage() {
  const { wishlistItems } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty. Start adding some products!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistItems.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              image={item.image}
              price={item.price}
            //   salePrice={item.salePrice}
            //   salePercentage={item.salePercentage}
              images={[]} // Default value
              features={{
                highlights: [],
                specifications: {
                  dimensions: '',
                  weight: '',
                  material: '',
                  color: [],
                  warranty: '',
                  inStock: false
                },
                rating: 0,
                reviewCount: 0,
                category: '',
                tags: [],
                brand: '',
                sku: '',
                manufacturingDate: ''
              }} // Default value
              isNew={false} // Default value
              isBestSeller={false} // Default value
              shippingInfo={{ freeShipping: false, estimatedDays: 0, shippingCost: 0 }} // Default value
            />
          ))}
        </div>
      )}
    </div>
  );
}