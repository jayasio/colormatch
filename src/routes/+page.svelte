<script lang="ts">
  import "@fontsource/archivo"

  import { Canvas } from "@threlte/core"
  import fsm from "svelte-fsm"
  import _ from "lodash"

  import Scene from "./Scene.svelte"

  import Toast from "$lib/components/Toast.svelte"
  import Shortcut from "$lib/components/Shortcut.svelte"

  import { game, Game } from "$lib/game"
  import Slider from "$lib/components/Slider.svelte"

  enum Difficulty {
    easy = 3,
    medium = 4,
    hard = 5,
  }
  let difficulty: Difficulty = Difficulty.medium

  let showToast = false
  let toastMessage: string
  let toastType: "neutral" | "success" | "failure"

  function toast(
    message: string,
    type: "neutral" | "success" | "failure" = "neutral",
  ) {
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
        game.set(new Game(difficulty))
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
        state.setDifficulty(Difficulty.easy)
        break
      case "2":
        state.setDifficulty(Difficulty.medium)
        break
      case "3":
        state.setDifficulty(Difficulty.hard)
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
  <title>Color Match!</title>
  <!-- <link rel="preconnect" href="https://rsms.me/" />
  <link rel="stylesheet" href="https://rsms.me/inter/inter.css" /> -->
</svelte:head>

{#if $state !== "play"}
  <div class="menu-container">
    <div class="menu">
      {#if $state === "end"}
        <div class="score-card">
          You scored
          <div class="score">
            {$wins}
          </div>
          <!-- Questions:
          {#each $questionsList as question}
            <div>
              <div style:background-color={question.color} />
              {question.color}
            </div>
          {/each} -->
        </div>
      {/if}

      <div class="logo">Color Match!</div>
      <div class="difficulty">
        {#each [Difficulty.easy, Difficulty.medium, Difficulty.hard] as difficultyLevel, index}
          <label class="difficulty-level" style:text-transform={"capitalize"}>
            <input
              bind:group={difficulty}
              value={difficultyLevel}
              type="radio"
              style:display={"none"}
            />
            {Difficulty[difficultyLevel]}
            <!-- <Shortcut label={`${index + 1}`} /> -->
          </label>
        {/each}
      </div>
      <button on:click={state.start}>
        {#if $state === "initial"}
          Play
        {:else}
          Play again
        {/if}
        <Shortcut label="⮐" />
      </button>
    </div>
  </div>
{:else}
  <div class="hud">
    <div>
      <div style:background-color={$question.color} class="question-color" />
      {$question.color}<br />
      {`R: ${Math.round(($question.coords.x * 100) / (difficulty - 1))}%, 
        G: ${Math.round(($question.coords.y * 100) / (difficulty - 1))}%, 
        B: ${Math.round(($question.coords.z * 100) / (difficulty - 1))}%`}
    </div>

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

  <!-- <div
    style={"width: 100dvw; height: 100dvh; z-index: 100; backdrop-filter: blur(60px);"}
  /> -->

  <div class="container">
    <Canvas colorSpace="display-p3" useLegacyLights={false}>
      <Scene {handleSelect} />
    </Canvas>
    <div class="bg" />
  </div>

  <div class="spacefactor-slider">
    <Slider bind:value={$spaceFactor} />
  </div>

  <button on:click={state.end} class="exit-button">
    Exit <Shortcut label="Esc" />
  </button>
{/if}

{#if showToast}
  <Toast message={toastMessage} type={toastType} />
{/if}

<style>
  :root {
    font-family:
      "Archivo",
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;

    user-select: none;

    --surface-0: hsl(0, 0%, 100%);
    --surface-1: hsl(0, 0%, 95%);
    --surface-2: hsl(0, 0%, 90%);
    --text: hsl(0, 0%, 0%);
    --primary: hsl(0, 0%, 0%);
    --accent: hsl(215, 100%, 50%);

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
    color: var(--text);
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
    :root {
      --surface-0: hsl(0, 0%, 5%);
      --surface-1: hsl(0, 0%, 10%);
      --surface-2: hsl(0, 0%, 15%);
      --text: hsl(0, 0%, 100%);
      --primary: hsl(0, 0%, 100%);
      --accent: hsl(215, 100%, 50%);
    }

    :global(body),
    .bg {
      background: radial-gradient(
          ellipse at top,
          var(--surface-2),
          var(--surface-0)
        ),
        radial-gradient(ellipse at bottom, var(--surface-1), var(--surface-0));
      background-color: transparent;
      color: var(--text);
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
    background-color: var(--primary);
    color: var(--surface-0);
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
  }

  .lives {
    margin: 0;
    padding: 0;
    gap: 0;
    display: flex;
    font-size: 2rem;
    align-items: start;
    font-family: system-ui;
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
    font-size: 4rem;
    margin: 0;
    padding: 0;
    line-height: 1;
  }

  .menu-container {
    width: 100dvw;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .menu {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .score-card {
    width: 100%;
    padding: 1rem;
    background-color: var(--surface-1);
    font-weight: bold;
    border-radius: 0.5rem;
  }

  .difficulty {
    padding: 0.25rem;
    display: flex;
    gap: 0.125rem;
    width: 100%;
    background-color: var(--surface-1);
    border-radius: 0.5rem;
  }

  .difficulty-level {
    flex: 1;
    padding: 0.5rem 1rem;
    gap: 0.5rem;
    display: flex;
    justify-content: center;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  .difficulty-level:hover {
    background-color: var(--surface-2);
  }

  .difficulty-level:has(input[type="radio"]:checked) {
    background-color: var(--accent);
    color: hsl(0, 0%, 100%);
  }

  .logo {
    margin: 0;
    padding: 0;
  }

  .question-color {
    height: 4rem;
    width: 4rem;
  }
</style>
