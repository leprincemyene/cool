import { ShoppingCart, Plus, Star, Search, Sparkles, Truck, ShieldCheck } from 'lucide-react';
import type { Product } from '../../lib/types';
import { formatXAF } from '../../lib/format';

type StoreProps = {
  products: Product[];
  cart: Record<string, number>;
  onAdd: (id: string) => void;
  onOpenCart: () => void;
  cartCount: number;
  search: string;
  onSearch: (s: string) => void;
};

export default function ProductGrid({ products, cart, onAdd, onOpenCart, cartCount, search, onSearch }: StoreProps) {
  const visible = products.filter((p) => (p.name + p.category + p.vendor).toLowerCase().includes(search.toLowerCase()));
  const categories = ['Tous', ...Array.from(new Set(products.map((p) => p.category)))];

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-terracotta-500 via-terracotta-600 to-ink-800 text-white p-6 sm:p-10 mb-6">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.2) 0, transparent 35%)',
        }} />
        <div className="relative max-w-xl">
          <span className="badge bg-white/15 text-white backdrop-blur-sm mb-3">
            <Sparkles className="h-3 w-3" /> Marketplace de Bangui
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
            L'artisanat et les produits locaux, livrés chez vous.
          </h1>
          <p className="text-white/80 mt-3 text-sm sm:text-base">
            Payez avec SingPay Mobile Money — livraison rapide dans toute la ville.
          </p>
          <div className="flex flex-wrap gap-4 mt-5 text-xs text-white/90">
            <span className="inline-flex items-center gap-1.5"><Truck className="h-4 w-4" /> Livraison en 24h</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4" /> Paiement sécurisé SingPay</span>
          </div>
        </div>
      </div>

      {/* Search + categories */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
          <input
            className="input pl-9"
            placeholder="Rechercher un produit, une boutique..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => onSearch(c === 'Tous' ? '' : c)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                (c === 'Tous' && !search) || search === c ? 'bg-ink-900 text-white' : 'bg-white text-ink-600 border border-ink-200 hover:border-terracotta-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {visible.map((p) => {
          const qty = cart[p.id] || 0;
          return (
            <div key={p.id} className="card overflow-hidden group hover:shadow-soft transition-all duration-300 hover:-translate-y-0.5">
              <div className="relative aspect-square overflow-hidden bg-sand-100">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {qty > 0 && (
                  <span className="absolute top-2 right-2 badge bg-terracotta-500 text-white shadow-soft">
                    {qty} dans le panier
                  </span>
                )}
                <span className="absolute top-2 left-2 badge bg-white/90 text-ink-700 backdrop-blur-sm">
                  {p.category}
                </span>
              </div>
              <div className="p-3.5">
                <p className="text-[11px] text-ink-400 truncate">{p.vendor}</p>
                <h3 className="text-sm font-semibold text-ink-800 leading-snug mt-0.5 line-clamp-2 min-h-[2.5rem]">{p.name}</h3>
                <div className="flex items-center gap-1 mt-1 text-xs text-ink-400">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {p.rating} · {p.stock} en stock
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="font-display text-base font-bold text-terracotta-600">{formatXAF(p.price)}</p>
                  <button
                    onClick={() => onAdd(p.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-terracotta-500 text-white hover:bg-terracotta-600 active:scale-95 transition-all shadow-soft"
                    aria-label={`Ajouter ${p.name} au panier`}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {visible.length === 0 && (
        <div className="card p-10 text-center text-ink-400 mt-4">Aucun produit ne correspond à votre recherche.</div>
      )}

      {/* Floating cart button (mobile) */}
      {cartCount > 0 && (
        <button
          onClick={onOpenCart}
          className="lg:hidden fixed bottom-4 right-4 z-30 flex items-center gap-2 rounded-full bg-terracotta-500 text-white px-5 py-3 shadow-card animate-scale-in"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="text-sm font-semibold">{cartCount}</span>
        </button>
      )}
    </div>
  );
}
