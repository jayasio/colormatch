<script lang="ts">
  import { fade } from "svelte/transition"

  export let message: string
  export let type: "neutral" | "success" | "failure" = "neutral"
</script>

<div class="container" out:fade>
  <div
    class="toast"
    style:background-color={type === "neutral"
      ? "hsl(0, 0%, 95%)"
      : type === "failure"
        ? "rgb(247, 74, 6)"
        : "hsl(182, 100%, 71%)"}
    style:color={type === "failure" ? "white" : "black"}
  >
    {message}
  </div>
</div>

<style>
  .container {
    width: 100dvw;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1000;
  }

  .toast {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    position: fixed;
    bottom: 4rem;
    z-index: 1000;
  }
</style>
