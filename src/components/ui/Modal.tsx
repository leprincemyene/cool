import { type ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
};

export default function Modal({ open, onClose, title, subtitle, icon, children, footer, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const maxW = size === 'sm' ? 'max-w-sm' : size === 'lg' ? 'max-w-3xl' : 'max-w-lg';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${maxW} bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl animate-scale-in max-h-[92vh] flex flex-col`}
      >
        <div className="flex items-start justify-between gap-4 p-5 border-b border-ink-100">
          <div className="flex items-start gap-3">
            {icon && (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-terracotta-50 text-terracotta-500">
                {icon}
              </div>
            )}
            <div>
              <h3 className="font-display text-lg font-bold text-ink-900 leading-tight">{title}</h3>
              {subtitle && <p className="text-sm text-ink-500 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          <button onClick={onClose} className="btn-ghost h-9 w-9 rounded-lg p-0 -mr-1 -mt-1" aria-label="Fermer">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5 overflow-y-auto">{children}</div>
        {footer && <div className="p-5 border-t border-ink-100 bg-sand-50/60 rounded-b-2xl">{footer}</div>}
      </div>
    </div>
  );
}
