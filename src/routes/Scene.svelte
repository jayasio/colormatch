<script lang="ts">
  import { T } from "@threlte/core"
  import {
    Instance,
    InstancedMesh,
    OrbitControls,
    interactivity,
  } from "@threlte/extras"

  import { game } from "$lib/game"
  import { spring } from "svelte/motion"
  // import type { Vector } from "$lib/types"
  import _ from "lodash"

  $: ({ spaceFactor, center } = $game)

  export let handleSelect: (event: any) => void
  export let state

  let cameraPositionX = spring(0)
  let cameraPositionY = spring(0)
  let cameraPositionZ = spring(10)

  $: {
    if ($state === "play") {
      cameraPositionX.set($game.difficulty * (5 / 2))
      cameraPositionY.set($game.difficulty * (5 / 2))
      cameraPositionZ.set($game.difficulty * (5 / 2))
    } else {
      cameraPositionX.set($game.difficulty * (-2 / 4))
      cameraPositionY.set($game.difficulty * (5 / 4))
      cameraPositionZ.set($game.difficulty * (5 / 4))
    }
  }

  // let highlight: Vector | null

  interactivity()
</script>

<T.PerspectiveCamera
  makeDefault
  position.x={$cameraPositionX}
  position.y={$cameraPositionY}
  position.z={$cameraPositionZ}
>
  <OrbitControls enableDamping autoRotate={$state !== "play"} />
  <T.DirectionalLight position={[12, 36, -0]} intensity={Math.PI * 0.25} />
  <T.DirectionalLight position={[0, -4, 10]} intensity={Math.PI * 0.25} />
</T.PerspectiveCamera>

<T.AmbientLight intensity={Math.PI * 0.75} />

<T.Group
  autocenter
  position={[$center, $center, $center]}
  on:dblclick={(event) => {
    // highlight = event.object.userData.coord
    handleSelect(event)
    // setTimeout(() => (highlight = null), 500)
  }}
>
  <InstancedMesh>
    <T.SphereGeometry />
    <T.MeshStandardMaterial />

    {#each $game.normals as x}
      {#each $game.normals as y}
        {#each $game.normals as z}
          <Instance
            position={[x * $spaceFactor, y * $spaceFactor, z * $spaceFactor]}
            userData={{ coord: { x, y, z } }}
            color={$game.getColor({ x, y, z })}
          />
          <!-- opacity={_.isEqual(highlight, { x, y, z }) ? 1.0 : 0.25}
            scale={_.isEqual(highlight, { x, y, z })
              ? [1.2, 1.2, 1.2]
              : [1, 1, 1]} -->
        {/each}
      {/each}
    {/each}
  </InstancedMesh>
</T.Group>
