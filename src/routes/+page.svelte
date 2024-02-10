<script lang="ts">
  import { Canvas, T } from "@threlte/core"
  import fsm from "svelte-fsm"
  import _ from "lodash"

  import Toast from "$lib/components/Toast.svelte"
  import Shortcut from "$lib/components/Shortcut.svelte"
  import Slider from "$lib/components/Slider.svelte"
  import Menu from "$lib/components/Menu.svelte"

  import Scene from "./Scene.svelte"
  import { game, resetGame } from "$lib/game"

  import type { Difficulty, ToastStyle } from "$lib/types"
  import QuestionCard from "$lib/components/QuestionCard.svelte"

  let difficulty: Difficulty = "medium"
  let difficultyNumber: number = 4

  $: {
    if (difficulty === "easy") {
      difficultyNumber = 3
    } else if (difficulty === "medium") {
      difficultyNumber = 4
    } else {
      difficultyNumber = 5
    }
  }

  let showToast = false
  let toastMessage: string
  let toastType: ToastStyle

  function toast(message: string, type: ToastStyle = "neutral") {
    toastMessage = message
    toastType = type
    showToast = true
    setTimeout(() => (showToast = false), 1000)
  }

  $: ({ question, questionsList, spaceFactor } = $game)
  $: ({ wins, strikes } = $game)

  const maxStrikes = 3

  const state = fsm("initial", {
    initial: {
      start: "play",
      setDifficulty(difficultyLevel: Difficulty) {
        difficulty = difficultyLevel
      },
    },
    play: {
      _enter() {
        resetGame(difficultyNumber)
      },
      space({ isIncrement }) {
        if (isIncrement && $spaceFactor < 3) {
          $spaceFactor += 0.25
          if ($spaceFactor > 3) $spaceFactor = 3
        } else if (!isIncrement && $spaceFactor > 2) {
          $spaceFactor -= 0.25
          if ($spaceFactor < 2) $spaceFactor = 2
        }
      },
      score() {
        $game.score()
        toast("Nice!", "success")
      },
      strike() {
        $game.strike()
        if ($strikes >= maxStrikes) return "end"
      },
      end: "end",
    },
    end: {
      _enter() {
        toast("Game over :(", "failure")
      },
      start: "play",
      setDifficulty(difficultyLevel: Difficulty) {
        difficulty = difficultyLevel
      },
    },
  })

  function handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case "Enter":
        state.start()
        break
      case "Escape":
        state.end()
        break
      case "1":
        state.setDifficulty("easy")
        break
      case "2":
        state.setDifficulty("medium")
        break
      case "3":
        state.setDifficulty("hard")
        break
      case ".":
        state.space({ isIncrement: true })
        break
      case ",":
        state.space({ isIncrement: false })
        break
    }
  }

  function handleSelect(event: any) {
    const { coord } = event.object.userData

    if (_.isEqual($question.coords, coord)) state.score()
    else state.strike()

    event.stopPropagation()
  }
</script>

<svelte:window on:keydown={handleKeyDown} />

<svelte:head>
  <title>ColorMatch!</title>
  <!-- <link rel="preconnect" href="https://rsms.me/" />
  <link rel="stylesheet" href="https://rsms.me/inter/inter.css" /> -->
</svelte:head>

{#if $state !== "play"}
  <Menu {state} bind:difficulty />
{/if}

{#if $state === "play"}
  <div class="hud">
    <QuestionCard {question} />

    <div class="lives">
      {#each _.range($strikes, maxStrikes) as life}
        <div>❤️</div>
      {/each}
      {#each _.range(0, $strikes) as strike}
        <div style:opacity={"25%"}>💔</div>
      {/each}
    </div>

    <div class="score-container">
      <span class="score">{$wins}</span>
      Score
    </div>
  </div>

  <div class="spacefactor-slider">
    <Slider bind:value={$spaceFactor} />
  </div>

  <button on:click={state.end} class="exit-button">
    Exit <Shortcut label="Esc" />
  </button>
{/if}

<div class="container">
  <Canvas
    colorSpace="srgb"
    useLegacyLights={false}
    toneMapping={T.NoToneMapping}
  >
    <!-- TODO infer colorspace from media queries maybe -->
    <Scene {handleSelect} {state} />
  </Canvas>
  <div class="bg" />
</div>

{#if showToast}
  <Toast message={toastMessage} type={toastType} />
{/if}

<style>
  :root {
    user-select: none;

    /* font-family: Inter, sans-serif;
    font-feature-settings:
      "liga" 1,
      "calt" 1;  */
    /* fix for Chrome */
  }
  /* @supports (font-variation-settings: normal) {
    :root {
      font-family: InterVariable, sans-serif;
    }
  } */

  :global(body),
  .bg {
    background-color: var(--surface-0);
    color: var(--text-0);
  }

  .bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    z-index: -101;
  }

  @media (prefers-color-scheme: dark) {
    :global(body),
    .bg {
      background: radial-gradient(
          ellipse at top,
          var(--surface-2),
          var(--surface-0)
        ),
        radial-gradient(ellipse at bottom, var(--surface-1), var(--surface-0));
      background-color: transparent;
      color: var(--text-0);
    }
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
    justify-content: center;
    padding-top: calc(1rem + env(safe-area-inset-top));
    padding-right: calc(1rem + env(safe-area-inset-right));
    padding-bottom: calc(1rem + env(safe-area-inset-bottom));
    padding-left: calc(1rem + env(safe-area-inset-left));
  }

  button {
    border: none;
    border-radius: 0.5rem;
    background-color: var(--surface-inverse-0);
    color: var(--text-inverse-0);
    padding: 0.75rem 1rem;
    cursor: pointer;
    display: flex;
    gap: 0.25rem;
    justify-content: center;
    align-items: center;
  }

  .exit-button {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 200;
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
    padding: 1rem;
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
    font: var(--heading-1);
    margin: 0;
    padding: 0;
  }
</style>
