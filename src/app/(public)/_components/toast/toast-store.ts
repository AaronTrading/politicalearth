import { create } from "zustand";

export type ToastType = "success" | "error" | "info" | "warning";

export type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

type ToastStore = {
  toasts: Toast[];
  addToast: (type: ToastType, message: string) => void;
  removeToast: (id: string) => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (type: ToastType, message: string) => {
    const id = crypto.randomUUID();
    const toast = { id, message, type };

    set((state) => ({ toasts: [...state.toasts, toast] }));

    // Auto remove after 4 seconds
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 4000);
  },
  removeToast: (id: string) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));

export const useToast = () => {
  const addToast = useToastStore((state) => state.addToast);

  return {
    success: (message: string) => addToast("success", message),
    error: (message: string) => addToast("error", message),
    info: (message: string) => addToast("info", message),
    warning: (message: string) => addToast("warning", message),
  };
};
