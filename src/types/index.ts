// src/types/index.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  salePercentage?: number;
  image: string;
  description: string;
  category?: string;
  inStock?: boolean;
  rating?: number;
  sizes?: string[];
  materials?: string[];
  additionalImages?: string[];
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}