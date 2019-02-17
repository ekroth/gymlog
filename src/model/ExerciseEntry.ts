import { arrayRemove, arrayUpdate } from '../util/ArrayUtils'
import { Exercise } from './Exercise'
import { Set } from './Set'

export interface ExerciseEntry {
  readonly exercise: Exercise
  readonly sets: ReadonlyArray<Set>
  readonly color: string
}

export const addSet = (exercise: ExerciseEntry, set: Set): ExerciseEntry => ({
  ...exercise,
  sets: [...exercise.sets, set]
})

export const modifySet = (
  exercise: ExerciseEntry,
  index: number,
  set: Set
): ExerciseEntry => ({
  ...exercise,
  sets: arrayUpdate(exercise.sets, set, index)
})

export const deleteSet = (
  exercise: ExerciseEntry,
  index: number
): ExerciseEntry => ({
  ...exercise,
  sets: arrayRemove(exercise.sets, index)
})
