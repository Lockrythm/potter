export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  createdAt: Date;
}

export interface ProductCartItem {
  product: Product;
  quantity: number;
}

export const productCategories = [
  'Stationery',
  'Lab Equipment',
  'Uniforms',
  'Calculators',
  'Electronics',
  'Art Supplies',
  'Sports',
  'Accessories',
] as const;
