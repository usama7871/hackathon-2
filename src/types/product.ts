export interface ProductSpecifications {
  dimensions: string;
  weight: string;
  material: string;
  color: string[];
  warranty: string;
  inStock: boolean;
  stockCount?: number;
}

export interface ProductFeatures {
  highlights: string[];
  specifications: ProductSpecifications;
  rating: number;
  reviewCount: number;
  category: string;
  tags: string[];
  brand: string;
  sku: string;
  manufacturingDate: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  images: string[];
  price: number;
  salePrice?: number;
  salePercentage?: number; // Added salePercentage
  features: ProductFeatures;
  isNew: boolean;
  isBestSeller: boolean;
  shippingInfo: {
    freeShipping: boolean;
    estimatedDays: number;
    shippingCost: number;
  };
}

// New interface for ProductDetails props
export interface ProductDetailsProps {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  salePercentage?: number;
  imageUrl: string;
  images: string[];
  features: ProductFeatures;
  colors: string[];
  ratings: number;
  isNew: boolean;
  isBestSeller: boolean;
  shippingInfo: {
    freeShipping: boolean;
    estimatedDays: number;
    shippingCost: number;
  };
  availableSizes?: string[];
  availableColors?: string[];
}
