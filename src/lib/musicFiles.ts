import type Song from './types/song'

import { readDir } from '@tauri-apps/api/fs'
import { invoke } from '@tauri-apps/api/tauri'

export const MUSIC_EXTENSIONS = ['mp3', 'wav', 'ogg', 'flac', 'm4a', 'aac']

export const MUSIC_EXTENSIONS_SET = new Set(MUSIC_EXTENSIONS)

export const getIsMusicFile = (path: string) => {
  const extension = path.split('.').pop()
  return extension && MUSIC_EXTENSIONS_SET.has(extension)
}

export const searchMusicPaths = async (
  directory: string
): Promise<string[]> => {
  const entries = await readDir(directory, { recursive: true })

  const promises = []

  for (const { children, name, path } of entries) {
    if (children) {
      promises.push(searchMusicPaths(path))
      continue
    }

    getIsMusicFile(name) && promises.push(Promise.resolve(path))
  }

  const paths = await Promise.all(promises)

  return paths.flat()
}

export const readSongMetadata = (path: string): Promise<Song> =>
  invoke('read_song_metadata', { path })

export const searchSongs = async (directory: string) => {
  const paths = await searchMusicPaths(directory)

  const promises = paths.map(async (path) => {
    const song = await readSongMetadata(path)

    return { path, ...song }
  })

  return Promise.all(promises)
}
