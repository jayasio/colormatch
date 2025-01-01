<script lang="ts">
  import { version } from "$lib/version";

  import additive from "$lib/assets/onboarding/additive.mov";
  import variants from "$lib/assets/onboarding/variants.mov";
  import grid from "$lib/assets/onboarding/grid.mov";
  import strikes from "$lib/assets/onboarding/strikes.mov";
  import type { FiniteStateMachine } from "runed";

  let { stateMachine, showOnboarding = $bindable() } = $props<{
    stateMachine: FiniteStateMachine<string, string>;
    showOnboarding: boolean;
  }>();

  let steps = [
    {
      title:
        "In the digital world, all colors are built from three base colors. ",
      description:
        'Red, Green, and Blue (RGB) combine to create all colors through "additive mixing".',
      video: additive,
    },
    {
      title: "Mixing colors creates new shades. ",
      description:
        "Each base color's intensity ranges from none (0) to its maximum (255). Colors are written as rgb(red, green, blue) values - for instance, pure red is rgb(255, 0, 0).",
      video: variants,
    },
    {
      title: "In this game, the base hues map to three axes of a cube. ",
      description:
        "X = Red, Y = Green, Z = Blue. Move along these axes to mix colors. Where they meet determines the final color.",
      video: grid,
    },
    {
      title: "Your goal: identify the target color. ",
      description:
        "Score points for correct guesses. Three strikes, and the game ends!",
      video: strikes,
    },
  ];

  let currentStep = $state(-1);
</script>

<div class="wrapper">
  {#if currentStep === -1}
    <div class="banner">
      <div class="banner-title">Color<br />Match!</div>
      <div class="version">{version}</div>
      <!-- <div class="description">Guess the rgb color, score points!</div> -->
    </div>
  {:else}
    <video
      src={steps[currentStep].video}
      autoplay
      loop
      preload="auto"
      style="width: auto; border-radius: 0.25rem; aspect-ratio: 4/3;"
      muted
    ></video>
    <div class="text">
      <span class="title">{steps[currentStep].title}</span>
      <span class="description">{steps[currentStep].description}</span>
    </div>
  {/if}

  <div class="actions">
    <div>
      {#if currentStep > -1}
        <button onclick={() => currentStep--}>{`<-`}</button>
      {/if}
    </div>

    <div>
      {#if currentStep < steps.length - 1}
        <button onclick={() => currentStep++}>
          {#if currentStep === -1}
            Learn more
          {:else}
            Next
          {/if}
          {`->`}
        </button>
      {/if}
    </div>
  </div>
</div>

<style>
  .wrapper {
    width: 35dvw;
    max-width: 400px;
    height: 60dvh;
    z-index: 100;

    display: flex;
    flex-direction: column;
    padding: 0.25rem;
    gap: 0.25rem;

    background-color: var(--surface-0);
    border-radius: 0.5rem;
  }
  .banner {
    flex: 1;

    & .banner-title {
      font: var(--heading-4);
      font-family: "Geist";
    }
  }
  .text {
    flex: 1;
    padding: 0.75rem;
    line-height: 1.5;
  }
  .title {
    font: var(--font-0);
    font-family: "Geist";
    line-height: 1.2;
  }
  .description {
    font: var(--body-1);
    font-family: "Geist";
    line-height: 1.2;
    color: var(--text-2);
    opacity: 0.6;
  }
  .actions {
    display: flex;
    justify-content: space-between;
    align-items: end;
  }
  button {
    padding: 0.6rem 1rem;
    background: none;
    border: none;
    border-radius: 0.25rem;
    color: white;
    font: var(--font--1);
    font-family: "Geist Mono";
    text-transform: uppercase;
    cursor: pointer;
  }
  .version {
    font: var(--caption);
    color: var(--white-0);

    font-weight: 500;

    padding: 0.25rem;
    border-radius: 0.25rem;
    background-color: rgb(247, 74, 6);
    width: fit-content;
    margin-top: 0.25rem;
  }
</style>
