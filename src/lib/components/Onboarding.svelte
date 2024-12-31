<script lang="ts">
  import Button from "./Button.svelte";

  let steps = [
    {
      title: "All colors are built from three basic hues",
      description:
        "Red, green and blue make up all colors through additive mixing",
    },
    { title: "Step 2", description: "Description 2" },
    { title: "Step 3", description: "Description 3" },
  ];
  let currentStep = 0;
</script>

<div class="wrapper">
  <div class="title">
    {steps[currentStep].title}
  </div>

  <div class="description">
    {steps[currentStep].description}
  </div>

  <div class="actions">
    <div>
      {#if currentStep > 0}
        <Button type="tertiary" onclick={() => currentStep--}>←</Button>
      {/if}
    </div>

    <div>
      {#if currentStep < steps.length - 1}
        <Button type="tertiary" onclick={() => currentStep++}>Next →</Button>
      {/if}
    </div>
  </div>
</div>

<style>
  .wrapper {
    max-width: max(800px, 20vw);
    background-color: var(--surface-0);
    padding: 0.5rem;
    border-radius: 0.75rem;
    display: flex;
    flex-direction: column;
    z-index: 100;
    gap: 0.5rem;
  }
  .title {
    font: var(--heading-6);
    width: 20vw;
  }
  .description {
    font: var(--body-1);
    color: var(--text-2);
    opacity: 0.6;
    width: 20vw;
  }
  .actions {
    display: flex;
    justify-content: space-between;
  }
</style>
