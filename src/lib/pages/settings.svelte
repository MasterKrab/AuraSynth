<script lang="ts">
  import { open } from '@tauri-apps/api/dialog'

  import Svg from '../components/Svg.svelte'
  import ThemeSelector from '../components/ThemeSelector.svelte'
  import music from '../stores/music'
  import folders from '../stores/folders'

  const addFolders = async () => {
    const result = await open({
      directory: true,
      multiple: true,
    })

    if (!result) return

    Array.isArray(result) ? folders.add(...result) : folders.add(result)
  }

  const createRemoveFolder = (path: string) => () => {
    folders.remove(path)
  }

  const reloadMusic = () => {
    music.load()
  }
</script>

<div class="content">
  <section id="folders">
    <h2 class="folders__title">Music folders</h2>

    <div class="folders">
      <div class="folders__buttons">
        <button class="folders__button" on:click={addFolders}>Add Folder</button
        >
        <button class="folders__button" on:click={reloadMusic}
          >Reload Music</button
        >
      </div>

      <ul class="folders-selector" tabindex={0}>
        {#each $folders.paths as folder}
          <li class="folders-selector__item">
            {folder}
            <button
              class="folders-selector__delete-button"
              on:click={createRemoveFolder(folder)}
              aria-label="Remove folder: {folder}"
            >
              <Svg
                src="/assets/icons/delete.svg"
                width="0.9rem"
                height="0.9rem"
                fill="var(--quaternary-color)"
                aria-hidden="true"
              />
            </button>
          </li>
        {/each}
      </ul>
    </div>
  </section>

  <ThemeSelector />
</div>

<style>
  .content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .folders {
    padding: 0.5rem 1rem;
    max-width: 40rem;
    background-color: var(--secondary-color);
    border-radius: 0.25rem;
  }

  .folders__buttons {
    display: flex;
    gap: 1rem;
  }

  .folders__button {
    background-color: var(--primary-color);
    color: var(--tertiary-color);
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
  }

  .folders__title {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: normal;
    font-size: 1.5rem;
  }

  .folders-selector {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    list-style: none;
    padding-left: 0;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    max-height: 15rem;
    overflow-y: scroll;
  }

  .folders-selector::-webkit-scrollbar {
    width: 0.25rem;
  }

  .folders-selector::-webkit-scrollbar-thumb {
    background-color: var(--quinary-color);
  }

  .folders-selector__item {
    display: flex;
    align-items: center;
  }

  .folders-selector__delete-button {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-left: auto;
  }
</style>
