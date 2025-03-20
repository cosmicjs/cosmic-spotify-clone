import MusicLibrary from "@/components/MusicLibrary";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Spotify Clone</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Browse Albums</h2>
        <MusicLibrary />
      </section>
    </main>
  );
}
