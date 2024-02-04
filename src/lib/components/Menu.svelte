<script lang="ts">
  import { fade, blur } from "svelte/transition"
  import { game } from "$lib/game"
  import Shortcut from "$lib/components/Shortcut.svelte"

  import type { Difficulty } from "$lib/types"

  export let state: any
  export let difficulty: Difficulty

  $: ({ wins } = $game)
</script>

<div class="menu-container">
  <div class="blur" transition:blur={{ duration: 400 }} />
  <div
    class="menu"
    in:fade={{ delay: 100, duration: 100 }}
    out:fade={{ duration: 100 }}
  >
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
      {#each ["easy", "medium", "hard"] as difficultyLevel, index}
        <label class="difficulty-level" style:text-transform={"capitalize"}>
          <input
            bind:group={difficulty}
            value={difficultyLevel}
            type="radio"
            style:display={"none"}
          />
          {difficultyLevel}
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

<style>
  .menu-container {
    width: 100dvw;
    height: 100dvh;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .blur {
    position: absolute;
    width: 100dvw;
    height: 100dvh;
    z-index: 10;
    backdrop-filter: blur(60px);
    -webkit-backdrop-filter: blur(60px);
  }

  .menu {
    max-width: min(400px, 100%);
    background-color: var(--surface-0);
    padding: 1rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    z-index: 100;
    gap: 1rem;
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

  .score {
    font-size: 4rem;
    margin: 0;
    padding: 0;
    line-height: 1;
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
