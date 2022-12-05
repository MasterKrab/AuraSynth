<script lang="ts">
  import music from "../stores/music";
  import Albums from "../components/Albums.svelte";
</script>

<Albums albums={$music.albums} />
