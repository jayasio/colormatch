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
    content="Guess the color and score points! Explore colors in 3D space and gain an intuition for the RGB color model."
    name="description"
  >
  <meta
    content="Colormatch, RGB Colors, Learning Game, Educational Game, 3D Game, Color Identification, Color Guessing, Color Space, RGB Model, Color Matching Game, Color Theory, Interactive Learning, Color Intuition, Color Points, Web Game"
    name="keywords"
  >
  <link href="https://colormatch.jayas.me" rel="canonical">
  <meta content="all" name="robots">

  <!-- Open Graph / Facebook -->
  <meta content="website" property="og:type">
  <meta content="https://colormatch.jayas.me" property="og:url">
  <meta content="Colormatch!" property="og:title">
  <meta
    content="Guess the color and score points! Explore colors in 3D space and gain an intuition for the RGB color model."
    property="og:description"
  >
  <meta content="/og.png" property="og:image">
  <meta content="1200" property="og:image:width">
  <meta content="630" property="og:image:height">

  <!-- Twitter -->
  <meta content="summary_large_image" name="twitter:card">
  <meta content="colormatch.jayas.me" name="twitter:domain">
  <meta content="https://colormatch.jayas.me" name="twitter:url">
  <meta content="Colormatch!" name="twitter:title">
  <meta
    content="Guess the color and score points! Explore colors in 3D space and gain an intuition for the RGB color model."
    name="twitter:description"
  >
  <meta content="/og.png" name="twitter:image">

  <link href="https://fonts.googleapis.com" rel="preconnect">
  <link
    crossorigin="anonymous"
    href="https://fonts.gstatic.com"
    rel="preconnect"
  >
  <link
    href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&display=swap"
    rel="stylesheet"
  >
</svelte:head>

{@render children()}
