<script lang="ts">
  import type Picture from "../types/picture";

  import { onMount } from "svelte";
  import { convertFileSrc } from "@tauri-apps/api/tauri";

  import music from "../stores/music";
  import { getSongPicture } from "../pictures";
  import { updateMediaSessionSong, resetMediaSession } from "../mediaSession";
  import Artwork from "./Artwork.svelte";

  let audioElement: HTMLAudioElement;
  let currentTime = 0;
  let artwork: Picture | null = null;
  let playing = false;
  let duration = 0;
  let playbackRate: number;
  let volume: number;

  $: navigator.mediaSession.playbackState = playing ? "playing" : "paused";

  $: if ($music.currentSong) {
    artwork = null;

    getSongPicture($music.currentSong.path).then((picture) => {
      artwork = picture;
    });
  }

  $: if ($music.currentSong && artwork)
    updateMediaSessionSong($music.currentSong, artwork);

  $: !$music.currentSong && resetMediaSession();

  const updatePositionState = () => {
    navigator.mediaSession.setPositionState({
      duration,
      playbackRate,
      position: currentTime,
    });
  };

  const handlePlay = () => {
    playing = true;
  };

  const handlePause = () => {
    playing = false;
  };

  const nextTrack = () => {
    $music.currentSongIndex < $music.tracks.length - 1
      ? music.nextTrack()
      : music.resetTracks();
  };

  const handleEnded = () => {
    playing = false;
    nextTrack();
  };

  onMount(() => {
    navigator.mediaSession.setActionHandler("play", async () => {
      await audioElement.play();
      updatePositionState();
    });

    navigator.mediaSession.setActionHandler("pause", () => {
      audioElement.pause();
    });

    navigator.mediaSession.setActionHandler("previoustrack", () => {
      $music.currentSongIndex > 0 ? music.previousTrack() : (currentTime = 0);
    });

    navigator.mediaSession.setActionHandler("nexttrack", nextTrack);

    navigator.mediaSession.setActionHandler("seekbackward", () => {
      audioElement.currentTime = Math.max(currentTime - 10, 0);
      updatePositionState();
    });

    navigator.mediaSession.setActionHandler("seekforward", () => {
      audioElement.currentTime = Math.min(currentTime + 10, duration);
    });

    navigator.mediaSession.setActionHandler("seekto", (details) => {
      if (details.fastSeek && "fastSeek" in audioElement) {
        audioElement.fastSeek(details.seekTime);
      } else {
        audioElement.currentTime = details.seekTime;
      }

      updatePositionState();
    });
    
    navigator.mediaSession.setActionHandler("stop", music.resetTracks);
  });
</script>

<article class="player" aria-label="Player">
  {#if $music.currentSong && artwork}
    <Artwork url={artwork.url} alt={artwork.description} />
  {/if}

  {#key !!$music.currentSong}
    <audio
      src={$music.currentSong ? convertFileSrc($music.currentSong.path) : null}
      disabled={!$music.currentSong}
      on:play={handlePlay}
      on:pause={handlePause}
      on:ended={handleEnded}
      on:ratechange={updatePositionState}
      bind:this={audioElement}
      bind:currentTime
      bind:duration
      bind:playbackRate
      bind:volume
      autoplay
      controls
    />
  {/key}

  <button
    role="switch"
    aria-checked={playing}
    on:click={playing
      ? audioElement.pause.bind(audioElement)
      : audioElement.play.bind(audioElement)}
  >
    {playing ? "Pause" : "Play"}
  </button>

  {#if audioElement}
    <input type="range" bind:value={currentTime} min={0} max={duration} />
  {/if}

  <input type="range" bind:value={volume} min={0} max={1} step={0.01} />
</article>

<style>
  .player {
    display: flex;
    height: var(--player-height, 15rem);
    font-size: 0.5rem;
  }
</style>
