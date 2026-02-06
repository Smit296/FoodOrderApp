// Type definitions for the Order Management System

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem {
  menuItemId: string;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  address: string;
  phone: string;
}

export enum OrderStatus {
  RECEIVED = 'RECEIVED',
  PREPARING = 'PREPARING',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED'
}

export interface Order {
  id: string;
  items: CartItem[];
  customerInfo: CustomerInfo;
  status: OrderStatus;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}
