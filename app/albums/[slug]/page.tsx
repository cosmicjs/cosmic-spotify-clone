import AlbumDetail from "@/components/AlbumDetail";

interface AlbumPageProps {
  params: {
    slug: string;
  };
}

export default function AlbumPage({ params }: AlbumPageProps) {
  return <AlbumDetail slug={params.slug} />;
}
