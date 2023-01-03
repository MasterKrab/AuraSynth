<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import InlineSVG from 'svelte-inline-svg'

  import PlaybackStateToggle from './PlaybackStateToggle.svelte'

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

<button
  on:click={handlePreviusTrack}
  aria-label="Previous track"
  disabled={disableAll || disablePreviousTrack}
>
  <InlineSVG src="/assets/icons/fast-backward.svg" width="3.5em" />
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
  <InlineSVG src="/assets/icons/fast-forward.svg" width="3.5em" />
</button>
