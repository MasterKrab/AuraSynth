<script lang="ts">
  import type Picture from '../types/picture'

  import Artwork from './Artwork.svelte'
  import { getSongPicture } from '../pictures'

  export let path: string
  export let picture: Picture = null

  $: getSongPicture(path).then((result) => {
    picture = result
  })
</script>

<Artwork url={picture?.url} alt={picture?.description} />
