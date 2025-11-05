import { cookies } from "next/headers"

export async function POST(request) {
  const base = process.env.API_BASE_URL
  const body = await request.json()

  try {
    const res = await fetch(`${base}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return Response.json(data, { status: res.status })
    }

    const cookieStore = await cookies()
    cookieStore.set("authToken", data.token || "token", {
      httpOnly: false,
      path: "/",
      maxAge: body.remember ? 60 * 60 * 24 * 30 : undefined,
    })

    return Response.json({
      ok: true,
      token: data.token,
      user: data.user || null,
    })
  } catch (err) {
    console.error("Failed to reach backend:", err)
    return Response.json({ error: "Backend connection failed" }, { status: 502 })
  }
}
