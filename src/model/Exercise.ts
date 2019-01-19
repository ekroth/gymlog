import { iterableRemove, iterableUpdate } from '../util/IterableUtils'
import Set from './Set'

export default interface Exercise {
  readonly name: string
  readonly sets: ReadonlyArray<Set>
  readonly color: string
}

export const addSet = (exercise: Exercise, set: Set): Exercise => ({
  ...exercise,
  sets: [...exercise.sets, set]
})

export const modifySet = (
  exercise: Exercise,
  index: number,
  set: Set
): Exercise => ({
  ...exercise,
  sets: iterableUpdate(exercise.sets, set, index)
})

export const deleteSet = (exercise: Exercise, index: number): Exercise => ({
  ...exercise,
  sets: iterableRemove(exercise.sets, index)
})
