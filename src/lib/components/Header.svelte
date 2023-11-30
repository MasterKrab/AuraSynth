<script lang="ts">
  import { link } from 'svelte-routing'

  import music from '../stores/music'
  import Svg from './Svg.svelte'
  import ReloadMusic from './ReloadMusic.svelte'
</script>

<header class="header">
  <nav class="navigation">
    <ul class="list">
      <li>
        <a class="link" href="/" use:link>
          <Svg
            src="/assets/icons/music-note-2.svg"
            width="1.25rem"
            height="1.25rem"
            fill="var(--tertiary-color)"
            aria-hidden="true"
          />
          <span class="link__text">Songs</span>
        </a>
      </li>
      <li>
        <a class="link" href="/albums" use:link>
          <Svg
            src="/assets/icons/dvd-disk.svg"
            width="1.25rem"
            height="1.25rem"
            fill="var(--tertiary-color)"
            aria-hidden="true"
          />
          <span class="link__text">Albums</span>
        </a>
      </li>
      <li>
        <a class="link" href="/settings" use:link>
          <Svg
            src="/assets/icons/settings.svg"
            width="1.25rem"
            height="1.25rem"
            fill="var(--tertiary-color)"
            aria-hidden="true"
          />
          <span class="link__text">Settings</span>
        </a>
      </li>
    </ul>
  </nav>

  <ReloadMusic />
</header>

<style>
  .header {
    display: flex;
    align-items: center;
    gap: 1rem;
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
    list-style: none;
    display: flex;
    gap: 1.5rem;
    padding-left: 0;
    font-size: 1.25rem;
    color: var(--tertiary-color);
  }

  .link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .link__text {
    margin-bottom: 0.1rem;
  }
</style>
