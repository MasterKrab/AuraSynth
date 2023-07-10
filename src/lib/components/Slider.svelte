<script lang="ts">
  export let value: number = 0
  export let min: number = 0
  export let max: number = 100
  export let step: number = 1
  export let alwaysShowThumb = false
</script>

<input
  class="slider"
  class:slider--show-thumb={alwaysShowThumb}
  type="range"
  bind:value
  {min}
  {max}
  {step}
  style="--value-percentage: {(value / (max - min)) * 100}%"
/>

<style>
  .slider {
    position: relative;
    appearance: none;
    background-color: var(--quinary-color);
    width: 100%;
    height: 0.25em;
  }

  .slider::-webkit-slider-thumb {
    appearance: none;
    background-color: var(--tertiary-color);
    border-radius: 50%;
    width: 0.7em;
    height: 0.7em;
    transform: scale(0);
    transition: transform 0.2s;
  }

  .slider:hover::-webkit-slider-thumb,
  .slider:focus-visible::-webkit-slider-thumb {
    transform: scale(1);
  }
  .slider--show-thumb::-webkit-slider-thumb {
    transform: scale(1);
  }

  .slider::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--tertiary-color);
    width: var(--value-percentage);
    height: 0.1em;
    margin-top: 0.1em;
    transition: transform 0.2s;
  }

  .slider:hover::before,
  .slider:focus-visible::before {
    transform: scaleY(3);
  }

  .slider--show-thumb::before {
    transform: scaleY(3);
  }
</style>
