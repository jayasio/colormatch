# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Colormatch is an interactive 3D color matching game that teaches players the RGB color model. Players select spheres in a 3D cube space to match target RGB colors, where each axis (X, Y, Z) represents a color channel (Red, Green, Blue).

## Tech Stack

- **Svelte 5** - UI framework with modern runes API (`$state`, `$derived`, `$effect`, `$props`)
- **SvelteKit** - Application framework
- **Threlte** - Declarative wrapper over Three.js for 3D rendering
- **Runed** - Provides `FiniteStateMachine` for game state management
- **TypeScript** - Type safety throughout

## Commands

### Development
```bash
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm preview          # Preview production build
```

### Code Quality
```bash
pnpm check            # Type-check with svelte-check
pnpm check:watch      # Type-check in watch mode
pnpm lint             # Run prettier and eslint checks
pnpm format           # Format code with prettier
```

## Architecture

### State Management

The application uses a **Finite State Machine** pattern with three states:
- `initial` → `playing` → `final`
- Transitions: `start`, `score`, `strike`, `end`, `exit`
- State machine defined in `src/routes/+page.svelte:52-86`

Game state is managed through two main classes in `src/lib/state.svelte.ts`:

**GameState**
- Tracks `wins`, `strikes`, and question history
- Generates random color coordinates for each round
- Size-dependent (3-5 based on difficulty)

**CubeState**
- Controls 3D visualization spacing via `spaceFactor` (Spring-animated)
- Manages cube grid rendering with `range` and `center` calculations
- Animates between compact (playing) and expanded (demo) states

### Vector System (`src/lib/vector.ts`)

Three vector classes handle coordinate/color transformations:

**CoordVector** → Grid coordinates (0 to size-1)
- `toPercent()` → PercentVector (0-100%)
- `toColor()` → ColorVector (0-255 RGB)
- `toFraction()` → Fraction string for display

**ColorVector** → RGB values (0-255)
- `toString()` → CSS rgb() string
- `getLuminance()` → "light" or "dark" for contrast

**PercentVector** → Percentage representation (0-100)

### Component Structure

**Main Page** (`src/routes/+page.svelte`)
- Top-level coordinator for game state, cube state, and FSM
- Handles click events from Scene via `handleSelect()`
- Manages toast notifications and tutorial flow
- Difficulty settings: "easy" (3³), "medium" (4³), "hard" (5³)

**Scene** (`src/routes/Scene.svelte`)
- Threlte 3D rendering layer
- Uses `InstancedMesh` to efficiently render size³ spheres
- Camera transitions between demo mode (auto-rotate, expanded) and play mode (user-controlled, compact)
- Responsive camera positioning based on screen size
- Draws RGB axis lines with labels and optional hint values

**Hud** (`src/lib/components/Hud.svelte`)
- Overlay UI coordinator
- Conditionally renders Menu, GameCard, ScoreCard, Actions based on FSM state
- Manages Tutorial and Slider (spacing control) visibility

**Components**
- `GameCard` - Displays target color and hint toggle
- `ScoreCard` - Shows wins and strikes (❤️ hearts)
- `Menu` - Initial screen with difficulty selection
- `Actions` - In-game controls (exit, spacing slider)
- `Tutorial` - First-time player walkthrough
- `Toast` - Feedback notifications (success/failure)
- `Slider` - Controls cube spacing via `cubeState.spaceFactor`
- `Segmented` - Styled segmented control (difficulty selector)

### 3D Interaction Flow

1. User clicks sphere in 3D scene
2. `handleSelect()` receives `IntersectionEvent` with `userData.coord`
3. Compares clicked `CoordVector` to `gameState.latestQuestion`
4. Sends `score` or `strike` event to FSM
5. FSM updates state, triggers new question generation or game over
6. Scene re-renders with updated sphere colors and positions

### Key Patterns

**Svelte 5 Runes**
- Classes use `$state()` for reactive properties
- `$derived()` for computed values (e.g., `latestQuestion`, `center`)
- `$effect()` for side effects (e.g., game over detection)
- `$props()` for component properties with destructuring

**Spring Animations**
- Camera position (`cameraPositionX/Y/Z`) and cube spacing (`spaceFactor`) use Svelte's `Spring` store
- Provides smooth transitions between game states

**Threlte Components**
- `<T.>` prefix for Three.js objects (e.g., `<T.Group>`, `<T.SphereGeometry>`)
- `<HTML>` for 3D-positioned DOM elements (axis labels)
- `<InstancedMesh>` with `<Instance>` children for efficient sphere rendering

**Interactivity**
- `interactivity()` hook from `@threlte/extras` enables mouse events
- Event handlers: `onpointerenter`, `onpointerleave`, `onclick`
- Events carry `userData` from Three.js objects

### Local Storage

- `new-player` flag controls tutorial display on first visit
- Set in `src/routes/+page.svelte:18`

### Styling

- Global dark theme with radial gradients (background in `+page.svelte`)
- Component-scoped styles in `<style>` blocks
- Uses modern CSS units (`dvw`, `dvh`) for viewport sizing
- `.text-label` class defined in `app.html` for 3D text overlays

## Important Notes

- The cube size determines both gameplay difficulty and visual density (3³=27 to 5³=125 spheres)
- Coordinate system: RGB maps to XYZ axes with origin at black (0,0,0)
- Camera automatically adjusts for mobile/tablet viewports
- Game ends after 3 strikes (tracked via FSM `$effect` in `+page.svelte:48`)
