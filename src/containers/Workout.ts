import { Container } from 'unstated'
import Exercise from '../model/Exercise'
import { arrayRemove, arrayUpdate } from '../util/ReadonlyArrayUtils'

export type WorkoutState = {
  exercises: ReadonlyArray<Exercise>
}

export type WorkoutProps = {
  exercises: ReadonlyArray<Exercise>
}

export class WorkoutContainer extends Container<WorkoutState> {
  constructor(
    props: WorkoutProps = {
      exercises: []
    }
  ) {
    super()
    this.state = {
      exercises: props.exercises
    }
  }

  public addExercise = (name: string) =>
    this.setState(state => ({
      exercises: [...state.exercises, { name, sets: [] }]
    }))

  public modifyExercise = (index: number, exercise: Exercise) =>
    this.setState(state => ({
      exercises: arrayUpdate(state.exercises, exercise, index)
    }))

  public deleteExercise = (index: number) =>
    this.setState(state => ({ exercises: arrayRemove(state.exercises, index) }))
}
