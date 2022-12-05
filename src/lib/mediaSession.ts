import type Song from "./types/song";
import type Picture from "./types/picture";

export const updateMediaSessionSong = (song: Song, picture?: Picture) => {
  if (!("mediaSession" in navigator)) return;

  const mediaMetadata: MediaMetadataInit = {
    title: song.title,
    artist: song.artist,
    album: song.album,
    artwork: picture
      ? [{ src: picture.url, sizes: "512x512", type: picture.mime_type }]
      : [],
  };

  navigator.mediaSession.metadata = new MediaMetadata(mediaMetadata);
};

export const resetMediaSession = () => {
  if (!("mediaSession" in navigator)) return;

  navigator.mediaSession.setPositionState(null);
  navigator.mediaSession.metadata = new MediaMetadata();
};
