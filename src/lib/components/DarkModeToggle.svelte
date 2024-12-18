<script lang="ts">
  let {
    isDarkMode = $bindable(false),
  }: {
    isDarkMode?: boolean;
  } = $props();
</script>

<button onclick={() => (isDarkMode = !isDarkMode)}>
  {isDarkMode ? "☀️" : "🌙"}
</button>
