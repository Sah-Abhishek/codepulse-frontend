import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { formatDuration, getLangColor } from "../lib/utils";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;

  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 shadow-xl">
      <p className="text-sm text-white">{d.language}</p>
      <p className="text-xs font-mono text-zinc-400 mt-0.5">
        {formatDuration(d.seconds)} · {d.pct}%
      </p>
    </div>
  );
}

export default function LanguagePieChart({ data }) {
  if (!data?.data?.length) return null;

  // Aggregate all days into one language map
  const langMap = {};
  data.data.forEach((day) => {
    day.stats.forEach((s) => {
      langMap[s.language] = (langMap[s.language] || 0) + s.seconds;
    });
  });

  const total = Object.values(langMap).reduce((a, b) => a + b, 0);
  const chartData = Object.entries(langMap)
    .sort(([, a], [, b]) => b - a)
    .map(([language, seconds]) => ({
      language,
      seconds,
      pct: Math.round((seconds / total) * 1000) / 10,
    }));

  return (
    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 sm:p-6">
      <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4">
        Languages
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
        <div className="w-36 h-36 sm:w-44 sm:h-44 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="seconds"
                nameKey="language"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={62}
                paddingAngle={2}
                strokeWidth={0}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.language}
                    fill={getLangColor(entry.language)}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 w-full space-y-2.5 overflow-hidden">
          {chartData.slice(0, 6).map((s) => (
            <div key={s.language} className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: getLangColor(s.language) }}
                />
                <span className="text-sm text-zinc-300 truncate">
                  {s.language}
                </span>
              </div>
              <span className="text-xs font-mono text-zinc-500 ml-3 flex-shrink-0">
                {s.pct}%
              </span>
            </div>
          ))}
          {chartData.length > 6 && (
            <p className="text-xs text-zinc-600">
              +{chartData.length - 6} more
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
