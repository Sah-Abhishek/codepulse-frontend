import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { formatDate, formatDuration } from "../lib/utils";

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 shadow-xl">
      <p className="text-xs text-zinc-400 mb-1">{label}</p>
      <p className="text-sm font-mono text-white">
        {formatDuration(payload[0].value)}
      </p>
    </div>
  );
}

export default function ActivityChart({ data }) {
  const isMobile = useIsMobile();

  if (!data?.data?.length) {
    return (
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-4 sm:p-6">
        <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4">
          Daily Activity
        </p>
        <div className="h-48 sm:h-64 flex items-center justify-center">
          <p className="text-sm text-zinc-600">No activity data yet</p>
        </div>
      </div>
    );
  }

  const chartData = [...data.data]
    .reverse()
    .map((d) => ({
      date: formatDate(d.date),
      rawDate: d.date,
      seconds: d.total_seconds,
    }));

  return (
    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">
          Daily Activity
        </p>
        <p className="text-xs text-zinc-600">{data.days} days</p>
      </div>

      <ResponsiveContainer width="100%" height={isMobile ? 200 : 280}>
        <BarChart data={chartData} barCategoryGap="20%">
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#27272a"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tick={{ fill: "#52525b", fontSize: isMobile ? 10 : 11 }}
            axisLine={false}
            tickLine={false}
            interval={isMobile ? "equidistantPreserveStart" : "preserveStartEnd"}
          />
          {!isMobile && (
            <YAxis
              tick={{ fill: "#52525b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={50}
              tickFormatter={(v) => formatDuration(v)}
            />
          )}
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
          />
          <Bar
            dataKey="seconds"
            radius={[6, 6, 0, 0]}
            fill="#10b981"
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
