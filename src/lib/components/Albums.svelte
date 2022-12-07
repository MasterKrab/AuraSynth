<script lang="ts">
  import type Album from "../types/album";

  import AlbumItem from "./AlbumItem.svelte";

  export let albums: Album[];
</script>

<article class="albums" aria-label="Albums">
  {#each albums as album, index}
    <AlbumItem {album} loading={index >= 30 ? "eager" : "lazy"} />
  {/each}
</article>

<style>
  .albums {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
    justify-content: center;
    gap: 1rem;
    padding: 0.5rem;
  }
</style>
