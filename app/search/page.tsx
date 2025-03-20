import Link from "next/link";

export default function Search() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-8 text-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        Search
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        This is a demo app showing what&apos;s possible with Cosmic CMS.
      </p>
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-block bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          Return Home
        </Link>
        <div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <a
            href="https://cosmicjs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Visit Cosmic
          </a>
          <span>•</span>
          <a
            href="https://github.com/cosmicjs/cosmic-spotify-clone"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
