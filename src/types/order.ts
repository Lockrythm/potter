import { CartItem } from './book';

export interface CustomerInfo {
  type?: 'college' | 'outsider';
  semester?: string;
  department?: string;
  name?: string;
  phone?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerInfo: CustomerInfo;
  total: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
}
