import { useState } from 'react';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import { Truck, Send, Check, Search, Star } from 'lucide-react';
import type { Order, Driver } from '../../lib/types';
import { driverStatusMeta, transportMeta, formatXAF, formatDate } from '../../lib/format';
import { transportIcon } from '../transportIcon';

type AssignModalProps = {
  open: boolean;
  onClose: () => void;
  order: Order | null;
  shopDrivers: Driver[];
  platformDrivers: Driver[];
  onConfirm: (orderId: string, driverId: string) => void;
};

export default function AssignModal({ open, onClose, order, shopDrivers, platformDrivers, onConfirm }: AssignModalProps) {
  const [pool, setPool] = useState<'shop' | 'platform'>('shop');
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  if (!order) return null;

  const list = (pool === 'shop' ? shopDrivers : platformDrivers).filter(
    (d) => d.status === 'available' && d.name.toLowerCase().includes(query.toLowerCase())
  );

  const reset = () => {
    setSelected(null);
    setQuery('');
    setPool('shop');
  };

  const close = () => {
    reset();
    onClose();
  };

  const confirm = () => {
    if (!selected) return;
    onConfirm(order.id, selected);
    reset();
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title="Assigner un livreur"
      subtitle={`Commande ${order.id} · ${formatXAF(order.total)}`}
      icon={<Truck className="h-5 w-5" />}
      size="lg"
      footer={
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-ink-500 flex items-center gap-1.5">
            <Send className="h-3.5 w-3.5" />
            Un SMS sera envoyé au livreur sélectionné.
          </p>
          <div className="flex gap-2">
            <button onClick={close} className="btn-secondary">Annuler</button>
            <button onClick={confirm} disabled={!selected} className="btn-primary">
              <Check className="h-4 w-4" /> Confirmer l'assignation
            </button>
          </div>
        </div>
      }
    >
      {/* Order summary */}
      <div className="rounded-xl bg-sand-50 border border-sand-100 p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-ink-800">{order.customer}</p>
          <p className="text-xs text-ink-400">{formatDate(order.createdAt)}</p>
        </div>
        <p className="text-xs text-ink-500 mb-2">📞 {order.phone}</p>
        <p className="text-xs text-ink-500">📍 {order.address}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {order.items.map((it, i) => (
            <span key={i} className="badge bg-white text-ink-600 border border-ink-200">
              {it.qty}× {it.name}
            </span>
          ))}
        </div>
      </div>

      {/* Pool toggle */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-ink-100 rounded-xl mb-4">
        <button
          onClick={() => { setPool('shop'); setSelected(null); }}
          className={`rounded-lg py-2 text-sm font-semibold transition-all ${pool === 'shop' ? 'bg-white text-ink-900 shadow-soft' : 'text-ink-500'}`}
        >
          Mes livreurs ({shopDrivers.filter((d) => d.status === 'available').length})
        </button>
        <button
          onClick={() => { setPool('platform'); setSelected(null); }}
          className={`rounded-lg py-2 text-sm font-semibold transition-all ${pool === 'platform' ? 'bg-white text-ink-900 shadow-soft' : 'text-ink-500'}`}
        >
          Livreurs plateforme ({platformDrivers.filter((d) => d.status === 'available').length})
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
        <input
          className="input pl-9"
          placeholder="Rechercher un livreur..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Driver list */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {list.length === 0 && (
          <div className="text-center py-8 text-sm text-ink-400">
            Aucun livreur disponible dans ce pool.
          </div>
        )}
        {list.map((d) => {
          const Icon = transportIcon[d.transport];
          const meta = driverStatusMeta[d.status];
          const isSel = selected === d.id;
          return (
            <button
              key={d.id}
              onClick={() => setSelected(d.id)}
              className={`w-full flex items-center gap-3 rounded-xl border-2 p-3 text-left transition-all duration-200 ${
                isSel ? 'border-terracotta-400 bg-terracotta-50' : 'border-ink-100 bg-white hover:border-terracotta-200'
              }`}
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                d.platform ? 'bg-sky-100 text-sky-700' : 'bg-terracotta-100 text-terracotta-700'
              }`}>
                {d.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-ink-800 truncate">{d.name}</p>
                  {d.platform && <span className="badge bg-sky-100 text-sky-600 text-[10px]">Plateforme</span>}
                </div>
                <p className="text-xs text-ink-400 flex items-center gap-2 mt-0.5">
                  <Icon className="h-3 w-3" /> {transportMeta[d.transport].label} · {d.zone}
                  <span className="inline-flex items-center gap-0.5 text-amber-500">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {d.rating}
                  </span>
                </p>
              </div>
              <Badge cls={meta.cls} dot={meta.dot}>{meta.label}</Badge>
              <div className={`h-5 w-5 shrink-0 rounded-full border-2 transition-all ${
                isSel ? 'border-terracotta-500 bg-terracotta-500' : 'border-ink-200'
              }`}>
                {isSel && <Check className="h-3 w-3 text-white" />}
              </div>
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
