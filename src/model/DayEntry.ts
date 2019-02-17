import { WorkoutEntry } from './WorkoutEntry'

export interface DayEntry {
  readonly date: string
  readonly workouts: ReadonlyArray<WorkoutEntry>
}
