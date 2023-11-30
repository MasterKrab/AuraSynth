<script lang="ts">
  import { link } from 'svelte-routing'

  import music from '../stores/music'

  import Svg from './Svg.svelte'
</script>

{#if !$music.loading}
  <section class="message" aria-labelledby="no-music-message">
    <p class="text" id="no-music-message">No music found</p>
    <Svg
      src="/assets/icons/logo.svg"
      width="10rem"
      height="10rem"
      aria-hidden="true"
    />
    <p class="text">Please add some music folders</p>
    <a class="link" href="/settings#folders" use:link>Go to settings</a>
  </section>
{/if}

<style>
  .message {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    font-size: 1.75rem;
    padding: 1rem;
    margin-top: 5rem;
  }

  .text {
    margin-top: 0;
    margin-bottom: 0;
  }

  .link {
    background-color: var(--secondary-color);
    width: fit-content;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    color: var(--tertiary-color);
    border-radius: 0.5rem;
  }
</style>
