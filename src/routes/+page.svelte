<script lang="ts">
  import { GameState, CubeState } from "$lib/state.svelte";
  import type { Difficulty, ToastStyle } from "$lib/types";
  import { FiniteStateMachine } from "runed";
  import { Canvas } from "@threlte/core";

  import { LogOut, CircleHelp } from "lucide-svelte";

  import _ from "lodash";

  import Toast from "$lib/components/Toast.svelte";
  import Menu from "$lib/components/Menu.svelte";
  import QuestionCard from "$lib/components/QuestionCard.svelte";
  import Button from "$lib/components/Button.svelte";
  import Slider from "$lib/components/Slider.svelte";

  import Scene from "./Scene.svelte";
  import type { IntersectionEvent } from "@threlte/extras";
  import { untrack } from "svelte";

  const difficulties = ["easy", "medium", "hard"] as const;
  let menuState: {
    difficulty: Difficulty;
  } = $state({
    difficulty: "medium",
  });
  let size = $derived(difficulties.indexOf(menuState.difficulty) + 3);

  let showToast = $state(false);
  let toastMessage = $state("");
  let toastType: ToastStyle = $state("neutral");

  function toast(message: string, type: ToastStyle) {
    toastMessage = message;
    toastType = type;
    showToast = true;
    setTimeout(() => {
      showToast = false;
    }, 1000);
  }

  let gameState = $state(new GameState(untrack(() => size)));
  let cubeState = $state(new CubeState(untrack(() => size)));

  $effect(() => {
    if (gameState.strikes >= 3) stateMachine.send("end");
  });

  const stateMachine = new FiniteStateMachine("initial", {
    initial: {
      start: "playing",
    },
    playing: {
      _enter: () => {
        gameState = new GameState(size);
        cubeState = new CubeState(size);
      },
      score: () => {
        gameState.score();
        toast("Nice!", "success");
      },
      strike: () => {
        gameState.strike();
        toast("Oops!", "failure");
      },
      end: () => {
        toast("Game over :(", "failure");
        return "final";
      },
      exit: () => {
        return "final";
      },
    },
    final: {
      start: "playing",
    },
  });

  function handleSelect(event: IntersectionEvent<PointerEvent>) {
    event.stopPropagation();

    if (event.delta > 0) return;

    const { coord } = event.object.userData;

    if (coord.isEqualTo(gameState.latestQuestion)) {
      stateMachine.send("score");
    } else {
      stateMachine.send("strike");
    }
  }
</script>

{#if stateMachine.current !== "playing"}
  <Menu
    {stateMachine}
    wins={gameState.wins}
    bind:difficulty={menuState.difficulty}
  />
{/if}

{#if stateMachine.current === "playing"}
  <div class="hud">
    <QuestionCard {size} question={gameState.latestQuestion} />

    <div class="lives ignore-pointer">
      {#each _.range(gameState.strikes, 3) as life}
        <div>❤️</div>
      {/each}
      {#each _.range(0, gameState.strikes) as strike}
        <div style:opacity={"25%"}>💔</div>
      {/each}
    </div>

    <div class="score-container ignore-pointer">
      <span class="score">{gameState.wins}</span>
      Score
    </div>
  </div>

  <div class="spacefactor-slider">
    <Slider bind:value={cubeState.spaceFactor.target} />
  </div>

  <div class="actions">
    <!-- <Button type="secondary" onclick={() => stateMachine.send("exit")}>
      <CircleHelp />
    </Button> -->
    <Button type="secondary" onclick={() => stateMachine.send("exit")}>
      <LogOut />
    </Button>
  </div>
{/if}

<div class="container">
  <Canvas colorSpace="srgb" useLegacyLights={false} toneMapping={0}>
    <!-- TODO infer colorspace from media queries maybe -->
    <Scene {handleSelect} {stateMachine} {cubeState} {size} />
  </Canvas>
  <div class="bg"></div>
</div>

{#if showToast}
  <Toast message={toastMessage} type={toastType} />
{/if}

<style>
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    z-index: -101;
  }

  :global(body),
  .bg {
    background: radial-gradient(
        ellipse at top,
        var(--surface-1),
        var(--surface-0)
      ),
      radial-gradient(ellipse at bottom, var(--surface-1), var(--surface-0));
    background-color: transparent;
    color: var(--text-0);
  }

  .container {
    position: fixed;
    top: 0;
    z-index: -100;
    width: 100dvw;
    height: 100dvh;
    overflow: hidden;
  }

  .spacefactor-slider {
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100%;
    z-index: 10;
    justify-content: start;
    padding-top: calc(1.25rem + env(safe-area-inset-top));
    padding-right: calc(1.25rem + env(safe-area-inset-right));
    padding-bottom: calc(1.25rem + env(safe-area-inset-bottom));
    padding-left: calc(1.25rem + env(safe-area-inset-left));
  }

  .ignore-pointer {
    pointer-events: none;

    & > * {
      pointer-events: auto;
      pointer-events: all;
    }
  }

  .hud {
    position: fixed;
    top: 0;
    display: flex;
    z-index: 10;
    justify-content: space-between;
    width: 100%;
    align-items: start;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 1.25rem;
  }

  .lives {
    margin: 0;
    padding: 0;
    gap: 0;
    display: flex;
    font-family: system-ui;
    font-size: 2rem;
    align-items: center;
    justify-content: center;
    justify-self: center;
  }

  .score-container {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 0;
  }

  .score {
    font: var(--heading-2);
    margin: 0;
    padding: 0;
  }

  .actions {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 200;
    margin-top: calc(1.25rem + env(safe-area-inset-top));
    margin-right: calc(1.25rem + env(safe-area-inset-right));
    margin-bottom: calc(1.25rem + env(safe-area-inset-bottom));
    margin-left: calc(1.25rem + env(safe-area-inset-left));

    display: flex;
    gap: 0.5rem;
  }
</style>
