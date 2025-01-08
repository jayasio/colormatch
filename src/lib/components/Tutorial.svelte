<script lang="ts">
  import additive from "$lib/assets/tutorial/additive.mp4";
  import variants from "$lib/assets/tutorial/variants.mp4";
  import grid from "$lib/assets/tutorial/grid.mp4";
  import strikes from "$lib/assets/tutorial/strikes.mp4";

  import { Check, ArrowRight, ArrowLeft } from "lucide-svelte";

  import { fade } from "svelte/transition";

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
        "Score points for correct guesses. But beware—three strikes, and the game ends!",
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
      <button onclick={() => currentStep--}>
        <span>{`<-`}</span>
      </button>
    {/if}
    {#if currentStep < steps.length - 1}
      <button onclick={() => currentStep++}>
        <span>Next</span>
        <span>{`->`}</span>
      </button>
    {:else}
      <button onclick={dismiss}>
        <Check size="1.25rem" />
        Done
      </button>
    {/if}
  </div>
</div>

<style>
  .big-wrapper {
    z-index: 100;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    gap: 0.25rem;
    padding: 1.5rem;
  }
  .wrapper {
    flex: 1;
    max-width: 520px;

    min-height: 50dvh;

    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .video-container {
    width: 100%;
    aspect-ratio: 4/2.8;
    border-radius: 1.5rem;
    background-color: black;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
  }
  video {
    width: 100%;
    aspect-ratio: 4/3;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
  }
  .text {
    flex: 1;

    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .title {
    color: black;
  }
  .description {
    opacity: 0.8;
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

  @media screen and (width <= 960px) {
    .big-wrapper {
      padding: 1.25rem;
      max-width: 480px;
    }
    .wrapper {
      flex: 1;
      width: 100%;
      height: fit-content;
    }
  }

  @media screen and (width <= 480px) {
    .big-wrapper {
      padding: 1rem;
      max-width: 440px;
    }
    .wrapper {
      flex: 1;
      width: 100%;
      height: fit-content;
    }
  }

  @media screen and (width >= 960px) and (height <= 768px) {
    .big-wrapper {
      padding: 1rem;
      justify-content: center;
      align-items: center;
    }
    .wrapper {
      flex: 1;
      max-width: none;
      width: 80%;
      height: fit-content;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
  }
</style>
