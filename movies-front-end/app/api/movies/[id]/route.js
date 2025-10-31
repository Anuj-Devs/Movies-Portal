const store = globalThis.__MOVIE_STORE__ || { seq: 0, items: [] }
globalThis.__MOVIE_STORE__ = store

export async function GET(_req, { params }) {
  const base = process.env.API_BASE_URL
  if (base) {
    const authHeader = _req.headers.get("authorization")
    const headers = { "Content-Type": "application/json" }
    if (authHeader) {
      headers["Authorization"] = authHeader
    }

    const url = `${base}/movies/${params.id}`
    console.log("[v0] GET Request to backend:", { url, authHeader: !!authHeader })

    try {
      const res = await fetch(url, {
        cache: "no-store",
        headers,
      })

      console.log("[v0] GET Response Status:", res.status)

      if (!res.ok) {
        const errorText = await res.text()
        console.log("[v0] Backend error response:", errorText)
        try {
          const data = JSON.parse(errorText)
          return Response.json(data, { status: res.status })
        } catch {
          return Response.json({ error: errorText || "Backend error" }, { status: res.status })
        }
      }

      const data = await res.json()
      return Response.json(data, { status: 200 })
    } catch (error) {
      console.log("[v0] Fetch error:", error.message)
      return Response.json({ error: error.message }, { status: 500 })
    }
  }
  const item = store.items.find((m) => m.id === params.id)
  if (!item) return Response.json({ error: "Not found" }, { status: 404 })
  return Response.json(item)
}

export async function PUT(request, { params }) {
  const base = process.env.API_BASE_URL
  const body = await request.json()

  if (base) {
    const authHeader = request.headers.get("authorization")
    const headers = { "Content-Type": "application/json" }
    if (authHeader) {
      headers["Authorization"] = authHeader
    }

    try {
      const res = await fetch(`${base}/movies/${params.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const errorText = await res.text()
        try {
          const data = JSON.parse(errorText)
          return Response.json(data, { status: res.status })
        } catch {
          return Response.json({ error: errorText || "Backend error" }, { status: res.status })
        }
      }

      const data = await res.json()
      return Response.json(data, { status: 200 })
    } catch (error) {
      console.log("[v0] PUT error:", error.message)
      return Response.json({ error: error.message }, { status: 500 })
    }
  }

  const idx = store.items.findIndex((m) => m.id === params.id)
  if (idx === -1) return Response.json({ error: "Not found" }, { status: 404 })
  store.items[idx] = { ...store.items[idx], ...body }
  return Response.json(store.items[idx])
}

export async function DELETE(request, { params }) {
  const base = process.env.API_BASE_URL
  if (base) {
    const authHeader = request.headers.get("authorization")
    const headers = { "Content-Type": "application/json" }
    if (authHeader) {
      headers["Authorization"] = authHeader
    }

    try {
      const res = await fetch(`${base}/movies/${params.id}`, {
        method: "DELETE",
        headers,
      })

      if (!res.ok) {
        const errorText = await res.text()
        try {
          const data = JSON.parse(errorText)
          return Response.json(data, { status: res.status })
        } catch {
          return Response.json({ error: errorText || "Backend error" }, { status: res.status })
        }
      }

      return Response.json({ ok: true })
    } catch (error) {
      console.log("[v0] DELETE error:", error.message)
      return Response.json({ error: error.message }, { status: 500 })
    }
  }

  const idx = store.items.findIndex((m) => m.id === params.id)
  if (idx === -1) return Response.json({ error: "Not found" }, { status: 404 })
  store.items.splice(idx, 1)
  return Response.json({ ok: true })
}
