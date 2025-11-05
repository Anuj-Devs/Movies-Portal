import { setToken } from "@/hooks/use-auth"
const BASE = process.env.API_BASE_URL || ""

async function jsonFetch(path, options = {}) {
  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("movie_app_token") || localStorage.getItem("movie_app_token")
      : null

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const res = await fetch(`${path}`, {
    credentials: "include",
    headers,
    ...options,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const message = data?.message || data?.error || "Request failed"
    const err = new Error(message)
    err.status = res.status
    err.data = data
    throw err
  }
  return data
}

// Auth
export async function login({ email, password, remember }) {
  const res = await jsonFetch(`/api/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password, remember }),
  })

  if (res?.token) setToken(res.token, remember)

  return res
}
export async function logout() {
  return jsonFetch(`/api/auth/logout`, { method: "POST" })
}

// Movies
export async function listMovies({ page = 1, limit = 8 } = {}) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) })
  return jsonFetch(`/api/movies?${params.toString()}`)
}
export async function getMovie(id) {
  return jsonFetch(`/api/movies/${id}`)
}
export async function createMovie(payload) {
  return jsonFetch(`/api/movies`, { method: "POST", body: JSON.stringify(payload) })
}
export async function updateMovie(id, payload) {
  return jsonFetch(`/api/movies/${id}`, { method: "PUT", body: JSON.stringify(payload) })
}
export async function deleteMovie(id) {
  return jsonFetch(`/api/movies/${id}`, { method: "DELETE" })
}

// New User Registration
export async function register({ email, password }) {
  return jsonFetch(`/api/auth/register`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
}
