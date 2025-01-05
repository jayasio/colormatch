<script lang="ts">
  import additive from "$lib/assets//tutorial/additive.mov";
  import variants from "$lib/assets//tutorial/variants.mov";
  import grid from "$lib/assets//tutorial/grid.mov";
  import strikes from "$lib/assets//tutorial/strikes.mov";

  let { dismiss } = $props<{
    dismiss: () => void;
  }>();

  let steps = [
    {
      title:
        "All colors in the digital world are built from Red, Green, and Blue (RGB).",
      description:
        "These three base hues combine through 'additive mixing' to create the entire spectrum of colors.",
      video: additive,
    },
    {
      title: "Mixing the three creates new colors.",
      description:
        "Each base hue's intensity ranges from none (0) to its maximum (255). Colors are represented as rgb(red, green, blue) values—for instance, pure red is rgb(255, 0, 0).",
      video: variants,
    },
    {
      title: "In this game, the base hues map to the three axes of a cube.",
      description:
        "X = Red, Y = Green, Z = Blue. Move along these axes to mix hues. Their intersection determines the final color.",
      video: grid,
    },
    {
      title: "Your goal: identify the target color.",
      description:
        "Score points for correct guesses. But beware—three strikes, and the game ends!",
      video: strikes,
    },
  ];

  let currentStep = $state(0);
</script>

<div class="big-wrapper">
  <div class="wrapper">
    <video
      src={steps[currentStep].video}
      autoplay
      loop
      preload="auto"
      style="width: auto; border-radius: 2.25rem 2.25rem 0.5rem 0.5rem; aspect-ratio: 4/3;"
      muted
    ></video>
    <div class="text">
      <span class="title">{steps[currentStep].title}</span>
      <span class="description">{steps[currentStep].description}</span>
    </div>
  </div>
  <div class="actions">
    {#if currentStep > 0}
      <button onclick={() => currentStep--}>{`<-`}</button>
    {/if}
    {#if currentStep < steps.length - 1}
      <button onclick={() => currentStep++}>
        Next {`->`}
      </button>
    {/if}
  </div>
  <button class="secondary" onclick={dismiss}> Done </button>
</div>

<style>
  .big-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    z-index: 100;
  }
  .wrapper {
    width: 25dvw;
    height: 50dvh;

    display: flex;
    flex-direction: column;
    padding: 0.25rem;
    gap: 1rem;

    background-color: #00000099;
    border-radius: 2.5rem;
  }

  .text {
    flex: 1;
    line-height: 1.5;
    padding: 0 1rem;
  }
  .title {
    line-height: 1.2;
  }
  .description {
    line-height: 1.5;
    opacity: 0.6;
  }
  .actions {
    width: 100%;
    display: flex;
    justify-content: stretch;
    align-items: end;
    gap: 0.25rem;

    & button {
      flex: 1;
      width: 100%;
    }
  }
</style>
