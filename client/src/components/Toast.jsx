import React from 'react';
import { CheckCircleIcon, AlertCircleIcon, XIcon } from './Icons';

export const Toast = ({ toast, onClose }) => {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md transition-all duration-300 border border-white/20 animate-slide-up bg-slate-900/90 text-white">
      {isSuccess ? (
        <CheckCircleIcon className="w-6 h-6 text-emerald-400 shrink-0" />
      ) : (
        <AlertCircleIcon className="w-6 h-6 text-rose-400 shrink-0" />
      )}
      <div className="text-sm font-medium pr-2">{toast.message}</div>
      <button
        onClick={onClose}
        className="p-1 hover:bg-white/10 rounded-lg transition text-slate-400 hover:text-white"
      >
        <XIcon className="w-4 h-4" />
      </button>
    </div>
  );
};
