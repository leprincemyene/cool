import { useState } from 'react';
import Modal from '../ui/Modal';
import { Smartphone, ShieldCheck, CheckCircle2, Loader2, PartyPopper, BadgeCheck } from 'lucide-react';
import type { Operator } from '../../lib/types';
import { formatXAF } from '../../lib/format';
import type { DeliveryInfo } from './CartDrawer';

type CheckoutModalProps = {
  open: boolean;
  onClose: () => void;
  total: number;
  delivery: DeliveryInfo | null;
  onPaid: () => void;
};

type Phase = 'form' | 'waiting' | 'success';

export default function CheckoutModal({ open, onClose, total, delivery, onPaid }: CheckoutModalProps) {
  const [phone, setPhone] = useState('');
  const [operator, setOperator] = useState<Operator>('airtel');
  const [phase, setPhase] = useState<Phase>('form');

  const reset = () => {
    setPhone('');
    setOperator('airtel');
    setPhase('form');
  };

  const close = () => {
    reset();
    onClose();
  };

  const pay = () => {
    if (!phone.trim()) return;
    setPhase('waiting');
    setTimeout(() => setPhase('success'), 4200);
  };

  const finish = () => {
    onPaid();
    reset();
  };

  const operators: { id: Operator; label: string; color: string }[] = [
    { id: 'airtel', label: 'Airtel Money', color: 'bg-red-500' },
    { id: 'moov', label: 'Moov Money', color: 'bg-sky-500' },
  ];

  return (
    <Modal
      open={open}
      onClose={close}
      title={phase === 'success' ? 'Paiement réussi' : phase === 'waiting' ? 'Validation en cours' : 'Paiement SingPay'}
      subtitle={phase === 'form' ? formatXAF(total) : undefined}
      icon={
        phase === 'success' ? <CheckCircle2 className="h-5 w-5" /> :
        phase === 'waiting' ? <Loader2 className="h-5 w-5 animate-spin" /> :
        <Smartphone className="h-5 w-5" />
      }
      size="sm"
      footer={
        phase === 'form' ? (
          <div className="space-y-3">
            <button onClick={pay} disabled={!phone.trim()} className="btn-primary w-full !py-3">
              <ShieldCheck className="h-4 w-4" /> Payer {formatXAF(total)}
            </button>
            <p className="text-[11px] text-ink-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="h-3 w-3" /> Transaction sécurisée par SingPay
            </p>
          </div>
        ) : phase === 'success' ? (
          <button onClick={finish} className="btn-success w-full !py-3">
            <CheckCircle2 className="h-4 w-4" /> Terminer
          </button>
        ) : undefined
      }
    >
      {/* FORM PHASE */}
      {phase === 'form' && (
        <div className="space-y-4 animate-fade-in">
          {delivery && (
            <div className="rounded-xl bg-sand-50 border border-sand-100 p-3 text-xs text-ink-600">
              <p className="font-semibold text-ink-800">{delivery.name}</p>
              <p className="mt-0.5">{delivery.phone} · {delivery.address}</p>
            </div>
          )}
          <div>
            <label className="label">Numéro Mobile Money</label>
            <input
              className="input"
              placeholder="Ex: 72 14 08 55"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="tel"
            />
          </div>
          <div>
            <label className="label">Opérateur</label>
            <div className="grid grid-cols-2 gap-2">
              {operators.map((op) => (
                <button
                  key={op.id}
                  onClick={() => setOperator(op.id)}
                  className={`flex items-center gap-2 rounded-xl border-2 p-3 text-left transition-all ${
                    operator === op.id ? 'border-terracotta-400 bg-terracotta-50' : 'border-ink-200 hover:border-terracotta-200'
                  }`}
                >
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${op.color} text-white text-xs font-bold`}>
                    {op.label[0]}
                  </span>
                  <span className="text-xs font-semibold text-ink-700">{op.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* WAITING PHASE */}
      {phase === 'waiting' && (
        <div className="flex flex-col items-center text-center py-6 animate-fade-in">
          <div className="relative mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-terracotta-50">
              <Smartphone className="h-9 w-9 text-terracotta-500" />
            </div>
            <span className="absolute inset-0 rounded-full border-2 border-terracotta-400 animate-pulse-ring" />
            <span className="absolute inset-0 rounded-full border-2 border-terracotta-400 animate-pulse-ring" style={{ animationDelay: '0.8s' }} />
          </div>
          <h3 className="font-display text-base font-bold text-ink-900">Validation USSD en attente</h3>
          <p className="text-sm text-ink-500 mt-2 max-w-xs">
            Veuillez valider la demande de paiement de <span className="font-semibold text-terracotta-600">{formatXAF(total)}</span> sur votre téléphone {operator === 'airtel' ? 'Airtel' : 'Moov'} Money.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-ink-400">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            En attente de votre confirmation...
          </div>
        </div>
      )}

      {/* SUCCESS PHASE */}
      {phase === 'success' && (
        <div className="flex flex-col items-center text-center py-6 animate-scale-in">
          <div className="relative mb-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sahel-50">
              <PartyPopper className="h-9 w-9 text-sahel-500" />
            </div>
            <BadgeCheck className="absolute -bottom-1 -right-1 h-8 w-8 text-sahel-500 bg-white rounded-full" />
          </div>
          <h3 className="font-display text-lg font-bold text-ink-900">Commande confirmée !</h3>
          <p className="text-sm text-ink-500 mt-2 max-w-xs">
            Votre paiement de {formatXAF(total)} a été reçu. Le vendeur prépare votre commande et un livreur la prendra en charge.
          </p>
          <div className="mt-4 w-full rounded-xl bg-sahel-50 border border-sahel-100 p-3 text-left">
            <div className="flex items-center justify-between text-xs">
              <span className="text-ink-500">Référence</span>
              <span className="font-mono font-semibold text-ink-800">SING-{Math.floor(Math.random() * 900000 + 100000)}</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-2">
              <span className="text-ink-500">Opérateur</span>
              <span className="font-semibold text-ink-800">{operator === 'airtel' ? 'Airtel Money' : 'Moov Money'}</span>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
