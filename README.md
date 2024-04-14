# Color match!

A color matching game built over weekends\*.

## Tasks

> Legend
>
> 🟡 Ongoing
>
> 🟢 Completed

### Features

- [ ] 🟡 When game ends, user can review the questions
- [ ] Helpful feedback when wrong color is selected
- [ ] CMYK mode: use CMYK coordinates
  - more research required on color theory
  - Check out `device-cmyk()`
- [ ] Tutorial: Introduction for new users
- [ ] Tutorial: Visualise how to see RGB
- [ ] Tutorial: Show color on hover, maybe using `<HTML>` from `@threlte/extras`
- [ ] Shortcut: key help `⌘ ?`
- [ ] Shortcut: background color

### Experience

- [ ] 🟡 Better User Interface
- [ ] Since game is based on colors, plus we now have luminance based colors, menu can be a random color everytime (? will it look good on top of blurred scene)
- [ ] Audio effects
  - Mute button
- [ ] Transitions and microinteractions
- [ ] Add select success / failure feedback in scene
  - 🟢 Added mechanism to highlight on click
- [ ] Better difficulty input
  - Visual representation
  - 🟢 Transition for difficulty input
- [x] 🟢 Better question generator
  - 🟢 Ignore immediate repeats
- [x] 🟢 Add hover feedback in scene
- [x] 🟢 Transition scene to blur background on menu

### Code hygiene

- [ ] 🟡 Consistent design system
- [ ] Alpha based color variants
- [ ] Extract `state` to its own store
- [ ] 🟡 Add Open Graph attributes
- [ ] Camera jumps when transitioning: use a moving camera instead of `OrbitControls`, would also help in maybe implementing key-based scene manipulation
- [ ] Better components
- [ ] Upgrade to Svelte 5
- [~] Use slots for `Menu` end state
- [x] 🟢 Extract `color` logic to its own utility
- [x] 🟢 Better types
- [x] 🟢 Remove `Button` to its own component
- [x] 🟢 Remove duplication of `Difficulty` enum
- [x] 🟢 Standardise toast
- [x] 🟢 Restructure `game.ts`

### Bugs

- [ ] Sometimes after a rotate, click randomly stops working until mouse is moved; suspicious on damping on `OrbitControls`
- [ ] Clicking on `Slider` causes random jumps in scene sometimes
- [ ] Change `Play again` to `Play` when difficulty is changed
- [ ] Reset scene pan on `esc`
- [x] 🟢 Dynamic text color based on bg in `QuestionCard`
- [x] 🟢 `.ignore-pointer` for allowing pointer passthrough in layout divs
  - ~~Use css `pointer-events: none` to allow pointer passthrough in layout divs~~
  - ~~DOM elements should be minimal to avoid obstruction of pointer on scene~~
- [x] 🟢 iOS fix - single click is select; clicks with delta > 0 are ignored
- [x] 🟢 Color space issues (NoToneMapping improved color fidelity significantly)

## References

- [ ] [https://developer.chrome.com/docs/css-ui/css-color-mix](Related to CSS colors)
