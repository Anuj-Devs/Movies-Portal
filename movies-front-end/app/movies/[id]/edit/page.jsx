"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import MovieForm from "@/components/movies/movieForm"
import { getMovie, updateMovie } from "@/lib/api"
import { WaveBg } from "@/components/wave-bg"
import { MovieCardSkeleton } from "@/components/movies/movieCardSkeleton"

export default function EditMoviePage() {
  const router = useRouter()
  const params = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMovie() {
      try {
        const data = await getMovie(params.id)
        console.log("Loaded movie:", data)
        setMovie(data)
      } catch (err) {
        console.error("Failed to load movie:", err)
      } finally {
        setLoading(false)
      }
    }
    if (params.id) loadMovie()
  }, [params.id])

  return (
    <main className="app-shell">
      <section className="relative min-h-dvh">
        <div className="mx-auto max-w-6xl px-6 md:px-8 py-10 md:py-12">
          <h1 className="mb-8 text-4xl font-bold">Edit Movie</h1>

          {loading ? (
            <MovieCardSkeleton from='edit' />
          ) : movie ? (
            <MovieForm
              initial={movie} // ✅ fixed prop name here
              submitLabel="Update"
              onSubmit={async (fd) => {
                await updateMovie(params.id, fd)
                router.push("/movies")
              }}
              onCancel={() => router.push("/movies")}
            />
          ) : (
            <p className="text-lg text-center p-4 rounded-xl text-[var(--destructive)] border border-dotted border-[var(--destructive)] font-semibold">Movie not found</p>
          )}
        </div>
        <WaveBg className="absolute bottom-0 inset-x-0" />
      </section>
    </main>
  )
}
