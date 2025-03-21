export default function Footer() {
  return (
    <footer className="py-6 px-4 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            This is a demo app showing what&apos;s possible with Cosmic CMS
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="https://cosmicjs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Built with Cosmic
            </a>
            <a
              href="https://github.com/cosmicjs/cosmic-spotify-clone"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
