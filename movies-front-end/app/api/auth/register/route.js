import { cookies } from "next/headers";

export async function POST(request) {
  const base = process.env.API_BASE_URL;
  const body = await request.json();

  if (!base) {
    console.error("Missing API_BASE_URL environment variable.");
    return Response.json({ error: "Server misconfigured" }, { status: 500 });
  }

  try {
    const res = await fetch(`${base}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: body.email, password: body.password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("Backend error:", data);
      return Response.json(data, { status: res.status });
    }

    const cookieStore = await cookies();
    cookieStore.set("authToken", data.token || "token", {
      httpOnly: false,
      path: "/",
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error(" Failed to reach backend:", err);
    return Response.json({ error: "Backend connection failed" }, { status: 502 });
  }
}
