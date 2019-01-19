import Workout from 'model/Workout'
import { Container } from 'unstated'

export type WorkoutState = {
  workout: Workout
}

export type WorkoutProps = {
  workout: Workout
}

export class WorkoutStore extends Container<WorkoutState> {
  constructor(
    props: WorkoutProps = {
      workout: { exercises: [] }
    }
  ) {
    super()
    this.state = props
  }

  public modifyWorkout = (workout: Workout) =>
    this.setState(state => ({
      ...state,
      workout
    }))
}
