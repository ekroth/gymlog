import { iterableRemove, iterableUpdate } from '../util/IterableUtils'
import Exercise from './Exercise'

export default interface Workout {
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
  exercises: iterableUpdate(workout.exercises, exercise, index)
})

export const deleteExercise = (workout: Workout, index: number) => ({
  ...workout,
  exercises: iterableRemove(workout.exercises, index)
})
