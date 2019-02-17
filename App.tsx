import moment from 'moment'
import { Container, Header, Text } from 'native-base'
import React, { PureComponent } from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import { Provider } from 'unstated'

import { WorkoutCalendarComponent } from './src/components/WorkoutCalendar'
import { DayModifierScreen } from './src/screens/DayModifier'
import { ExerciseModifierScreen } from './src/screens/ExeciseModifier'
import { ExerciseSelectorScreen } from './src/screens/ExerciseSelector'
import { WorkoutCalendarScreen } from './src/screens/WorkoutCalendar'
import { WorkoutModifierScreen } from './src/screens/WorkoutModifier'
import { ExerciseCatalogStore } from './src/stores/ExerciseCatalog'
import { WorkoutStore } from './src/stores/Workout'

const testExerciseCatalogState = new ExerciseCatalogStore({
  exercises: ['Squat', 'Deadlift', 'Curls']
})

const testState = new WorkoutStore({
  workouts: [
    {
      id: 0,
      timestamp: new Date('2019-01-24T09:00:00').getTime(),
      exercises: [
        {
          name: 'Squat',
          sets: [
            { weight: 120, reps: 50 },
            { weight: 150, reps: 1 },
            { weight: 177.5, reps: 0 }
          ],
          color: 'green'
        },
        {
          name: 'Deadlift',
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
          name: 'Squat',
          sets: [{ weight: 200, reps: 50 }],
          color: 'green'
        },
        {
          name: 'Deadlift',
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
