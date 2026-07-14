import { Store, ShoppingCart, LayoutDashboard, Package, Bike, X, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Space = 'dashboard' | 'store';
export type DashView = 'overview' | 'orders' | 'drivers';

type SidebarProps = {
  space: Space;
  dashView: DashView;
  onSpace: (s: Space) => void;
  onDashView: (v: DashView) => void;
  cartCount: number;
  open: boolean;
  onClose: () => void;
};

type NavItem = { id: DashView; label: string; icon: LucideIcon; badge?: number };

const dashNav: NavItem[] = [
  { id: 'overview', label: "Vue d'ensemble", icon: LayoutDashboard },
  { id: 'orders', label: 'Commandes', icon: Package },
  { id: 'drivers', label: 'Livreurs', icon: Bike },
];

export default function Sidebar({ space, dashView, onSpace, onDashView, cartCount, open, onClose }: SidebarProps) {
  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-ink-900/40 backdrop-blur-sm lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed lg:sticky top-0 z-40 lg:z-10 h-screen w-72 shrink-0 bg-ink-900 text-white flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between gap-2 px-5 h-16 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-terracotta-500 shadow-glow">
              <Sparkles className="h-5 w-5 text-white" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-sahel-400 ring-2 ring-ink-900" />
            </div>
            <div className="leading-tight">
              <p className="font-display text-base font-bold tracking-tight">SingMarket</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-ink-300">Marketplace · RCA</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-ink-300 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Space switcher */}
        <div className="p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400 mb-2 px-1">Espaces</p>
          <div className="grid grid-cols-2 gap-2 bg-white/5 p-1 rounded-xl">
            <SpaceButton
              active={space === 'dashboard'}
              onClick={() => onSpace('dashboard')}
              icon={Store}
              label="Vendeur"
            />
            <SpaceButton
              active={space === 'store'}
              onClick={() => onSpace('store')}
              icon={ShoppingCart}
              label="Vitrine"
              badge={cartCount}
            />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4 no-scrollbar">
          {space === 'dashboard' && (
            <div className="animate-fade-in">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400 mb-2 px-3">Dashboard vendeur</p>
              {dashNav.map((item) => {
                const Icon = item.icon;
                const active = dashView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onDashView(item.id)}
                    className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'bg-terracotta-500 text-white shadow-soft'
                        : 'text-ink-200 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          )}

          {space === 'store' && (
            <div className="animate-fade-in">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400 mb-2 px-3">Vitrine client</p>
              <div className="rounded-xl bg-white/5 p-4 text-sm text-ink-200 leading-relaxed">
                <p className="font-semibold text-white mb-1">Mode acheteur</p>
                <p className="text-xs text-ink-300">Parcourez le catalogue, ajoutez au panier et payez via SingPay Mobile Money.</p>
              </div>
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sahel-500 text-white text-sm font-bold">
              BM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Boutique Sahel</p>
              <p className="text-xs text-ink-300 truncate">Vendeur · Bangui</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function SpaceButton({
  active,
  onClick,
  icon: Icon,
  label,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  icon: LucideIcon;
  label: string;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center gap-1.5 rounded-lg py-2.5 text-xs font-semibold transition-all duration-200 ${
        active ? 'bg-white text-ink-900 shadow-soft' : 'text-ink-300 hover:text-white'
      }`}
    >
      <Icon className="h-5 w-5" />
      {label}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta-500 text-[10px] font-bold text-white px-1 ring-2 ring-ink-900">
          {badge}
        </span>
      )}
    </button>
  );
}
