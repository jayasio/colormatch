<script lang="ts">
  import { T } from "@threlte/core"
  import {
    Instance,
    InstancedMesh,
    OrbitControls,
    interactivity,
  } from "@threlte/extras"

  import { game } from "$lib/game"

  $: ({ spaceFactor, center, difficulty } = $game)

  export let handleSelect: (event: any) => void

  interactivity()
</script>

<T.PerspectiveCamera
  makeDefault
  position={[$difficulty * 3, $difficulty * 3, $difficulty * 3]}
>
  <OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.DirectionalLight position={[0, 2, -1]} intensity={Math.PI * 0.5} />
<T.DirectionalLight position={[1, -2, 0]} intensity={Math.PI * 0.5} />
<T.AmbientLight intensity={Math.PI * 0.6} />

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
