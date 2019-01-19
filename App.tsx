import { Container, Header, Text } from 'native-base'
import React, { PureComponent } from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import { Provider } from 'unstated'

import { DayModifierScreen } from './src/screens/DayModifier'
import { ExerciseModifierScreen } from './src/screens/ExeciseModifier'
import { WorkoutModifierScreen } from './src/screens/WorkoutModifier'
import { WorkoutStore } from './src/stores/Workout'

const testState = new WorkoutStore({
  workouts: [
    {
      date: new Date('2019-01-24T09:00:00'),
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
      date: new Date('2019-01-24T18:00:00'),
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
      ExerciseModifierScreen: {
        screen: ExerciseModifierScreen
      },
      WorkoutModifierScreen: {
        screen: WorkoutModifierScreen
      },
      DayModifierScreen: {
        screen: DayModifierScreen
      }
    },
    {
      initialRouteName: 'DayModifierScreen',
      initialRouteParams: {
        date: new Date('2019-01-24')
      }
    }
  )
)

/* tslint:disable:no-default-export */
export default class App extends PureComponent {
  public render() {
    return (
      <Provider inject={[testState]}>
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
