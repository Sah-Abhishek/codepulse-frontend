import { useState } from "react";
import { api } from "../lib/api";
import { useFetch } from "../hooks/useFetch";

import TodayCard from "../components/TodayCard";
import WeeklyCard from "../components/WeeklyCard";
import ActivityChart from "../components/ActivityChart";
import LanguagePieChart from "../components/LanguagePieChart";
import ProjectsCard from "../components/ProjectsCard";
import DayBreakdown from "../components/DayBreakdown";
import StatusBadge from "../components/StatusBadge";
import Loader from "../components/Loader";

const RANGE_OPTIONS = [7, 14, 30, 60];

export default function Dashboard() {
  const [days, setDays] = useState(14);

  // Auto-refresh every 30 seconds
  const today = useFetch(() => api.today(), [], 30000);
  const stats = useFetch(() => api.stats(days), [days], 30000);
  const projects = useFetch(() => api.projects(days), [days], 30000);
  const weekly = useFetch(() => api.weekly(), [], 60000);

  const loading = today.loading && stats.loading;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h1 className="text-lg font-semibold tracking-tight">CodePulse</h1>
            </div>
            <div className="sm:hidden">
              <StatusBadge />
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
            {/* Range selector */}
            <div className="flex items-center bg-zinc-900 rounded-lg border border-zinc-800 p-0.5 flex-1 sm:flex-none">
              {RANGE_OPTIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${days === d
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                    }`}
                >
                  {d}d
                </button>
              ))}
            </div>
            <div className="hidden sm:block">
              <StatusBadge />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {loading ? (
          <Loader />
        ) : today.error ? (
          <div className="rounded-2xl bg-zinc-900 border border-red-900/50 p-8 text-center">
            <p className="text-red-400 text-sm mb-2">
              Failed to connect to server
            </p>
            <p className="text-xs text-zinc-600">
              Make sure <code className="text-zinc-500">codepulse server</code>{" "}
              is running
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Top row - Today + Weekly + Languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TodayCard data={today.data} />
              <WeeklyCard data={weekly.data} />
              <LanguagePieChart data={stats.data} />
            </div>

            {/* Activity chart */}
            <ActivityChart data={stats.data} />

            {/* Bottom row - Projects + Day breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <ProjectsCard data={projects.data} />
              </div>
              <div className="lg:col-span-2">
                <DayBreakdown data={stats.data} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
