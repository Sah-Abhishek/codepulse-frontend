import { formatDuration } from "../lib/utils";

export default function ProjectsCard({ data }) {
  if (!data) return null;

  const { projects } = data;

  if (!projects?.length) {
    return (
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
        <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4">
          Projects
        </p>
        <p className="text-sm text-zinc-600">No project data yet</p>
      </div>
    );
  }

  const maxSeconds = projects[0]?.total_seconds || 1;

  return (
    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
      <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-5">
        Projects
      </p>

      <div className="space-y-4">
        {projects.map((p) => {
          const pct = (p.total_seconds / maxSeconds) * 100;
          return (
            <div key={p.project}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-zinc-300 truncate mr-3">
                  {p.project}
                </span>
                <span className="text-xs font-mono text-zinc-500 flex-shrink-0">
                  {p.readable}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-violet-500 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
