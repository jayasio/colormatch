<script lang="ts">
  import type { ToastStyle } from "$lib/types";
  import { fade } from "svelte/transition";

  let {
    message,
    type = "neutral",
  }: {
    message?: string;
    type?: ToastStyle;
  } = $props();

  const successMessages: string[] = [
    "Brilliant!",
    "Spot on!",
    "Hued it!",
    "Spectral!",
    "RGB rocks!",
    "Bang on!",
    "Chromatic!",
    "Sharp eye!",
    "Bright idea!",
    "Right shade!",
  ] as const;

  const failureMessages: string[] = [
    "Uh-oh!",
    "Off-color!",
    "Hue missed!",
    "Nope!",
    "Ouch!",
    "Mis-tint!",
    "Missed it!",
    "Oopsie!",
    "Off hue!",
    "Dimmed out!",
  ] as const;

  function getRandomMessage(messages: string[]) {
    return messages[Math.floor(Math.random() * messages.length)];
  }

  let backgroundColor = $derived.by(() => {
    switch (type) {
      case "neutral":
        return "hsl(0 0% 100%)";
      case "failure":
        return "hsl(14 96% 50%)";
      case "success":
        return "hsl(0 0% 100%)";
    }
  });

  let color = $derived.by(() => {
    switch (type) {
      case "neutral":
        return "black";
      case "failure":
        return "white";
      case "success":
        return "black";
    }
  });
</script>

<div class="wrapper" out:fade>
  <div class="toast" style:background-color={backgroundColor} style:color>
    {message ??
      getRandomMessage(type === "success" ? successMessages : failureMessages)}
  </div>
</div>

<style>
  .wrapper {
    width: 100dvw;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .toast {
    position: fixed;
    bottom: 4rem;

    padding: 0.5rem 1rem;

    border-radius: 0.5rem;
  }
</style>
