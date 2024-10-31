<script lang="ts">
  interface Props {
    isDarkMode?: boolean;
  }

  let { isDarkMode = $bindable(false) }: Props = $props();
</script>

<button onclick={() => (isDarkMode = !isDarkMode)}>
  {isDarkMode ? "☀️" : "🌙"}
</button>
