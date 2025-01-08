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

export interface ShippingInfo {
  freeShipping: boolean;
  estimatedDays: number;
  shippingCost?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  images: string[];
  price: number;
  originalPrice?: number;
  salePrice?: number;
  salePercentage?: number;
  features: ProductFeatures;
  isNew: boolean;
  isBestSeller: boolean;
  availableSizes?: string[];
  availableColors?: string[];
  shippingInfo: ShippingInfo;
}

export interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  salePrice?: number;
  salePercentage?: number;
  viewMode?: 'grid' | 'list';
}

export interface ProductDetailsProps extends Product {
  imageUrl: string;
  colors: string[];
  ratings: number;
}

export interface QuickViewProps {
  product: Product;
  onClose: () => void;
} 