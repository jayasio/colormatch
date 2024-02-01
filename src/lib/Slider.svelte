<script lang="ts">
  export let value: number
</script>

<div class="wrapper">
  <div>Together</div>
  <input type="range" min={2} max={3} step={0.1} bind:value />
  <div>Apart</div>
</div>

<style>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
</style>
