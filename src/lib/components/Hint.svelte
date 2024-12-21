<script lang="ts">
  import type { CoordVector } from "$lib/Vector";

  let {
    coord,
    size,
    mousePos,
  }: { coord: CoordVector; size: number; mousePos: { x: number; y: number } } =
    $props();
</script>

<div
  class="color"
  style:top={mousePos.x}
  style:left={mousePos.y}
  style:background-color={coord.toColor(size).toString()}
></div>

<style>
  .color {
    position: absolute;
    width: 2rem;
    height: 2rem;
    border-radius: 0.25rem;
  }
</style>
