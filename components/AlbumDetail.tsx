"use client";

import { useState, useEffect } from "react";
import TrackList from "./TrackList";
import { Album, Track } from "@/types";
import { getAlbum } from "@/app/actions";

interface AlbumDetailProps {
  slug: string;
}

export default function AlbumDetail({ slug }: AlbumDetailProps) {
  const [album, setAlbum] = useState<Album | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    async function fetchAlbumData() {
      try {
        setLoading(true);
        const { album: albumData, tracks: trackData } = await getAlbum(slug);
        setAlbum(albumData);
        setTracks(trackData);
      } catch (error) {
        console.error("Error fetching album data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAlbumData();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
          </div>
          <div className="w-full md:w-2/3">
            <div className="h-8 w-64 bg-gray-200 dark:bg-gray-800 rounded mb-4 animate-pulse"></div>
            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-8 animate-pulse"></div>
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-4 p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg animate-pulse"
                >
                  <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                  </div>
                  <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!album) return <div>Error loading album</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <img
            src={`${album.metadata.cover.imgix_url}?w=600&q=80&auto=format&fit=crop`}
            alt={album.title}
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {album.title}
          </h1>
          <p className="text-xl mt-2 text-gray-600 dark:text-gray-300">
            {album.metadata.artist.title}
          </p>
          <TrackList tracks={tracks} />
        </div>
      </div>
    </div>
  );
}
