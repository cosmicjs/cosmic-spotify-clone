import MusicLibrary from "@/components/MusicLibrary";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-1">Welcome to Spotify Clone</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Powered by{" "}
        <a
          href="https://cosmicjs.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900 dark:hover:text-white"
        >
          Cosmic
        </a>
      </p>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Browse Albums</h2>
        <MusicLibrary />
      </section>
    </main>
  );
}
