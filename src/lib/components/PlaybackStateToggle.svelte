<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import InlineSVG from 'svelte-inline-svg'

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
  {#if isPlaying}
    <InlineSVG src="/assets/icons/pause.svg" width="3.5em" />
  {:else}
    <InlineSVG src="/assets/icons/play.svg" width="3.5em" />
  {/if}
</button>
