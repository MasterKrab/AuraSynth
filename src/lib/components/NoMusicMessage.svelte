<script lang="ts">
  import { link } from 'svelte-routing'
</script>

<section class="message" aria-labelledby="no-music-message">
  <p class="text" id="no-music-message">No music Found</p>
  <p class="text">Please add some music folders</p>
  <a class="link" href="/settings#folders" use:link>Go to settings</a>
</section>

<style>
  .message {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.5em;
    padding: 1rem;
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
