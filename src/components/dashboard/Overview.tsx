import { TrendingUp, Clock, Truck, CheckCircle2, ArrowUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Order } from '../../lib/types';
import { formatXAF } from '../../lib/format';

type OverviewProps = {
  orders: Order[];
  onGoToOrders: () => void;
};

export default function Overview({ orders, onGoToOrders }: OverviewProps) {
  const revenue = orders.filter((o) => o.paymentStatus === 'paid').reduce((s, o) => s + o.total, 0);
  const pendingOrders = orders.filter((o) => o.orderStatus === 'pending' && o.paymentStatus === 'paid').length;
  const delivering = orders.filter((o) => o.orderStatus === 'assigned' || o.orderStatus === 'delivering').length;
  const paidTx = orders.filter((o) => o.paymentStatus === 'paid').length;

  const cards: { label: string; value: string; icon: LucideIcon; tint: string; ring: string; sub: string }[] = [
    { label: "Chiffre d'affaires", value: formatXAF(revenue), icon: TrendingUp, tint: 'text-sahel-600 bg-sahel-50', ring: 'from-sahel-400/0 to-sahel-400/0', sub: '+12% ce mois' },
    { label: 'Commandes en attente', value: String(pendingOrders), icon: Clock, tint: 'text-amber-600 bg-amber-50', ring: 'from-amber-400/0 to-amber-400/0', sub: 'À traiter rapidement' },
    { label: 'Livraisons en cours', value: String(delivering), icon: Truck, tint: 'text-terracotta-600 bg-terracotta-50', ring: 'from-terracotta-400/0 to-terracotta-400/0', sub: 'En route vers les clients' },
    { label: 'Transactions SingPay', value: String(paidTx), icon: CheckCircle2, tint: 'text-sky-600 bg-sky-50', ring: 'from-sky-400/0 to-sky-400/0', sub: 'Paiements aboutis' },
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-900">Vue d'ensemble</h1>
          <p className="text-sm text-ink-500 mt-1">Bonjour Boutique Sahel — voici l'activité de votre journée.</p>
        </div>
        <button onClick={onGoToOrders} className="btn-secondary">
          Voir les commandes <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              className="card p-5 animate-scale-in hover:shadow-soft transition-shadow duration-300"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.tint}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="text-sm text-ink-500 mt-4">{c.label}</p>
              <p className="font-display text-2xl font-bold text-ink-900 mt-1 tracking-tight">{c.value}</p>
              <p className="text-xs text-ink-400 mt-2 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-sahel-400" />
                {c.sub}
              </p>
            </div>
          );
        })}
      </div>

      {/* Activity feed */}
      <div className="mt-6 card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-base font-bold text-ink-900">Activité récente</h2>
          <span className="text-xs text-ink-400">5 dernières commandes</span>
        </div>
        <div className="space-y-3">
          {orders.slice(0, 5).map((o) => (
            <div key={o.id} className="flex items-center gap-3 py-2.5 border-b border-ink-100 last:border-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sand-100 text-xs font-bold text-sand-500">
                {o.customer.split(' ').map((w) => w[0]).slice(0, 2).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink-800 truncate">{o.customer}</p>
                <p className="text-xs text-ink-400">{o.id} · {o.items.length} article(s)</p>
              </div>
              <p className="text-sm font-semibold text-ink-900 shrink-0">{formatXAF(o.total)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
