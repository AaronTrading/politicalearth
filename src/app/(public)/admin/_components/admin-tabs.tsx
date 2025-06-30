import { Button } from "@/app/(public)/_components/button";
import { cn } from "@/lib/utils";

type AdminTabsProps = {
  activeTab: "military" | "economic" | "news" | "date";
  onTabChange: (tab: "military" | "economic" | "news" | "date") => void;
};

export const AdminTabs = ({ activeTab, onTabChange }: AdminTabsProps) => {
  const tabs = [
    { id: "date", label: "Date du Jeu", icon: "📅" },
    { id: "military", label: "Classement Militaire", icon: "⚔️" },
    { id: "economic", label: "Classement Économique", icon: "💰" },
    { id: "news", label: "Actualités", icon: "📰" },
  ] as const;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 mb-8 overflow-hidden">
      {/* Desktop tabs */}
      <div className="hidden sm:flex border-b border-gray-200">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => onTabChange(tab.id as typeof activeTab)}
            variant={activeTab === tab.id ? "primary" : "ghost"}
            className={cn(
              "flex-1 flex items-center justify-center gap-3 px-6 py-4 font-medium rounded-none border-b-2",
              activeTab === tab.id
                ? "border-blue-600"
                : "border-transparent hover:border-blue-200"
            )}
          >
            <span className="text-lg mr-2">{tab.icon}</span>
            <span>{tab.label}</span>
          </Button>
        ))}
      </div>

      {/* Mobile tabs - 2x2 grid */}
      <div className="grid grid-cols-2 gap-0 sm:hidden border-b border-gray-200">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => onTabChange(tab.id as typeof activeTab)}
            variant={activeTab === tab.id ? "primary" : "ghost"}
            className={cn(
              "flex items-center justify-center px-3 py-6 font-medium rounded-none border-b-2 border-r border-gray-200 last:border-r-0",
              activeTab === tab.id
                ? "border-blue-600"
                : "border-transparent hover:border-blue-200"
            )}
          >
            <span className="text-3xl">{tab.icon}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
