import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "success"
    | "danger"
    | "warning";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  loading?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      children,
      type = "button",
      loading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

    const variants = {
      primary:
        "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500/20 shadow-sm border border-blue-600 hover:border-blue-700",
      secondary:
        "bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-500/20 shadow-sm border border-slate-300 hover:border-slate-400",
      outline:
        "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500/20 shadow-sm",
      ghost:
        "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-500/20",
      success:
        "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500/20 shadow-sm border border-green-600 hover:border-green-700",
      danger:
        "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/20 shadow-sm border border-red-600 hover:border-red-700",
      warning:
        "bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500/20 shadow-sm border border-orange-500 hover:border-orange-600",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        type={type}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        <span className={loading ? "invisible" : ""}>{children}</span>
        {loading && (
          <svg
            className="animate-spin h-4 w-4 absolute"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {loading && <span className="sr-only">Chargement en cours...</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
