/**
 * Convert seconds into a human-readable duration string.
 * e.g. 3661 → "1h 1m", 45 → "45s", 7200 → "2h"
 */
export function formatDuration(seconds) {
  if (!seconds || seconds < 0) return "0s";

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  if (m > 0) return `${m}m`;
  return `${s}s`;
}

/**
 * Format an ISO date string (YYYY-MM-DD) into a short readable form.
 * e.g. "2025-01-15" → "Jan 15"
 */
export function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/**
 * Calculate percentage of a part relative to a total, rounded to one decimal.
 * e.g. getPercentage(30, 100) → "30.0"
 */
export function getPercentage(part, total) {
  if (!total) return "0.0";
  return (Math.round((part / total) * 1000) / 10).toFixed(1);
}

const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Shell: "#89e051",
  Bash: "#89e051",
  Lua: "#000080",
  R: "#198CE7",
  Scala: "#c22d40",
  Elixir: "#6e4a7e",
  Haskell: "#5e5086",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  JSON: "#a0a0a0",
  YAML: "#cb171e",
  Markdown: "#083fa1",
  SQL: "#e38c00",
  GraphQL: "#e10098",
  Docker: "#384d54",
  Zig: "#ec915c",
};

const FALLBACK_COLORS = [
  "#6366f1", "#ec4899", "#14b8a6", "#f97316", "#8b5cf6",
  "#06b6d4", "#84cc16", "#ef4444", "#eab308", "#22d3ee",
];

/**
 * Return a consistent color for a programming language name.
 */
export function getLangColor(language) {
  if (!language) return FALLBACK_COLORS[0];
  if (LANG_COLORS[language]) return LANG_COLORS[language];

  // Deterministic fallback based on language name
  let hash = 0;
  for (let i = 0; i < language.length; i++) {
    hash = language.charCodeAt(i) + ((hash << 5) - hash);
  }
  return FALLBACK_COLORS[Math.abs(hash) % FALLBACK_COLORS.length];
}
