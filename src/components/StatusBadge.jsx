import { useFetch } from "../hooks/useFetch";
import { api } from "../lib/api";

export default function StatusBadge() {
  const { data, error } = useFetch(() => api.health(), [], 30000);

  const isHealthy = data?.status === "healthy";

  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-2 h-2 rounded-full ${error
            ? "bg-red-500"
            : isHealthy
              ? "bg-emerald-500 animate-pulse"
              : "bg-yellow-500"
          }`}
      />
      <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
        {error ? "Offline" : isHealthy ? "Connected" : "Checking..."}
      </span>
    </div>
  );
}
