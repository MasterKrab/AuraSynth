<script lang="ts">
  import theme from '../stores/theme'
  import { THEMES } from '../theme'
</script>

<label class="label">
  Theme

  <select class="select" bind:value={$theme.value} name="theme">
    {#each Object.values(THEMES) as value}
      <option {value} selected={$theme.value === value}>
        {value}
      </option>
    {/each}
  </select>
</label>

<style>
  .label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 1.5rem;
  }

  .select {
    appearance: none;
    width: 10rem;
    background-color: var(--secondary-color);
    padding: 0.5rem 1rem;
    color: var(--tertiary-color);
    font-size: 1rem;
    text-transform: capitalize;
    border: none;
  }
</style>
