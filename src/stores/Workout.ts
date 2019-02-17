import moment from 'moment'
import { Container } from 'unstated'

import { Day } from '../model/Day'
import {
  addSet,
  deleteSet,
  ExerciseEntry,
  modifySet
} from '../model/ExerciseEntry'
import { Set } from '../model/Set'
import {
  addExercise,
  deleteExercise,
  modifyExercise,
  WorkoutEntry
} from '../model/WorkoutEntry'
import { arrayUnique, arrayUpdateWhere } from '../util/ArrayUtils'

export type WorkoutState = {
  nextId: number
  workouts: ReadonlyArray<WorkoutEntry>
}

export type WorkoutProps = {
  workouts: ReadonlyArray<WorkoutEntry>
}

export class ExerciseHandler {
  private store: WorkoutHandler
  private index: number

  constructor(store: WorkoutHandler, index: number) {
    this.store = store
    this.index = index
  }

  public addSet = (set: Set) => {
    this.store.modifyExercise(this.index, addSet(this.getExercise(), set))
  }

  public deleteSet = (index: number) => {
    this.store.modifyExercise(this.index, deleteSet(this.getExercise(), index))
  }

  public modifySet = (index: number, set: Set) => {
    this.store.modifyExercise(
      this.index,
      modifySet(this.getExercise(), index, set)
    )
  }

  public getExercise = () => {
    return this.store.getExercise(this.index)
  }
}

export class WorkoutHandler {
  private store: WorkoutStore
  private id: number

  constructor(store: WorkoutStore, id: number) {
    this.store = store
    this.id = id
  }

  public exerciseHandler = (index: number) => {
    return new ExerciseHandler(this, index)
  }

  public getWorkout = () => {
    return this.store.state.workouts.filter(w => w.id === this.id)[0]
  }

  public addExercise = (name: string) => {
    this.store.modifyWorkout(addExercise(this.getWorkout(), name), this.id)
  }

  public deleteExercise = (index: number) => {
    this.store.modifyWorkout(deleteExercise(this.getWorkout(), index), this.id)
  }

  public modifyExercise = (index: number, exercise: ExerciseEntry) => {
    this.store.modifyWorkout(
      modifyExercise(this.getWorkout(), index, exercise),
      this.id
    )
  }

  public getExercise = (index: number) => {
    return this.getWorkout().exercises[index]
  }
}

export class WorkoutStore extends Container<WorkoutState> {
  constructor(
    props: WorkoutProps = {
      workouts: []
    }
  ) {
    super()
    this.state = {
      nextId: props.workouts.length,
      workouts: props.workouts
    }
  }

  public workoutHandler = (id: number) => {
    return new WorkoutHandler(this, id)
  }

  public getDay = (date: string): Day => ({
    date,
    workouts: this.state.workouts.filter(
      w => moment(w.timestamp).format('YYYY-MM-DD') === date
    )
  })

  public getDays = (): ReadonlyArray<Day> => {
    const dates = arrayUnique(
      this.state.workouts.map(w => moment(w.timestamp).format('YYYY-MM-DD'))
    )
    return dates.map(this.getDay)
  }

  public addWorkout = (workout: WorkoutEntry) =>
    this.setState(state => ({
      ...state,
      nextId: state.nextId + 1,
      workouts: [...state.workouts, { ...workout, id: state.nextId }]
    }))

  public modifyWorkout = (workout: WorkoutEntry, id: number) =>
    this.setState(state => ({
      ...state,
      workouts: arrayUpdateWhere(state.workouts, workout, w => w.id === id)
    }))
}
