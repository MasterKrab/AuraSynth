<script lang="ts">
  import type Album from "../types/album";

  import { fly } from "svelte/transition";

  import music from "../stores/music";
  import Artwork from "./Artwork.svelte";

  export let album: Album;
  export let loading: "lazy" | "eager" = "eager";

  const createHandleClick = (album: Album) => (event: MouseEvent) => {
    if (event.detail !== 2) return;

    music.setAlbumToTracks(album);
  };
</script>

<article
  class="album"
  aria-label="Album"
  transition:fly={{ y: 50, duration: 500 }}
  on:click={createHandleClick(album)}
>
  <Artwork url={album.artworkUrl} {loading} />
  <h2 class="album__title">{album.title || "Unknown title"}</h2>
  <p class="album__artist">{album.artist || "Unknown artist"}</p>
</article>

<style>
  .album__title {
    font-size: 1rem;
  }
</style>
