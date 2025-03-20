"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import MusicPlayer from "@/components/MusicPlayer";
import { Track } from "@/types";

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  togglePlayPause: (track: Track) => void;
}

interface WindowWithPlayer extends Window {
  pauseCurrentTrack?: () => void;
  playCurrentTrack?: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Persist player state in localStorage
  useEffect(() => {
    const savedTrack = localStorage.getItem("currentTrack");
    const savedIsPlaying = localStorage.getItem("isPlaying");

    if (savedTrack) {
      setCurrentTrack(JSON.parse(savedTrack));
      setIsPlaying(savedIsPlaying === "true");
    }
  }, []);

  // Save player state to localStorage when it changes
  useEffect(() => {
    if (currentTrack) {
      localStorage.setItem("currentTrack", JSON.stringify(currentTrack));
      localStorage.setItem("isPlaying", isPlaying.toString());
    }
  }, [currentTrack, isPlaying]);

  const togglePlayPause = (track: Track) => {
    if (currentTrack?.id === track.id) {
      // If clicking the currently playing track, toggle play/pause
      if (isPlaying) {
        const pauseTrack = (window as WindowWithPlayer).pauseCurrentTrack;
        if (typeof window !== "undefined" && pauseTrack) {
          pauseTrack();
        }
      } else {
        const playTrack = (window as WindowWithPlayer).playCurrentTrack;
        if (typeof window !== "undefined" && playTrack) {
          playTrack();
        }
      }
    } else {
      // Otherwise, play the new track
      setCurrentTrack(track);
      setIsPlaying(true);
      // Add a small delay to ensure the track is set before trying to play
      setTimeout(() => {
        const playTrack = (window as WindowWithPlayer).playCurrentTrack;
        if (typeof window !== "undefined" && playTrack) {
          playTrack();
        }
      }, 0);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        togglePlayPause,
      }}
    >
      {children}
      {currentTrack && (
        <MusicPlayer track={currentTrack} onPlayStateChange={setIsPlaying} />
      )}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
