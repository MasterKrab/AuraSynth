<script lang="ts">
  import type Picture from '../types/picture'

  import { onMount } from 'svelte'
  import { convertFileSrc } from '@tauri-apps/api/tauri'

  import music from '../stores/music'
  import { getSongPicture } from '../pictures'
  import { updateMediaSessionSong, resetMediaSession } from '../mediaSession'
  import formatSeconds from '../formatSeconds'
  import Artwork from './Artwork.svelte'
  import PlayerControls from './PlayerControls.svelte'
  import PlayerTracksOptions from './PlayerTracksOptions.svelte'

  let audioElement: HTMLAudioElement
  let currentTime = 0
  let artwork: Picture | null = null
  let isPlaying = false
  let duration = 0
  let playbackRate: number
  let volume: number

  $: navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused'

  $: if ($music.currentSong?.path) {
    artwork = null

    getSongPicture($music.currentSong.path).then((picture) => {
      artwork = picture
    })
  }

  $: if ($music.currentSong && artwork)
    updateMediaSessionSong($music.currentSong, artwork)

  $: if (!$music.currentSong) {
    artwork = null
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

  onMount(() => {
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

<article class="player" aria-label="Player">
  {#if artwork}
    <Artwork url={artwork.url} alt={artwork.description} />
  {/if}

  {#if $music.currentSong}
    <h1>{$music.currentSong.title || 'Unknown title'}</h1>
    <p>{$music.currentSong.artist || 'Unknown artist'}</p>
  {/if}

  <p>{formatSeconds(currentTime)} / {formatSeconds(duration)}</p>

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

  {#if audioElement}
    <input type="range" bind:value={currentTime} min={0} max={duration} />
  {/if}

  <input type="range" bind:value={volume} min={0} max={1} step={0.01} />

  <PlayerTracksOptions
    bind:loop={$music.loop}
    shuffle={$music.shuffle}
    on:changeShuffle={handleChangeShuffle}
  />
</article>

<style>
  .player {
    display: flex;
    height: var(--player-height, 15rem);
    font-size: 0.5rem;
  }

  .audio {
    display: none;
  }
</style>
