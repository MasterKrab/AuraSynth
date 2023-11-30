<script lang="ts">
  import { Router, Route } from 'svelte-routing'

  import FloatingFocus from './lib/components/FloatingFocus.svelte'
  import Header from './lib/components/Header.svelte'
  import Songs from './lib/routes/Songs.svelte'
  import Albums from './lib/routes/Albums.svelte'
  import Player from './lib/components/Player.svelte'
  import Settings from './lib/pages/settings.svelte'

  import './lib/stores/folders'
  import './lib/stores/theme'

  export let url = ''
</script>

<FloatingFocus />

<Header />

<main class="main">
  <div class="page">
    <Router {url}>
      <Route path="/">
        <Songs />
      </Route>
      <Route path="/albums">
        <Albums />
      </Route>
      <Route path="/settings">
        <Settings />
      </Route>
    </Router>
  </div>

  <Player />
</main>

<style>
  .main {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows:
      calc(100vh - var(--header-height) - var(--player-height))
      auto;
  }

  .page {
    overflow: auto;
    width: 100vw;
  }

  .page::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }

  .page::-webkit-scrollbar-thumb {
    background-color: var(--quaternary-color);
  }
</style>
