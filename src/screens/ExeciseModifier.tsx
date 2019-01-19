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
  selectedWorkout: number
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
    const selectedWorkout = this.props.navigation.state.params!.selectedWorkout

    return (
      <Subscribe to={[WorkoutStore]}>
        {(store: WorkoutStore) => {
          const workout = store.state.workouts[selectedWorkout]
          const exercise = workout.exercises[selectedExercise]

          return (
            <ExerciseModifierComponent
              onAddSet={set => {
                store.modifyWorkout(
                  modifyExercise(
                    workout,
                    selectedExercise,
                    addSet(exercise, set)
                  ),
                  selectedWorkout
                )
              }}
              onModifySet={(index, set) => {
                store.modifyWorkout(
                  modifyExercise(
                    workout,
                    selectedExercise,
                    modifySet(exercise, index, set)
                  ),
                  selectedWorkout
                )
              }}
              onDeleteSet={index => {
                store.modifyWorkout(
                  modifyExercise(
                    workout,
                    selectedExercise,
                    deleteSet(exercise, index)
                  ),
                  selectedWorkout
                )
              }}
              sets={exercise.sets}
            />
          )
        }}
      </Subscribe>
    )
  }
}
