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
  <button type="button" class="card" onclick={() => (showTutorial = true)}>
    <BookOpen size="1rem" />
  </button>

  <button
    type="button"
    class="card exit-btn"
    onclick={() => stateMachine.send("endManually")}
  >
    <LogOut size="1rem" />
  </button>
</div>

<style>
  .wrapper {
    display: flex;
    gap: 0.25rem;
    pointer-events: all;
  }
  .card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    background-color: #26262699;
    border-radius: 5rem;
    backdrop-filter: blur(16px);
  }
  .exit-btn:hover {
    background-color: orangered;
  }
</style>
