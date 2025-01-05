<script lang="ts">
  import { LogOut } from "lucide-svelte";
  import type { FiniteStateMachine } from "runed";
  import Onboarding from "$lib/components/Onboarding.svelte";
  let { stateMachine, ...props } = $props<{
    stateMachine: FiniteStateMachine<string, string>;
    props: unknown;
  }>();
  import { blur, fade } from "svelte/transition";

  let showTutorial = $state(false);
</script>

<div class="wrapper" {...props}>
  <button class="card" onclick={() => (showTutorial = true)}>
    <span style="line-height: 1rem; width: 1rem; font-size: 1rem;"> ? </span>
  </button>

  <button class="card" onclick={() => stateMachine.send("exit")}>
    <LogOut size="1rem" />
  </button>
</div>

{#if showTutorial}
  <div class="onboarding-wrapper">
    <div class="blur" transition:blur={{ duration: 400 }}></div>
    <div
      class="container"
      in:fade={{ delay: 100, duration: 100 }}
      out:fade={{ duration: 100 }}
    >
      <Onboarding bind:show={showTutorial} />
    </div>
  </div>
{/if}

<style>
  .wrapper {
    display: flex;
    gap: 0.25rem;
  }
  .card {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 0.5rem;
    background-color: #26262699;
    backdrop-filter: blur(16px);
    border-radius: 5rem;
  }

  .onboarding-wrapper {
    width: 100dvw;
    height: 100dvh;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.125rem;
  }
  .blur {
    position: fixed;
    top: 0;
    width: 100dvw;
    height: 100dvh;
    background-color: #ffffff33;
    backdrop-filter: blur(60px);
    -webkit-backdrop-filter: blur(60px);
  }

  .container {
    width: 25dvw;
    max-width: 400px;
    /* height: 60dvh; */
    z-index: 100;

    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }
  button {
    width: 100%;
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
</style>
