import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps
} from 'react-navigation'
import { Subscribe } from 'unstated'

import { WorkoutModifierComponent } from '../components/WorkoutModifier'
import { addExercise, deleteExercise, modifyExercise } from '../model/Workout'
import { WorkoutStore } from '../stores/Workout'
import { ExerciseModifierNavigationParams } from './ExeciseModifier'

export type WorkoutModifierNavigationParams = {
  // Convenience copy for React Navigation Header
  date: Date
  selectedWorkout: number
}

export class WorkoutModifierScreen extends React.Component<
  NavigationScreenProps<WorkoutModifierNavigationParams>
> {
  public static navigationOptions = (
    props: NavigationScreenProps<WorkoutModifierNavigationParams>
  ): NavigationScreenOptions => ({
    title: props.navigation.state.params!.date.toLocaleString()
  })

  public render() {
    const selectedWorkout = this.props.navigation.state.params!.selectedWorkout

    return (
      <Subscribe to={[WorkoutStore]}>
        {(store: WorkoutStore) => {
          const workout = store.state.workouts[selectedWorkout]

          return (
            <WorkoutModifierComponent
              onAddExercise={exercise =>
                store.modifyWorkout(
                  addExercise(workout, exercise),
                  selectedWorkout
                )
              }
              onModifyExercise={(index, exercise) =>
                store.modifyWorkout(
                  modifyExercise(workout, index, exercise),
                  selectedWorkout
                )
              }
              onDeleteExercise={index =>
                store.modifyWorkout(
                  deleteExercise(workout, index),
                  selectedWorkout
                )
              }
              onSelectExercise={index => {
                const params: ExerciseModifierNavigationParams = {
                  selectedWorkout,
                  exerciseName: workout.exercises[index].name,
                  selectedExercise: index,
                  exerciseColor: workout.exercises[index].color
                }

                this.props.navigation.navigate('ExerciseModifierScreen', params)
              }}
              exercises={workout.exercises}
            />
          )
        }}
      </Subscribe>
    )
  }
}
