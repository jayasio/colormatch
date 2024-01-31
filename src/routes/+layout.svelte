<svelte:head>
  <link rel="preconnect" href="https://rsms.me/" />
  <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
</svelte:head>

<slot />

<style>
  :root {
    font-family: Inter, sans-serif;
    font-feature-settings:
      "liga" 1,
      "calt" 1; /* fix for Chrome */

    background-color: white;
    /* color: white; */
  }
  @supports (font-variation-settings: normal) {
    :root {
      font-family: InterVariable, sans-serif;
    }
  }
</style>
