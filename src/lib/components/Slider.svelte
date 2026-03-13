<script lang="ts">
  import loose from "$lib/assets/icons/loose.svg";
  import tight from "$lib/assets/icons/tight.svg";

  let {
    value = $bindable(),
    ...props
  }: {
    value: number;
    props?: unknown;
  } = $props();
</script>

<div class="wrapper card" {...props}>
  <div><img src={tight} alt="Pack spheres together"></div>
  <input type="range" min={2} max={3} step={0.1} bind:value>
  <div><img src={loose} alt="Spread spheres apart"></div>
</div>

<style>
  .wrapper {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    pointer-events: all;

    background-color: #26262699;
    border-radius: 5rem;
    backdrop-filter: blur(16px);
  }

  /*********** Baseline, reset styles ***********/
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    background: transparent;
  }

  /* Removes default focus */
  input[type="range"]:focus {
    outline: none;
  }

  /******** Chrome, Safari, Opera and Edge Chromium styles ********/
  /* slider track */
  input[type="range"]::-webkit-slider-runnable-track {
    height: 1rem;
    background-color: #ffffff1f;
    /* background-color: hsla(0, 0%, 60%, 60%); */
    border-radius: 1rem;
  }

  /* slider thumb */
  input[type="range"]::-webkit-slider-thumb {
    width: 1rem;

    height: 1rem;
    margin-top: 0px; /* Centers thumb on the track */
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    background-color: white;

    border-radius: 1rem;
  }

  input[type="range"]:focus::-webkit-slider-thumb {
    /* outline: 3px solid hsl(0, 0%, 60%); */
    /* outline-offset: 0.125rem; */
    outline: none;
    border-radius: 1rem;
  }

  /*********** Firefox styles ***********/
  /* slider track */
  input[type="range"]::-moz-range-track {
    height: 1rem;
    background-color: #ffffff1f;
    /* background-color: hsla(0, 0%, 60%, 60%); */
    border-radius: 1rem;
  }

  /* slider thumb */
  input[type="range"]::-moz-range-thumb {
    width: 1rem;

    height: 1rem;
    background-color: white;
    border: none; /*Removes extra border that FF applies*/

    border-radius: 1rem;
  }

  input[type="range"]:focus::-moz-range-thumb {
    /* outline: 3px solid hsl(0, 0%, 60%); */
    /* outline-offset: 0.125rem; */
    outline: none;

    border-radius: 1rem;
  }
</style>
