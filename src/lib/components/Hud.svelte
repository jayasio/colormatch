<script lang="ts">
  import type { FiniteStateMachine } from "runed";
  import { blur, fade, fly } from "svelte/transition";
  import Actions from "$lib/components/Actions.svelte";
  import GameCard from "$lib/components/GameCard.svelte";
  import Menu from "$lib/components/Menu.svelte";
  import ScoreCard from "$lib/components/ScoreCard.svelte";
  import Slider from "$lib/components/Slider.svelte";
  import Tutorial from "$lib/components/Tutorial.svelte";
  import type { CubeState, GameState } from "$lib/state.svelte";
  import type { Difficulty, FsmEvents, FsmStates } from "$lib/types";

  let {
    stateMachine,
    gameState,
    cubeState,
    newPlayer = $bindable(),
    difficulty = $bindable(),
    showTutorial = $bindable(),
    showHint = $bindable(),
    size,
  } = $props<{
    stateMachine: FiniteStateMachine<FsmStates, FsmEvents>;
    gameState: GameState;
    cubeState: CubeState;
    newPlayer: string;
    difficulty: Difficulty;
    showTutorial: boolean;
    showHint: boolean;
    size: number;
  }>();
</script>

{#if stateMachine.current === "playing"}
  <div
    class="top"
    in:fly={{ y: -100, duration: 500, delay: 100 }}
    out:fly={{ y: -100, duration: 500 }}
  >
    <GameCard {size} question={gameState.latestQuestion} bind:showHint />
    <ScoreCard
      wins={gameState.wins}
      strikes={gameState.strikes}
      maxStrikes={3}
    />
  </div>
  <div
    class="bottom"
    in:fly={{ y: 100, duration: 500, delay: 100 }}
    out:fly={{ y: 100, duration: 500 }}
  >
    <Slider bind:value={cubeState.spaceFactor.target} />
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
    <Tutorial
      dismiss={() => {
        showTutorial = false;

        // Note: Taking a copy of newPlayer value before setting it to false, because the if check was earlier done on the original newPlayer value which would change before the if check
        const player = newPlayer;

        // This needs to be done before the if check tho, since the "start" event is going to check newPlayer
        localStorage.setItem("new-player", "false");
        newPlayer = "false";

        if (player === "true") {
          stateMachine.send("start");
        }
      }}
    />
  </div>
{/if}

<style>
  .top,
  .bottom {
    position: fixed;
    bottom: 0;
    display: flex;
    gap: 0.25rem;
    justify-content: space-between;
    width: 100dvw;
    height: fit-content;
    padding: 1rem;
    pointer-events: none;
  }
  .top {
    top: 0;
  }
  .bottom {
    bottom: 0;
  }

  .tutorial-container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: center;
    justify-content: center;
    width: 100dvw;
    height: 100dvh;
  }

  .blur {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
    width: 100dvw;
    height: 100dvh;
    background-color: #ffffff33;
    -webkit-backdrop-filter: blur(60px);
    backdrop-filter: blur(60px);
  }

  @media screen and (width <= 960px) {
    .top,
    .bottom {
      gap: 0.15rem;
      padding: 0.75rem;
    }
  }

  @media screen and (width <= 480px) {
    .top,
    .bottom {
      gap: 0.125rem;
      padding: 0.5rem;
    }
  }
</style>
