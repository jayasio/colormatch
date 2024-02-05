# Color match!

A color matching game built over weekends\*.

## Tasks

### Features

- [ ] When game ends, user can review the questions
- [ ] CMYK mode: use CMYK coordinates
  - more research required on color theory
  - Check out `device-cmyk()`
- [ ] Tutorial: Introduction for new users
- [ ] Tutorial: Visualise how to see RGB
- [ ] Tutorial: Show color on hover, maybe using `<HTML>` from `@threlte/extras`
- [ ] Shortcut: key help `⌘ ?`
- [ ] Shortcut: background color

### Experience

- [ ] Add select success / failure animations in scene
- [x] Transition scene to blur background on menu
- [ ] Transitions and microinteractions
- [ ] Better User Interface
- [ ] Better difficulty switcher with visuals

### Code hygiene

- [ ] Consistent design system
- [x] Standardise toast
- [ ] Better types
- [x] Restructure `game.ts`
- [ ] Extract `state` to its own store
- [x] Remove duplication of `Difficulty` enum
- [ ] Remove duplication of CSS in menu
- [ ] Use slots for `Menu` end state
- [ ] Add Open Graph attributes
- [ ] Camera jumps when transitioning: use a moving camera instead of `OrbitControls`, would also help in maybe implementing key-based scene manipulation
- [ ] Upgrade to Svelte 5
- [ ] Better components

### Bugs

- [ ] Color space issues
- [ ] Change `Play again` to `Play` when difficulty is changed
- [ ] iOS fix
- [ ] Reset scene pan on `esc`

## References

- [ ] [https://developer.chrome.com/docs/css-ui/css-color-mix](Related to CSS colors)
