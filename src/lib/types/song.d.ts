import Picture from './picture'
import Lyrics from './lyrics'

interface Song {
  path: string
  title?: string
  artist?: string
  album?: string
  year?: string
  comment?: string
  track?: number
  genre: ?string
  lyrics: Lyrics[]
  duration: number
}

export default Song
