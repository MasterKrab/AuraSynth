<script lang="ts">
  import { link } from 'svelte-routing'
</script>

<header class="header">
  <nav>
    <a href="/" use:link>Songs</a>
    <a href="/albums" use:link>Albums</a>
  </nav>
</header>

<style>
  .header {
    height: var(--header-height);
  }
</style>
