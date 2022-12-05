<script lang="ts">
  import type Album from "../types/album";

  import { fly } from "svelte/transition";

  import music from "../stores/music";
  import Artwork from "./Artwork.svelte";

  export let albums: Album[];

  const createHandleClick = (album: Album) => (event: MouseEvent) => {
    if (event.detail !== 2) return;

    music.setAlbumToTracks(album);
  };
</script>

<article class="albums" aria-label="Albums">
  {#each albums as album, index}
    <article
      class="album"
      aria-label="Album"
      transition:fly={{ y: 50, duration: 500 }}
      on:click={createHandleClick(album)}
    >
      <Artwork
        url={album.artworkUrl}
        loading={index >= 30 ? "eager" : "lazy"}
      />
      <h2 class="album__title">{album.title || "Unknown title"}</h2>
      <p class="album__artist">{album.artist || "Unknown artist"}</p>
    </article>
  {/each}
</article>

<style>
  .albums {
    display: grid;
    grid-template-columns: repeat(auto-fit, 11em);
    justify-content: center;
    gap: 1rem;
    font-size: 1rem;
  }

  .album__title {
    font-size: 1rem;
  }
</style>
