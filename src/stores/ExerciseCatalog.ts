import { Container } from 'unstated'

import { Exercise } from '../model/Exercise'
import { arrayRemove } from '../util/ArrayUtils'

export type ExerciseCatalogState = {
  exercises: ReadonlyArray<Exercise>
}

export type ExerciseCatalogStateProps = {
  exercises: ReadonlyArray<Exercise>
}

export class ExerciseCatalogStore extends Container<ExerciseCatalogState> {
  constructor(
    props: ExerciseCatalogStateProps = {
      exercises: []
    }
  ) {
    super()
    this.state = props
  }

  public addExercise = (exercise: Exercise) =>
    this.setState(state => {
      if (state.exercises.findIndex(e => e.id === exercise.id) !== -1) {
        return state
      }

      return {
        ...state,
        exercises: [...state.exercises, exercise]
      }
    })

  public deleteExercise = (exercise: Exercise) =>
    this.setState(state => {
      const index = state.exercises.findIndex(e => e.id === exercise.id)
      if (index === -1) {
        return state
      }

      return {
        ...state,
        exercises: arrayRemove(state.exercises, index)
      }
    })
}
