import type Song from "../types/song";
import type Album from "../types/album";

import { writable } from "svelte/store";
import { getMusicFolders } from "../musicFolders";
import { searchSongs } from "../musicFiles";
import { getAlbumPicture } from "../pictures";

const createMusic = () => {
  const { subscribe, set, update } = writable<{
    songs: Song[];
    albums: Album[];
    folders: string[];
    tracks: Song[];
    currentSong: Song | null;
    currentSongIndex: number;
  }>({
    songs: [],
    albums: [],
    folders: [],
    tracks: [],
    currentSong: null,
    currentSongIndex: -1,
  });

  const songIndex = new Map<string, Song>();
  const albumIndex = new Map<string, Album>();

  const getSong = (path: string) => songIndex.get(path);
  const getAlbum = (title: string) => albumIndex.get(title);

  subscribe(({ songs, albums }) => {
    songIndex.clear();
    albumIndex.clear();

    songs.forEach((song) => songIndex.set(song.path, song));
    albums.forEach((album) => albumIndex.set(album.title, album));
  });

  const load = async () => {
    const folders = await getMusicFolders();
    const songsPromise = folders.map(searchSongs);
    const songs = (await Promise.all(songsPromise)).flat();

    const albums: Album[] = [];

    for (const song of songs) {
      const album = albums.find((album) => album.title === song.album);

      if (album) {
        album.songs.push(song);
        continue;
      }

      albums.push({
        title: song.album,
        artist: song.artist,
        songs: [song],
      });
    }

    for (const album of albums) {
      album.artworkUrl = await getAlbumPicture(album);
    }

    update((state) => ({
      ...state,
      songs,
      albums,
      folders,
    }));
  };

  const setSongsToTracks = (...tracks: Song[]) => {
    update((state) => ({
      ...state,
      tracks,
      currentSong: tracks[0],
      currentSongIndex: 0,
    }));
  };

  const addSongToTracks = (song: Song) => {
    update((state) => ({
      ...state,
      queue: [...state.tracks, song],
    }));
  };

  const setAlbumToTracks = (album: Album) => setSongsToTracks(...album.songs);

  const nextTrack = () => {
    update((state) => {
      const { currentSongIndex, tracks } = state;
      const nextSongIndex = currentSongIndex + 1;
      const nextSong = tracks[nextSongIndex];

      if (!nextSong) return state;

      return {
        ...state,
        currentSong: nextSong,
        currentSongIndex: nextSongIndex,
      };
    });
  };

  const previousTrack = () => {
    update((state) => {
      const { currentSongIndex, tracks } = state;
      const previousSongIndex = currentSongIndex - 1;
      const previousSong = tracks[previousSongIndex];

      if (!previousSong) return state;

      return {
        ...state,
        currentSong: previousSong,
        currentSongIndex: previousSongIndex,
      };
    });
  };

  const resetTracks = () => {
    update((state) => ({
      ...state,
      tracks: [],
      currentSong: null,
      currentSongIndex: -1,
    }));
  };

  return {
    subscribe,
    set,
    getSong,
    getAlbum,
    load,
    setSongsToTracks,
    addSongToTracks,
    setAlbumToTracks,
    nextTrack,
    previousTrack,
    resetTracks,
  };
};

export default createMusic();
