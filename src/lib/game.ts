import { derived, get, writable } from "svelte/store"
import _ from "lodash"
import { spring } from "svelte/motion"
import { CoordVector } from "./Vector"

function createGame(difficulty: number = 4) {
  const range = _.range(0, difficulty)

  const spaceFactor = spring(2.0)
  const center = derived(spaceFactor, ($spaceFactor) => {
    return (
      ((_.head(range) ?? 0) +
        (_.last(range) ?? 0) +
        (($spaceFactor - 2.0) * range.length) / 2) *
      -1
    )
  })

  const wins = writable(0)
  const strikes = writable(0)

  const question = writable<CoordVector>(generateQuestion())
  const questionsList = writable<CoordVector[]>([get(question)])

  function generateQuestion() {
    return CoordVector.random(difficulty)
  }

  function score() {
    wins.update((n) => n + 1)

    let generated

    do {
      generated = generateQuestion()
    } while (question && _.isEqual(generated, get(question)))

    question.set(generated)
    questionsList.update((list) => [...list, get(question)])
  }

  function strike() {
    strikes.update((n) => n + 1)
  }

  return {
    difficulty,
    range,
    spaceFactor,
    center,
    wins,
    strikes,
    question,
    questionsList,
    score,
    strike,
  }
}

export const game = writable(createGame())

export function resetGame(difficulty: number) {
  game.set(createGame(difficulty))
}
