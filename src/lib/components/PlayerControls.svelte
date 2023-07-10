<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  import PlaybackStateToggle from './PlaybackStateToggle.svelte'
  import Svg from './Svg.svelte'

  export let isPlaying: boolean
  export let disablePlayBackState: boolean = false
  export let disablePreviousTrack: boolean = false
  export let disableNextTrack: boolean = false
  export let disableAll: boolean = false

  const dispatch = createEventDispatcher<{
    play: void
    pause: void
    previousTrack: void
    nextTrack: void
  }>()

  const handlePreviusTrack = () => dispatch('previousTrack')
  const handleNextTrack = () => dispatch('nextTrack')

  const handleChangePlayBackState = () => {
    isPlaying ? dispatch('pause') : dispatch('play')
  }
</script>

<section class="player-controls-buttons">
  <button
    on:click={handlePreviusTrack}
    aria-label="Previous track"
    disabled={disableAll || disablePreviousTrack}
  >
    <Svg
      src="/assets/icons/fast-backward.svg"
      width="3em"
      fill="var(--quaternary-color)"
    />
  </button>

  <PlaybackStateToggle
    on:change={handleChangePlayBackState}
    disabled={disableAll || disablePlayBackState}
    {isPlaying}
  />

  <button
    on:click={handleNextTrack}
    aria-label="Next track"
    disabled={disableAll || disableNextTrack}
  >
    <Svg
      src="/assets/icons/fast-forward.svg"
      width="3em"
      fill="var(--quaternary-color)"
    />
  </button>
</section>

<style>
  .player-controls-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2em;
  }
</style>
