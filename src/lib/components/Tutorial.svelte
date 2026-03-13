<script lang="ts">
  import { Check } from "lucide-svelte";
  import { fade } from "svelte/transition";
  import additive from "$lib/assets/tutorial/additive.mp4";
  import grid from "$lib/assets/tutorial/grid.mp4";
  import hint from "$lib/assets/tutorial/hint.mp4";
  import strikes from "$lib/assets/tutorial/strikes.mp4";
  import variants from "$lib/assets/tutorial/variants.mp4";

  let { dismiss } = $props<{
    dismiss: () => void;
  }>();

  const steps = [
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
        "Hover over the question to see helpful hints. Eventually, try to guess without hints!",
      video: hint,
    },
    {
      title: "Score points for correct guesses.",
      description: "But beware—three strikes, and the game ends!",
      video: strikes,
    },
  ];

  let currentStep = $state(0);
</script>

<div class="big-wrapper">
  <div class="wrapper">
    <div class="video-container">
      {#key currentStep}
        <video
          src={steps[currentStep].video}
          autoplay
          playsinline
          loop
          muted
          controls={false}
          preload="auto"
          in:fade={{ duration: 200, delay: 200 }}
          out:fade={{ duration: 200 }}
        ></video>
      {/key}
    </div>
    {#key currentStep}
      <div class="text">
        <div
          class="title text-heading-2"
          in:fade={{ duration: 200, delay: 201 }}
          out:fade={{ duration: 200 }}
        >
          {steps[currentStep].title}
        </div>
        <div
          class="description text-body-para"
          in:fade={{ duration: 200, delay: 201 }}
          out:fade={{ duration: 200 }}
        >
          {steps[currentStep].description}
        </div>
      </div>
    {/key}
  </div>
  <div class="actions">
    {#if currentStep > 0}
      <button type="button" onclick={() => currentStep--}>
        <span>&lt;-</span>
      </button>
    {/if}
    {#if currentStep < steps.length - 1}
      <button type="button" onclick={() => currentStep++}>
        <span>Next</span>
        <span>-&gt;</span>
      </button>
    {:else}
      <button type="button" onclick={dismiss}>
        <Check size="1.25rem" />
        Done
      </button>
    {/if}
  </div>
</div>

<style>
  .big-wrapper {
    z-index: 100;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: stretch;
    justify-content: center;
    height: 100%;
    padding: 1.5rem;
  }
  .wrapper {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 520px;

    min-height: 50dvh;
  }
  .video-container {
    position: relative;
    flex-shrink: 0;
    width: 100%;
    aspect-ratio: 4 / 2.8;
    overflow: hidden;
    background-color: black;
    border-radius: 1.5rem;
  }
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }
  .text {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 1rem;
  }
  .title {
    color: black;
  }
  .description {
    color: hsl(0 0% 0% / 0.8);
  }
  .actions {
    display: flex;
    gap: 0.25rem;
    align-items: end;
    justify-content: stretch;
    width: 100%;

    & button {
      flex: 1;
      width: 100%;
    }
  }

  @media screen and (width <= 960px) {
    .big-wrapper {
      max-width: 480px;
      padding: 1.25rem;
    }
    .wrapper {
      flex: 1;
      width: 100%;
      height: fit-content;
    }
  }

  @media screen and (width <= 480px) {
    .big-wrapper {
      max-width: 440px;
      padding: 1rem;
    }
    .wrapper {
      flex: 1;
      width: 100%;
      height: fit-content;
    }
  }

  @media screen and (width >= 960px) and (height <= 768px) {
    .big-wrapper {
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }
    .wrapper {
      display: grid;
      flex: 1;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      width: 80%;
      max-width: none;
      height: fit-content;
    }
  }
</style>
