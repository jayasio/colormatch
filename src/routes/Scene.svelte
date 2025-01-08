<script lang="ts">
  import { T } from "@threlte/core";
  import {
    HTML,
    Instance,
    InstancedMesh,
    OrbitControls,
    interactivity,
  } from "@threlte/extras";
  import type { IntersectionEvent } from "@threlte/extras";

  import { MediaQuery } from "svelte/reactivity";
  import { Spring } from "svelte/motion";

  import { CoordVector } from "$lib/vector";
  import { CubeState } from "$lib/state.svelte";
  import type { FiniteStateMachine } from "runed";
  import { untrack } from "svelte";

  let {
    size,
    cubeState,
    stateMachine,
    showTutorial,
    showHint,
    handleSelect,
  }: {
    size: number;
    cubeState: CubeState;
    stateMachine: FiniteStateMachine<string, string>;
    showTutorial: boolean;
    showHint: boolean;
    handleSelect: (event: IntersectionEvent<PointerEvent>) => void;
  } = $props();

  let cameraPositionX = new Spring(0, {
    stiffness: 0.06,
    damping: 0.8,
  });
  let cameraPositionY = new Spring(0, {
    stiffness: 0.06,
    damping: 0.8,
  });
  let cameraPositionZ = new Spring(10, {
    stiffness: 0.06,
    damping: 0.8,
  });

  let stored: {
    x: number | null;
    y: number | null;
    z: number | null;
    spaceFactor: number | null;
  } = {
    x: null,
    y: null,
    z: null,
    spaceFactor: null,
  };

  const isMobile = new MediaQuery("width <= 480px");
  const isTablet = new MediaQuery("width <= 960px");

  let isTransitioning = $state(false);

  function queueTransition(callback: () => void, delay: number = 1500) {
    isTransitioning = true;
    callback();
    setTimeout(() => (isTransitioning = false), delay);
  }

  $effect(() => {
    if (stateMachine.current === "playing" && !showTutorial) {
      queueTransition(() => {
        const multiplier = isMobile.current ? 5 : isTablet.current ? 4 : 5 / 2;
        cameraPositionX.set(size * multiplier);
        cameraPositionY.set(size * multiplier);
        cameraPositionZ.set(size * multiplier);
      });
    }
  });

  $effect(() => {
    if (!(stateMachine.current === "playing" && !showTutorial)) {
      queueTransition(() => {
        cameraPositionX.set(size * (-2 / 4));
        cameraPositionY.set(size * (5 / 4));
        cameraPositionZ.set(size * (5 / 4));
        cubeState.spaceFactor.set(2);
      });
    }
  });

  $effect(() => {
    if (stateMachine.current === "playing" && showTutorial) {
      queueTransition(() => {
        stored.x = untrack(() => cameraPositionX.current);
        stored.y = untrack(() => cameraPositionY.current);
        stored.z = untrack(() => cameraPositionZ.current);
        stored.spaceFactor = untrack(() => cubeState.spaceFactor.current);
      });
    }
  });

  $effect(() => {
    if (
      stateMachine.current === "final" &&
      stored.x &&
      stored.y &&
      stored.z &&
      stored.spaceFactor
    ) {
      queueTransition(() => {
        stored.x = null;
        stored.y = null;
        stored.z = null;
        stored.spaceFactor = null;
      });
    }
  });

  $effect(() => {
    if (
      !showTutorial &&
      stored.x &&
      stored.y &&
      stored.z &&
      stored.spaceFactor
    ) {
      queueTransition(() => {
        cameraPositionX.set(stored.x);
        cameraPositionY.set(stored.y);
        cameraPositionZ.set(stored.z);
        cubeState.spaceFactor.set(stored.spaceFactor);
      });
    }
  });

  let highlight: CoordVector | null | undefined = $state();

  interactivity();
</script>

<T.PerspectiveCamera
  makeDefault
  position.x={cameraPositionX.current}
  position.y={cameraPositionY.current}
  position.z={cameraPositionZ.current}
>
  <OrbitControls
    enableDamping
    autoRotate={stateMachine.current !== "playing" && !showTutorial}
    onchange={(event) => {
      if (stateMachine.current === "playing" && !isTransitioning) {
        cameraPositionX.set(event.target.object.position.x, { instant: true });
        cameraPositionY.set(event.target.object.position.y, { instant: true });
        cameraPositionZ.set(event.target.object.position.z, { instant: true });
      }
    }}
  />
  <T.DirectionalLight position={[12, 36, -0]} intensity={Math.PI * 0.25} />
  <T.DirectionalLight position={[0, -4, 10]} intensity={Math.PI * 0.25} />
</T.PerspectiveCamera>

<T.AmbientLight intensity={Math.PI * 0.75} />

