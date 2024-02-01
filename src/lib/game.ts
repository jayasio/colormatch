import _ from "lodash"
import { spring } from "svelte/motion"
import { derived, get, writable } from "svelte/store"

type Vector = {
  x: number
  y: number
  z: number
}

export class Game {
  difficulty

  spaceFactor

  wins
  strikes

  question
  questionsList

  normals
  colorNormals
  center

  constructor(difficulty: number) {
    this.difficulty = difficulty

    this.spaceFactor = spring(2.0)

    this.wins = writable(0)
    this.strikes = writable(0)

    this.normals = _.range(0, difficulty)
    this.colorNormals = this.normals.map((x) =>
      Math.ceil((x / (this.normals.length - 1)) * 255),
    )
    this.center = derived([this.spaceFactor], ([$spaceFactor]) => {
      return (
        ((_.head(this.normals) ?? 0) +
          (_.last(this.normals) ?? 0) +
          (($spaceFactor - 2.0) * this.normals.length) / 2) *
        -1
      )
    })

    this.questionsList = writable<{ coords: Vector; color: String }[]>([])
    this.question = writable(this._generateQuestion())
  }

  score() {
    this.wins.update((wins) => wins + 1)
    this.question.set(this._generateQuestion())
  }

  strike() {
    this.strikes.update((strikes) => strikes + 1)
  }

  getColor(coords: Vector) {
    return `rgb(
            ${this.colorNormals[coords.x]},
            ${this.colorNormals[coords.y]},
            ${this.colorNormals[coords.z]}
          )`
  }

  _generateQuestion() {
    function randomize(difficulty: number) {
      return Math.floor(Math.random() * difficulty)
    }
    const coords = {
      x: randomize(this.difficulty),
      y: randomize(this.difficulty),
      z: randomize(this.difficulty),
    } as Vector
    const color = this.getColor(coords)

    this.questionsList.update((questionsList) => {
      return [...questionsList, { coords, color }]
    })

    return {
      coords,
      color,
    }
  }
}

export const game = writable<Game>(new Game(4))
