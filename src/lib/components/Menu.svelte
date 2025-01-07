<script lang="ts">
  import type { FiniteStateMachine } from "runed";
  import type { Difficulty } from "$lib/types";

  import { fade } from "svelte/transition";
  import Segmented from "$lib/components/Segmented.svelte";

  let {
    wins,
    stateMachine,
    difficulty = $bindable(),
    showTutorial = $bindable(),
  } = $props<{
    wins: number;
    stateMachine: FiniteStateMachine<string, string>;
    difficulty: Difficulty;
    showTutorial: boolean;
  }>();
</script>

<div class="wrapper">
  <div
    class="main-content"
    in:fade={{ delay: 100, duration: 100 }}
    out:fade={{ duration: 100 }}
  >
    <div class="header">
      <h1>
        Colormatch!
        {#if stateMachine.current === "final"}
          <br />Score is {wins}
        {/if}
      </h1>
      {#if stateMachine.current !== "final"}
        <p class="description">
          Guess the color and score points!<br />Explore colors in 3D space and
          gain an intuition for the RGB color model.
          <button class="tertiary" onclick={() => (showTutorial = true)}>
            Learn more
          </button>
        </p>
      {/if}
    </div>

    <div class="actions">
      <Segmented options={["easy", "medium", "hard"]} bind:value={difficulty} />

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
  </div>
</div>

<div class="colophon">
  <div>v0.6</div>
  <a href="https://jayas.me" target="_blank">Made by @jayas.me</a>
</div>

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

  .colophon {
    z-index: 1000;
    position: fixed;
    bottom: 0;
    width: 100dvw;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    gap: 0.5rem;

    color: #000000aa;
    font-size: 0.8rem;
    font-weight: 450;
    line-height: 1;

    transition: color 0.2s ease-out;

    a {
      text-decoration: none;
      color: inherit;
    }

    &:hover {
      color: #000000;
    }
  }

  @media screen and (max-width: 768px) {
    h1 {
      font-size: 3rem;
    }
    .description {
      font-size: 1.1rem;
    }
  }
</style>
