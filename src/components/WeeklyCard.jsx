export default function WeeklyCard({ data }) {
  if (!data) return null;

  const { this_week, last_week, change_percent } = data;
  const changeNum = parseFloat(change_percent);
  const isUp = changeNum > 0;
  const isDown = changeNum < 0;

  return (
    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 sm:p-6">
      <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4">
        Weekly Comparison
      </p>

      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {/* This week */}
        <div>
          <p className="text-xs text-zinc-500 mb-1">This week</p>
          <p className="text-xl sm:text-2xl font-bold text-white">
            {this_week.total_readable || "0s"}
          </p>
        </div>

        {/* Last week */}
        <div>
          <p className="text-xs text-zinc-500 mb-1">Last week</p>
          <p className="text-xl sm:text-2xl font-bold text-zinc-500">
            {last_week.total_readable || "0s"}
          </p>
        </div>
      </div>

      {/* Change indicator */}
      <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center gap-2">
        {isUp && (
          <svg
            className="w-4 h-4 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        )}
        {isDown && (
          <svg
            className="w-4 h-4 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
        <span
          className={`text-sm font-mono ${isUp
              ? "text-emerald-400"
              : isDown
                ? "text-red-400"
                : "text-zinc-500"
            }`}
        >
          {change_percent} from last week
        </span>
      </div>
    </div>
  );
}
