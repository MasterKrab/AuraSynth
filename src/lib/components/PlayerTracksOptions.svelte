<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import Svg from './Svg.svelte'

  export let loop: boolean = false
  export let shuffle: boolean = false
  export let disableAll: boolean = false

  const dispatch = createEventDispatcher<{
    changeShuffle: boolean
  }>()

  const handleChangeLoop = () => {
    loop = !loop
  }

  const handleChangeShuffle = () => {
    shuffle = !shuffle
    dispatch('changeShuffle', shuffle)
  }
</script>

<section class="buttons">
  <button
    on:click={handleChangeLoop}
    aria-label="looped"
    role="switch"
    aria-checked={loop}
    disabled={disableAll}
  >
    <Svg
      src="/assets/icons/loop-replay.svg"
      width="2.5em"
      fill="var(--quaternary-color)"
      opacity={loop ? '1' : '0.6'}
    />
  </button>

  <button
    on:click={handleChangeShuffle}
    aria-label="shuffle"
    role="switch"
    aria-checked={shuffle}
    disabled={disableAll}
  >
    <Svg
      src="/assets/icons/shuffle.svg"
      width="2.5em"
      color="var(--quaternary-color)"
      opacity={shuffle ? '1' : '0.6'}
      aria-hidden="true"
    />
  </button>
</section>

<style>
  .buttons {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
</style>
