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
    class="top-left"
    in:fly={{ y: -100, duration: 400, delay: 100 }}
    out:fly={{ y: -100, duration: 400 }}
  >
    <GameCard {size} question={gameState.latestQuestion} />
  </div>
  <div
    class="top-right"
    in:fly={{ y: -100, duration: 400, delay: 100 }}
    out:fly={{ y: -100, duration: 400 }}
  >
    <ScoreCard
      wins={gameState.wins}
      strikes={gameState.strikes}
      maxStrikes={3}
    />
  </div>
  <div
    class="bottom-left"
    in:fly={{ y: 100, duration: 400, delay: 100 }}
    out:fly={{ y: 100, duration: 400 }}
  >
    <Slider bind:value={cubeState.spaceFactor.target} />
  </div>
  <div
    class="bottom-right"
    in:fly={{ y: 100, duration: 400, delay: 100 }}
    out:fly={{ y: 100, duration: 400 }}
  >
    <Actions {stateMachine} bind:showTutorial />
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
  .top-left {
    position: fixed;
    top: 1rem;
    left: 1rem;
  }
  .top-right {
    position: fixed;
    top: 1rem;
    right: 1rem;
  }
  .bottom-left {
    position: fixed;
    bottom: 1rem;
    left: 1rem;
  }
  .bottom-right {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
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
