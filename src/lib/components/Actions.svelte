<script lang="ts">
  import { LogOut } from "lucide-svelte";
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
    <span style="line-height: 1rem; width: 1rem; font-size: 1rem;"> ? </span>
  </button>

  <button class="card exit-btn" onclick={() => stateMachine.send("exit")}>
    <LogOut size="1rem" />
  </button>
</div>

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
  .exit-btn:hover {
    background-color: orangered;
  }
</style>
