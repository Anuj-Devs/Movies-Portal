export const runtime = "nodejs"; // Force this route to run on Node.js runtime instead of Edge
const store = globalThis.__MOVIE_STORE__ || {
  seq: 3,
  items: [
    { id: "1", title: "Movie 1", year: 2021, posterDataUrl: "" },
    { id: "2", title: "Movie 2", year: 2022, posterDataUrl: "" },
  ],
}
globalThis.__MOVIE_STORE__ = store

export async function GET(request) {
  const base = process.env.API_BASE_URL
  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get("page") || 1)
  const limit = Number(searchParams.get("limit") || 8)

  if (base) {
    const headers = { "Content-Type": "application/json" }
    // const authHeader = request.headers.get("authorization")
    // if (authHeader) {
    //   headers["Authorization"] = authHeader
    // }

    const res = await fetch(`${base}/movies?page=${page}&limit=${limit}`, {
      cache: "no-store",
      headers,
    })
    const data = await res.json().catch(() => ({}))
    return Response.json(data, { status: res.status })
  }

  const start = (page - 1) * limit
  const end = start + limit
  const items = store.items.slice(start, end)
  return Response.json({ items, total: store.items.length, page, limit })
}

export async function POST(request) {
  const base = process.env.API_BASE_URL
  const body = await request.json()

  if (base) {
    const headers = { "Content-Type": "application/json" }
    const authHeader = request.headers.get("authorization")
    if (authHeader) {
      headers["Authorization"] = authHeader
    }

    const res = await fetch(`${base}/movies`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
    const data = await res.json().catch(() => ({}))
    return Response.json(data, { status: res.status })
  }

  const id = String(++store.seq)
  const item = { id, title: body.title, year: body.year, posterDataUrl: body.posterDataUrl || "" }
  store.items.unshift(item)
  return Response.json(item, { status: 201 })
}
