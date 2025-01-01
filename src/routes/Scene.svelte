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

  import { Spring } from "svelte/motion";

  import { CoordVector } from "$lib/vector";
  import { CubeState } from "$lib/state.svelte";
  import type { FiniteStateMachine } from "runed";

  let {
    size,
    cubeState,
    stateMachine,
    handleSelect,
  }: {
    size: number;
    cubeState: CubeState;
    stateMachine: FiniteStateMachine<string, string>;
    handleSelect: (event: IntersectionEvent<PointerEvent>) => void;
  } = $props();

  let cameraPositionX = new Spring(0);
  let cameraPositionY = new Spring(0);
  let cameraPositionZ = new Spring(10);

  $effect(() => {
    if (stateMachine.current === "playing") {
      cameraPositionX.target = size * (5 / 2);
      cameraPositionY.target = size * (5 / 2);
      cameraPositionZ.target = size * (5 / 2);
    } else {
      cameraPositionX.target = size * (-2 / 4);
      cameraPositionY.target = size * (5 / 4);
      cameraPositionZ.target = size * (5 / 4);
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
    autoRotate={stateMachine.current !== "playing"}
  />
  <T.DirectionalLight position={[12, 36, -0]} intensity={Math.PI * 0.25} />
  <T.DirectionalLight position={[0, -4, 10]} intensity={Math.PI * 0.25} />
</T.PerspectiveCamera>

<T.AmbientLight intensity={Math.PI * 0.75} />

<T.Group position={[-size, -size, -size]}>
  <!-- X axis (red) -->
  <T.Line position={[0, 0, 0]}>
    <T.BufferGeometry>
      <T.Float32BufferAttribute
        attach="attributes.position"
        args={[new Float32Array([0, 0, 0, size * 2, 0, 0]), 3]}
      />
    </T.BufferGeometry>
    <T.LineBasicMaterial color="red" />
  </T.Line>
  <HTML occlude position={[size * 2.15, 0, 0]}>
    <p style="opacity: 0.6; font: var(--font--1)">RED</p>
  </HTML>

  <!-- Y axis (green) -->
  <T.Line position={[0, 0, 0]}>
    <T.BufferGeometry>
      <T.Float32BufferAttribute
        attach="attributes.position"
        args={[new Float32Array([0, 0, 0, 0, size * 2, 0]), 3]}
      />
    </T.BufferGeometry>
    <T.LineBasicMaterial color="green" />
  </T.Line>
  <HTML occlude position={[0, size * 2.15, 0]}>
    <p style="opacity: 0.6; font: var(--font--1)">GREEN</p>
  </HTML>

  <!-- Z axis (blue) -->
  <T.Line position={[0, 0, 0]}>
    <T.BufferGeometry>
      <T.Float32BufferAttribute
        attach="attributes.position"
        args={[new Float32Array([0, 0, 0, 0, 0, size * 2]), 3]}
      />
    </T.BufferGeometry>
    <T.LineBasicMaterial color="blue" />
  </T.Line>
  <HTML occlude position={[0, 0, size * 2.15]}>
    <p style="opacity: 0.6; font: var(--font--1)">BLUE</p>
  </HTML>
</T.Group>

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
