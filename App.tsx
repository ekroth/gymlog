import React, { PureComponent } from 'react'
import { Provider } from 'unstated'
import { Container, Header, Text } from 'native-base'
import { WorkoutStore } from './src/stores/Workout'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { WorkoutModifierScreen } from './src/screens/WorkoutModifier'
import { ExerciseModifierScreenContainer } from './src/screens/ExeciseModifier'

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
        screen: ExerciseModifierScreenContainer
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
