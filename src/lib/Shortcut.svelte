<script lang="ts">
  export let label: string
  export let color: string = "0,0,0"
</script>

<div style:--color={color}>
  {label}
</div>

<style>
  div {
    display: inline;
    font-size: 0.75rem;
    font-weight: medium;
    color: rgba(var(--color), 0.8);
    background-color: rgba(var(--color), 0.1);
    border-radius: 0.25rem;
    padding: 0.25rem;
  }
</style>
