import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [
  "#10B981", // emerald
  "#3B82F6", // blue
  "#F59E0B", // amber
  "#EF4444", // red
  "#8B5CF6", // purple
  "#14B8A6", // teal
];

export default function DonutChartSection({ breakdown = [] }) {
  if (!breakdown || breakdown.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 
                      border border-gray-200 dark:border-gray-800 
                      rounded-2xl p-6 shadow-sm h-80 
                      flex items-center justify-center">
        <p className="text-gray-400 text-sm">
          No breakdown data available.
        </p>
      </div>
    );
  }

  return (
    <div
      className="bg-white dark:bg-gray-900 
                 border border-gray-200 dark:border-gray-800 
                 rounded-2xl p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold mb-6">
        Spending Breakdown
      </h3>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={breakdown}
              dataKey="total"
              nameKey="label"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
              labelLine={false}
            >
              {breakdown.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}