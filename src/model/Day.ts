import { Workout } from './Workout'

export interface Day {
  readonly date: string
  readonly workouts: ReadonlyArray<Workout>
}
