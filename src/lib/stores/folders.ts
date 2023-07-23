import { writable } from 'svelte/store'
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

const createFolders = () => {
  const { subscribe, set, update } = writable<{
    paths: string[]
  }>({
    paths: null,
  })

  subscribe(({ paths }) => {
    if (paths === null) return

    localStorage.setItem(MUSIC_FOLDERS_KEY, JSON.stringify(paths))
  })

  const load = () => getMusicFolders().then((paths) => set({ paths }))

  const add = async (...paths: string[]) => {
    update((state) => ({
      paths: [...state.paths, ...paths],
    }))
  }

  const remove = async (path: string) => {
    update((state) => ({
      paths: state.paths.filter((currentPath) => currentPath !== path),
    }))
  }

  load()

  return {
    subscribe,
    set,
    add,
    remove,
    load,
  }
}

export default createFolders()
