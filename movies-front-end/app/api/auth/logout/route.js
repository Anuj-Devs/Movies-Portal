import { cookies } from "next/headers"

export async function POST() {
  const c = await cookies()
  c.set("authToken", "", { path: "/", maxAge: 0 })

  return Response.json({ ok: true })
}
