import React from 'react';

export interface ToastData {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface ToastProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="px-space-md py-space-sm rounded-xl bg-inverse-surface text-inverse-on-surface font-label-md text-label-md shadow-2xl flex items-center gap-space-xs pointer-events-auto transition-all animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">
            {toast.type === 'warning' ? 'warning' : 'check_circle'}
          </span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
