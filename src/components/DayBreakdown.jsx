import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  formatDate,
  formatDuration,
  getLangColor,
  getPercentage,
} from "../lib/utils";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 shadow-xl">
      <p className="text-xs text-zinc-400 mb-2">{label}</p>
      <div className="space-y-1">
        {payload
          .filter((p) => p.value > 0)
          .sort((a, b) => b.value - a.value)
          .map((p) => (
            <div
              key={p.dataKey}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: p.fill }}
                />
                <span className="text-xs text-zinc-300">{p.dataKey}</span>
              </div>
              <span className="text-xs font-mono text-zinc-400">
                {formatDuration(p.value)}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default function DayBreakdown({ data }) {
  const [expanded, setExpanded] = useState(null);

  if (!data?.data?.length) return null;

  // Find all unique languages across all days for stacked chart
  const allLangs = new Set();
  data.data.forEach((d) => d.stats.forEach((s) => allLangs.add(s.language)));
  const languages = [...allLangs];

  // Build chart data for stacked bar
  const chartData = [...data.data].reverse().map((d) => {
    const row = { date: formatDate(d.date), rawDate: d.date };
    d.stats.forEach((s) => {
      row[s.language] = s.seconds;
    });
    return row;
  });

  return (
    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
      <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-6">
        Language Breakdown by Day
      </p>

      {/* Stacked bar chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} barCategoryGap="15%">
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#27272a"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tick={{ fill: "#52525b", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fill: "#52525b", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={50}
            tickFormatter={(v) => formatDuration(v)}
          />
          <Tooltip content={<CustomTooltip />} />
          {languages.map((lang) => (
            <Bar
              key={lang}
              dataKey={lang}
              stackId="a"
              fill={getLangColor(lang)}
              radius={0}
              maxBarSize={40}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>

      {/* Day list */}
      <div className="mt-6 space-y-1">
        {data.data.map((day) => (
          <div key={day.date}>
            <button
              onClick={() =>
                setExpanded(expanded === day.date ? null : day.date)
              }
              className="w-full flex items-center justify-between py-3 px-3 rounded-lg hover:bg-zinc-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg
                  className={`w-3.5 h-3.5 text-zinc-600 transition-transform ${expanded === day.date ? "rotate-90" : ""
                    }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <span className="text-sm text-zinc-300">
                  {formatDate(day.date)}
                </span>
              </div>
              <span className="text-sm font-mono text-zinc-400">
                {day.total_readable}
              </span>
            </button>

            {expanded === day.date && (
              <div className="pl-10 pr-3 pb-3 space-y-2.5">
                {day.stats.map((s) => (
                  <div
                    key={s.extension}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: getLangColor(s.language) }}
                    />
                    <span className="text-sm text-zinc-400 flex-1">
                      {s.language}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      {s.readable}
                    </span>
                    <span className="text-xs font-mono text-zinc-600 w-12 text-right">
                      {getPercentage(s.seconds, day.total_seconds)}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
