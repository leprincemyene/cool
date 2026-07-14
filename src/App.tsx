import { useState, useMemo, useCallback } from 'react';
import { Menu, ShoppingCart } from 'lucide-react';
import Sidebar, { type Space, type DashView } from './components/Sidebar';
import Overview from './components/dashboard/Overview';
import Orders from './components/dashboard/Orders';
import Drivers from './components/dashboard/Drivers';
import AssignModal from './components/dashboard/AssignModal';
import ProductGrid from './components/store/ProductGrid';
import CartDrawer, { type CartLine, type DeliveryInfo } from './components/store/CartDrawer';
import CheckoutModal from './components/store/CheckoutModal';
import ToastStack from './components/ui/Toast';
import type { Order, Driver, DriverStatus, ToastMsg } from './lib/types';
import { PRODUCTS, INITIAL_DRIVERS, PLATFORM_DRIVERS, INITIAL_ORDERS } from './lib/mockData';

function App() {
  const [space, setSpace] = useState<Space>('dashboard');
  const [dashView, setDashView] = useState<DashView>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [shopDrivers, setShopDrivers] = useState<Driver[]>(INITIAL_DRIVERS);
  const [platformDrivers] = useState<Driver[]>(PLATFORM_DRIVERS);

  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [delivery, setDelivery] = useState<DeliveryInfo | null>(null);
  const [storeSearch, setStoreSearch] = useState('');

  const [assignOrder, setAssignOrder] = useState<Order | null>(null);
  const [assignOpen, setAssignOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  /* ---- Toasts ---- */
  const pushToast = useCallback((t: Omit<ToastMsg, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...t, id }]);
  }, []);
  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /* ---- Cart ---- */
  const cartCount = useMemo(() => Object.values(cart).reduce((s, q) => s + q, 0), [cart]);
  const cartLines: CartLine[] = useMemo(
    () => Object.entries(cart).map(([id, qty]) => ({ product: PRODUCTS.find((p) => p.id === id)!, qty })).filter((l) => l.product),
    [cart]
  );
  const cartTotal = useMemo(() => cartLines.reduce((s, l) => s + l.product.price * l.qty, 0), [cartLines]);

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    const p = PRODUCTS.find((x) => x.id === id);
    if (p) pushToast({ type: 'success', title: 'Ajouté au panier', body: p.name });
  };
  const incCart = (id: string) => setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const decCart = (id: string) => setCart((prev) => {
    const q = (prev[id] || 0) - 1;
    const next = { ...prev };
    if (q <= 0) delete next[id]; else next[id] = q;
    return next;
  });
  const removeCart = (id: string) => setCart((prev) => {
    const next = { ...prev };
    delete next[id];
    return next;
  });

  const startCheckout = (info: DeliveryInfo) => {
    setDelivery(info);
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const onPaid = () => {
    const newOrder: Order = {
      id: 'CMD-' + (1043 + orders.length),
      customer: delivery?.name || 'Client',
      phone: delivery?.phone || '',
      total: cartTotal,
      paymentStatus: 'paid',
      orderStatus: 'pending',
      items: cartLines.map((l) => ({ name: l.product.name, qty: l.qty, price: l.product.price })),
      address: delivery?.address || '',
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart({});
    setCheckoutOpen(false);
    setDelivery(null);
    pushToast({ type: 'success', title: 'Commande passée avec succès', body: `${newOrder.id} · ${newOrder.customer}` });
  };

  /* ---- Dashboard: drivers ---- */
  const addDriver = (d: Omit<Driver, 'id' | 'platform' | 'rating' | 'deliveries'>) => {
    const newDriver: Driver = {
      ...d,
      id: 'D-' + String(shopDrivers.length + 1).padStart(2, '0'),
      platform: false,
      rating: 5.0,
      deliveries: 0,
    };
    setShopDrivers((prev) => [...prev, newDriver]);
    pushToast({ type: 'success', title: 'Livreur ajouté', body: `${d.name} a rejoint votre équipe.` });
  };
  const changeDriverStatus = (id: string, status: DriverStatus) => {
    setShopDrivers((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
    const d = shopDrivers.find((x) => x.id === id);
    if (d) pushToast({ type: 'info', title: 'Statut mis à jour', body: `${d.name} est maintenant ${status === 'available' ? 'disponible' : status === 'busy' ? 'occupé' : 'hors service'}.` });
  };

  /* ---- Dashboard: assign ---- */
  const openAssign = (order: Order) => {
    setAssignOrder(order);
    setAssignOpen(true);
  };
  const confirmAssign = (orderId: string, driverId: string) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, orderStatus: 'assigned', driverId } : o)));
    const driver = [...shopDrivers, ...platformDrivers].find((d) => d.id === driverId);
    setShopDrivers((prev) => prev.map((d) => (d.id === driverId ? { ...d, status: 'busy' } : d)));
    setAssignOpen(false);
    setAssignOrder(null);
    if (driver) {
      pushToast({
        type: 'success',
        title: 'Commande assignée',
        body: `SMS envoyé à ${driver.name} (${driver.phone}). Statut: Confiée au livreur.`,
      });
    }
  };

  /* ---- Navigation helpers ---- */
  const goSpace = (s: Space) => {
    setSpace(s);
    setSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-sand-50">
      <Sidebar
        space={space}
        dashView={dashView}
        onSpace={goSpace}
        onDashView={(v) => { setDashView(v); setSidebarOpen(false); }}
        cartCount={cartCount}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 bg-white/80 backdrop-blur-md border-b border-ink-100 px-4 sm:px-6 h-16">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden btn-ghost h-9 w-9 rounded-lg p-0">
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden sm:block">
              <p className="text-xs text-ink-400">
                {space === 'dashboard' ? 'Dashboard vendeur' : 'Vitrine client'}
              </p>
              <p className="text-sm font-semibold text-ink-800">
                {space === 'dashboard'
                  ? dashView === 'overview'
                    ? "Vue d'ensemble"
                    : dashView === 'orders'
                      ? 'Gestion des commandes'
                      : 'Gestion des livreurs'
                  : 'Catalogue produits'}
              </p>
            </div>
          </div>

          {space === 'store' && (
            <button onClick={() => setCartOpen(true)} className="btn-secondary relative !py-2">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Panier</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta-500 text-[10px] font-bold text-white px-1">
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {space === 'dashboard' && (
            <>
              {dashView === 'overview' && <Overview orders={orders} onGoToOrders={() => setDashView('orders')} />}
              {dashView === 'orders' && <Orders orders={orders} onAssign={openAssign} />}
              {dashView === 'drivers' && <Drivers shopDrivers={shopDrivers} platformDrivers={platformDrivers} onAdd={addDriver} onStatusChange={changeDriverStatus} />}
            </>
          )}
          {space === 'store' && (
            <ProductGrid
              products={PRODUCTS}
              cart={cart}
              onAdd={addToCart}
              onOpenCart={() => setCartOpen(true)}
              cartCount={cartCount}
              search={storeSearch}
              onSearch={setStoreSearch}
            />
          )}
        </main>
      </div>

      {/* Modals & overlays */}
      <AssignModal
        open={assignOpen}
        onClose={() => { setAssignOpen(false); setAssignOrder(null); }}
        order={assignOrder}
        shopDrivers={shopDrivers}
        platformDrivers={platformDrivers}
        onConfirm={confirmAssign}
      />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        lines={cartLines}
        total={cartTotal}
        onInc={incCart}
        onDec={decCart}
        onRemove={removeCart}
        onCheckout={startCheckout}
      />
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        total={cartTotal}
        delivery={delivery}
        onPaid={onPaid}
      />
      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
