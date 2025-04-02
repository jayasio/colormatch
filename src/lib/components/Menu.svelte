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
      <h1 class="text-heading-1">
        Colormatch!
        {#if stateMachine.current === "final"}
          <br />Score is {wins}
        {/if}
      </h1>
      {#if stateMachine.current !== "final"}
        <p class="description text-body-para">
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
          class="tertiary tertiary-block"
          style="color: black"
          onclick={() => (showTutorial = true)}
        >
          Learn more
        </button>
      {/if}
    </div>
  </div>
</div>

<div class="colophon">
  <a href="https://github.com/jayasio/colormatch" target="_blank">
    v1.2 – Source
  </a>
  <a href="https://jayas.me" target="_blank"> Made by @jayas.me </a>
</div>

<style>
  .wrapper {
    z-index: 100;
    position: fixed;
    top: 0;
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
    text-align: center;
  }

  h1 {
    text-align: center;
  }

  .actions {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.25rem;
  }

  .colophon {
    z-index: 100;
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

  @media screen and (width <= 960px) {
    .wrapper {
      padding: 2rem;
    }
    .main-content {
      gap: 2.75rem;
    }
    .header {
      gap: 1.325rem;
    }
    .colophon {
      padding: 0.75rem;
    }
  }

  @media screen and (width <= 480px) {
    .wrapper {
      padding: 1rem;
    }
    .main-content {
      flex: 1;
      gap: 2.5rem;
    }
    .header {
      gap: 1.25rem;
    }
    .colophon {
      padding: 0.5rem;
    }
  }
</style>
