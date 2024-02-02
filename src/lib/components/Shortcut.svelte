<script lang="ts">
  export let label: string
</script>

<div>
  {label}
</div>

<style>
  div {
    display: inline;
    font-size: 0.75rem;
    font-weight: medium;
    color: var(--surface-0);
    opacity: 0.6;
    background-color: rgba(var(--text), 0.1);
    /* bg-color needs a fix */
    border-radius: 0.25rem;
    padding: 0.25rem;
  }
</style>
