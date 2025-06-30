"use client";

import {
  createContext,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type ToastType = "success" | "error" | "info" | "warning";

type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

type ToastMethods = {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
};

type ToastContextType = {
  toast: ToastMethods;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};

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
            onClick={() => onRemove(toast.id)}
            className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>
      </div>
    );
  }
);

ToastItem.displayName = "ToastItem";

type ToastProviderProps = {
  children: ReactNode;
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((type: ToastType, message: string) => {
    const id = crypto.randomUUID(); // Plus performant que Math.random
    const toast = { id, message, type };

    setToasts((prev) => [...prev, toast]);

    // Auto remove after 4 seconds
    const timeoutId = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);

    // Cleanup si le composant est démonté
    return () => clearTimeout(timeoutId);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Toast methods object
  const toast = useMemo(
    () => ({
      success: (message: string) => showToast("success", message),
      error: (message: string) => showToast("error", message),
      info: (message: string) => showToast("info", message),
      warning: (message: string) => showToast("warning", message),
    }),
    [showToast]
  );

  const contextValue = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {/* Toast Container - Rendu conditionnel */}
      {toasts.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
};
