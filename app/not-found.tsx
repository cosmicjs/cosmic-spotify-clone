import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-6xl font-bold text-white">404</h1>
        <h2 className="text-2xl font-semibold text-white">Page Not Found</h2>
        <p className="text-gray-400">
          This is a demo app showing what's possible with Cosmic CMS. The page
          you're looking for doesn't exist in this demo.
        </p>
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors"
          >
            Return Home
          </Link>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <a
              href="https://cosmicjs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Built with Cosmic
            </a>
            <span>•</span>
            <a
              href="https://github.com/cosmicjs/spotify-clone"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
