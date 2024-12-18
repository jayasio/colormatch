<script lang="ts">
  let { label }: { label: string } = $props()
</script>

<div>
  {label}
</div>

<style>
  div {
    display: inline;
    font: var(--caption);
    font-weight: bold;
    color: var(--text-inverse-1);
    background-color: var(--surface-inverse-1);
    border-radius: 0.25rem;
    padding: 0.25rem;
  }
</style>
