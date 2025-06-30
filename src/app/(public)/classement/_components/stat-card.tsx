export type Stat = {
  icon: string;
  title: string;
  value: string | number;
  description?: string;
};

type StatCardProps = {
  stat: Stat;
};

export const StatCard = ({ stat }: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{stat.icon}</span>
        <h3 className="text-lg font-semibold text-gray-900">{stat.title}</h3>
      </div>
      <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
      {stat.description && (
        <p className="text-sm text-gray-600 mt-1">{stat.description}</p>
      )}
    </div>
  );
};
