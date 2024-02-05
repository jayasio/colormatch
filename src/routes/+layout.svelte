<script>
  import "@fontsource-variable/space-grotesk"
  import "@fontsource/space-mono"

  import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit"

  injectSpeedInsights()
</script>

<slot />

<style>
  :root {
    font-family:
      "Space Grotesk",
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
  }
</style>
