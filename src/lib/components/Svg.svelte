<script lang="ts">
  import checkIsSvgDataUrl from '../checkIsSvgDataUrl'
  import namedNodeMapToObject from '../namedNodeMapToObject'

  export let src: string

  let content: string = null
  let attributes = null

  const getSvgElement = (svg: string) => {
    const parser = new DOMParser()
    const result = parser.parseFromString(svg, 'text/xml')
    return result.querySelector('svg')
  }

  const loadSvg = async (url: string) => {
    try {
      const svgText = checkIsSvgDataUrl(url)
        ? atob(url.split(',')[1])
        : await fetch(url).then((response) => response.text())

      const svg = getSvgElement(svgText)

      if (!svg) throw new Error('No SVG found')

      content = svg.innerHTML
      attributes = namedNodeMapToObject(svg.attributes)
    } catch (error) {
      content = null
      attributes = null
      throw new Error(`Error loading SVG from ${url}: ${error.message}`)
    }
  }

  $: loadSvg(src)
</script>

{#if content}
  <svg {...attributes} {...$$restProps}>
    {@html content}
  </svg>
{/if}
