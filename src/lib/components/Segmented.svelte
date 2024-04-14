<script lang="ts">
  type T = $$Generic

  export let options: T[]
  export let value: T

  $: activeIndex = options.indexOf(value)
  $: count = options.length
</script>

<div class="segmented" style:--activeIndex={activeIndex} style:--count={count}>
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
    height: 3rem;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    background: var(--surface-1);
    border-radius: 0.25rem;
    position: relative;
    overflow: hidden;

    &::after {
      content: "";
      width: calc(100% / var(--count));
      height: 100%;
      background: var(--accent);
      border-radius: 0.25rem;
      position: absolute;
      mix-blend-mode: difference;
      transition: transform 0.25s;
      transform: translateX(calc(var(--activeIndex) * 100%));
    }
  }

  label {
    height: 100%;
    padding: 0 1rem;
    display: grid;
    place-items: center;
    font-weight: 500;
    text-transform: capitalize;
    color: var(--text-2);
    cursor: pointer;
    border-radius: 0.25rem;
    transition:
      background-color 0.25s,
      color 0.25s,
      opacity 0.25s;

    &:has(input:not(:checked)) {
      opacity: 0.75;
    }

    &:hover:has(input:not(:checked)) {
      opacity: 1;
      background-color: var(--surface-2);
    }
  }

  input[type="radio"] {
    display: none;
  }
</style>
