<script lang="ts">
  import '$lib/styles/reset.css'
  import '$lib/styles/global.css'

  import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit"
  import type { Snippet } from "svelte"

  let { children }: {children : Snippet} = $props()

  injectSpeedInsights()
</script>

<svelte:head>
  <title>ColorMatch!</title>

  <meta
    name="description"
    content="Master RGB color coordinates by playing ColorMatch, an interactive 3D game designed to make learning colors fun and engaging."
  />
  <meta
    name="keywords"
    content="ColorMatch, RGB Colors, Learning Game, Educational Game, 3D Game, Color Identification"
  />
  <link rel="canonical" href="https://colormatch.jayas.me" />
  <meta name="robots" content="index, follow" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://colormatch.jayas.me" />
  <meta property="og:title" content="ColorMatch!" />
  <meta
    property="og:description"
    content="Master RGB color coordinates by playing ColorMatch, an interactive 3D game designed to make learning colors fun and engaging."
  />
  <meta property="og:image" content="/og.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://colormatch.jayas.me" />
  <meta name="twitter:title" content="ColorMatch!" />
  <meta
    name="twitter:description"
    content="Master RGB color coordinates by playing ColorMatch, an interactive 3D game designed to make learning colors fun and engaging."
  />
  <meta name="twitter:image" content="/og.png" />

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&display=swap" rel="stylesheet">
</svelte:head>

{@render children()}
