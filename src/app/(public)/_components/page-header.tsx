import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

export const PageHeader = ({ title, subtitle, children }: PageHeaderProps) => {
  return (
    <section className="bg-white border-b border-gray-200 py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
          </div>
          {children && (
            <div className="flex items-center gap-4">{children}</div>
          )}
        </div>
      </div>
    </section>
  );
};
