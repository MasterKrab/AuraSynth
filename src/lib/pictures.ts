import type Picture from './types/picture'
import type Album from './types/album'

import { invoke, convertFileSrc } from '@tauri-apps/api/tauri'
import { exists } from '@tauri-apps/api/fs'
import { cacheDir, join } from '@tauri-apps/api/path'

import { encodeFilename, decodeFilename } from './filenameNormalization'

let cacheDirPath: string
const getCacheDirPath = async () =>
  cacheDirPath ? cacheDirPath : await join(await cacheDir(), 'music-player')

const songsCache = new Map<string, Picture>()

export const getSongPicture = async (path: string) => {
  if (songsCache.has(path)) return songsCache.get(path)

  const picture = (await invoke('get_song_picture', { path })) as Picture

  songsCache.set(path, picture)

  return picture
}

export const getFirstPicture = async (...paths: string[]) => {
  for (const path of paths) {
    const artwork = await getSongPicture(path)
    if (artwork) return artwork
  }

  return null
}

export const writeImageUrl = async (path: string, data: string) => {
  await invoke('write_image_url', { path, data })
}

export const getAlbumPicture = async (album: Album) => {
  const albumPath = await join(
    await getCacheDirPath(),
    'album-artworks',
    encodeFilename(album.artist || 'unknown'),
    encodeFilename(album.title || 'unknown')
  )

  try {
    const isCachedFS = (await exists(albumPath)) as unknown as boolean

    if (isCachedFS) return convertFileSrc(albumPath)

    const artwork = await getFirstPicture(
      ...album.songs.map((song) => song.path)
    )

    if (!artwork) return null

    await writeImageUrl(albumPath, artwork.url)
    return convertFileSrc(albumPath)
  } catch (error) {
    console.error(albumPath, error)
  }
}

// export const preloadSongPictures = async (paths: string[]) => {
//   const promises = paths.map((path) => getSongPicture(path));
//   await Promise.all(promises);
// };

// export const preloadAlbumPictures = async ({ songs }: Album) => {
//   await getFirstPicture(...songs.map(({ path }) => path));
// };
