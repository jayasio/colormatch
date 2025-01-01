<script lang="ts">
  import type { CoordVector, ColorVector, PercentVector } from "$lib/vector";

  let { question, size, ...props } = $props<{
    question: CoordVector;
    size: number;
    props: unknown;
  }>();

  let color: ColorVector = $derived(question.toColor(size));
  let percent: PercentVector = $derived(question.toPercent(size));

  let showHint = $state(false);
</script>

<div
  class="wrapper"
  {...props}
  onpointerenter={() => (showHint = true)}
  onpointerleave={() => (showHint = false)}
  style:cursor="default"
>
  {#if showHint}
    <div
      class="card card-composite"
      style:background-color={color.toString()}
      style:color={color.getLuminance() === "light" ? "#000" : "#fff"}
    >
      <div class="card card-shell">
        <div class="value">{percent.x}%</div>
        <div class="label">Red</div>
      </div>
      <div class="card card-shell">
        <div class="value">{percent.y}%</div>
        <div class="label">Green</div>
      </div>
      <div class="card card-shell">
        <div class="value">{percent.z}%</div>
        <div class="label">Blue</div>
      </div>
    </div>
  {:else}
    <div class="card">
      <div class="value">{color.toString()}</div>
      <div class="label">Hover for hint</div>
    </div>
  {/if}
</div>

<style>
  .wrapper {
    display: flex;
    gap: 0.125rem;
  }
  .card {
    display: flex;
    flex-direction: column;
    padding: 0.8rem 1rem;
    gap: 0.5rem;
    background-color: #26262699;
    backdrop-filter: blur(16px);
    border-radius: 0.25rem;
  }
  .card-composite {
    flex-direction: row;
    gap: 1rem;
    backdrop-filter: none;
  }
  .card-shell {
    padding: 0;
    background-color: transparent;
    backdrop-filter: none;
    border-radius: 0;
  }
  .value {
    font: var(--font-1);
    font-weight: semibold;
  }
  .label {
    font: var(--font--1);
    opacity: 0.6;
    text-transform: uppercase;
    te
    te
  }
</style>
