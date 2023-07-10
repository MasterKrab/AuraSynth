<script lang="ts">
  import type Album from '../types/album'

  import { fly } from 'svelte/transition'

  import music from '../stores/music'
  import Artwork from './Artwork.svelte'
  import Svg from './Svg.svelte'

  export let album: Album
  export let loading: 'lazy' | 'eager' = 'eager'

  const handleClickPlay = () => {
    music.setAlbumToTracks(album)
  }
</script>

<article
  class="album"
  aria-label="Album"
  transition:fly={{ y: 50, duration: 500 }}
>
  <div class="album__artwork-container">
    <Artwork url={album.artworkUrl} {loading} />

    <button class="album__button" on:click={handleClickPlay}>
      <Svg
        src="/assets/icons/play.svg"
        width="1.75em"
        fill="var(--tertiary-color)"
      />
    </button>
  </div>
  <h2 class="album__title">{album.title || 'Unknown title'}</h2>
  <p class="album__artist">{album.artist || 'Unknown artist'}</p>
</article>

<style>
  .album {
    color: var(--tertiary-color);
  }

  .album__artwork-container {
    position: relative;
    transition: box-shadow 0.2s;
  }

  .album__artwork-container:hover,
  .album__artwork-container:focus-visible {
    box-shadow: 0 0 0.75em 0.25em var(--quaternary-color-transparent);
  }

  .album__artwork-container:hover .album__button {
    opacity: 1;
  }

  .album__button {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5em;
    height: 5em;
    background-color: var(--tertiary-color-transparent);
    padding-left: 0.5rem;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.5s, transform 0.5s;
  }

  .album__button:focus-visible {
    opacity: 1;
  }

  .album__button:active {
    transform: translate(-50%, -50%) scale(0.9);
  }

  .album__title {
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }

  .album__artist {
    font-weight: 300;
    font-size: 0.8rem;
    margin-top: 0;
  }
</style>
