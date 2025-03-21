"use client";

import { useState, useRef, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import { Track } from "@/types";

interface MusicPlayerProps {
  track: Track;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

interface WindowWithPlayer extends Window {
  pauseCurrentTrack?: () => void;
  playCurrentTrack?: () => void;
}

export default function MusicPlayer({
  track,
  onPlayStateChange,
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<ReactAudioPlayer>(null);

  // Restore audio position and playing state from localStorage
  useEffect(() => {
    const savedTime = localStorage.getItem(`track-${track.id}-time`);
    const savedIsPlaying = localStorage.getItem(`track-${track.id}-playing`);

    if (savedTime) {
      setCurrentTime(parseFloat(savedTime));
    }
    if (savedIsPlaying) {
      setIsPlaying(savedIsPlaying === "true");
      onPlayStateChange?.(savedIsPlaying === "true");
    }
  }, [track.id, onPlayStateChange]);

  useEffect(() => {
    // Reset player when track changes
    setIsPlaying(false);
    setCurrentTime(0);
    onPlayStateChange?.(false);

    // Set the audio position to the saved time
    const audio = audioRef.current?.audioEl.current;
    if (audio) {
      const savedTime = localStorage.getItem(`track-${track.id}-time`);
      if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
      }
    }
  }, [track, onPlayStateChange]);

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
    // Save current time to localStorage
    localStorage.setItem(`track-${track.id}-time`, time.toString());
  };

  const handleLoadedMetadata = (e: Event) => {
    const target = e.target as HTMLAudioElement;
    setDuration(target.duration);
  };

  const togglePlayPause = () => {
    const audio = audioRef.current?.audioEl.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      onPlayStateChange?.(false);
      localStorage.setItem(`track-${track.id}-playing`, "false");
    } else {
      audio.play();
      onPlayStateChange?.(true);
      localStorage.setItem(`track-${track.id}-playing`, "true");
    }
    setIsPlaying(!isPlaying);
  };

  const pause = () => {
    const audio = audioRef.current?.audioEl.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
    onPlayStateChange?.(false);
    localStorage.setItem(`track-${track.id}-playing`, "false");
  };

  const play = () => {
    const audio = audioRef.current?.audioEl.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    setIsPlaying(true);
    onPlayStateChange?.(true);
    localStorage.setItem(`track-${track.id}-playing`, "true");
  };

  // Expose play and pause functions to parent
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as WindowWithPlayer).pauseCurrentTrack = pause;
      (window as WindowWithPlayer).playCurrentTrack = play;
    }
    return () => {
      if (typeof window !== "undefined") {
        delete (window as WindowWithPlayer).pauseCurrentTrack;
        delete (window as WindowWithPlayer).playCurrentTrack;
      }
    };
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Add keyboard event listener for spacebar
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault(); // Prevent page scroll
        togglePlayPause();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isPlaying, track.id]); // Add dependencies

  if (!track) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={track.metadata.album.metadata.cover.imgix_url}
            className="h-12 w-12 flex-shrink-0 rounded shadow-sm"
            alt={track.title}
          />
          <div className="w-[200px] flex-shrink-0">
            <p className="text-gray-900 dark:text-white font-medium truncate">
              {track.title}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm truncate">
              {track.metadata.album.metadata.artist.title}
            </p>
          </div>
        </div>

        <div className="flex-1 mx-8">
          <div className="flex items-center justify-center space-x-4">
            <button
              className="text-white bg-green-500 hover:bg-green-600 rounded-full p-2 cursor-pointer transition-colors"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-gray-500 dark:text-gray-400 text-xs">
              {formatTime(currentTime)}
            </span>
            <div className="mx-2 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1">
              <div
                className="bg-green-500 h-1 rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>
            <span className="text-gray-500 dark:text-gray-400 text-xs">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>

      <ReactAudioPlayer
        ref={audioRef}
        src={track.metadata.audio.url}
        listenInterval={1000}
        onListen={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        style={{ display: "none" }}
      />
    </div>
  );
}
