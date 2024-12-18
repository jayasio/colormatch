<script lang="ts">
  import { fade, blur } from "svelte/transition";
  import { game } from "$lib/game";

  import type { Difficulty } from "$lib/types";
  import Button from "$lib/components/Button.svelte";
  import Segmented from "$lib/components/Segmented.svelte";

  let version = "beta v0.4";

  let {
    stateMachine,
    difficulty = $bindable(),
  }: {
    stateMachine: any;
    difficulty: Difficulty;
  } = $props();

  let { wins } = $derived($game);
</script>

<div class="menu-container">
  <div class="blur" transition:blur={{ duration: 400 }}></div>
  <div
    class="menu"
    in:fade={{ delay: 100, duration: 100 }}
    out:fade={{ duration: 100 }}
  >
    {#if stateMachine.current === "end"}
      <div class="title-end">
        <div class="logo">ColorMatch!</div>
        <div class="version">{version}</div>
      </div>
    {:else}
      <div class="title">
        <div class="logo">Color<br />Match!</div>
        <div class="version">{version}</div>
      </div>
    {/if}

    {#if stateMachine.current === "end"}
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

    <Segmented bind:value={difficulty} options={["easy", "medium", "hard"]} />

    <Button onclick={() => stateMachine.send("start")} shortcut="⮐">
      {#if stateMachine.current === "initial"}
        Play
      {:else}
        Play again
      {/if}
    </Button>
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
    max-width: max(800px, 20vw);
    background-color: var(--surface-0);
    padding: 0.5rem;
    border-radius: 0.75rem;
    display: flex;
    flex-direction: column;
    z-index: 100;
    gap: 0.5rem;
  }

  .title {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 0.25rem;
    /* padding: 0.25rem; */
    padding-bottom: 5rem;

    & > .logo {
      font: var(--heading-4);
      line-height: 1.1;
    }
  }

  .title-end {
    display: flex;
    justify-content: start;
    align-items: end;
    gap: 0.25rem;
    padding: 0.5rem;

    & > .logo {
      font: var(--body-1);
      line-height: 1.1;
    }
  }

  .version {
    font: var(--caption);
    color: var(--white-0);

    font-weight: 500;

    padding: 0.25rem;
    border-radius: 0.25rem;
    background-color: rgb(247, 74, 6);
  }

  .score {
    font: var(--heading-1);
    margin: 0;
    padding: 0;
  }

  .score-card {
    width: 100%;
    padding: 1rem;
    background-color: var(--surface-1);
    border-radius: 0.5rem;
  }

  .logo {
    margin: 0;
    padding: 0;
  }
</style>
