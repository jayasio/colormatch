<script lang="ts" generics="T">
  let {
    options,
    value = $bindable(),
  }: {
    options: T[];
    value: T;
  } = $props();

  let activeIndex = $derived(options.indexOf(value));
  let count = $derived(options.length);
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
    position: relative;
    overflow: hidden;

    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;

    background-color: #00000099;
    border-radius: 10rem;

    &::after {
      content: "";

      position: absolute;
      width: calc(100% / var(--count));
      height: 100%;
      transform: translateX(calc(var(--activeIndex) * 100%));

      background: var(--accent);
      mix-blend-mode: difference;
      border-radius: 0rem;

      transition: transform 0.25s;
    }
  }

  label {
    height: 100%;

    display: grid;
    place-items: center;
    padding: 1.5rem 2rem;

    text-transform: capitalize;
    font-family: "Geist", sans-serif;
    font-weight: medium;
    font-size: 1rem;
    color: hsl(0 0% 90%);

    cursor: pointer;

    border-radius: 0rem;

    transition: background-color 0.25s;

    /* &:has(input:not(:checked)) {
      opacity: 0.75;
    } */

    &:hover:has(input:not(:checked)) {
      background-color: #00000033;
    }
  }

  input[type="radio"] {
    display: none;
  }

  @media screen and (width <= 960px) {
    label {
      padding: 1.25rem 1.5rem;
    }
  }

  @media screen and (width <= 480px) {
    label {
      padding: 1rem 1.25rem;
    }
  }
</style>
