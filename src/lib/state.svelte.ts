import { Spring } from "svelte/motion";
import { CoordVector } from "$lib/vector";

export class GameState {
  wins: number = $state(0);
  strikes: number = $state(0);

  questions: CoordVector[] = $state([]);
  latestQuestion: CoordVector = $derived(
    this.questions[this.questions.length - 1],
  );

  constructor(public readonly size: number = 4) {
    this.generateQuestion();
  }

  score() {
    this.wins++;
    this.generateQuestion();
  }

  strike() {
    this.strikes++;
  }

  private generateQuestion() {
    const question = CoordVector.random(this.size);
    this.questions.push(question);
  }
}

export class CubeState {
  spaceFactor = new Spring(2.0);

  range: number[];
  center: number = $derived(
    -1 * (this.size - 1 + ((this.spaceFactor.current - 2.0) * this.size) / 2),
  );

  constructor(public readonly size: number = 4) {
    this.range = Array.from({ length: size }, (_, i) => i);
  }
}
