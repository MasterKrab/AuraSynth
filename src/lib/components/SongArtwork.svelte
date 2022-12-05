<script lang="ts">
  import { onMount } from "svelte";

  import Artwork from "./Artwork.svelte";
  import { getSongPicture } from "../pictures";

  export let path: string;

  let url: string | null = null;
  let alt: string = "";

  onMount(async () => {
    const picture = await getSongPicture(path);
    url = picture.url;
    alt = picture.description;
  });
</script>

<Artwork {url} {alt} />
