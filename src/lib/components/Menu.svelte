<script lang="ts">
  import { fade, blur } from "svelte/transition";
  import { version } from "$lib/version";

  import type { Difficulty } from "$lib/types";
  import Segmented from "$lib/components/Segmented.svelte";
  import Onboarding from "$lib/components/Onboarding.svelte";

  let {
    wins,
    stateMachine,
    difficulty = $bindable(),
  }: {
    wins: number;
    stateMachine: any;
    difficulty: Difficulty;
  } = $props();

  let showOnboarding = $state(false);
</script>

<div class="wrapper">
  <div class="blur" transition:blur={{ duration: 400 }}></div>
  <div
    class="container"
    in:fade={{ delay: 100, duration: 100 }}
    out:fade={{ duration: 100 }}
  >
    <!-- <div class="menu" style:flex={1}>
      {#if stateMachine.current === "final"}
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

      {#if stateMachine.current === "final"}
        <div class="score-card">
          You scored
          <div class="score">
            {wins}
          </div>
          <!-- Questions:
      {#each $questionsList as question}
        <div>
          <div style:background-color={question.color} />
          {question.color}
        </div>
      {/each}
        </div>
      {/if}
    </div> -->

    <Onboarding {stateMachine} bind:showOnboarding />

    <div class="menu">
      <Segmented
        bind:value={difficulty}
        options={["easy", "medium", "hard"] as const}
      />

      <button onclick={() => stateMachine.send("start")} class="primary">
        {#if stateMachine.current === "initial"}
          Play
        {:else}
          Play again
        {/if}
      </button>
    </div>
  </div>
</div>

<style>
  .wrapper {
    width: 100dvw;
    height: 100dvh;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.125rem;
  }

  .blur {
    position: absolute;
    width: 100dvw;
    height: 100dvh;
    z-index: 10;
    backdrop-filter: blur(60px);
    -webkit-backdrop-filter: blur(60px);
  }

  .container {
    width: 35dvw;
    max-width: 400px;
    /* height: 60dvh; */
    z-index: 100;

    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  .menu {
    display: flex;
    flex-direction: column;
    padding: 0.25rem;
    gap: 0.25rem;

    background-color: var(--surface-0);
    border-radius: 0.5rem;
  }

  .title {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 0.25rem;
    /* padding: 0.25rem; */
    padding-bottom: 5rem;

    & > .logo {
      font: var(--heading-4);
      font-family: "Geist";
      line-height: 1.1;
    }
  }

  .title-end {
    flex: 1;
    display: flex;
    justify-content: start;
    align-items: end;
    gap: 0.25rem;
    padding: 0.5rem;

    & > .logo {
      font: var(--body-1);
      font-family: "Geist";
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

  button {
    padding: 0.6rem 1rem;
    background: none;
    border: none;
    border-radius: 0.25rem;
    color: white;
    font: var(--font--1);
    font-family: "Geist Mono";
    text-transform: uppercase;
    cursor: pointer;
  }

  button.primary {
    background: white;
    color: black;
  }
</style>
