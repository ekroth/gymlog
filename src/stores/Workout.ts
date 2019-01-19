import { Container } from 'unstated'

import { Day } from '../model/Day'
import { addSet, deleteSet, Exercise, modifySet } from '../model/Exercise'
import { Set } from '../model/Set'
import {
  addExercise,
  deleteExercise,
  modifyExercise,
  Workout
} from '../model/Workout'
import { arrayUpdate } from '../util/ArrayUtils'
import { dateSameDay, dateTimeString } from '../util/DateUtils'

export type WorkoutState = {
  workouts: ReadonlyArray<Workout>
}

export type WorkoutProps = {
  workouts: ReadonlyArray<Workout>
}

export class ExerciseHandler {
  private store: WorkoutHandler
  private index: number

  constructor(store: WorkoutHandler, index: number) {
    this.store = store
    this.index = index
  }

  public addSet(set: Set) {
    this.store.modifyExercise(this.index, addSet(this.getExercise(), set))
  }

  public deleteSet(index: number) {
    this.store.modifyExercise(this.index, deleteSet(this.getExercise(), index))
  }

  public modifySet(index: number, set: Set) {
    this.store.modifyExercise(
      this.index,
      modifySet(this.getExercise(), index, set)
    )
  }

  public getExercise() {
    return this.store.getExercise(this.index)
  }
}

export class WorkoutHandler {
  private store: WorkoutStore
  private index: number

  constructor(store: WorkoutStore, index: number) {
    this.store = store
    this.index = index
  }

  public exerciseHandler(index: number) {
    return new ExerciseHandler(this, index)
  }

  public addExercise(name: string) {
    this.store.modifyWorkout(addExercise(this.getWorkout(), name), this.index)
  }

  public deleteExercise(index: number) {
    this.store.modifyWorkout(
      deleteExercise(this.getWorkout(), index),
      this.index
    )
  }

  public modifyExercise(index: number, exercise: Exercise) {
    this.store.modifyWorkout(
      modifyExercise(this.getWorkout(), index, exercise),
      this.index
    )
  }

  public getExercise(index: number) {
    return this.getWorkout().exercises[index]
  }

  public getWorkout() {
    return this.store.state.workouts[this.index]
  }
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

  public workoutHandler(index: number) {
    return new WorkoutHandler(this, index)
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
