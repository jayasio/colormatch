<script lang="ts">
  import { Canvas } from "@threlte/core"
  import fsm from "svelte-fsm"
  import _ from "lodash"

  import Scene from "./Scene.svelte"

  import Toast from "$lib/Toast.svelte"
  import Shortcut from "$lib/Shortcut.svelte"

  import { game, Game } from "$lib/game"

  enum Difficulty {
    easy = 3,
    medium = 4,
    hard = 5,
  }
  let difficulty = Difficulty.medium

  let showScoreToast = false
  let showEndToast = false

  $: ({ question, spaceFactor } = $game)
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
        if (isIncrement && $spaceFactor < 3) $spaceFactor += 0.25
        else if (!isIncrement && $spaceFactor > 2) $spaceFactor -= 0.25

        if ($spaceFactor > 3) $spaceFactor = 3
        else if ($spaceFactor < 2) $spaceFactor = 2
      },
      score() {
        $game.score()
        showScoreToast = true
        setTimeout(() => (showScoreToast = false), 1000)
      },
      strike() {
        $game.strike()
        if ($strikes >= maxStrikes) return "end"
      },
      end: "end",
    },
    end: {
      _enter() {
        showEndToast = true
        setTimeout(() => (showEndToast = false), 1000)
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
</script>

<svelte:window on:keydown={handleKeyDown} />

<svelte:head>
  <title>Color Match!</title>
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
          Play <Shortcut label="Enter" color={"255,255,255"} />
        {:else}
          Play again <Shortcut label="Enter" color={"255,255,255"} />
        {/if}
      </button>
    </div>
  </div>
{:else}
  <div class="hud">
    <div>
      <div style:background-color={$question.color} class="question-color" />
      {$question.color}<br />
      {`R: ${Math.round(($question.coords.x * 100) / ($game.difficulty - 1))}%, 
        G: ${Math.round(($question.coords.y * 100) / ($game.difficulty - 1))}%, 
        B: ${Math.round(($question.coords.z * 100) / ($game.difficulty - 1))}%`}
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

  <div class="container">
    <Canvas>
      <Scene {state} />
    </Canvas>
  </div>

  <div class="spacefactor-slider">
    <input type="range" min={2} max={3} step={0.1} bind:value={$spaceFactor} />
  </div>

  <button on:click={state.end} class="exit-button">
    Exit <Shortcut label="Esc" color={"255,255,255"} />
  </button>
{/if}

{#if showScoreToast}
  <Toast message={"Nice!"} type="success" />
{/if}

{#if showEndToast}
  <Toast message={"Game over :("} type="failure" />
{/if}

<style>
  :root {
    font-family: "Geist Mono", monospace;
    font-size: 14px;
    user-select: none;
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
    background-color: black;
    color: white;
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
  }

  .lives {
    margin: 0;
    padding: 0;
    gap: 0;
    display: flex;
    font-size: 2rem;
    align-items: start;
    font-family: system-ui;
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
    background-color: hsl(0, 0%, 95%);
    font-weight: bold;
    border-radius: 0.5rem;
  }

  .difficulty {
    padding: 0.25rem;
    display: flex;
    gap: 0.125rem;
    width: 100%;
    background-color: hsl(0, 0%, 95%);
    border-radius: 0.5rem;
  }

  .difficulty-level {
    flex: 1;
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: center;
    border-radius: 0.25rem;
    transition: all 200ms ease-out;
    cursor: pointer;
  }

  .difficulty-level:hover {
    background-color: hsl(0, 0%, 90%);
  }

  .difficulty-level:has(input[type="radio"]:checked) {
    background-color: hsl(215, 100%, 50%);
    color: white;
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
