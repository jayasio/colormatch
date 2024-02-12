<script lang="ts">
  import Shortcut from "$lib/components/Shortcut.svelte"
  export let onclick: (event: any) => void
  export let shortcut: string | null = null
</script>

<button on:click={onclick} {...$$restProps}>
  <slot />

  {#if shortcut}
    <Shortcut label={shortcut} />
  {/if}
</button>

<style>
  button {
    border: none;
    border-radius: 0.25rem;
    background-color: var(--surface-inverse-0);
    color: var(--text-inverse-0);
    padding: 0.75rem 1rem;
    cursor: pointer;
    display: flex;
    gap: 0.25rem;
    justify-content: center;
    align-items: center;

    transition: all cubic-bezier(0.34, 1.56, 0.64, 1) 200ms;

    &:hover {
      background-color: var(--surface-inverse-1);
    }
  }
</style>