{#if stateMachine.current === "playing" && !showTutorial}
  <T.Group
    position={[
      size * -1 * (1 + (cubeState.spaceFactor.current - 2) / 2),
      size * -1 * (1 + (cubeState.spaceFactor.current - 2) / 2),
      size * -1 * (1 + (cubeState.spaceFactor.current - 2) / 2),
    ]}
  >
    <T.Line position={[0, 0, 0]}>
      <T.BufferGeometry>
        <T.Float32BufferAttribute
          attach="attributes.position"
          args={[
            new Float32Array([
              0,
              0,
              0,
              size * (2 + (cubeState.spaceFactor.current - 2) / 1.5),
              0,
              0,
            ]),
            3,
          ]}
        />
      </T.BufferGeometry>
      <T.LineBasicMaterial color="red" />
    </T.Line>
    <HTML
      occlude={!showHint}
      position={[
        size * (2.15 + (cubeState.spaceFactor.current - 2) / 1.5),
        0,
        0,
      ]}
    >
      <p class="text-label">RED</p>
    </HTML>
    {#if showHint}
      {#each { length: size }, i}
        <HTML
          class="text-label"
          position={[
            2 * i +
              1 +
              (size * (i / (size - 1)) * (cubeState.spaceFactor.current - 2)) /
                1.5,
            0,
            0,
          ]}
        >
          {Math.ceil((255 * i) / (size - 1))}
        </HTML>
      {/each}
    {/if}

    <T.Line position={[0, 0, 0]}>
      <T.BufferGeometry>
        <T.Float32BufferAttribute
          attach="attributes.position"
          args={[
            new Float32Array([
              0,
              0,
              0,
              0,
              size * (2 + (cubeState.spaceFactor.current - 2) / 1.5),
              0,
            ]),
            3,
          ]}
        />
      </T.BufferGeometry>
      <T.LineBasicMaterial color="green" />
    </T.Line>
    <HTML
      occlude={!showHint}
      position={[
        0,
        size * (2.15 + (cubeState.spaceFactor.current - 2) / 1.5),
        0,
      ]}
    >
      <p class="text-label">GREEN</p>
    </HTML>
    {#if showHint}
      {#each { length: size }, i}
        <HTML
          class="text-label"
          position={[
            0,
            2 * i +
              1 +
              (size * (i / (size - 1)) * (cubeState.spaceFactor.current - 2)) /
                1.5,
            0,
          ]}
        >
          {Math.ceil((255 * i) / (size - 1))}
        </HTML>
      {/each}
    {/if}

    <T.Line position={[0, 0, 0]}>
      <T.BufferGeometry>
        <T.Float32BufferAttribute
          attach="attributes.position"
          args={[
            new Float32Array([
              0,
              0,
              0,
              0,
              0,
              size * (2 + (cubeState.spaceFactor.current - 2) / 1.5),
            ]),
            3,
          ]}
        />
      </T.BufferGeometry>
      <T.LineBasicMaterial color="blue" />
    </T.Line>
    <HTML
      occlude={!showHint}
      position={[
        0,
        0,
        size * (2.15 + (cubeState.spaceFactor.current - 2) / 1.5),
      ]}
    >
      <p class="text-label">BLUE</p>
    </HTML>
    {#if showHint}
      {#each { length: size }, i}
        <HTML
          class="text-label"
          position={[
            0,
            0,
            2 * i +
              1 +
              (size * (i / (size - 1)) * (cubeState.spaceFactor.current - 2)) /
                1.5,
          ]}
        >
          {Math.ceil((255 * i) / (size - 1))}
        </HTML>
      {/each}
    {/if}
  </T.Group>
{/if}

<T.Group
  autocenter
  position={[cubeState.center, cubeState.center, cubeState.center]}
  onpointerenter={(event: IntersectionEvent<PointerEvent>) => {
    highlight = event.object.userData.coord;
    event.stopPropagation();
  }}
  onpointerleave={(event: IntersectionEvent<PointerEvent>) => {
    highlight = null;
    event.stopPropagation();
  }}
  onclick={(event: IntersectionEvent<PointerEvent>) => {
    handleSelect(event);
  }}
>
  <InstancedMesh>
    <T.SphereGeometry />
    <T.MeshLambertMaterial />

    {#each cubeState.range as x}
      {#each cubeState.range as y}
        {#each cubeState.range as z}
          {@const coord = new CoordVector(x, y, z)}
          {@const color = coord.toColor(size)}
          <Instance
            position={[
              coord.x * cubeState.spaceFactor.current,
              coord.y * cubeState.spaceFactor.current,
              coord.z * cubeState.spaceFactor.current,
            ]}
            userData={{ coord }}
            color={color.toString()}
            scale={highlight &&
            highlight.x === coord.x &&
            highlight.y === coord.y &&
            highlight.z === coord.z
              ? [1.125, 1.125, 1.125]
              : [1, 1, 1]}
          />
        {/each}
      {/each}
    {/each}
  </InstancedMesh>
</T.Group>
