import _ from "lodash"
import { spring } from "svelte/motion"
import { derived, get, writable } from "svelte/store"
import type { Vector } from "$lib/types"

function createRange(difficulty: number) {
  const range = _.range(0, difficulty)
  return {
    asNumber: range,
    asPercent: range.flatMap((x) => Math.round((x / (difficulty - 1)) * 100)),
    asColor: range.flatMap((x) => Math.ceil((x / (difficulty - 1)) * 255)),
  }
}

function createGame(difficulty: number) {
  const range = createRange(difficulty)

  const spaceFactor = spring(2.0)

  const wins = writable(0)
  const strikes = writable(0)

  const center = derived(spaceFactor, ($spaceFactor) => {
    return (
      ((_.head(range.asNumber) ?? 0) +
        (_.last(range.asNumber) ?? 0) +
        (($spaceFactor - 2.0) * range.asNumber.length) / 2) *
      -1
    )
  })

  const question = writable(generateQuestion())
  const questionsList = writable([get(question)])

  function score() {
    wins.update((n) => n + 1)

    const newQuestion = generateQuestion()

    question.set(newQuestion)
    questionsList.update((list) => [...list, newQuestion])
  }

  function strike() {
    strikes.update((n) => n + 1)
  }

  function getColor(coord: Vector) {
    return `rgb(
      ${range.asColor[coord.x]}, 
      ${range.asColor[coord.y]}, 
      ${range.asColor[coord.z]}
      )`
  }

  function getLuminance(coord: Vector): "light" | "dark" {
    const luminance =
      (0.299 * range.asColor[coord.x] +
        0.587 * range.asColor[coord.y] +
        0.114 * range.asColor[coord.z]) /
      255
    return luminance > 0.5 ? "light" : "dark"
  }

  function generateQuestion() {
    function randomize(difficulty: number) {
      return Math.floor(Math.random() * difficulty)
    }

    const random = {
      x: randomize(difficulty),
      y: randomize(difficulty),
      z: randomize(difficulty),
    } as Vector

    return {
      coord: random,
      coordPercent: {
        x: range.asPercent[random.x],
        y: range.asPercent[random.y],
        z: range.asPercent[random.z],
      } as Vector,
      color: getColor(random),
      colorLuminance: getLuminance(random),
    }
  }

  return {
    difficulty,
    spaceFactor,
    range,
    wins,
    strikes,
    center,
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
