<script lang="ts">
  import { GameState, CubeState } from "$lib/state.svelte";
  import type {
    Difficulty,
    FsmEvents,
    FsmStates,
    ToastStyle,
  } from "$lib/types";
  import { FiniteStateMachine } from "runed";
  import { Canvas } from "@threlte/core";

  import Toast from "$lib/components/Toast.svelte";
  import Hud from "$lib/components/Hud.svelte";

  import Scene from "./Scene.svelte";
  import type { IntersectionEvent } from "@threlte/extras";
  import { untrack } from "svelte";
  import { onMount } from "svelte";

  let newPlayer = $state("true");

  onMount(() => {
    newPlayer = localStorage.getItem("new-player") ?? "true";
  });

  const difficulties = ["easy", "medium", "hard"] as const;
  let menuState: {
    difficulty: Difficulty;
  } = $state({
    difficulty: "medium",
  });
  let size = $derived(difficulties.indexOf(menuState.difficulty) + 3);

  let showToast: boolean = $state(false);
  let toastMessage: string | undefined = $state("");
  let toastType: ToastStyle = $state("neutral");

  let showTutorial = $state(false);
  let showHint = $state(false);

  function toast(type: ToastStyle, message: string | undefined = undefined) {
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
    if (gameState.strikes >= 3) stateMachine.send("endByFailure");
  });

  const stateMachine = new FiniteStateMachine<FsmStates, FsmEvents>("initial", {
    initial: {
      start: () => {
        if (newPlayer && newPlayer === "true") {
          showTutorial = true;
        } else {
          return "playing";
        }
      },
    },
    playing: {
      _enter: () => {
        gameState = new GameState(size);
        cubeState = new CubeState(size);
      },
      score: () => {
        gameState.score();
        toast("success");
      },
      strike: () => {
        gameState.strike();
        toast("failure");
      },
      endByFailure: () => {
        toast("failure", "Game over :(");
        return "final";
      },
      endManually: () => {
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

<Hud
  {stateMachine}
  {gameState}
  {cubeState}
  {size}
  bind:newPlayer
  bind:showTutorial
  bind:showHint
  bind:difficulty={menuState.difficulty}
/>

<div class="container">
  <Canvas colorSpace="srgb" toneMapping={0}>
    <!-- TODO infer colorspace from media queries maybe -->
    <Scene
      {handleSelect}
      {stateMachine}
      {cubeState}
      {size}
      {showTutorial}
      {showHint}
    />
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
    z-index: -1;
  }

  :global(body),
  .bg {
    background:
      radial-gradient(ellipse at top, hsl(0 0% 6%), hsl(0 0% 4%)),
      radial-gradient(ellipse at bottom, hsl(0 0% 6%), hsl(0 0% 4%));
    background-color: black;
    color: white;
  }

  .container {
    position: fixed;
    top: 0;
    width: 100dvw;
    height: 100dvh;
    z-index: -1;
    overflow: hidden;
  }
</style>
