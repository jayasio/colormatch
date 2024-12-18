<script lang="ts">
  import { T } from "@threlte/core";
  import {
    Instance,
    InstancedMesh,
    OrbitControls,
    interactivity,
  } from "@threlte/extras";

  import { game } from "$lib/game";
  import { spring } from "svelte/motion";
  import _ from "lodash";
  import { onMount } from "svelte";
  import { CoordVector } from "$lib/Vector";

  let { spaceFactor, center, difficulty } = $derived($game);

  interface Props {
    handleSelect: (event: any) => void;
    stateMachine: any;
  }

  let { handleSelect, stateMachine }: Props = $props();

  let cameraPositionX = spring(0);
  let cameraPositionY = spring(0);
  let cameraPositionZ = spring(10);

  $effect(() => {
    if (stateMachine.current === "play") {
      cameraPositionX.set($game.difficulty * (5 / 2));
      cameraPositionY.set($game.difficulty * (5 / 2));
      cameraPositionZ.set($game.difficulty * (5 / 2));
    } else {
      cameraPositionX.set($game.difficulty * (-2 / 4));
      cameraPositionY.set($game.difficulty * (5 / 4));
      cameraPositionZ.set($game.difficulty * (5 / 4));
    }
  });

  let highlight: CoordVector | null | undefined = $state();

  interactivity();

  let orbitControls: OrbitControls | undefined = $state();

  onMount(() => {
    orbitControls?.ref.listenToKeyEvents(window);
    orbitControls!.ref.keys = {
      LEFT: "KeyW",
      UP: "KeyA",
      RIGHT: "KeyS",
      BOTTOM: "KeyD",
    };

    return () => {
      orbitControls?.ref.stopListenToKeyEvents();
    };
  });
</script>

<T.PerspectiveCamera
  makeDefault
  position.x={$cameraPositionX}
  position.y={$cameraPositionY}
  position.z={$cameraPositionZ}
>
  <OrbitControls
    bind:this={orbitControls}
    enableDamping
    autoRotate={stateMachine.current !== "play"}
  />
  <T.DirectionalLight position={[12, 36, -0]} intensity={Math.PI * 0.25} />
  <T.DirectionalLight position={[0, -4, 10]} intensity={Math.PI * 0.25} />
</T.PerspectiveCamera>

<T.AmbientLight intensity={Math.PI * 0.75} />

<T.Group
  autocenter
  position={[$center, $center, $center]}
  onpointerenter={(event) => {
    highlight = event.object.userData.coord;
    event.stopPropagation();
  }}
  onpointerleave={(event) => {
    highlight = null;
    event.stopPropagation();
  }}
  onclick={(event) => {
    handleSelect(event);
  }}
>
  <InstancedMesh>
    <T.SphereGeometry />
    <T.MeshLambertMaterial />

    {#each $game.range as x}
      {#each $game.range as y}
        {#each $game.range as z}
          {@const coord = new CoordVector(x, y, z)}
          {@const color = coord.toColor(difficulty)}
          <Instance
            position={[
              coord.x * $spaceFactor,
              coord.y * $spaceFactor,
              coord.z * $spaceFactor,
            ]}
            userData={{ coord }}
            color={color.toString()}
            scale={_.isEqual(highlight, coord)
              ? [1.125, 1.125, 1.125]
              : [1, 1, 1]}
          />
        {/each}
      {/each}
    {/each}
  </InstancedMesh>
</T.Group>
