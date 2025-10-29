"use client"

import { useRouter } from "next/navigation"
import MovieForm from "@/components/movies/movieForm"
import { createMovie } from "@/lib/api"
import { WaveBg } from "@/components/wave-bg"

export default function NewMoviePage() {
  const router = useRouter()

  return (
    <main className="app-shell">
      <section className="relative min-h-dvh">
        <div className="mx-auto max-w-6xl px-6 md:px-8 py-10 md:py-12">
          <h1 className="mb-8">Create a new movie</h1>
          <MovieForm
            submitLabel="Submit"
            onSubmit={async (fd) => {
              await createMovie(fd)
              router.push("/movies")
            }}
            onCancel={() => router.push("/movies")}
          />
        </div>
        <WaveBg className="absolute bottom-0 inset-x-0" />
      </section>
    </main>
  )
}
