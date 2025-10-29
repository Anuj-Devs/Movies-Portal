export default function MovieCard({ movie }) {
  return (
    <div className="card overflow-hidden md:hover:scale-105 hover:scale-95 duration-200 ease-in-out cursor-pointer">
      <div className="aspect-[4/3] bg-black/30">
        {movie.posterDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={movie.posterDataUrl || "/placeholder.svg"}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/60">
            No poster
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="text-white font-semibold">{movie.title}</div>
        <div className="text-white/70 text-sm">{movie.year}</div>
      </div>
    </div>
  )
}
