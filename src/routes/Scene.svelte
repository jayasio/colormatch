<script lang="ts">
  import { T } from "@threlte/core"
  import {
    Instance,
    InstancedMesh,
    OrbitControls,
    interactivity,
  } from "@threlte/extras"
  import _ from "lodash"

  import { game } from "$lib/game"

  $: ({ spaceFactor, center, question } = $game)

  export let state: any

  function handleGroupClick(event: any) {
    const { coord } = event.object.userData

    if (_.isEqual($question.coords, coord)) state.score()
    else state.strike()

    event.stopPropogation()
  }

  interactivity()
</script>

<T.PerspectiveCamera
  makeDefault
  position={[$game.difficulty * 3, $game.difficulty * 3, $game.difficulty * 3]}
>
  <OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.DirectionalLight position={[0, 2, -1]} intensity={Math.PI * 0.5} />
<T.DirectionalLight position={[1, -2, 0]} intensity={Math.PI * 0.5} />
<T.AmbientLight intensity={Math.PI * 0.6} />

<T.Group
  autocenter
  position={[$center, $center, $center]}
  on:dblclick={handleGroupClick}
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
