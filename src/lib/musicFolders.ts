import { audioDir } from '@tauri-apps/api/path'

export const MUSIC_FOLDERS_KEY = 'music-folders'

export const getMusicFolders = async (): Promise<string[]> => {
  const folders = localStorage.getItem(MUSIC_FOLDERS_KEY)

  if (!folders) {
    const value = [await audioDir()]
    localStorage.setItem(MUSIC_FOLDERS_KEY, JSON.stringify(value))
    return value
  }

  return folders ? JSON.parse(folders) : []
}

export const saveMusicFolders = (folders: string[]) =>
  localStorage.setItem(MUSIC_FOLDERS_KEY, JSON.stringify(folders))
