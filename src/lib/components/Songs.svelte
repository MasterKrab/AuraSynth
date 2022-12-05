<script lang="ts">
  import type Song from "../types/song";

  import music from "../stores/music";

  export let songs: Song[];

  const createPlaySong = (song: Song) => () => {
    music.setSongsToTracks(song);
  };
</script>

<article class="songs" aria-label="Songs">
  {#each songs as song}
    <article tabindex={0} class="song">
      <button
        on:click={createPlaySong(song)}
        aria-label="Play song: {song.title}">Play</button
      >
      <h2>{song.title}</h2>
      <p>{song.artist}</p>
      <p>{song.album}</p>
      <p>{song.year}</p>
      <p>{song.duration}</p>
    </article>
  {/each}
</article>

<style>
  .songs {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .song {
    display: flex;
    gap: 1rem;
    padding: 1rem;
  }

  .song:focus {
    outline: 1px solid black;
  }
</style>
