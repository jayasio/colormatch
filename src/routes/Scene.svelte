<script lang="ts">
  import { T } from "@threlte/core"
  import {
    Instance,
    InstancedMesh,
    OrbitControls,
    interactivity,
    layers,
  } from "@threlte/extras"

  import { game } from "$lib/game"
  import { onMount } from "svelte"

  $: ({ spaceFactor, center, difficulty } = $game)

  export let handleSelect: (event: any) => void

  let orbitControls: OrbitControls

  onMount(() => {
    orbitControls.listenToKeyEvents(window)
    // doesn't work yet

    return () => {
      orbitControls.stopListenToKeyEvents()
    }
  })

  interactivity()
</script>

<T.PerspectiveCamera
  makeDefault
  position={[difficulty * 3, difficulty * 3, difficulty * 3]}
>
  <OrbitControls enableDamping autoRotate={false} bind:this={orbitControls} />
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
