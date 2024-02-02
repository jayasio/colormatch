<script lang="ts">
  export let isDarkMode = false
</script>

<button on:click={() => (isDarkMode = !isDarkMode)}>
  {isDarkMode ? "☀️" : "🌙"}
</button>
