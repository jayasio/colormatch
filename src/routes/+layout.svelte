<script>
  import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit"
  /**
   * @typedef {Object} Props
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let { children } = $props();

  injectSpeedInsights()
</script>

<svelte:head>
  <title>ColorMatch!</title>
  <link rel="stylesheet" href="styles/reset.css" />
  <link rel="stylesheet" href="fonts/geist.css" />
  <meta name="viewport" content="width=device-width, user-scalable=no" />
</svelte:head>

{@render children?.()}

<style>
  :global(*) {
    user-select: none;
  }

  :root {
    font-family:
      "Geist Variable",
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

    /* Base color tokens */

    --white-0: hsl(0, 0%, 100%);
    --white-1: hsl(0, 0%, 95%);
    --white-2: hsl(0, 0%, 90%);

    --black-0: hsl(0, 0%, 5%);
    --black-1: hsl(0, 0%, 10%);
    --black-2: hsl(0, 0%, 15%);

    --accent-light: hsl(212, 100%, 50%);
    --accent-dark: hsl(182, 100%, 71%);

    /* Base type tokens */

    --font-6: 500 3.812rem/1.2 "Geist Variable";
    --font-5: 3.062rem/1.2 "Geist Variable";
    --font-4: 2.438rem/1.2 "Geist Variable";
    --font-3: 1.938rem/1.2 "Geist Variable";
    --font-2: 1.562rem/1.2 "Geist Variable";
    --font-1: 1.25rem/1.2 "Geist Variable";
    --font-0: 1rem/1.2 "Geist Variable";
    --font--1: 0.812rem/1.2 "Geist Variable";
    --font--2: 0.625rem/1.2 "Geist Variable";

    /* Semantic type tokens */

    --heading-1: var(--font-6);
    --heading-2: var(--font-5);
    --heading-3: var(--font-4);
    --heading-4: var(--font-3);
    --heading-5: var(--font-2);
    --heading-6: var(--font-1);
    --body-1: var(--font-0);
    --body-2: var(--font--1);
    --caption: var(--font--2);
  }

  /* semantic color tokens */

  /* @media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {
    :root {
      --surface-0: var(--white-0);
      --surface-1: var(--white-1);
      --surface-2: var(--white-2);

      --surface-inverse-0: var(--black-0);
      --surface-inverse-1: var(--black-1);
      --surface-inverse-2: var(--black-2);

      --text-0: var(--black-0);
      --text-1: var(--black-1);
      --text-2: var(--black-2);

      --text-inverse-0: var(--white-0);
      --text-inverse-1: var(--white-1);
      --text-inverse-2: var(--white-2);

      --accent: var(--accent-light);
    }
  } */

  @media (prefers-color-scheme: dark),
    (prefers-color-scheme: light),
    (prefers-color-scheme: no-preference) {
    :root {
      --surface-0: var(--black-0);
      --surface-1: var(--black-1);
      --surface-2: var(--black-2);

      --surface-inverse-0: var(--white-0);
      --surface-inverse-1: var(--white-1);
      --surface-inverse-2: var(--white-2);

      --text-0: var(--white-0);
      --text-1: var(--white-1);
      --text-2: var(--white-2);

      --text-inverse-0: var(--black-0);
      --text-inverse-1: var(--black-1);
      --text-inverse-2: var(--black-2);

      --accent: var(--accent-dark);
    }
  }

  @media screen and (width < 768px) {
    :root {
      --font-6: 500 2.488rem/1.2 "Geist Variable";
      --font-5: 1.953rem/1.2 "Geist Variable";
      --font-4: 1.563rem/1.2 "Geist Variable";
      --font-3: 1.25rem/1.2 "Geist Variable";
      --font-2: 1rem/1.2 "Geist Variable";
      --font-1: 0.813rem/1.2 "Geist Variable";
      --font-0: 0.75rem/1.2 "Geist Variable";
      --font--1: 0.625rem/1.2 "Geist Variable";
      --font--2: 0.5rem/1.2 "Geist Variable";
    }
  }
</style>
