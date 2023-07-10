<script lang="ts">
  import { link } from 'svelte-routing'
</script>

<header class="header">
  <nav class="navigation">
    <ul class="list">
      <li>
        <a href="/" use:link>Songs</a>
      </li>
      <li>
        <a href="/albums" use:link>Albums</a>
      </li>
    </ul>
  </nav>
</header>

<style>
  .header {
    display: flex;
    align-items: center;
    background-color: var(--secondary-color);
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    height: var(--header-height);
    border-bottom: solid 0.125rem var(--tertiary-color-transparent);
  }

  .navigation {
    width: 100%;
  }

  .list {
    display: flex;
    gap: 0.5rem;
    padding-left: 0;
    padding-bottom: 0.25rem;
    font-size: 1.25rem;
    color: var(--tertiary-color);

    list-style: none;
  }
</style>
