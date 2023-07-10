<script lang="ts">
  import type Song from '../types/song'

  import music from '../stores/music'
  import SongArtwork from './SongArtwork.svelte'
  import formatSeconds from '../formatSeconds'

  export let songs: Song[]

  const createPlaySongDoubleClick = (song: Song) => (event: MouseEvent) => {
    if (event.detail !== 2) return

    music.setSongsToTracks(song)
  }
  createPlaySongDoubleClick
  const createPlaySong = (song: Song) => () => {
    music.setSongsToTracks(song)
  }
</script>

<article class="songs" aria-label="Songs" tabindex={0}>
  {#each songs as song}
    <article class="song" on:click={createPlaySongDoubleClick(song)}>
      <button
        class="button"
        aria-label="Play song: {song.title}"
        on:click={createPlaySong(song)}
      >
        <SongArtwork path={song.path} />
      </button>
      <h2 class="title">{song.title || 'Unknown title'}</h2>
      <p class="text">{song.artist || 'Unknown artist'}</p>
      <p class="text">{song.album || 'Unknown album'}</p>

      {#if song.year}
        <p class="text">{song.year}</p>
      {/if}

      <p class="text">{formatSeconds(song.duration)}</p>
    </article>
  {/each}
</article>

<style>
  .songs {
    display: flex;
    flex-direction: column;
    font-size: 0.75em;
  }

  .song {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    padding: 0.25rem;
  }

  .song:focus {
    outline: 1px solid black;
  }

  .button {
    position: relative;
    min-width: 3.5rem;
    width: 4rem;
    max-width: 6rem;
  }

  .button::before,
  .button::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    opacity: 0;
    transition: opacity 0.25s;
  }

  .button::before {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .button::after {
    background-image: url('/assets/icons/play.svg');
    background-size: 40%;
    background-repeat: no-repeat;
    background-position: center;
    filter: invert(1);
    transition: opacity 0.2s transform 0.5s;
  }

  .button:active::after {
    transform: scale(0.9);
  }

  .button:hover::before {
    opacity: 1;
  }

  .button:hover::after {
    opacity: 0.75;
  }

  .title,
  .text {
    margin-top: 0;
    margin-bottom: 0;
  }

  .title {
    width: 40%;
    font-size: 1em;
  }

  @media (min-width: 50rem) {
    .title {
      width: 100%;
      font-size: 1.25em;
    }
  }

  .text {
    width: 25%;
  }

  @media (max-width: 20rem) {
    .text:nth-child(3) {
      position: absolute;
      transform: scale(0);
    }
  }

  @media (max-width: 50rem) {
    .text:nth-child(4),
    .text:nth-child(5),
    .text:nth-child(6) {
      position: absolute;
      transform: scale(0);
    }
  }
</style>
