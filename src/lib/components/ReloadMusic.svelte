<script lang="ts">
  import music from '../stores/music'

  import Svg from './Svg.svelte'
</script>

{#if $music.loading}
  <p
    class="spinner"
    role="alert"
    aria-live="polite"
    aria-label="Loading music..."
  >
    <Svg
      src="/assets/icons/reload.svg"
      width="1.25rem"
      height="1.25rem"
      fill="var(--tertiary-color)"
      aria-hidden="true"
    />
  </p>
{/if}

<style>
  @keyframes spin {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }

  .spinner {
    width: 1.25rem;
    height: 1.25rem;
    animation: spin 1.25s linear infinite;
  }
</style>
