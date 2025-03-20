"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TrackList from "@/components/TrackList";
import { getPlaylist } from "@/app/actions";
import { Playlist, Track } from "@/types";

interface PlaylistPageProps {
  params: {
    slug: string;
  };
}

export default function PlaylistPage({ params }: PlaylistPageProps) {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlaylistData() {
      try {
        const playlistData = await getPlaylist(params.slug);
        setPlaylist(playlistData);

        // If playlist has tracks, get them
        if (
          playlistData.metadata.tracks &&
          playlistData.metadata.tracks.length > 0
        ) {
          setTracks(playlistData.metadata.tracks);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching playlist data:", error);
        setLoading(false);
      }
    }

    if (params.slug) {
      fetchPlaylistData();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <div className="animate-pulse aspect-square bg-gray-700 rounded-lg"></div>
          </div>
          <div className="w-full md:w-2/3">
            <div className="animate-pulse space-y-6">
              <div className="h-8 w-1/2 bg-gray-700 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-700 rounded"></div>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-gray-700 rounded"></div>
                    <div className="flex-1">
                      <div className="h-4 w-1/4 bg-gray-700 rounded mb-1"></div>
                      <div className="h-3 w-1/3 bg-gray-700 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Playlist Not Found</h1>
        <p className="text-xl text-gray-400 mb-8">
          This is a demo app showing what&apos;s possible with Cosmic CMS.
        </p>
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
          >
            Return Home
          </Link>
          <div className="flex space-x-4 text-sm text-gray-400">
            <a
              href="https://cosmicjs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Visit Cosmic
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
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <img
            src={`${playlist.metadata.cover.imgix_url}?w=600&q=80&auto=format&fit=crop`}
            alt={playlist.title}
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold">{playlist.title}</h1>
          <p className="text-xl mt-2">{playlist.metadata.description}</p>
          <TrackList tracks={tracks} />
        </div>
      </div>
    </div>
  );
}
