import Lyrics from './lyrics'

interface Song {
  path: string
  title?: string
  artist?: string
  album?: string
  year?: string
  track?: number
  genre: ?string
}

export default Song