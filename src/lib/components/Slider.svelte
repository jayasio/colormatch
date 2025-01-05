<script lang="ts">
  import { tight, loose } from "$lib/assets/icons/index";

  let {
    value = $bindable(),
    ...props
  }: {
    value: number;
    props?: unknown;
  } = $props();
</script>

<div class="wrapper card" {...props}>
  <div><img src={tight} alt="Pack spheres together" /></div>
  <input type="range" min={2} max={3} step={0.1} bind:value />
  <div><img src={loose} alt="Spread spheres apart" /></div>
</div>

<style>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    gap: 1rem;
    background-color: #26262699;
    backdrop-filter: blur(16px);
    border-radius: 5rem;
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
    background-color: #ffffff1f;
    /* background-color: hsla(0, 0%, 60%, 60%); */
    border-radius: 1rem;
    height: 1rem;
  }

  /* slider thumb */
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    margin-top: 0px; /* Centers thumb on the track */
    background-color: var(--surface-inverse-0);

    height: 1rem;
    width: 1rem;

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
    background-color: #ffffff1f;
    /* background-color: hsla(0, 0%, 60%, 60%); */
    border-radius: 1rem;
    height: 1rem;
  }

  /* slider thumb */
  input[type="range"]::-moz-range-thumb {
    background-color: var(--surface-inverse-0);
    border: none; /*Removes extra border that FF applies*/

    height: 1rem;
    width: 1rem;

    border-radius: 1rem;
  }

  input[type="range"]:focus::-moz-range-thumb {
    /* outline: 3px solid hsl(0, 0%, 60%); */
    /* outline-offset: 0.125rem; */
    outline: none;

    border-radius: 1rem;
  }
</style>
