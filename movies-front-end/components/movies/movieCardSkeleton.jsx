export function MovieCardSkeleton({from}) {
  return (
    (from === 'list') ? (
    <div className="animate-pulse bg-white/20 rounded-lg shadow-md overflow-hidden">
      <div className="h-40 bg-gray-300/30 w-full"></div>
      <div className="p-4 space-y-2">
        <div className="h-6 bg-gray-300/30 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300/30 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300/30 rounded w-5/6"></div>
      </div>
    </div>
    ) : (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(320px,420px)] gap-10 animate-pulse">
      <div className="relative aspect-square rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gray-300/20 rounded-xl"></div>
      </div>
      <div className="space-y-5">
        <div className="h-11 bg-gray-300/20 rounded-lg w-full"></div>
        <div className="h-11 bg-gray-300/20 rounded-lg w-2/3"></div>
        <div className="flex gap-3 pt-2">
          <div className="h-11 bg-gray-300/20 rounded-lg w-24"></div>
          <div className="h-11 bg-gray-300/20 rounded-lg w-32"></div>
          <div className="h-11 bg-gray-300/20 rounded-lg w-28"></div>
        </div>
      </div>
    </div>
    ) )
}
