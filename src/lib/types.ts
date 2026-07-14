export type PaymentStatus = 'paid' | 'pending' | 'failed';
export type OrderStatus = 'pending' | 'assigned' | 'delivering' | 'delivered' | 'cancelled';
export type DriverStatus = 'available' | 'busy' | 'offline';
export type Transport = 'moto' | 'voiture' | 'tricycle' | 'camion';

export type Driver = {
  id: string;
  name: string;
  phone: string;
  zone: string;
  transport: Transport;
  status: DriverStatus;
  platform: boolean;
  rating: number;
  deliveries: number;
};

export type Order = {
  id: string;
  customer: string;
  phone: string;
  total: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  items: { name: string; qty: number; price: number }[];
  address: string;
  createdAt: string;
  driverId?: string;
};

export type Product = {
  id: string;
  name: string;
  vendor: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  stock: number;
};

export type Operator = 'airtel' | 'moov';

export type ToastMsg = {
  id: string;
  title: string;
  body?: string;
  type: 'success' | 'info' | 'error';
};
