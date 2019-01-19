import { Workout } from './Workout'

export interface Day {
  readonly date: Date
  readonly workouts: ReadonlyArray<Workout>
}
