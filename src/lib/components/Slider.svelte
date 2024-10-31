<script lang="ts">
  interface Props {
    value: number;
  }

  let { value = $bindable() }: Props = $props();
</script>

<div class="wrapper">
  <div>Together</div>
  <input type="range" min={2} max={3} step={0.1} bind:value />
  <div>Apart</div>
</div>

<style>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    font: var(--body-1);
  }

  /*********** Baseline, reset styles ***********/
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
  }

  /* Removes default focus */
  input[type="range"]:focus {
    outline: none;
  }

  /******** Chrome, Safari, Opera and Edge Chromium styles ********/
  /* slider track */
  input[type="range"]::-webkit-slider-runnable-track {
    background-color: var(--surface-2);
    /* background-color: hsla(0, 0%, 60%, 60%); */
    backdrop-filter: blur(24px);
    border-radius: 0.25rem;
    height: 2rem;
  }

  /* slider thumb */
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    margin-top: 0px; /* Centers thumb on the track */
    background-color: var(--surface-inverse-0);
    border-radius: 0.25rem;
    height: 2rem;
    width: 1.25rem;
  }

  input[type="range"]:focus::-webkit-slider-thumb {
    /* outline: 3px solid hsl(0, 0%, 60%); */
    /* outline-offset: 0.125rem; */
    outline: none;
  }

  /*********** Firefox styles ***********/
  /* slider track */
  input[type="range"]::-moz-range-track {
    background-color: var(--surface-2);
    /* background-color: hsla(0, 0%, 60%, 60%); */
    backdrop-filter: blur(24px);
    border-radius: 0.25rem;
    height: 2rem;
  }

  /* slider thumb */
  input[type="range"]::-moz-range-thumb {
    background-color: var(--surface-inverse-0);
    border: none; /*Removes extra border that FF applies*/
    border-radius: 0.25rem;
    height: 2rem;
    width: 1.25rem;
  }

  input[type="range"]:focus::-moz-range-thumb {
    /* outline: 3px solid hsl(0, 0%, 60%); */
    /* outline-offset: 0.125rem; */
    outline: none;
  }
</style>
