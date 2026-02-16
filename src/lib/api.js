const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:7890";

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const api = {
  today: () => request("/api/today"),
  stats: (days = 14) => request(`/api/stats?days=${days}`),
  projects: (days = 30) => request(`/api/projects?days=${days}`),
  weekly: () => request("/api/weekly"),
  health: () => request("/health"),
};
