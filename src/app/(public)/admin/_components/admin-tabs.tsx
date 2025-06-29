import { cn } from "@/lib/utils";

interface AdminTabsProps {
  activeTab: "military" | "economic" | "news" | "date";
  onTabChange: (tab: "military" | "economic" | "news" | "date") => void;
}

export default function AdminTabs({ activeTab, onTabChange }: AdminTabsProps) {
  const tabs = [
    { id: "date", label: "Date du Jeu", icon: "📅" },
    { id: "military", label: "Classement Militaire", icon: "⚔️" },
    { id: "economic", label: "Classement Économique", icon: "💰" },
    { id: "news", label: "Actualités", icon: "📰" },
  ] as const;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 mb-8 overflow-hidden">
      <div className="flex flex-wrap border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => onTabChange(tab.id as typeof activeTab)}
            className={cn(
              `flex items-center gap-2 px-6 py-4 font-medium transition-colors duration-200 cursor-pointer`,
              activeTab === tab.id
                ? "bg-blue-600 text-white border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            )}
          >
            <span className="text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
