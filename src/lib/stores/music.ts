import type Song from '../types/song'
import type Album from '../types/album'

import { writable } from 'svelte/store'
import { getMusicFolders } from '../musicFolders'
import { searchSongs } from '../musicFiles'
import { getAlbumPicture } from '../pictures'
import shuffle from '../shuffle'

const createMusic = () => {
  const { subscribe, set, update } = writable<{
    songs: Song[]
    albums: Album[]
    folders: string[]
    tracks: Song[]
    orderedTracks: Song[]
    currentSong: Song | null
    currentSongIndex: number
    shuffle: boolean
    loop: boolean
  }>({
    songs: [],
    albums: [],
    folders: [],
    tracks: [],
    orderedTracks: [],
    currentSong: null,
    currentSongIndex: -1,
    shuffle: false,
    loop: false,
  })

  const songIndex = new Map<string, Song>()
  const albumIndex = new Map<string, Album>()

  const getSong = (path: string) => songIndex.get(path)
  const getAlbum = (title: string) => albumIndex.get(title)

  subscribe(({ songs, albums }) => {
    songIndex.clear()
    albumIndex.clear()

    songs.forEach((song) => songIndex.set(song.path, song))
    albums.forEach((album) => albumIndex.set(album.title, album))
  })

  const load = async () => {
    const folders = await getMusicFolders()
    const songsPromise = folders.map(searchSongs)
    const songs = (await Promise.all(songsPromise)).flat()

    const albums: Album[] = []
    const albumsIndex = new Map<string, Album>()

    for (const song of songs) {
      const album = albumsIndex.get(song.album)

      if (album) {
        album.songs.push(song)
        continue
      }

      const newAlbum = {
        title: song.album,
        artist: song.artist,
        songs: [song],
      }

      albums.push(newAlbum)
      albumsIndex.set(song.album, newAlbum)
    }

    for (const album of albums) {
      album.artworkUrl = await getAlbumPicture(album)
    }

    update((state) => ({
      ...state,
      songs,
      albums,
      folders,
    }))
  }

  const setSongsToTracks = (...tracks: Song[]) => {
    update((state) => ({
      ...state,
      tracks,
      orderedTracks: tracks,
      currentSong: tracks[0],
      currentSongIndex: 0,
      shuffle: false,
      loop: false,
    }))
  }

  const setAlbumToTracks = (album: Album) => setSongsToTracks(...album.songs)

  const nextTrack = () => {
    update((state) => {
      const { currentSongIndex, tracks } = state
      const nextSongIndex = currentSongIndex + 1
      const nextSong = tracks[nextSongIndex]

      if (!nextSong) return state

      return {
        ...state,
        currentSong: nextSong,
        currentSongIndex: nextSongIndex,
      }
    })
  }

  const previousTrack = () => {
    update((state) => {
      const { currentSongIndex, tracks } = state
      const previousSongIndex = currentSongIndex - 1
      const previousSong = tracks[previousSongIndex]

      if (!previousSong) return state

      return {
        ...state,
        currentSong: previousSong,
        currentSongIndex: previousSongIndex,
      }
    })
  }

  const repeatTracks = () => {
    update((state) => ({
      ...state,
      currentSong: state.tracks[0],
      currentSongIndex: 0,
    }))
  }

  const resetTracks = () => {
    update((state) => ({
      ...state,
      tracks: [],
      orderedTracks: [],
      currentSong: null,
      currentSongIndex: -1,
      shuffle: false,
      loop: false,
    }))
  }

  const shuffleTracks = () => {
    update((state) => {
      if (state.shuffle) return state

      const { tracks, currentSong } = state

      const shuffledTracks = shuffle(
        tracks.slice(state.currentSongIndex),
        currentSong
      )

      const newTracks = [
        ...tracks.slice(0, state.currentSongIndex),
        ...shuffledTracks,
      ]

      return {
        ...state,
        orderedTracks: tracks,
        tracks: newTracks,
        currentSongIndex: newTracks.indexOf(currentSong),
        shuffle: true,
      }
    })
  }

  const unShuffleTracks = () => {
    update((state) => {
      if (!state.shuffle) return state

      const { orderedTracks } = state
      const currentSongIndex = orderedTracks.indexOf(state.currentSong)

      return {
        ...state,
        tracks: orderedTracks,
        currentSongIndex,
        shuffle: false,
      }
    })
  }

  return {
    subscribe,
    set,
    getSong,
    getAlbum,
    load,
    setSongsToTracks,
    setAlbumToTracks,
    nextTrack,
    previousTrack,
    resetTracks,
    shuffleTracks,
    unShuffleTracks,
    repeatTracks,
  }
}

export default createMusic()
