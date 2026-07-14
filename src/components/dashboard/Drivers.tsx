import { useState } from 'react';
import { Bike, UserPlus, Star, Users, Building2, Phone, MapPin } from 'lucide-react';
import type { Driver, DriverStatus, Transport } from '../../lib/types';
import { driverStatusMeta, transportMeta } from '../../lib/format';
import Badge from '../ui/Badge';
import { transportIcon } from '../transportIcon';

type DriversProps = {
  shopDrivers: Driver[];
  platformDrivers: Driver[];
  onAdd: (d: Omit<Driver, 'id' | 'platform' | 'rating' | 'deliveries'>) => void;
  onStatusChange: (id: string, status: DriverStatus) => void;
};

const transports: { id: Transport; label: string }[] = [
  { id: 'moto', label: 'Moto' },
  { id: 'tricycle', label: 'Tricycle' },
  { id: 'voiture', label: 'Voiture' },
  { id: 'camion', label: 'Camion' },
];

const statusOrder: DriverStatus[] = ['available', 'busy', 'offline'];

const emptyForm = { name: '', phone: '', zone: '', transport: 'moto' as Transport, status: 'available' as DriverStatus };

export default function Drivers({ shopDrivers, platformDrivers, onAdd, onStatusChange }: DriversProps) {
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const submit = () => {
    if (!form.name || !form.phone) return;
    onAdd(form);
    setForm(emptyForm);
    setShowForm(false);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-900">Livreurs</h1>
          <p className="text-sm text-ink-500 mt-1">Gérez votre équipe et les livreurs de la plateforme.</p>
        </div>
        <button onClick={() => setShowForm((s) => !s)} className="btn-primary">
          <UserPlus className="h-4 w-4" />
          {showForm ? 'Fermer le formulaire' : 'Ajouter un livreur'}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="card p-5 mb-5 animate-scale-in">
          <h2 className="font-display text-base font-bold text-ink-900 mb-4 flex items-center gap-2">
            <Bike className="h-4 w-4 text-terracotta-500" /> Nouveau livreur
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Nom complet</label>
              <input className="input" placeholder="Ex: Aboubakar Saleh" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="label">Téléphone</label>
              <input className="input" placeholder="+236 7X XX XX XX" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label className="label">Zone de couverture</label>
              <input className="input" placeholder="Ex: Centre-ville, PK5" value={form.zone}
                onChange={(e) => setForm({ ...form, zone: e.target.value })} />
            </div>
            <div>
              <label className="label">Moyen de transport</label>
              <div className="grid grid-cols-2 gap-2">
                {transports.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setForm({ ...form, transport: t.id })}
                    className={`rounded-lg border-2 px-3 py-2 text-xs font-semibold transition-all ${
                      form.transport === t.id ? 'border-terracotta-400 bg-terracotta-50 text-terracotta-700' : 'border-ink-200 text-ink-500 hover:border-terracotta-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="label">Statut de disponibilité</label>
              <div className="grid grid-cols-3 gap-2">
                {statusOrder.map((s) => {
                  const meta = driverStatusMeta[s];
                  return (
                    <button
                      key={s}
                      onClick={() => setForm({ ...form, status: s })}
                      className={`flex items-center justify-center gap-1.5 rounded-lg border-2 px-3 py-2 text-xs font-semibold transition-all ${
                        form.status === s ? 'border-terracotta-400 bg-terracotta-50' : 'border-ink-200 text-ink-500 hover:border-terracotta-200'
                      }`}
                    >
                      <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
                      {meta.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-5">
            <button onClick={() => { setShowForm(false); setForm(emptyForm); }} className="btn-secondary">Annuler</button>
            <button onClick={submit} disabled={!form.name || !form.phone} className="btn-primary">
              <UserPlus className="h-4 w-4" /> Enregistrer le livreur
            </button>
          </div>
        </div>
      )}

      {/* Shop drivers */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Building2 className="h-4 w-4 text-terracotta-500" />
          <h2 className="font-display text-base font-bold text-ink-900">Mes livreurs</h2>
          <span className="badge bg-terracotta-100 text-terracotta-700">{shopDrivers.length}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {shopDrivers.map((d) => (
            <DriverCard key={d.id} driver={d} editable onStatusChange={onStatusChange} />
          ))}
          {shopDrivers.length === 0 && (
            <div className="card p-6 text-center text-sm text-ink-400 md:col-span-2">
              Aucun livreur dans votre équipe. Ajoutez-en un ci-dessus.
            </div>
          )}
        </div>
      </div>

      {/* Platform drivers */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-4 w-4 text-sky-500" />
          <h2 className="font-display text-base font-bold text-ink-900">Livreurs plateforme</h2>
          <span className="badge bg-sky-100 text-sky-700">{platformDrivers.length}</span>
          <span className="text-xs text-ink-400 ml-1">Pool partagé — disponibles à l'assignation</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {platformDrivers.map((d) => (
            <DriverCard key={d.id} driver={d} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DriverCard({
  driver,
  editable,
  onStatusChange,
}: {
  driver: Driver;
  editable?: boolean;
  onStatusChange?: (id: string, status: DriverStatus) => void;
}) {
  const Icon = transportIcon[driver.transport];
  const meta = driverStatusMeta[driver.status];
  return (
    <div className="card p-4 hover:shadow-soft transition-shadow duration-300">
      <div className="flex items-start gap-3">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
          driver.platform ? 'bg-sky-100 text-sky-700' : 'bg-terracotta-100 text-terracotta-700'
        }`}>
          {driver.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-ink-800">{driver.name}</p>
            {driver.platform && <span className="badge bg-sky-100 text-sky-600 text-[10px]">Plateforme</span>}
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-ink-500">
            <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" /> {driver.phone}</span>
            <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {driver.zone}</span>
          </div>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-ink-400">
            <span className="inline-flex items-center gap-1"><Icon className="h-3 w-3" /> {transportMeta[driver.transport].label}</span>
            <span className="inline-flex items-center gap-0.5 text-amber-500"><Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {driver.rating}</span>
            <span>{driver.deliveries} livraisons</span>
          </div>
        </div>
        <Badge cls={meta.cls} dot={meta.dot}>{meta.label}</Badge>
      </div>

      {editable && onStatusChange && (
        <div className="mt-3 pt-3 border-t border-ink-100">
          <p className="text-[10px] uppercase tracking-wide text-ink-400 font-semibold mb-2">Changer le statut</p>
          <div className="grid grid-cols-3 gap-1.5">
            {statusOrder.map((s) => {
              const m = driverStatusMeta[s];
              const active = driver.status === s;
              return (
                <button
                  key={s}
                  onClick={() => onStatusChange(driver.id, s)}
                  className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-[11px] font-semibold transition-all ${
                    active ? m.cls : 'bg-ink-100 text-ink-500 hover:bg-ink-200'
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} />
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
