<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let loop: boolean = false;
  export let shuffle: boolean = false;
  export let disableAll: boolean = false;

  const dispatch = createEventDispatcher<{
    changeShuffle: boolean;
  }>();

  const handleChangeLoop = () => {
    loop = !loop;
  };

  const handleChangeShuffle = () => {
    shuffle = !shuffle;
    dispatch("changeShuffle", shuffle);
  };
</script>

<button
  on:click={handleChangeLoop}
  aria-label="looped"
  role="switch"
  aria-checked={loop}
  disabled={disableAll}
>
  {loop ? "lopped" : "not looped"}
</button>

<button
  on:click={handleChangeShuffle}
  aria-label="shuffle"
  role="switch"
  aria-checked={shuffle}
  disabled={disableAll}
>
  {shuffle ? "shuffle" : "not shuffle"}
</button>
