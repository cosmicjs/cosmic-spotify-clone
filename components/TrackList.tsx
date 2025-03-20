"use client";

import { Track } from "@/types";
import { usePlayer } from "@/lib/PlayerContext";

interface TrackListProps {
  tracks: Track[];
}

export default function TrackList({ tracks }: TrackListProps) {
  const { currentTrack, isPlaying, togglePlayPause } = usePlayer();

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-3">Tracks</h3>
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-right">Duration</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track, index) => (
              <tr
                key={track.id}
                className={`hover:bg-gray-700 cursor-pointer ${
                  currentTrack?.id === track.id ? "bg-gray-700" : ""
                }`}
                onClick={() => togglePlayPause(track)}
              >
                <td className="px-4 py-3 text-gray-400">{index + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="w-6 h-4 mr-2">
                      {currentTrack?.id === track.id ? (
                        <svg
                          className="h-4 w-4 text-green-500"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          {isPlaying ? (
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                          ) : (
                            <path d="M8 5v14l11-7z" />
                          )}
                        </svg>
                      ) : null}
                    </div>
                    <span>{track.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right text-gray-400">
                  {formatDuration(track.metadata.duration)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
