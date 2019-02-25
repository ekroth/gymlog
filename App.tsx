import { Container, Header, Text } from 'native-base'
import React, { PureComponent } from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import Realm from 'realm'
import { Provider } from 'unstated'

import { ExerciseSchema } from './src/realm/Exercise'
import { ExerciseEntrySchema } from './src/realm/ExerciseEntry'
import { SetSchema } from './src/realm/Set'
import { WorkoutEntrySchema } from './src/realm/WorkoutEntry'
import { DayModifierScreen } from './src/screens/DayModifier'
import { ExerciseModifierScreen } from './src/screens/ExeciseModifier'
import { ExerciseSelectorScreen } from './src/screens/ExerciseSelector'
import { WorkoutCalendarScreen } from './src/screens/WorkoutCalendar'
import { WorkoutModifierScreen } from './src/screens/WorkoutModifier'
import { ExerciseCatalogStore } from './src/stores/ExerciseCatalog'
import { WorkoutEntriesStore } from './src/stores/WorkoutEntries'

const testExerciseCatalogState = new ExerciseCatalogStore({
  exercises: [
    { id: 0, name: 'Squat', color: 'green' },
    { id: 1, name: 'Deadlift', color: 'blue' },
    { id: 2, name: 'Curls', color: 'red' }
  ]
})

const testState = new WorkoutEntriesStore({
  workouts: [
    {
      id: 0,
      timestamp: new Date('2019-01-24T09:00:00').getTime(),
      exercises: [
        {
          exercise: testExerciseCatalogState.state.exercises[0],
          sets: [
            { weight: 120, reps: 50 },
            { weight: 150, reps: 1 },
            { weight: 177.5, reps: 0 }
          ],
          color: 'green'
        },
        {
          exercise: testExerciseCatalogState.state.exercises[1],
          sets: [{ weight: 200, reps: 1 }],
          color: 'blue'
        }
      ]
    },
    {
      id: 1,
      timestamp: new Date('2019-01-24T18:00:00').getTime(),
      exercises: [
        {
          exercise: testExerciseCatalogState.state.exercises[0],
          sets: [{ weight: 200, reps: 50 }],
          color: 'green'
        },
        {
          exercise: testExerciseCatalogState.state.exercises[1],
          sets: [{ weight: 100, reps: 10 }],
          color: 'blue'
        }
      ]
    }
  ]
})

const WorkoutNavigator = createAppContainer(
  createStackNavigator(
    {
      ExerciseSelectorScreen: {
        screen: ExerciseSelectorScreen
      },
      ExerciseModifierScreen: {
        screen: ExerciseModifierScreen
      },
      WorkoutModifierScreen: {
        screen: WorkoutModifierScreen
      },
      DayModifierScreen: {
        screen: DayModifierScreen
      },
      WorkoutCalendarScreen: {
        screen: WorkoutCalendarScreen
      }
    },
    {
      initialRouteName: 'WorkoutCalendarScreen',
      initialRouteParams: {}
    }
  )
)

const realm = new Realm({
  schema: [WorkoutEntrySchema, ExerciseEntrySchema, ExerciseSchema, SetSchema],
  inMemory: true,
  deleteRealmIfMigrationNeeded: true
})

realm.write(() => realm.create(WorkoutEntrySchema, testState.state.workouts[0]))
realm.write(() => realm.create(WorkoutEntrySchema, testState.state.workouts[1]))

throw new Error(JSON.stringify(realm.objects(WorkoutEntrySchema)))

/* tslint:disable:no-default-export */
export default class App extends PureComponent {
  public render() {
    return (
      <Provider inject={[testState, testExerciseCatalogState]}>
        <Container>
          <Header>
            <Text style={{ alignSelf: 'center' }}>Workouts</Text>
          </Header>
          <WorkoutNavigator />
        </Container>
      </Provider>
    )
  }
}
