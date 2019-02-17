import { arrayRemove, arrayUpdate } from '../util/ArrayUtils'
import { Exercise } from './Exercise'
import { ExerciseEntry } from './ExerciseEntry'

export interface WorkoutEntry {
  readonly id?: number
  readonly timestamp: number
  readonly exercises: ReadonlyArray<ExerciseEntry>
}

export const addExercise = (workout: WorkoutEntry, exercise: Exercise) => ({
  ...workout,
  exercises: [...workout.exercises, { exercise, sets: [], color: 'black' }]
})

export const modifyExercise = (
  workout: WorkoutEntry,
  index: number,
  exercise: ExerciseEntry
) => ({
  ...workout,
  exercises: arrayUpdate(workout.exercises, exercise, index)
})

export const deleteExercise = (workout: WorkoutEntry, index: number) => ({
  ...workout,
  exercises: arrayRemove(workout.exercises, index)
})
