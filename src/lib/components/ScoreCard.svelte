<script lang="ts">
  import broken_heart from "$lib/assets/emoji/broken_heart_flat.svg";
  import heart from "$lib/assets/emoji/red_heart_3d.png";

  let { wins, strikes, maxStrikes, ...props } = $props<{
    wins: number;
    strikes: number;
    maxStrikes: number;
    props?: unknown;
  }>();
</script>

<div class="wrapper" {...props}>
  <div class="card" style="border-radius: 1rem 0.25rem 0.25rem 1rem;">
    <div class="value text-body-line">{wins}</div>
    <div class="text-label">Score</div>
  </div>
  <div class="card" style="border-radius: 0.25rem 1rem 1rem 0.25rem;">
    <div class="value strikes text-body-line">
      {#each { length: maxStrikes - strikes } as _, i (i)}
        <img src={heart} alt="❤️">
      {/each}
      {#each { length: strikes } as _, i (i + maxStrikes)}
        <img
          src={broken_heart}
          alt="💔"
          style="opacity: 0.8; filter: saturate(0.1);"
        >
      {/each}
    </div>
    <div class="text-label">Strikes</div>
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    gap: 0.125rem;
    pointer-events: all;
  }
  .card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.8rem 1rem;
    background-color: #26262699;
    border-radius: 1rem;
    backdrop-filter: blur(16px);
  }
  .value {
    color: white;
  }
  .strikes {
    display: flex;
    gap: 2px;
  }
  img {
    width: 1.25rem;
    height: 1.5rem;
    object-fit: contain;
    object-position: top;
  }
  @media screen and (width <= 960px) {
    img {
      width: 1.125rem;
      height: 1.35rem;
    }
  }
  @media screen and (width <= 480px) {
    img {
      width: 1rem;
      height: 1.2rem;
    }
  }
</style>
