<script lang="ts">
  import { GameState, CubeState } from "$lib/state.svelte";
  import type { Difficulty, ToastStyle } from "$lib/types";
  import { FiniteStateMachine } from "runed";
  import { Canvas } from "@threlte/core";

  import Toast from "$lib/components/Toast.svelte";
  import Hud from "$lib/components/Hud.svelte";

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

<Hud
  {stateMachine}
  {gameState}
  {cubeState}
  {size}
  bind:difficulty={menuState.difficulty}
/>

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
</style>
