import type { PaymentStatus, OrderStatus, DriverStatus, Transport } from './types';

export function formatXAF(n: number): string {
  return new Intl.NumberFormat('fr-FR').format(Math.round(n)) + ' FCFA';
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export const paymentStatusMeta: Record<PaymentStatus, { label: string; cls: string; dot: string }> = {
  paid: { label: 'Payé', cls: 'bg-sahel-100 text-sahel-700', dot: 'bg-sahel-500' },
  pending: { label: 'En cours', cls: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  failed: { label: 'Échoué', cls: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
};

export const orderStatusMeta: Record<OrderStatus, { label: string; cls: string }> = {
  pending: { label: 'En attente', cls: 'bg-amber-100 text-amber-700' },
  assigned: { label: 'Confiée au livreur', cls: 'bg-sky-100 text-sky-700' },
  delivering: { label: 'En livraison', cls: 'bg-terracotta-100 text-terracotta-700' },
  delivered: { label: 'Livrée', cls: 'bg-sahel-100 text-sahel-700' },
  cancelled: { label: 'Annulée', cls: 'bg-ink-100 text-ink-500' },
};

export const driverStatusMeta: Record<DriverStatus, { label: string; cls: string; dot: string }> = {
  available: { label: 'Disponible', cls: 'bg-sahel-100 text-sahel-700', dot: 'bg-sahel-500' },
  busy: { label: 'Occupé', cls: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  offline: { label: 'Hors service', cls: 'bg-ink-100 text-ink-500', dot: 'bg-ink-400' },
};

export const transportMeta: Record<Transport, { label: string; icon: string }> = {
  moto: { label: 'Moto', icon: 'Bike' },
  voiture: { label: 'Voiture', icon: 'Car' },
  tricycle: { label: 'Tricycle', icon: 'Truck' },
  camion: { label: 'Camion', icon: 'Truck' },
};
