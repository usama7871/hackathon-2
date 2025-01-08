export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  features?: any; // Adjust this type as necessary
  description?: string;
} 