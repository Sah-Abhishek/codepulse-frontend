import { formatDuration, getLangColor, getPercentage } from "../lib/utils";

export default function TodayCard({ data }) {
  if (!data) return null;

  const { stats, total_seconds, total_readable, date } = data;

  return (
    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">
            Today
          </p>
          <p className="text-3xl sm:text-4xl font-bold text-white mt-1 tracking-tight">
            {total_readable || "0s"}
          </p>
        </div>
        <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
      </div>

      {/* Stacked bar */}
      {stats.length > 0 && (
        <div className="w-full h-3 rounded-full overflow-hidden flex mb-5 bg-zinc-800">
          {stats.map((s) => (
            <div
              key={s.extension}
              className="h-full transition-all duration-500"
              style={{
                width: `${getPercentage(s.seconds, total_seconds)}%`,
                backgroundColor: getLangColor(s.language),
                minWidth: stats.length > 1 ? "2px" : "100%",
              }}
            />
          ))}
        </div>
      )}

      {/* Language list */}
      <div className="space-y-3">
        {stats.length === 0 && (
          <p className="text-sm text-zinc-600">No activity yet today</p>
        )}
        {stats.map((s) => (
          <div key={s.extension} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: getLangColor(s.language) }}
              />
              <span className="text-sm text-zinc-300">{s.language}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono text-zinc-400">
                {formatDuration(s.seconds)}
              </span>
              <span className="text-xs font-mono text-zinc-600 w-12 text-right">
                {getPercentage(s.seconds, total_seconds)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
