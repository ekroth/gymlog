import { Container } from 'unstated'

import { Day } from '../model/Day'
import { Workout } from '../model/Workout'
import { arrayUpdate } from '../util/ArrayUtils'
import { dateDayString, dateSameDay, dateTimeString } from '../util/DateUtils'

export type WorkoutState = {
  workouts: ReadonlyArray<Workout>
}

export type WorkoutProps = {
  workouts: ReadonlyArray<Workout>
}

export class WorkoutStore extends Container<WorkoutState> {
  constructor(
    props: WorkoutProps = {
      workouts: []
    }
  ) {
    super()
    this.state = props
  }

  public getDay = (date: Date): Day => ({
    date: new Date(dateTimeString(date)),
    workouts: this.state.workouts.filter(w => dateSameDay(w.date, date))
  })

  public addWorkout = (workout: Workout) =>
    this.setState(state => ({
      ...state,
      workouts: [...state.workouts, workout]
    }))

  public modifyWorkout = (workout: Workout, index: number) =>
    this.setState(state => ({
      ...state,
      workouts: arrayUpdate(state.workouts, workout, index)
    }))
}
