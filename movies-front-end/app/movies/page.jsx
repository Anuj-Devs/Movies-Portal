"use client"

import useSWR from "swr"
import Link from "next/link"
import { listMovies } from "@/lib/api"
import MovieCard from "../../components/movies/movieCard"
import { WaveBg } from "@/components/wave-bg"
import { Button } from "@/components/ui/button"
import { MovieCardSkeleton } from "@/components/movies/movieCardSkeleton"
import { FaSignOutAlt } from "react-icons/fa"
import { FaPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation"
import Pagination from "@/components/pagination"
import { useState } from "react"

const PAGE_SIZE = 8

export default function MoviesPage() {
  const router = useRouter()
  const [page, setPage] = useState(1)

  // ✅ Correct call to listMovies
  const { data, isLoading } = useSWR(["movies", page], () =>
    listMovies({ page, limit: PAGE_SIZE })
  )

  async function handleLogout() {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" })
      if (res.ok) {
        localStorage.removeItem("authToken")
        router.push("/login")
      } else {
        console.error("Logout failed")
      }
    } catch (err) {
      console.error("Logout error:", err)
    }
  }

  return (
    <main className="app-shell">
      <section className="relative min-h-dvh">
        <div className="mx-auto max-w-6xl px-6 md:px-8 py-10 md:py-12">
          <header className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center">
              <h1 className="text-4xl md:text-5xl">My movies</h1>
              {data && data.items.length > 0 && (
                <Link href="/movies/new">
                  <Button className="bg-transparent text-white border border-white rounded-full font-semibold hover:bg-white hover:text-black cursor-pointer ml-4 hidden md:flex">
                    <FaPlus className="text-lg" />
                  </Button>
                </Link>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleLogout}
                className="bg-transparent text-white border border-white h-11 rounded-lg font-semibold hover:bg-white hover:text-black items-center gap-2 cursor-pointer hidden md:flex"
              >
                <FaSignOutAlt className="text-lg" />
                <span>Logout</span>
              </Button>
              <Button
                onClick={handleLogout}
                className="bg-transparent text-white border border-white h-11 rounded-lg font-semibold hover:bg-white hover:text-black items-center gap-2 cursor-pointer flex md:hidden"
              >
                <FaSignOutAlt className="text-lg" />
              </Button>
              {data && data.items.length > 0 && (
                <Link href="/movies/new">
                  {/* <Button className="brand-btn hidden md:flex h-12 px-6 rounded-lg cursor-pointer font-semibold">
                    Add a new movie
                  </Button> */}
                  <Button className="brand-btn flex md:hidden h-12 px-6 rounded-lg cursor-pointer font-semibold">
                    <FaPlus className="text-lg" />
                  </Button>
                </Link>
              )}
            </div>
          </header>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <MovieCardSkeleton from="list" key={i} />
              ))}
            </div>
          ) : data && data.items.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {data.items.map((m, index) => (
                  <Link key={index} href={`/movies/${m._id}/edit`} className="block">
                    <MovieCard movie={m} />
                  </Link>
                ))}
              </div>

              <div className="mt-10 flex justify-center">
                <Pagination
                  page={page}
                  totalPages={Math.ceil((data.total || 0) / (data.limit || PAGE_SIZE))}
                  onPageChange={setPage}
                />
              </div>
            </>
          ) : (
            <div className="min-h-[50svh] grid place-items-center">
              <div className="text-center space-y-6">
                <p className="text-2xl md:text-3xl font-semibold">
                  Your movie list is empty
                </p>
                <Link href="/movies/new">
                  <Button className="brand-btn h-12 px-6 rounded-lg cursor-pointer font-semibold">
                    Add a new movie
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        <WaveBg className="absolute bottom-0 inset-x-0" />
      </section>
    </main>
  )
}
