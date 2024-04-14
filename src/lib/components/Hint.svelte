<script lang="ts">
  import type { CoordVector } from "$lib/Vector"
  import { game } from "$lib/game"
  import type { Writable } from "svelte/store"

  export let coord: CoordVector
  export let mousePos: Writable<{ x: number; y: number }>

  $: color = coord.toColor($game.difficulty)
</script>

<div
  class="color"
  style:top={$mousePos.x}
  style:left={$mousePos.y}
  style:background-color={color.toString()}
/>

<style>
  .color {
    position: absolute;
    width: 2rem;
    height: 2rem;
    border-radius: 0.25rem;
  }
</style>
