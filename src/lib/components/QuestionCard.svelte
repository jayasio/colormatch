<script lang="ts">
  export let question

  let hintAlways = false
</script>

<div
  class="wrapper"
  on:click={() => (hintAlways = !hintAlways)}
  class:hint-always={hintAlways}
  style:--question-color={$question.color}
>
  <div style:flex={1}>
    <div class="rgb">{$question.color}</div>
    <span class="hint">Click to turn {hintAlways ? "off" : "on"} hint</span>
  </div>
  <div class="channels">
    <div class="channel">
      <div class="channel-percent">{$question.coordsPercent.x}%</div>
      <div class="channel-label">Red</div>
    </div>
    <div class="channel">
      <div class="channel-percent">{$question.coordsPercent.y}%</div>
      <div class="channel-label">Green</div>
    </div>
    <div class="channel">
      <div class="channel-percent">{$question.coordsPercent.z}%</div>
      <div class="channel-label">Blue</div>
    </div>
  </div>
</div>

<style>
  .wrapper {
    justify-self: start;
    display: flex;
    flex-direction: column-reverse;
    gap: 2rem;

    border-radius: 0.25rem;

    cursor: pointer;

    transition: all ease-out 200ms;

    &.hint-always,
    &:hover {
      padding: 1rem;
      background-color: var(--question-color);
    }
  }

  .rgb {
    font: var(--heading-6);
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
    font: var(body-2);
    color: var(--text-2);
  }
</style>
