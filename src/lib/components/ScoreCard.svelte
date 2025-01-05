<script lang="ts">
  import heart from "$lib/assets/emoji/red_heart_3d.png";
  import broken_heart from "$lib/assets/emoji/broken_heart_flat.svg";

  let { wins, strikes, maxStrikes, ...props } = $props<{
    wins: number;
    strikes: number;
    maxStrikes: number;
    props?: unknown;
  }>();
</script>

<div class="wrapper" {...props}>
  <div
    class="card"
    style="border-top-right-radius:0.25rem; border-bottom-right-radius:0.25rem;"
  >
    <div class="value">{wins}</div>
    <div class="label">Score</div>
  </div>
  <div
    class="card"
    style="border-top-left-radius:0.25rem; border-bottom-left-radius:0.25rem;"
  >
    <div class="value">
      {#each { length: maxStrikes - strikes }, i}
        <img src={heart} alt="❤️" />
      {/each}
      {#each { length: strikes }, i}
        <img
          src={broken_heart}
          alt="💔"
          style="opacity: 0.8; filter: saturate(0.1);"
        />
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
    border-radius: 1rem;
  }
  .value {
    font: var(--font-1);
    font-weight: semibold;
    display: flex;
    gap: 2px;
  }
  .label {
    font: var(--font--1);
    font-family: "Geist Mono", monospace;
    opacity: 0.6;
    text-transform: uppercase;
  }
  img {
    height: 1.5rem;
    width: 1.25rem;
    object-fit: contain;
    object-position: top;
  }
  @media screen and (max-width: 768px) {
    img {
      height: 1rem;
      width: 0.813rem;
    }
  }
</style>
