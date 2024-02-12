<script lang="ts">
  type T = $$Generic

  export let options: T[]
  export let value: T
</script>

<div class="segmented">
  {#each options as option, index}
    <label for={`option${index}`}>
      <input
        type="radio"
        id={`option${index}`}
        name={`option${index}`}
        value={option}
        bind:group={value}
      />
      {option}
    </label>
  {/each}
</div>

<style>
  .segmented {
    display: flex;
    width: 100%;
    background-color: var(--surface-1);
    border-radius: 0.25rem;
    overflow: hidden;
  }

  input {
    display: none;
  }

  label {
    flex: 1;
    padding: 0.75rem 1rem;
    gap: 0.5rem;
    display: flex;
    justify-content: center;
    text-transform: capitalize;
    cursor: pointer;

    &:hover {
      background-color: var(--surface-2);
    }

    &:has(input[type="radio"]:checked) {
      background-color: var(--accent);
      color: var(--text-inverse-0);
    }
  }
</style>
