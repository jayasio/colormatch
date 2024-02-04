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

  $: ({ spaceFactor, center } = $game)

  export let handleSelect: (event: any) => void
  export let state

  let positionX = spring(0)
  let positionY = spring(0)
  let positionZ = spring(10)

  $: {
    if ($state === "play") {
      positionX.set($game.difficulty * 3)
      positionY.set($game.difficulty * 3)
      positionZ.set($game.difficulty * 3)
    } else {
      positionX.set(($game.difficulty * -2) / 4)
      positionY.set(($game.difficulty * 5) / 4)
      positionZ.set(($game.difficulty * 5) / 4)
    }
  }

  interactivity()
</script>

<T.PerspectiveCamera
  makeDefault
  position.x={$positionX}
  position.y={$positionY}
  position.z={$positionZ}
>
  <OrbitControls enableDamping autoRotate={$state !== "play"} />
  <T.DirectionalLight position={[12, 36, -0]} intensity={Math.PI * 0.5} />
  <T.DirectionalLight position={[0, -4, 10]} intensity={Math.PI * 0.5} />
</T.PerspectiveCamera>

<T.AmbientLight intensity={Math.PI * 0.25} />

<T.Group
  autocenter
  position={[$center, $center, $center]}
  on:dblclick={handleSelect}
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
        {/each}
      {/each}
    {/each}
  </InstancedMesh>
</T.Group>
