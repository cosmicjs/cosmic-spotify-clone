import Link from "next/link";
import { Album } from "@/types";

interface AlbumCardProps {
  album: Album;
}

export default function AlbumCard({ album }: AlbumCardProps) {
  return (
    <Link href={`/albums/${album.slug}`}>
      <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition cursor-pointer">
        <img
          src={`${
            album.metadata.cover?.imgix_url || "/placeholder-album.jpg"
          }?w=400&q=80&auto=format&fit=crop`}
          alt={album.title}
          className="w-full aspect-square object-cover rounded-md mb-2"
        />
        <h3 className="font-semibold truncate">{album.title}</h3>
        <p className="text-sm text-gray-400 truncate">
          {album.metadata.artist?.title || "Unknown artist"}
        </p>
      </div>
    </Link>
  );
}
