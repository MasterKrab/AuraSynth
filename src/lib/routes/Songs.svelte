<script lang="ts">
  import music from '../stores/music'
  import Songs from '../components/Songs.svelte'
</script>

<Songs songs={$music.songs} />
