<script lang="ts">
  import GameCard from "$lib/components/GameCard.svelte";
  import ScoreCard from "$lib/components/ScoreCard.svelte";
  import Slider from "$lib/components/Slider.svelte";
  import Actions from "$lib/components/Actions.svelte";
  import Menu from "$lib/components/Menu.svelte";
  import Tutorial from "$lib/components/Tutorial.svelte";

  import { blur, fade, fly } from "svelte/transition";

  import type { FiniteStateMachine } from "runed";
  import type { GameState, CubeState } from "$lib/state.svelte";
  import type { Difficulty } from "$lib/types";

  let {
    stateMachine,
    gameState,
    cubeState,
    difficulty = $bindable(),
    size,
  } = $props<{
    stateMachine: FiniteStateMachine<string, string>;
    gameState: GameState;
    cubeState: CubeState;
    difficulty: Difficulty;
    size: number;
  }>();

  let showTutorial = $state(false);
</script>

{#if stateMachine.current === "playing"}
  <div
    class="top"
    in:fly={{ y: -100, duration: 500, delay: 100 }}
    out:fly={{ y: -100, duration: 500 }}
  >
    <GameCard
      {size}
      question={gameState.latestQuestion}
      style="pointer-events: all"
    />
    <ScoreCard
      wins={gameState.wins}
      strikes={gameState.strikes}
      maxStrikes={3}
      style="pointer-events: all"
    />
  </div>
  <div
    class="bottom"
    in:fly={{ y: 100, duration: 500, delay: 100 }}
    out:fly={{ y: 100, duration: 500 }}
  >
    <Slider
      bind:value={cubeState.spaceFactor.target}
      style="pointer-events: all"
    />
    <Actions {stateMachine} bind:showTutorial style="pointer-events: all" />
  </div>
{/if}

{#if stateMachine.current !== "playing" || showTutorial}
  <div class="blur" transition:blur={{ duration: 400 }}></div>
{/if}

{#if stateMachine.current !== "playing" && !showTutorial}
  <Menu
    {stateMachine}
    wins={gameState.wins}
    bind:difficulty
    bind:showTutorial
  />
{/if}

{#if showTutorial}
  <div
    class="tutorial-container"
    in:fade={{ delay: 100, duration: 100 }}
    out:fade={{ duration: 100 }}
  >
    <Tutorial dismiss={() => (showTutorial = false)} />
  </div>
{/if}

<style>
  .top,
  .bottom {
    width: 100dvw;
    height: fit-content;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    gap: 0.25rem;
    pointer-events: none;
  }
  .top {
    top: 0;
  }
  .bottom {
    bottom: 0;
  }

  .tutorial-container {
    width: 100dvw;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3rem;
  }

  .blur {
    position: fixed;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    background-color: #ffffff33;
    backdrop-filter: blur(60px);
    -webkit-backdrop-filter: blur(60px);
  }
</style>
