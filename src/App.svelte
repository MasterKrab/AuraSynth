<script lang="ts">
  import { onMount } from "svelte";
  import { Router, Route } from "svelte-routing";

  import music from "./lib/stores/music";
  import Header from "./lib/components/Header.svelte";
  import Songs from "./lib/routes/Songs.svelte";
  import Albums from "./lib/routes/Albums.svelte";
  import Player from "./lib/components/Player.svelte";

  export let url = "";

  onMount(async () => await music.load());
</script>

<Header />

<main class="main">
  <div class="page">
    <Router {url}>
      <Route path="/" component={Songs} />
      <Route path="/albums" component={Albums} />
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
    overflow-y: auto;
  }
</style>
