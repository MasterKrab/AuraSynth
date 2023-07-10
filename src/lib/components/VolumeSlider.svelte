<script lang="ts">
  import Svg from './Svg.svelte'

  import Slider from './Slider.svelte'

  import evaluateVolume from '../evaluateVolume'

  export let value = 1

  $: if (value < 0 || value > 1)
    throw new Error('Value must be between 0 and 1')

  export let step = 0.01
  export let showIcon = true
</script>

<div class="volume-slider">
  {#if showIcon}
    <Svg
      src="assets/icons/{evaluateVolume(value)}-audio.svg"
      aria-hidden="true"
      fill="var(--quaternary-color)"
      width="2.5rem"
    />
  {/if}

  <Slider bind:value min={0} max={1} {step} alwaysShowThumb />
</div>

<style>
  .volume-slider {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
</style>
