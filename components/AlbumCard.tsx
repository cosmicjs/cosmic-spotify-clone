import Link from "next/link";
import { Album } from "@/types";

interface AlbumCardProps {
  album: Album;
}

export default function AlbumCard({ album }: AlbumCardProps) {
  return (
    <Link href={`/albums/${album.slug}`}>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer shadow-sm">
        <img
          src={`${
            album.metadata.cover?.imgix_url || "/placeholder-album.jpg"
          }?w=400&q=80&auto=format&fit=crop`}
          alt={album.title}
          className="w-full aspect-square object-cover rounded-md mb-2 shadow-sm"
        />
        <h3 className="font-semibold truncate text-gray-900 dark:text-white">
          {album.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {album.metadata.artist?.title || "Unknown artist"}
        </p>
      </div>
    </Link>
  );
}
