import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps
} from 'react-navigation'
import { Subscribe } from 'unstated'

import { ExerciseModifierComponent } from '../components/ExerciseModifier'
import { addSet, deleteSet, modifySet } from '../model/Exercise'
import { modifyExercise } from '../model/Workout'
import { WorkoutStore } from '../stores/Workout'

export type ExerciseModifierNavigationParams = {
  // Convenience copy for React Navigation Header
  exerciseName: string
  selectedExercise: number
  exerciseColor: string
}

export class ExerciseModifierScreen extends React.Component<
  NavigationScreenProps<ExerciseModifierNavigationParams>
> {
  public static navigationOptions = (
    props: NavigationScreenProps<ExerciseModifierNavigationParams>
  ): NavigationScreenOptions => ({
    title: props.navigation.state.params!.exerciseName,
    headerTintColor: props.navigation.state.params!.exerciseColor
  })

  public render() {
    const selectedExercise = this.props.navigation.state.params!
      .selectedExercise

    return (
      <Subscribe to={[WorkoutStore]}>
        {(store: WorkoutStore) => (
          <ExerciseModifierComponent
            onAddSet={set => {
              store.modifyWorkout(
                modifyExercise(
                  store.state.workout,
                  selectedExercise,
                  addSet(store.state.workout.exercises[selectedExercise], set)
                )
              )
            }}
            onModifySet={(index, set) => {
              store.modifyWorkout(
                modifyExercise(
                  store.state.workout,
                  selectedExercise,
                  modifySet(
                    store.state.workout.exercises[selectedExercise],
                    index,
                    set
                  )
                )
              )
            }}
            onDeleteSet={index => {
              store.modifyWorkout(
                modifyExercise(
                  store.state.workout,
                  selectedExercise,
                  deleteSet(
                    store.state.workout.exercises[selectedExercise],
                    index
                  )
                )
              )
            }}
            sets={store.state.workout.exercises[selectedExercise].sets}
          />
        )}
      </Subscribe>
    )
  }
}
