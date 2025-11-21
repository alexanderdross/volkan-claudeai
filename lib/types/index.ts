export type PartCondition = "New" | "Overhauled" | "Used";

export interface Part {
  id: string;
  name: string;
  partNumber: string;
  description: string;
  manufacturer: string;
  category: string;
  condition: PartCondition;
  compatibility: string[];
  price: number;
  currency: string;
  images: string[];
  stock: number;
  sellerId: string;
  featured?: boolean;
  createdAt: string;
}

export interface Seller {
  id: string;
  companyName: string;
  contactEmail: string;
  phone: string;
  address: string;
  certifications: string[];
  logo: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
}

export interface CartItem {
  part: Part;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface ProductFilters {
  category?: string;
  manufacturer?: string;
  condition?: PartCondition;
  minPrice?: number;
  maxPrice?: number;
  compatibility?: string;
  search?: string;
}
