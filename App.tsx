import { Container, Header, Text } from 'native-base'
import React, { PureComponent } from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import { Provider } from 'unstated'

import { ExerciseModifierScreen } from './src/screens/ExeciseModifier'
import { WorkoutModifierScreen } from './src/screens/WorkoutModifier'
import { WorkoutStore } from './src/stores/Workout'

const testState = new WorkoutStore({
  exercises: [
    {
      name: 'Squat',
      sets: [
        { weight: 120, reps: 50 },
        { weight: 150, reps: 1 },
        { weight: 177.5, reps: 0 }
      ]
    },
    {
      name: 'Deadlift',
      sets: [{ weight: 200, reps: 1 }]
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
      }
    },
    {
      initialRouteName: 'WorkoutModifierScreen'
    }
  )
)

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
