<script lang="ts">
  import type Picture from '../types/picture'

  import { onMount } from 'svelte'
  import { convertFileSrc } from '@tauri-apps/api/tauri'

  import music from '../stores/music'
  import { updateMediaSessionSong, resetMediaSession } from '../mediaSession'
  import formatSeconds from '../formatSeconds'
  import SongArtwork from './SongArtwork.svelte'
  import MovingText from './MovingText.svelte'
  import PlayerControls from './PlayerControls.svelte'
  import PlayerTracksOptions from './PlayerTracksOptions.svelte'
  import Slider from './Slider.svelte'
  import VolumeSlider from './VolumeSlider.svelte'
  import Svg from './Svg.svelte'

  let audioElement: HTMLAudioElement
  let currentTime = 0
  let isPlaying = false
  let duration = 0
  let playbackRate: number
  let volume = 1
  let showOptions = false
  let artwork: Picture

  $: if (navigator.mediaSession) {
    navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused'
  }

  $: if ($music.currentSong && artwork) {
    updateMediaSessionSong($music.currentSong, artwork)
  }

  $: if (!$music.currentSong) {
    resetMediaSession()
  }

  const updatePositionState = () => {
    navigator.mediaSession.setPositionState({
      duration,
      playbackRate,
      position: currentTime,
    })
  }

  const updateAudioPlayBackState = () => {
    isPlaying ? audioElement.play() : audioElement.pause()
  }

  const handlePlay = () => {
    isPlaying = true
    audioElement.paused && audioElement.play()
  }

  const handlePause = () => {
    isPlaying = false
    !audioElement.paused && audioElement.pause()
  }

  const nextTrack = () => {
    const isLastSong = $music.currentSongIndex === $music.tracks.length - 1

    if (isLastSong && $music.loop) {
      music.repeatTracks()
      currentTime = 0
      audioElement.play()
      return
    }

    if (isLastSong) {
      music.resetTracks()
      isPlaying = false
      return
    }

    music.nextTrack()
  }

  const previousTrack = () => {
    $music.currentSongIndex > 0 ? music.previousTrack() : (currentTime = 0)
  }

  const handleChangeShuffle = ({ detail: shuffle }: CustomEvent<boolean>) => {
    shuffle ? music.shuffleTracks() : music.unShuffleTracks()
  }

  const handleToggleShowOptions = () => {
    showOptions = !showOptions
  }

  onMount(() => {
    if (!navigator.mediaSession) return

    navigator.mediaSession.setActionHandler('play', async () => {
      await audioElement.play()
      updatePositionState()
    })

    navigator.mediaSession.setActionHandler('pause', () => {
      audioElement.pause()
    })

    navigator.mediaSession.setActionHandler('previoustrack', previousTrack)

    navigator.mediaSession.setActionHandler('nexttrack', nextTrack)

    navigator.mediaSession.setActionHandler('seekbackward', () => {
      audioElement.currentTime = Math.max(currentTime - 10, 0)
      updatePositionState()
    })

    navigator.mediaSession.setActionHandler('seekforward', () => {
      audioElement.currentTime = Math.min(currentTime + 10, duration)
    })

    navigator.mediaSession.setActionHandler('seekto', (details) => {
      if (details.fastSeek && 'fastSeek' in audioElement) {
        audioElement.fastSeek(details.seekTime)
      } else {
        audioElement.currentTime = details.seekTime
      }

      updatePositionState()
    })

    navigator.mediaSession.setActionHandler('stop', music.resetTracks)
  })
</script>

<audio
  class="audio"
  src={$music?.currentSong?.path && convertFileSrc($music.currentSong.path)}
  on:play={handlePlay}
  on:pause={handlePause}
  on:ended={nextTrack}
  on:ratechange={updatePositionState}
  bind:this={audioElement}
  bind:currentTime
  bind:duration
  bind:playbackRate
  bind:volume
  autoplay
  controls
