<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import Svg from './Svg.svelte'

  export let isPlaying: boolean = false
  export let disabled = false

  const dispatch = createEventDispatcher<{ change: MouseEvent }>()

  const handleClick = (event: MouseEvent) => dispatch('change', event)
</script>

<button
  on:click={handleClick}
  role="switch"
  aria-checked={isPlaying}
  aria-label="Play/Pause"
  {disabled}
>
  <Svg
    src="/assets/icons/pause.svg"
    width="2.5em"
    fill="var(--quaternary-color)"
    display={isPlaying ? 'block' : 'none'}
  />
  <Svg
    src="/assets/icons/play.svg"
    width="2.5em"
    fill="var(--quaternary-color)"
    display={isPlaying ? 'none' : 'block'}
  />
</button>
