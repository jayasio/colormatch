<script lang="ts">
  import { BookOpen, LogOut } from "lucide-svelte";
  import type { FiniteStateMachine } from "runed";
  let {
    stateMachine,
    showTutorial = $bindable(),
    ...props
  } = $props<{
    stateMachine: FiniteStateMachine<string, string>;
    showTutorial: boolean;
    props?: unknown;
  }>();
</script>

<div class="wrapper" {...props}>
  <button class="card" onclick={() => (showTutorial = true)}>
    <BookOpen size="1rem" />
  </button>

  <button
    class="card exit-btn"
    onclick={() => stateMachine.send("endManually")}
  >
    <LogOut size="1rem" />
  </button>
</div>

<style>
  .wrapper {
    pointer-events: all;

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
  .exit-btn:hover {
    background-color: orangered;
  }
</style>
