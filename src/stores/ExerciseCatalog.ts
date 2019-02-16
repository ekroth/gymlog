import { Container } from 'unstated'

import { arrayRemove } from '../util/ArrayUtils'

export type ExerciseCatalogState = {
  exercises: ReadonlyArray<string>
}

export type ExerciseCatalogStateProps = {
  exercises: ReadonlyArray<string>
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

  public addExercise = (name: string) =>
    this.setState(state => {
      if (state.exercises.indexOf(name) !== -1) {
        return state
      }

      return {
        ...state,
        exercises: [...state.exercises, name]
      }
    })

  public deleteExercise = (name: string) =>
    this.setState(state => {
      const index = state.exercises.indexOf(name)
      if (index === -1) {
        return state
      }

      return {
        ...state,
        exercises: arrayRemove(state.exercises, index)
      }
    })
}
