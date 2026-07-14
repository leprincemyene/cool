import { useEffect } from 'react';
import { CheckCircle2, Info, XCircle, X } from 'lucide-react';
import type { ToastMsg } from '../../lib/types';

type ToastProps = {
  toasts: ToastMsg[];
  onDismiss: (id: string) => void;
};

const iconFor = {
  success: <CheckCircle2 className="h-5 w-5 text-sahel-500" />,
  info: <Info className="h-5 w-5 text-terracotta-500" />,
  error: <XCircle className="h-5 w-5 text-red-500" />,
};

const ringFor = {
  success: 'border-l-sahel-500',
  info: 'border-l-terracotta-500',
  error: 'border-l-red-500',
};

export default function ToastStack({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2.5 w-[calc(100vw-2rem)] max-w-sm">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: ToastMsg; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const t = setTimeout(() => onDismiss(toast.id), 4500);
    return () => clearTimeout(t);
  }, [toast.id, onDismiss]);

  return (
    <div
      className={`flex items-start gap-3 rounded-xl bg-white shadow-card border border-ink-100 border-l-4 ${ringFor[toast.type]} p-3.5 animate-slide-in`}
    >
      <div className="mt-0.5 shrink-0">{iconFor[toast.type]}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-ink-800">{toast.title}</p>
        {toast.body && <p className="text-xs text-ink-500 mt-0.5">{toast.body}</p>}
      </div>
      <button onClick={() => onDismiss(toast.id)} className="text-ink-400 hover:text-ink-600 shrink-0">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
