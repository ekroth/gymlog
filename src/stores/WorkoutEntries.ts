import { Exercise } from 'model/Exercise'
import moment from 'moment'
import UUIDGenerator from 'react-native-uuid-generator'
import { Container } from 'unstated'

import { DayEntry } from '../model/DayEntry'
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
import { ExerciseSchema } from '../realm/Exercise'
import { ExerciseEntrySchema } from '../realm/ExerciseEntry'
import { SetSchema } from '../realm/Set'
import { WorkoutEntrySchema } from '../realm/WorkoutEntry'
import { arrayUnique, arrayUpdateWhere } from '../util/ArrayUtils'

export type WorkoutEntriesState = {
  workouts: ReadonlyArray<WorkoutEntry>
}

export type WorkoutEntriesProps = {
  workouts: ReadonlyArray<WorkoutEntry>
}

export class ExerciseEntryHandler {
  private store: WorkoutEntryHandler
  private index: number

  constructor(store: WorkoutEntryHandler, index: number) {
    this.store = store
    this.index = index
  }

  public addSet = (set: Set) => {
    this.store.modifyExerciseEntry(this.index, addSet(this.getExercise(), set))
  }

  public deleteSet = (index: number) => {
    this.store.modifyExerciseEntry(
      this.index,
      deleteSet(this.getExercise(), index)
    )
  }

  public modifySet = (index: number, set: Set) => {
    this.store.modifyExerciseEntry(
      this.index,
      modifySet(this.getExercise(), index, set)
    )
  }

  public getExercise = () => {
    return this.store.getExerciseEntry(this.index)
  }
}

export class WorkoutEntryHandler {
  private store: WorkoutEntriesStore
  private id: string

  constructor(store: WorkoutEntriesStore, id: string) {
    this.store = store
    this.id = id
  }

  public exerciseEntryHandler = (index: number) => {
    return new ExerciseEntryHandler(this, index)
  }

  public getWorkoutEntry = () => {
    return this.store.state.workouts.filter(w => w.id === this.id)[0]
  }

  public addExercise = (exercise: Exercise) => {
    this.store.modifyWorkoutEntry(addExercise(this.getWorkoutEntry(), exercise))
  }

  public deleteExerciseEntry = (index: number) => {
    this.store.modifyWorkoutEntry(deleteExercise(this.getWorkoutEntry(), index))
  }

  public modifyExerciseEntry = (index: number, exercise: ExerciseEntry) => {
    this.store.modifyWorkoutEntry(
      modifyExercise(this.getWorkoutEntry(), index, exercise)
    )
  }

  public getExerciseEntry = (index: number) => {
    return this.getWorkoutEntry().exercises[index]
  }
}

export class WorkoutEntriesStore extends Container<WorkoutEntriesState> {
  private realm: Realm

  constructor(
    props: WorkoutEntriesProps = {
      workouts: []
    }
  ) {
    super()
    this.realm = new Realm({
      schema: [
        WorkoutEntrySchema,
        ExerciseEntrySchema,
        ExerciseSchema,
        SetSchema
      ],
      inMemory: false,
      deleteRealmIfMigrationNeeded: true
    })
    this.state = {
      workouts: Array.from(this.realm.objects<WorkoutEntry>(WorkoutEntrySchema))
    }
    props.workouts.forEach(this.addWorkoutEntry)
  }

  public workoutEntryHandler = (id: string) => {
    return new WorkoutEntryHandler(this, id)
  }

  public getDayEntry = (date: string): DayEntry => ({
    date,
    workouts: this.state.workouts.filter(
      w => moment(w.timestamp).format('YYYY-MM-DD') === date
    )
  })

  public getDayEntries = (): ReadonlyArray<DayEntry> => {
    const dates = arrayUnique(
      this.state.workouts.map(w => moment(w.timestamp).format('YYYY-MM-DD'))
    )
    return dates.map(this.getDayEntry)
  }

  public addWorkoutEntry = async (workout: WorkoutEntry) => {
    const id = await UUIDGenerator.getRandomUUID()
    const workoutWithId = {
      id,
      ...workout
    }

    this.setState(state => {
      this.realm.write(() => {
        this.realm.create<WorkoutEntry>(WorkoutEntrySchema, workoutWithId, true)
      })
      return {
        ...state,
        workouts: [...state.workouts, workoutWithId]
      }
    })
  }

  public modifyWorkoutEntry = (workout: WorkoutEntry) =>
    this.setState(state => {
      this.realm.write(() => {
        this.realm.create(WorkoutEntrySchema, workout, true)
      })
      return {
        ...state,
        workouts: arrayUpdateWhere(
          state.workouts,
          workout,
          w => w.id === workout.id
        )
      }
    })
}
