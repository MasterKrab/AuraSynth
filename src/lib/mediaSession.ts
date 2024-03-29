import type Song from './types/song'
import type Picture from './types/picture'

export const supportsMediaSession = 'mediaSession' in navigator

export const updateMediaSessionSong = (song: Song, picture?: Picture) => {
  if (!supportsMediaSession) return

  navigator.mediaSession.metadata = new MediaMetadata({
    title: song.title,
    artist: song.artist,
    album: song.album,
    artwork: picture
      ? [{ src: picture.url, sizes: '512x512', type: picture.mime_type }]
      : [],
  })
}

export const resetMediaSession = () => {
  if (!supportsMediaSession) return

  navigator.mediaSession.setPositionState(null)
  navigator.mediaSession.metadata = new MediaMetadata()
}
