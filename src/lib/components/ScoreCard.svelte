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
  <div class="card" style="border-radius: 1rem 0.25rem 0.25rem 1rem;">
    <div class="value text-body-line">{wins}</div>
    <div class="text-label">Score</div>
  </div>
  <div class="card" style="border-radius: 0.25rem 1rem 1rem 0.25rem;">
    <div class="value strikes text-body-line">
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
    <div class="text-label">Strikes</div>
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
    color: white;
    font-weight: semibold;
  }
  .strikes {
    display: flex;
    gap: 2px;
  }
  img {
    height: 1.5rem;
    width: 1.25rem;
    object-fit: contain;
    object-position: top;
  }
  @media screen and (width <= 960px) {
    img {
      height: 1.35rem;
      width: 1.125rem;
    }
  }
  @media screen and (width <= 480px) {
    img {
      height: 1.2rem;
      width: 1rem;
    }
  }
</style>
