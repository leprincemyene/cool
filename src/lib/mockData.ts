import type { Product, Driver, Order } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'P-01',
    name: 'Tissu Wax Premium 6 yards',
    vendor: 'Boutique Sahel Mode',
    price: 18500,
    image: 'https://images.pexels.com/photos/5989395/pexels-photo-5989395.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Mode',
    rating: 4.8,
    stock: 24,
  },
  {
    id: 'P-02',
    name: 'Panier artisanal tressé',
    vendor: 'Artisanat de Bangui',
    price: 7500,
    image: 'https://images.pexels.com/photos/4207791/pexels-photo-4207791.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Artisanat',
    rating: 4.9,
    stock: 12,
  },
  {
    id: 'P-03',
    name: "Huile de palme bio 1L",
    vendor: 'Coopérative Agricole',
    price: 3200,
    image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=600',
    category: 'Alimentation',
    rating: 4.6,
    stock: 80,
  },
  {
    id: 'P-04',
    name: 'Sandales cuir faites main',
    vendor: 'Cuir du Centrafrique',
    price: 12000,
    image: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Mode',
    rating: 4.7,
    stock: 18,
  },
  {
    id: 'P-05',
    name: 'Café Arabica torréfié 500g',
    vendor: 'Plantation Hauts-Plateaux',
    price: 5800,
    image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Alimentation',
    rating: 4.9,
    stock: 45,
  },
  {
    id: 'P-06',
    name: 'Sac à main en pagne',
    vendor: 'Boutique Sahel Mode',
    price: 9500,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Accessoires',
    rating: 4.5,
    stock: 30,
  },
  {
    id: 'P-07',
    name: 'Savon noir africain (lot de 3)',
    vendor: 'Beauté Naturelle',
    price: 4500,
    image: 'https://images.pexels.com/photos/4202379/pexels-photo-4202379.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Beauté',
    rating: 4.8,
    stock: 60,
  },
  {
    id: 'P-08',
    name: 'Lampe solaire LED',
    vendor: 'SolarTech Afrique',
    price: 14000,
    image: 'https://images.pexels.com/photos/5077050/pexels-photo-5077050.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Maison',
    rating: 4.4,
    stock: 22,
  },
];

export const INITIAL_DRIVERS: Driver[] = [
  { id: 'D-01', name: 'Abdoul Karim', phone: '+236 72 14 08 55', zone: 'Centre-ville', transport: 'moto', status: 'available', platform: false, rating: 4.7, deliveries: 128 },
  { id: 'D-02', name: 'Mariam Ngoss', phone: '+236 75 33 21 90', zone: 'Lakouanga', transport: 'tricycle', status: 'busy', platform: false, rating: 4.5, deliveries: 87 },
  { id: 'D-03', name: 'Patrick Ngbangou', phone: '+236 70 99 45 12', zone: 'Bimbo', transport: 'moto', status: 'available', platform: false, rating: 4.9, deliveries: 210 },
  { id: 'D-04', name: 'Grace Yangba', phone: '+236 77 08 17 23', zone: 'Gobongo', transport: 'voiture', status: 'offline', platform: false, rating: 4.6, deliveries: 64 },
];

export const PLATFORM_DRIVERS: Driver[] = [
  { id: 'PL-01', name: 'Idriss Saleh', phone: '+236 72 50 61 04', zone: 'Centre-ville / PK5', transport: 'moto', status: 'available', platform: true, rating: 4.8, deliveries: 340 },
  { id: 'PL-02', name: 'Furaha Mbi', phone: '+236 75 19 28 37', zone: 'Kilomètre 5', transport: 'tricycle', status: 'available', platform: true, rating: 4.7, deliveries: 256 },
  { id: 'PL-03', name: 'Ousmane Dahya', phone: '+236 70 44 52 19', zone: 'Combattants', transport: 'voiture', status: 'busy', platform: true, rating: 4.6, deliveries: 198 },
  { id: 'PL-04', name: 'Brigitte Kpangba', phone: '+236 77 31 77 88', zone: 'Boy-Rabe', transport: 'moto', status: 'available', platform: true, rating: 4.9, deliveries: 412 },
];

const items1 = [
  { name: 'Tissu Wax Premium 6 yards', qty: 1, price: 18500 },
  { name: 'Sac à main en pagne', qty: 1, price: 9500 },
];
const items2 = [
  { name: 'Café Arabica torréfié 500g', qty: 2, price: 5800 },
];
const items3 = [
  { name: 'Lampe solaire LED', qty: 1, price: 14000 },
  { name: 'Savon noir africain (lot de 3)', qty: 1, price: 4500 },
];
const items4 = [
  { name: 'Sandales cuir faites main', qty: 1, price: 12000 },
];
const items5 = [
  { name: 'Panier artisanal tressé', qty: 2, price: 7500 },
  { name: "Huile de palme bio 1L", qty: 1, price: 3200 },
];

export const INITIAL_ORDERS: Order[] = [
  { id: 'CMD-1042', customer: 'Jean-Bedel Bokassa', phone: '+236 72 11 22 33', total: 28000, paymentStatus: 'paid', orderStatus: 'pending', items: items1, address: 'Quartier K-Cinq, rue 12, porte bleue', createdAt: '2026-07-14T09:15:00', driverId: undefined },
  { id: 'CMD-1041', customer: 'Naïssa Ibrahim', phone: '+236 75 44 55 66', total: 11600, paymentStatus: 'paid', orderStatus: 'assigned', items: items2, address: 'Lakouanga, près de la mosquée centrale', createdAt: '2026-07-14T08:30:00', driverId: 'D-02' },
  { id: 'CMD-1040', customer: 'Olivier Yang-Mbi', phone: '+236 70 77 88 99', total: 18500, paymentStatus: 'pending', orderStatus: 'pending', items: items3, address: 'Gobongo, carrefour Téranga', createdAt: '2026-07-14T07:45:00', driverId: undefined },
  { id: 'CMD-1039', customer: 'Sylvie Mbaïdou', phone: '+236 77 00 11 22', total: 12000, paymentStatus: 'paid', orderStatus: 'delivered', items: items4, address: "Centre-ville, avenue de l'Indépendance", createdAt: '2026-07-13T17:20:00', driverId: 'D-01' },
  { id: 'CMD-1038', customer: 'Adamou Saleh', phone: '+236 72 33 44 55', total: 18200, paymentStatus: 'failed', orderStatus: 'pending', items: items5, address: 'Boy-Rabe, mission catholique', createdAt: '2026-07-13T15:10:00', driverId: undefined },
];
