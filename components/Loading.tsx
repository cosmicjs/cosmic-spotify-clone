export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Header Skeleton */}
      <div className="h-48 bg-gray-800 rounded-lg mb-8"></div>

      {/* Section Title Skeleton */}
      <div className="h-8 w-48 bg-gray-800 rounded mb-6"></div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-square bg-gray-800 rounded-lg"></div>
            <div className="h-4 bg-gray-800 rounded w-3/4"></div>
            <div className="h-3 bg-gray-800 rounded w-1/2"></div>
          </div>
        ))}
      </div>

      {/* Section Title Skeleton */}
      <div className="h-8 w-48 bg-gray-800 rounded my-8"></div>

      {/* List Skeleton */}
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-gray-800 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-800 rounded w-1/4"></div>
              <div className="h-3 bg-gray-800 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
