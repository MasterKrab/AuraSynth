<script lang="ts">
  import { fade } from "svelte/transition";

  export let url: string | null = null;
  export let alt: string = "";
  export let loading: "lazy" | "eager" = "lazy";
</script>

<div class="image-container">
  {#if url}
    <img class="image" in:fade={{ duration: 250 }} src={url} {loading} {alt} />
  {/if}
</div>

<style>
  .image-container {
    width: 11em;
    height: 11em;
    background-image: url("/assets/icons/music-note.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 60%;
  }

  .image {
    object-fit: cover;
    height: 100%;
  }
</style>
