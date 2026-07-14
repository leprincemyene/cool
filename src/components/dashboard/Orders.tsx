import { useState } from 'react';
import { Package, Send, Search, Filter, Phone, MapPin } from 'lucide-react';
import type { Order } from '../../lib/types';
import { paymentStatusMeta, orderStatusMeta, formatXAF, formatDate } from '../../lib/format';
import Badge from '../ui/Badge';

type OrdersProps = {
  orders: Order[];
  onAssign: (order: Order) => void;
};

type PayFilter = 'all' | 'paid' | 'pending' | 'failed';

export default function Orders({ orders, onAssign }: OrdersProps) {
  const [query, setQuery] = useState('');
  const [payFilter, setPayFilter] = useState<PayFilter>('all');

  const filtered = orders.filter((o) => {
    const matchesQuery = (o.id + o.customer + o.phone).toLowerCase().includes(query.toLowerCase());
    const matchesPay = payFilter === 'all' || o.paymentStatus === payFilter;
    return matchesQuery && matchesPay;
  });

  const filters: { id: PayFilter; label: string }[] = [
    { id: 'all', label: 'Tous' },
    { id: 'paid', label: 'Payé' },
    { id: 'pending', label: 'En cours' },
    { id: 'failed', label: 'Échoué' },
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-900">Commandes</h1>
          <p className="text-sm text-ink-500 mt-1">Gérez et assignez les commandes de votre boutique.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-ink-500">
          <Package className="h-4 w-4" />
          {filtered.length} commande(s)
        </div>
      </div>

      {/* Filters */}
      <div className="card p-3 mb-4 flex flex-col sm:flex-row gap-3 sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
          <input
            className="input pl-9"
            placeholder="Rechercher par ID, client, téléphone..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <Filter className="h-4 w-4 text-ink-400 shrink-0" />
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setPayFilter(f.id)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                payFilter === f.id ? 'bg-ink-900 text-white' : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop table */}
      <div className="card overflow-hidden hidden lg:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-sand-50 text-left text-xs uppercase tracking-wide text-ink-500">
                <th className="px-5 py-3 font-semibold">ID</th>
                <th className="px-5 py-3 font-semibold">Client</th>
                <th className="px-5 py-3 font-semibold">Téléphone</th>
                <th className="px-5 py-3 font-semibold text-right">Total</th>
                <th className="px-5 py-3 font-semibold">Paiement</th>
                <th className="px-5 py-3 font-semibold">Statut commande</th>
                <th className="px-5 py-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filtered.map((o) => {
                const pay = paymentStatusMeta[o.paymentStatus];
                const ord = orderStatusMeta[o.orderStatus];
                const canAssign = o.paymentStatus === 'paid' && (o.orderStatus === 'pending' || o.orderStatus === 'assigned');
                return (
                  <tr key={o.id} className="hover:bg-sand-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-xs font-semibold text-ink-700">{o.id}</span>
                      <p className="text-[11px] text-ink-400 mt-0.5">{formatDate(o.createdAt)}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand-100 text-[11px] font-bold text-sand-500">
                          {o.customer.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                        </div>
                        <span className="font-medium text-ink-800">{o.customer}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-ink-600 font-mono text-xs">{o.phone}</td>
                    <td className="px-5 py-3.5 text-right font-semibold text-ink-900">{formatXAF(o.total)}</td>
                    <td className="px-5 py-3.5"><Badge cls={pay.cls} dot={pay.dot}>{pay.label}</Badge></td>
                    <td className="px-5 py-3.5"><Badge cls={ord.cls}>{ord.label}</Badge></td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => onAssign(o)}
                        disabled={!canAssign}
                        className="btn-primary !py-1.5 !px-3 text-xs"
                      >
                        <Send className="h-3.5 w-3.5" />
                        {o.orderStatus === 'assigned' ? 'Réassigner' : 'Assigner'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="lg:hidden space-y-3">
        {filtered.map((o) => {
          const pay = paymentStatusMeta[o.paymentStatus];
          const ord = orderStatusMeta[o.orderStatus];
          const canAssign = o.paymentStatus === 'paid' && (o.orderStatus === 'pending' || o.orderStatus === 'assigned');
          return (
            <div key={o.id} className="card p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="font-mono text-xs font-semibold text-ink-700">{o.id}</span>
                  <p className="text-sm font-semibold text-ink-800 mt-1">{o.customer}</p>
                </div>
                <p className="font-semibold text-ink-900">{formatXAF(o.total)}</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-ink-500 mb-3">
                <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" /> {o.phone}</span>
                <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {o.address.split(',')[0]}</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Badge cls={pay.cls} dot={pay.dot}>{pay.label}</Badge>
                <Badge cls={ord.cls}>{ord.label}</Badge>
              </div>
              <button
                onClick={() => onAssign(o)}
                disabled={!canAssign}
                className="btn-primary w-full !py-2 text-xs"
              >
                <Send className="h-3.5 w-3.5" />
                {o.orderStatus === 'assigned' ? 'Réassigner un livreur' : 'Assigner un livreur'}
              </button>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="card p-8 text-center text-sm text-ink-400">Aucune commande trouvée.</div>
        )}
      </div>
    </div>
  );
}
