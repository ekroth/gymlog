import { WorkoutEntry } from './WorkoutEntry'

export interface Day {
  readonly date: string
  readonly workouts: ReadonlyArray<WorkoutEntry>
}
