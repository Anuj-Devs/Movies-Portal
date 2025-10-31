export const runtime = "nodejs"; // Force this route to run on Node.js runtime instead of Edge

const store = globalThis.__MOVIE_STORE__ || { seq: 0, items: [] }
globalThis.__MOVIE_STORE__ = store

export async function GET(_req, { params }) {
  const base = process.env.API_BASE_URL
  if (base) {
    const res = await fetch(`${base}/movies/${params.id}`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    const data = await res.json().catch(() => ({}))
    return Response.json(data, { status: res.status })
  }
  const item = store.items.find((m) => m.id === params.id)
  if (!item) return Response.json({ error: "Not found" }, { status: 404 })
  return Response.json(item)
}

export async function PUT(request, { params }) {
  const base = process.env.API_BASE_URL
  const body = await request.json()

  if (base) {
    const res = await fetch(`${base}/movies/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const data = await res.json().catch(() => ({}))
    return Response.json(data, { status: res.status })
  }

  const idx = store.items.findIndex((m) => m.id === params.id)
  if (idx === -1) return Response.json({ error: "Not found" }, { status: 404 })
  store.items[idx] = { ...store.items[idx], ...body }
  return Response.json(store.items[idx])
}

export async function DELETE(_request, { params }) {
  const base = process.env.API_BASE_URL
  if (base) {
    const res = await fetch(`${base}/movies/${params.id}`, { method: "DELETE" })
    if (!res.ok) return Response.json(await res.json(), { status: res.status })
    return Response.json({ ok: true })
  }
  const idx = store.items.findIndex((m) => m.id === params.id)
  if (idx === -1) return Response.json({ error: "Not found" }, { status: 404 })
  store.items.splice(idx, 1)
  return Response.json({ ok: true })
}
