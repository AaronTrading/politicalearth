"use client";

import { X } from "lucide-react";
import { memo, useMemo } from "react";
import { Toast, useToastStore } from "./toast-store";

const ToastItem = memo(
  ({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) => {
    const toastStyles = useMemo(() => {
      const baseStyles =
        "min-w-80 max-w-md p-4 rounded-lg shadow-lg border-l-4 transform transition-all duration-300 ease-in-out animate-slide-in-right";

      switch (toast.type) {
        case "success":
          return `${baseStyles} bg-green-50 border-green-500 text-green-800`;
        case "error":
          return `${baseStyles} bg-red-50 border-red-500 text-red-800`;
        case "info":
          return `${baseStyles} bg-blue-50 border-blue-500 text-blue-800`;
        case "warning":
          return `${baseStyles} bg-yellow-50 border-yellow-500 text-yellow-800`;
        default:
          return baseStyles;
      }
    }, [toast.type]);

    const icon = useMemo(() => {
      switch (toast.type) {
        case "success":
          return "✅";
        case "error":
          return "❌";
        case "info":
          return "ℹ️";
        case "warning":
          return "⚠️";
        default:
          return "";
      }
    }, [toast.type]);

    return (
      <div className={toastStyles}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{icon}</span>
            <p className="font-medium">{toast.message}</p>
          </div>
          <button
            type="button"
            onClick={() => onRemove(toast.id)}
            className="ml-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }
);

ToastItem.displayName = "ToastItem";

export const ToastManager = () => {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};
