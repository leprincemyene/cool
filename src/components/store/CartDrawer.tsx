import { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingCart, ArrowRight, Phone, MapPin, User } from 'lucide-react';
import type { Product } from '../../lib/types';
import { formatXAF } from '../../lib/format';

export type CartLine = { product: Product; qty: number };
export type DeliveryInfo = { name: string; phone: string; address: string };

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
  lines: CartLine[];
  total: number;
  onInc: (id: string) => void;
  onDec: (id: string) => void;
  onRemove: (id: string) => void;
  onCheckout: (info: DeliveryInfo) => void;
};

export default function CartDrawer({ open, onClose, lines, total, onInc, onDec, onRemove, onCheckout }: CartDrawerProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  if (!open) return null;

  const canCheckout = lines.length > 0 && name.trim() && phone.trim() && address.trim();

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative w-full max-w-md bg-sand-50 h-full flex flex-col animate-slide-in shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-white border-b border-ink-100">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-terracotta-500" />
            <h2 className="font-display text-lg font-bold text-ink-900">Mon panier</h2>
            <span className="badge bg-terracotta-100 text-terracotta-700">{lines.length}</span>
          </div>
          <button onClick={onClose} className="btn-ghost h-9 w-9 rounded-lg p-0">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Lines */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {lines.length === 0 && (
            <div className="text-center py-16 text-ink-400">
              <ShoppingCart className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">Votre panier est vide.</p>
            </div>
          )}
          {lines.map(({ product, qty }) => (
            <div key={product.id} className="card p-3 flex gap-3">
              <img src={product.image} alt={product.name} className="h-16 w-16 rounded-lg object-cover bg-sand-100 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ink-800 line-clamp-1">{product.name}</p>
                <p className="text-xs text-ink-400">{product.vendor}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => onDec(product.id)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink-100 hover:bg-ink-200 text-ink-600">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-sm font-semibold w-6 text-center">{qty}</span>
                    <button onClick={() => onInc(product.id)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-terracotta-100 hover:bg-terracotta-200 text-terracotta-600">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="text-sm font-bold text-terracotta-600">{formatXAF(product.price * qty)}</p>
                </div>
              </div>
              <button onClick={() => onRemove(product.id)} className="text-ink-300 hover:text-red-500 shrink-0 self-start">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          {/* Delivery form */}
          {lines.length > 0 && (
            <div className="card p-4 mt-4">
              <h3 className="font-display text-sm font-bold text-ink-900 mb-3">Informations de livraison</h3>
              <div className="space-y-3">
                <div>
                  <label className="label">Nom complet</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                    <input className="input pl-9" placeholder="Votre nom" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="label">Téléphone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                    <input className="input pl-9" placeholder="+236 7X XX XX XX" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="label">Adresse de livraison</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                    <input className="input pl-9" placeholder="Quartier, rue, repère..." value={address} onChange={(e) => setAddress(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && (
          <div className="p-4 bg-white border-t border-ink-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink-500">Total à payer</span>
              <span className="font-display text-xl font-bold text-ink-900">{formatXAF(total)}</span>
            </div>
            <button
              onClick={() => canCheckout && onCheckout({ name, phone, address })}
              disabled={!canCheckout}
              className="btn-primary w-full !py-3"
            >
              Payer avec SingPay <ArrowRight className="h-4 w-4" />
            </button>
            {!canCheckout && lines.length > 0 && (
              <p className="text-xs text-ink-400 text-center">Remplissez le formulaire de livraison pour continuer.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