/>

<article class="player" aria-label="Player">
  <div class="info">
    {#if $music.currentSong}
      <SongArtwork bind:picture={artwork} path={$music.currentSong.path} />
      <div class="info__text-container">
        <h1 class="info__title">
          <MovingText text={$music.currentSong.title || 'Unknown title'} />
        </h1>
        <p class="info__artist">
          <MovingText text={$music.currentSong.artist || 'Unknown artist'} />
        </p>
      </div>
    {/if}
  </div>

  <PlayerControls
    {isPlaying}
    on:changePlayBackState={updateAudioPlayBackState}
    on:play={handlePlay}
    on:pause={handlePause}
    on:previousTrack={previousTrack}
    on:nextTrack={nextTrack}
    disablePreviousTrack={$music.currentSongIndex <= 0 && currentTime <= 0}
    disableNextTrack={$music.currentSongIndex >= $music.tracks.length - 1}
    disableAll={$music.tracks.length === 0}
  />

  <Slider bind:value={currentTime} max={duration} step={0.01} />

  <p class="time-text">
    {formatSeconds(currentTime)} / {formatSeconds(duration)}
  </p>

  <button
    class="toggle-options"
    on:click={handleToggleShowOptions}
    role="switch"
    aria-checked={showOptions}
    aria-label="Options"
  >
    <Svg
      src="/assets/icons/chevron-down.svg"
      aria-hidden="true"
      fill="var(--quaternary-color)"
      width="2.5rem"
    />
  </button>

  <div class="options" class:options--show={showOptions}>
    <VolumeSlider bind:value={volume} />

    <PlayerTracksOptions
      bind:loop={$music.loop}
      shuffle={$music.shuffle}
      on:changeShuffle={handleChangeShuffle}
    />
  </div>
</article>

<style>
  .audio {
    display: none;
  }

  .player {
    position: relative;
    display: grid;
    grid-template-columns: 6fr 1fr 6fr 1fr;
    align-items: center;
    height: var(--player-height);
    font-size: 0.7rem;
    padding: 0.75rem;
  }

  @media screen and (min-width: 50rem) {
    .player {
      grid-template-columns: 1fr 12.5rem repeat(2, 0.5fr);
    }
  }

  .player > :global(.slider) {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
  }

  .info {
    overflow: hidden;
  }

  .info > :global(.image-container) {
    display: none;
  }

  @media (min-width: 50rem) {
    .info {
      display: grid;
      grid-template-columns: calc(var(--player-height) - 1.5rem) 1fr;
    }

    .info > :global(.image-container) {
      display: block;
    }
  }

  .info__text-container {
    display: flex;
    flex-direction: column;
    font-size: 0.75rem;
    padding: 0.2rem 0.5rem;
    grid-column: 2 / 3;
  }

  .info__title,
  .info__artist {
    margin-top: 0;
    margin-bottom: 0;
  }

  .info__title {
    width: 100%;
    overflow-x: auto;
  }

  .info__artist {
    font-size: 0.9rem;
    font-family: var(--secondary-font);
    color: var(--quinary-color);
  }

  .time-text {
    text-align: center;
    font-size: 0.85rem;
  }

  @media (min-width: 50rem) {
    .time-text {
      text-align: start;
    }
  }

  @media (min-width: 50rem) {
    .toggle-options {
      display: none;
    }
  }

  .options {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 2rem;
    padding: 0.5rem;
    margin-right: 1rem;
  }

  @media (max-width: 50rem) {
    .options {
      position: absolute;
      top: 0;
      right: 0;
      transform: translateY(calc(-100% - 1rem));
      padding: 0.5rem 1.5rem;
      background-color: var(--primary-color);
      border: 1px solid var(--tertiary-color-transparent);
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
    }

    .options--show {
      opacity: 1;
      visibility: visible;
    }
  }

  .options :global(.volume-slider) {
    width: 6rem;
  }
</style>
