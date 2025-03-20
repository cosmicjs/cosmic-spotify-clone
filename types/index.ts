export interface Track {
  id: string;
  title: string;
  metadata: {
    audio: {
      url: string;
    };
    duration: number;
    album: {
      metadata: {
        cover: {
          imgix_url: string;
        };
        artist: {
          title: string;
        };
      };
    };
  };
}

export interface Album {
  id: string;
  slug: string;
  title: string;
  metadata: {
    cover: {
      imgix_url: string;
    };
    artist: {
      title: string;
    };
  };
}

export interface Playlist {
  id: string;
  title: string;
  metadata: {
    description: string;
    cover: {
      imgix_url: string;
    };
    tracks: Track[];
  };
}
