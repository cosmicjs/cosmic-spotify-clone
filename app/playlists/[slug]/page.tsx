import PlaylistClient from "@/components/PlaylistClient";

interface PlaylistPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PlaylistPage({ params }: PlaylistPageProps) {
  const { slug } = await params;
  return <PlaylistClient slug={slug} />;
}
