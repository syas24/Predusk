const API_URL = "http://localhost:5000";

export async function getProfile() {
  const res = await fetch(`${API_URL}/profile`);
  return res.json();
}

export async function createProfile(data) {
  const res = await fetch(`${API_URL}/profile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getProjects() {
  const res = await fetch(`${API_URL}/projects`);
  return res.json();
}
