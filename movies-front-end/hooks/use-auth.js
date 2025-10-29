"use client"

import useSWR from "swr"

const TOKEN_KEY = "movie_app_token"

export function setToken(token, remember) {
  if (remember) localStorage.setItem(TOKEN_KEY, token)
  sessionStorage.setItem(TOKEN_KEY, token)
}

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY)
}

export function useAuth() {
  const { data: token, mutate } = useSWR("auth-token", async () => getToken(), {
    revalidateOnFocus: false,
  })

  return {
    token,
    set: (t, remember) => {
      setToken(t, remember)
      mutate(t, false)
    },
    clear: () => {
      localStorage.removeItem(TOKEN_KEY)
      sessionStorage.removeItem(TOKEN_KEY)
      mutate(null, false)
    },
  }
}
