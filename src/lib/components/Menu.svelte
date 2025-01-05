<script lang="ts">
  import type { FiniteStateMachine } from "runed";
  import type { Difficulty } from "$lib/types";

  import { fade, blur } from "svelte/transition";
  import Segmented from "$lib/components/Segmented.svelte";
  import Onboarding from "$lib/components/Onboarding.svelte";

  let {
    wins,
    stateMachine,
    difficulty = $bindable(),
  } = $props<{
    wins: number;
    stateMachine: FiniteStateMachine<string, string>;
    difficulty: Difficulty;
  }>();

  let showTutorial = $state(false);
</script>

<div class="wrapper">
  <div
    class="main-content"
    in:fade={{ delay: 100, duration: 100 }}
    out:fade={{ duration: 100 }}
  >
    {#if showTutorial}
      <Onboarding bind:show={showTutorial} />
    {:else}
      <div class="header">
        <h1>
          Colormatch!
          {#if stateMachine.current === "final"}
            <br />Score is {wins}
          {/if}
        </h1>
        {#if stateMachine.current !== "final"}
          <p class="description">
            Guess the color and score points!<br />Explore colors in 3D space
            and gain an intuition for the RGB color model.
            <button class="tertiary" onclick={() => (showTutorial = true)}>
              Learn more
            </button>
          </p>
        {/if}
      </div>

      <div class="actions">
        <Segmented
          options={["easy", "medium", "hard"]}
          bind:value={difficulty}
        />

        <button onclick={() => stateMachine.send("start")}>
          {#if stateMachine.current === "final"}
            Play again
          {:else}
            Play
          {/if}
        </button>

        {#if stateMachine.current === "final"}
          <button
            class="tertiary"
            style="padding: 1rem 2rem; color: black"
            onclick={() => (showTutorial = true)}
          >
            Learn more
          </button>
        {/if}
      </div>
    {/if}
  </div>
</div>

<div class="blur" transition:blur={{ duration: 400 }}></div>

<style>
  .wrapper {
    position: fixed;
    top: 0;
    z-index: 1;
    width: 100dvw;
    height: 100dvh;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 4rem;
  }

  .main-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    gap: 3rem;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .description {
    max-width: 32ch;
    font-size: 1.25rem;
    line-height: 1.6;
    letter-spacing: -1%;
    color: black;

    text-align: center;
  }

  h1 {
    color: black;
    font-size: 5rem;
    font-weight: 800;
    line-height: 0.9;
    letter-spacing: -3%;
    text-align: center;
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .blur {
    position: fixed;
    top: 0;
    width: 100dvw;
    height: 100dvh;
    background-color: #ffffff33;
    backdrop-filter: blur(60px);
    -webkit-backdrop-filter: blur(60px);
  }
</style>
