<script lang="ts">
  export let text: string

  let containerWidth = 0
  let textContainerWidth = 0
  let textWidth = 0
  let textHeight = 0
  let isTextGreaterThanContainer = false

  $: isTextGreaterThanContainer = textWidth > containerWidth

  let animationSpeed = 0

  $: animationSpeed = textContainerWidth / 25
</script>

<span
  bind:clientWidth={containerWidth}
  class="container"
  style="--text-height: {textHeight}px"
  aria-label={text}
>
  {#key isTextGreaterThanContainer}
    <span
      bind:clientWidth={textContainerWidth}
      class="text-container"
      class:text-container--moving={isTextGreaterThanContainer}
      style="
      --translate-x: {-Math.abs(textContainerWidth - textWidth)}px; 
      --animation-speed: {animationSpeed}s;
    "
      aria-hidden="true"
    >
      {#if isTextGreaterThanContainer}
        <span bind:clientWidth={textWidth} bind:clientHeight={textHeight}>
          {text}
        </span>
        <span class="separator" />
        {text}
      {:else}
        <span
          class="text"
          bind:clientWidth={textWidth}
          bind:clientHeight={textHeight}
        >
          {text}
        </span>
      {/if}
    </span>
  {/key}
</span>

<style>
  .container {
    position: relative;
    display: block;
    height: var(--text-height);
    overflow: hidden;
  }

  .text-container,
  .text {
    position: absolute;
    display: flex;
    width: max-content;
  }

  .text-container--moving {
    animation: move-text var(--animation-speed) linear infinite;
  }

  .separator {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  @keyframes move-text {
    0%,
    50.2% {
      transform: translateX(0);
    }

    50.1%,
    100% {
      transform: translateX(var(--translate-x));
    }
  }
</style>
