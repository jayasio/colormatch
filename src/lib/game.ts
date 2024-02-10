import _ from "lodash"
import { spring } from "svelte/motion"
import { derived, writable } from "svelte/store"
import type { Vector } from "$lib/types"

function createGame(difficulty: number) {
  const spaceFactor = spring(2.0)

  const wins = writable(0)
  const strikes = writable(0)

  const normals = _.range(0, difficulty)
  const colorNormals = normals.map((x) =>
    Math.ceil((x / (normals.length - 1)) * 255),
  )
  // const colorNormalsNormalized = normals.map((x) => x / difficulty)

  const center = derived(spaceFactor, ($spaceFactor) => {
    return (
      ((_.head(normals) ?? 0) +
        (_.last(normals) ?? 0) +
        (($spaceFactor - 2.0) * normals.length) / 2) *
      -1
    )
  })

  const questionsList = writable<{ coords: Vector; color: string }[]>([])
  const question = writable(generateQuestion())

  function score() {
    wins.update((n) => n + 1)
    question.set(generateQuestion())
  }

  function strike() {
    strikes.update((n) => n + 1)
  }

  function getColor(coords: Vector, colorSpace: string = "srgb") {
    // return `color(
    //   ${colorSpace}
    //   ${colorNormalsNormalized[coords.x]}
    //   ${colorNormalsNormalized[coords.y]}
    //   ${colorNormalsNormalized[coords.z]}
    //   )`
    return `rgb(${colorNormals[coords.x]}, ${colorNormals[coords.y]}, ${
      colorNormals[coords.z]
    })`
  }

  function generateQuestion() {
    function randomize(difficulty: number) {
      return Math.floor(Math.random() * difficulty)
    }

    const coords = {
      x: randomize(difficulty),
      y: randomize(difficulty),
      z: randomize(difficulty),
    } as Vector
    const coordsPercent = {
      x: Math.round((coords.x * 100) / (difficulty - 1)),
      y: Math.round((coords.y * 100) / (difficulty - 1)),
      z: Math.round((coords.z * 100) / (difficulty - 1)),
    } as Vector
    const color = `rgb(${colorNormals[coords.x]}, ${colorNormals[coords.y]}, ${
      colorNormals[coords.z]
    })`

    questionsList.update((list) => [...list, { coords, coordsPercent, color }])

    return { coords, coordsPercent, color }
  }

  return {
    difficulty,
    spaceFactor,
    wins,
    strikes,
    center,
    normals,
    questionsList,
    question,
    score,
    strike,
    getColor,
  }
}

export const game = writable(createGame(4))

export function resetGame(difficulty: number) {
  game.set(createGame(difficulty ?? 4))
}
