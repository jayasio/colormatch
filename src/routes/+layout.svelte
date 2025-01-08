<script lang="ts">
  import "$lib/styles/reset.css";
  import "$lib/styles/global.css";

  import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
  import type { Snippet } from "svelte";

  let { children }: { children: Snippet } = $props();

  injectSpeedInsights();
</script>

<svelte:head>
  <title>Colormatch!</title>

  <meta
    name="description"
    content="Guess the color and score points! Explore colors in 3D space and gain an intuition for the RGB color model."
  />
  <meta
    name="keywords"
    content="Colormatch, RGB Colors, Learning Game, Educational Game, 3D Game, Color Identification, Color Guessing, Color Space, RGB Model, Color Matching Game, Color Theory, Interactive Learning, Color Intuition, Color Points, Web Game"
  />
  <link rel="canonical" href="https://colormatch.jayas.me" />
  <meta name="robots" content="all" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://colormatch.jayas.me" />
  <meta property="og:title" content="Colormatch!" />
  <meta
    property="og:description"
    content="Guess the color and score points! Explore colors in 3D space and gain an intuition for the RGB color model."
  />
  <meta property="og:image" content="/og.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:domain" content="colormatch.jayas.me" />
  <meta name="twitter:url" content="https://colormatch.jayas.me" />
  <meta name="twitter:title" content="Colormatch!" />
  <meta
    name="twitter:description"
    content="Guess the color and score points! Explore colors in 3D space and gain an intuition for the RGB color model."
  />
  <meta name="twitter:image" content="/og.png" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&display=swap"
    rel="stylesheet"
  />
</svelte:head>

{@render children()}
