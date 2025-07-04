const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

// PUBLIC_INTERFACE
export async function fetchUserProfile() {
  // Example: GET /user/me
  // TODO: Implement token auth
  const res = await fetch(`${API_URL}/user/me`, {
    credentials: 'include'
  });
  if (res.status === 401) throw new Error("unauth");
  if (!res.ok) throw new Error(res.statusText);
  return await res.json();
}

// PUBLIC_INTERFACE
export async function fetchPlaylists(params) {
  // params: {activity, language, timeOfDay, location}
  const res = await fetch(`${API_URL}/playlist?${new URLSearchParams(params)}`);
  if (!res.ok) return [];
  return await res.json();
}

// PUBLIC_INTERFACE
export async function fetchRecommendations(params) {
  const res = await fetch(`${API_URL}/recommendations?${new URLSearchParams(params)}`);
  if (!res.ok) return [];
  return await res.json();
}

// PUBLIC_INTERFACE
export async function fetchMapMusic(filters, location) {
  // Example: /musicmap?activity=...&location=...
  const res = await fetch(`${API_URL}/musicmap?${new URLSearchParams({
    ...filters, location
  })}`);
  if (!res.ok) return [];
  return await res.json();
}
