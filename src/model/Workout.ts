import { arrayRemove, arrayUpdate } from '../util/ArrayUtils'
import { ExerciseEntry } from './ExerciseEntry'

export interface Workout {
  readonly id?: number
  readonly timestamp: number
  readonly exercises: ReadonlyArray<ExerciseEntry>
}

export const addExercise = (workout: Workout, name: string) => ({
  ...workout,
  exercises: [...workout.exercises, { name, sets: [], color: 'black' }]
})

export const modifyExercise = (
  workout: Workout,
  index: number,
  exercise: ExerciseEntry
) => ({
  ...workout,
  exercises: arrayUpdate(workout.exercises, exercise, index)
})

export const deleteExercise = (workout: Workout, index: number) => ({
  ...workout,
  exercises: arrayRemove(workout.exercises, index)
})
