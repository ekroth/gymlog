import { arrayRemove, arrayUpdate } from '../util/ArrayUtils'
import { Exercise } from './Exercise'

export interface Workout {
  readonly date: Date
  readonly exercises: ReadonlyArray<Exercise>
}

export const addExercise = (workout: Workout, name: string) => ({
  ...workout,
  exercises: [...workout.exercises, { name, sets: [], color: 'black' }]
})

export const modifyExercise = (
  workout: Workout,
  index: number,
  exercise: Exercise
) => ({
  ...workout,
  exercises: arrayUpdate(workout.exercises, exercise, index)
})

export const deleteExercise = (workout: Workout, index: number) => ({
  ...workout,
  exercises: arrayRemove(workout.exercises, index)
})
