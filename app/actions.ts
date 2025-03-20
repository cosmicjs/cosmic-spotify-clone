"use server";

import cosmic from "@/lib/cosmic";
import { Album, Track, Playlist } from "@/types";

export async function getAlbums() {
  const { objects } = await cosmic.objects
    .find({
      type: "albums",
    })
    .props(["id", "title", "slug", "metadata.cover", "metadata.artist"])
    .depth(1);

  return objects as Album[];
}

export async function getPlaylists() {
  const { objects } = await cosmic.objects
    .find({
      type: "playlists",
    })
    .props(["id", "title", "slug", "metadata.cover", "metadata.description"])
    .depth(1);

  return objects as Playlist[];
}

export async function getAlbum(slug: string) {
  const { object: albumData } = await cosmic.objects
    .findOne({
      type: "albums",
      slug,
    })
    .props(["id", "title", "metadata"])
    .depth(1);

  const { objects: trackData } = await cosmic.objects
    .find({
      type: "tracks",
      "metadata.album": albumData.id,
    })
    .props(["id", "title", "metadata"])
    .depth(1);

  return {
    album: albumData as Album,
    tracks: trackData as Track[],
  };
}

export async function getPlaylist(slug: string) {
  const { object: playlistData } = await cosmic.objects
    .findOne({
      type: "playlists",
      slug,
    })
    .props([
      "title",
      "metadata.description",
      "metadata.cover",
      "metadata.tracks",
    ])
    .depth(2);

  return playlistData as Playlist;
}
