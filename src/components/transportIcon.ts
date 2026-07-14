import { Bike, Car, Truck } from 'lucide-react';
import type { Transport } from '../lib/types';
import type { LucideIcon } from 'lucide-react';

export const transportIcon: Record<Transport, LucideIcon> = {
  moto: Bike,
  voiture: Car,
  tricycle: Truck,
  camion: Truck,
};
