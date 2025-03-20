"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Playlist } from "@/types";
import { getPlaylists } from "@/app/actions";

export default function Navigation() {
  const pathname = usePathname();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const playlistsData = await getPlaylists();
        setPlaylists(playlistsData);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlaylists();
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed left-0 top-0 w-64 h-screen bg-white dark:bg-black p-6 flex flex-col border-r border-gray-200 dark:border-gray-800">
      {/* Logo */}
      <div className="mb-8">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-900 dark:text-white"
        >
          Spotify Clone
        </Link>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Powered by{" "}
          <a
            href="https://cosmicjs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1DB954] hover:text-[#1ed760]"
          >
            Cosmic
          </a>
        </p>
      </div>

      {/* Browse */}
      <div className="space-y-4">
        <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Browse
        </h2>
        <div className="space-y-2">
          <Link
            href="/"
            className={`flex items-center space-x-4 text-sm font-medium ${
              isActive("/")
                ? "text-gray-900 dark:text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>Home</span>
          </Link>
          <Link
            href="/search"
            className={`flex items-center space-x-4 text-sm font-medium ${
              isActive("/search")
                ? "text-gray-900 dark:text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span>Search</span>
          </Link>
          <Link
            href="/library"
            className={`flex items-center space-x-4 text-sm font-medium ${
              isActive("/library")
                ? "text-gray-900 dark:text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span>Your Library</span>
          </Link>
        </div>
      </div>

      {/* Playlists */}
      <div className="mt-8 space-y-4">
        <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Playlists
        </h2>
        <div className="space-y-2">
          {loading ? (
            // Loading skeleton for playlists
            [...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-32 animate-pulse"></div>
              </div>
            ))
          ) : (
            <>
              {playlists.map((playlist) => (
                <Link
                  key={playlist.id}
                  href={`/playlists/${playlist.slug}`}
                  className={`flex items-center space-x-4 text-sm font-medium ${
                    isActive(`/playlists/${playlist.slug}`)
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span>{playlist.title}</span>
                </Link>
              ))}
              <Link
                href="/playlists/liked-songs"
                className="flex items-center space-x-4 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>Liked Songs</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
