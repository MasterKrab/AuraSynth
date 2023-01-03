<script lang="ts">
  import type Album from '../types/album'

  import { onMount } from 'svelte'

  import Artwork from './Artwork.svelte'
  import { getAlbumPicture } from '../pictures'

  export let album: Album

  let url: string | null = null

  onMount(async () => {
    url = await getAlbumPicture(album)
  })
</script>

<Artwork {url} />
