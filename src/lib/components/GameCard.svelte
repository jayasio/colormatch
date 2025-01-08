<script lang="ts">
  import type { CoordVector, ColorVector } from "$lib/vector";

  let {
    question,
    size,
    showHint = $bindable(),
    ...props
  } = $props<{
    question: CoordVector;
    size: number;
    showHint: boolean;
    props?: unknown;
  }>();

  let color: ColorVector = $derived(question.toColor(size));
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
      style:--color={color.getLuminance() === "light" ? "#000" : "#fff"}
    >
      <div class="card card-shell">
        <div class="value text-body-para">
          {Math.ceil((question.x * 255) / (size - 1))}
        </div>
        <div class="text-label">
          Red:<span>{question.toPercent(size).x}%</span>
        </div>
      </div>
      <div class="card card-shell">
        <div class="value text-body-para">
          {Math.ceil((question.y * 255) / (size - 1))}
        </div>
        <div class="text-label">
          Green:<span>{question.toPercent(size).y}%</span>
        </div>
      </div>
      <div class="card card-shell">
        <div class="value text-body-para">
          {Math.ceil((question.z * 255) / (size - 1))}
        </div>
        <div class="text-label">
          Blue:<span>{question.toPercent(size).z}%</span>
        </div>
      </div>
    </div>
  {:else}
    <div class="card">
      <div class="value text-body-line">{color.toString()}</div>
      <div class="text-label">Hover for hint</div>
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
    border-radius: 1rem;
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
    color: var(--color, white);
    font-family: var(--font-stack-mono);
    font-weight: semibold;
    line-height: 1.2;
  }
  .text-label {
    color: var(--color, white);
  }
</style>
