interface RankingData {
  id: string | number;
  rank: number;
  country: string;
  flag: string;
  [key: string]: string | number;
}

interface RankingTableProps {
  title: string;
  icon: string;
  data: RankingData[];
  columns: Array<{
    key: string;
    label: string;
    align?: "left" | "center" | "right";
    format?: (value: string | number) => string;
  }>;
}

export const RankingTable = ({
  title,
  icon,
  data,
  columns,
}: RankingTableProps) => {
  return (
    <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 border-b-2 border-gray-300">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span>{icon}</span>
          {title}
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-auto max-h-[600px]">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-gray-100 z-10">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-3 py-2 border border-gray-300 text-xs font-bold text-gray-900 ${
                    column.align === "center"
                      ? "text-center"
                      : column.align === "right"
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50 transition-colors duration-150`}
              >
                {columns.map((column) => (
                  <td
                    key={`${row.id}-${column.key}`}
                    className={`px-3 py-2 border border-gray-300 text-sm text-gray-900 ${
                      column.align === "center"
                        ? "text-center"
                        : column.align === "right"
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    {column.key === "country" ? (
                      <div className="flex items-center gap-2">
                        <span>{row.flag}</span>
                        <span className="font-medium">{row.country}</span>
                      </div>
                    ) : column.format ? (
                      column.format(row[column.key])
                    ) : (
                      row[column.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
