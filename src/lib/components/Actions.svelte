<script lang="ts">
  import { LogOut } from "lucide-svelte";
  import type { FiniteStateMachine } from "runed";
  let { stateMachine, ...props } = $props<{
    stateMachine: FiniteStateMachine<string, string>;
    props: unknown;
  }>();
</script>

<div class="wrapper" {...props}>
  <button class="card" onclick={() => stateMachine.send("exit")}>
    <span style:line-height="1rem" style:width="1rem">?</span>
  </button>
  <button class="card" onclick={() => stateMachine.send("exit")}
    ><LogOut size="1rem" />
  </button>
</div>

<style>
  .wrapper {
    display: flex;
    gap: 0.125rem;
  }
  .card {
    display: flex;
    flex-direction: column;
    padding: 0.8rem 1rem;
    gap: 0.5rem;
    background-color: #26262699;
    backdrop-filter: blur(16px);
    border-radius: 0.25rem;
  }
  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: var(--text-0);
  }
</style>
