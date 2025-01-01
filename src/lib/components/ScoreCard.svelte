<script lang="ts">
  let { wins, strikes, maxStrikes, ...props } = $props<{
    wins: number;
    strikes: number;
    maxStrikes: number;
    props: unknown;
  }>();
</script>

<div class="wrapper" {...props}>
  <div class="card">
    <div class="value">{wins}</div>
    <div class="label">Score</div>
  </div>
  <div class="card">
    <div class="value">
      {#each { length: maxStrikes - strikes }, i}
        <span>❤️</span>
      {/each}
      {#each { length: strikes }, i}
        <span style="opacity: 0.6; filter: saturate(0.6)">💔</span>
      {/each}
    </div>
    <div class="label">Strikes</div>
  </div>
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
