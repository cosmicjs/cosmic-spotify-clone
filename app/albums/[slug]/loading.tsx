export default function AlbumLoading() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <div className="aspect-square bg-gray-800 rounded-lg animate-pulse"></div>
        </div>
        <div className="w-full md:w-2/3">
          <div className="h-8 w-64 bg-gray-800 rounded mb-4 animate-pulse"></div>
          <div className="h-6 w-48 bg-gray-800 rounded mb-8 animate-pulse"></div>
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg animate-pulse"
              >
                <div className="h-10 w-10 bg-gray-700 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/3"></div>
                </div>
                <div className="h-4 w-12 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
