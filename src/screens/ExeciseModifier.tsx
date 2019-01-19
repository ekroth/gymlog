import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps
} from 'react-navigation'
import { Subscribe } from 'unstated'

import { ExerciseModifierComponent } from '../components/ExerciseModifier'
import { addSet, deleteSet, modifySet } from '../model/Exercise'
import { WorkoutStore } from '../stores/Workout'

export type ExerciseModifierNavigationParams = {
  // Convenience copy for React Navigation Header
  exerciseName: string
  selectedExercise: number
}

export class ExerciseModifierScreen extends React.Component<
  NavigationScreenProps<ExerciseModifierNavigationParams>
> {
  public static navigationOptions = (
    props: NavigationScreenProps<ExerciseModifierNavigationParams>
  ): NavigationScreenOptions => ({
    title: props.navigation.state.params!.exerciseName
  })

  public render() {
    const selectedExercise = this.props.navigation.state.params!
      .selectedExercise

    return (
      <Subscribe to={[WorkoutStore]}>
        {(store: WorkoutStore) => (
          <ExerciseModifierComponent
            onAddSet={set => {
              store.modifyExercise(
                selectedExercise,
                addSet(store.state.exercises[selectedExercise], set)
              )
            }}
            onModifySet={(index, set) => {
              store.modifyExercise(
                selectedExercise,
                modifySet(store.state.exercises[selectedExercise], index, set)
              )
            }}
            onDeleteSet={index => {
              store.modifyExercise(
                selectedExercise,
                deleteSet(store.state.exercises[selectedExercise], index)
              )
            }}
            sets={store.state.exercises[selectedExercise].sets}
          />
        )}
      </Subscribe>
    )
  }
}
