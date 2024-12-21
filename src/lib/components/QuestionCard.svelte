<script lang="ts">
  import type { CoordVector } from "$lib/Vector";

  let { question, size }: { question: CoordVector; size: number } = $props();

  let color = $derived(question.toColor(size));
  let percent = $derived(question.toPercent(size));

  let hintAlways = $state(false);
</script>

<div
  class="wrapper"
  role="presentation"
  onclick={() => (hintAlways = !hintAlways)}
  class:hint-always={hintAlways}
  style:--question-color={color.toString()}
  style:--luminance-text-0={color.getLuminance() === "light"
    ? "var(--black-0)"
    : "var(--white-0)"}
  style:--luminance-text-1={color.getLuminance() === "light"
    ? "var(--black-1)"
    : "var(--white-1)"}
  style:--luminance-text-2={color.getLuminance() === "light"
    ? "var(--black-2)"
    : "var(--white-2)"}
>
  <div style:flex={1}>
    <div class="rgb">{color.toString()}</div>
    <span class="hint">Click to turn {hintAlways ? "off" : "on"} hint</span>
  </div>
  <div class="channels">
    <div class="channel">
      <div class="channel-percent">{percent.x}%</div>
      <div class="channel-label">Red</div>
    </div>
    <div class="channel">
      <div class="channel-percent">{percent.y}%</div>
      <div class="channel-label">Green</div>
    </div>
    <div class="channel">
      <div class="channel-percent">{percent.z}%</div>
      <div class="channel-label">Blue</div>
    </div>
  </div>
</div>

<style>
  .wrapper {
    z-index: 10000;

    justify-self: start;
    display: flex;
    flex-direction: column-reverse;
    gap: 2rem;

    border-radius: 0.25rem;

    cursor: pointer;

    transition: all ease-out 500ms;
    transition: padding cubic-bezier(0.34, 1.56, 0.64, 1) 500ms;

    &.hint-always,
    &:hover {
      padding: 2rem;
      background-color: var(--question-color);
      color: var(--luminance-text-0);

      & .channel-percent {
        font-weight: 500;
      }

      & .hint,
      .channel-label {
        color: var(--luminance-text-2);
      }
    }
  }

  .rgb {
    font: var(--heading-6);
    font-weight: 500;
  }

  .hint {
    font: var(--body-2);
    color: var(--text-2);
  }

  .channels {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* flex-direction: row; */
    gap: 1rem;
  }

  .channel {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .channel-percent {
    font: var(--heading-3);
    margin: 0;
    padding: 0;
  }

  .channel-label {
    font: var(--body-2);
    color: var(--text-2);
  }
</style>
