import type Picture from './picture'

interface Album {
  title?: string
  artist?: string
  year?: string
  genre?: string
  artworkUrl?: string
  songs: Song[]
}

export default Album
