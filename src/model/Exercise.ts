import Set from './Set'
import { arrayUpdate, arrayRemove } from '../util/ReadonlyArrayUtils'

export default interface Exercise {
  name: string
  sets: ReadonlyArray<Set>
}

export const addSet = (exercise: Exercise, set: Set) => ({
  sets: [...exercise.sets, set],
  ...exercise
})

export const modifySet = (exercise: Exercise, index: number, set: Set) => ({
  sets: arrayUpdate(exercise.sets, set, index)
})

export const deleteSet = (exercise: Exercise, index: number) => ({
  sets: arrayRemove(exercise.sets, index)
})
