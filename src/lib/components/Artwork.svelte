<script lang="ts">
  import { fade } from 'svelte/transition'

  export let url: string | null = null
  export let alt: string = ''
  export let loading: 'lazy' | 'eager' = 'lazy'
</script>

<span class="image-container" class:image-container--no-image={!url}>
  {#if url}
    <img class="image" in:fade={{ duration: 250 }} src={url} {loading} {alt} />
  {/if}
</span>

<style>
  .image-container {
    display: block;
    max-width: 100%;
    aspect-ratio: 1 / 1;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 60%;
  }

  .image-container--no-image {
    background-image: url('/assets/icons/music-note.svg');
  }

  .image {
    border-radius: 0.25rem;
    object-fit: cover;
  }
</style>
