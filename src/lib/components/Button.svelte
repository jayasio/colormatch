<script lang="ts">
  import Shortcut from "$lib/components/Shortcut.svelte";
  import type { Snippet } from "svelte";

  let {
    onclick,
    shortcut = null,
    children,
    ...rest
  }: {
    onclick: () => void;
    shortcut?: string | null;
    children?: Snippet;
    rest?: any;
  } = $props();
</script>

<button {onclick} {...rest}>
  {@render children?.()}

  {#if shortcut}
    <Shortcut label={shortcut} />
  {/if}
</button>

<style>
  button {
    border: none;
    border-radius: 0.25rem;
    font-weight: 500;
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
