import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps
} from 'react-navigation'
import { Subscribe } from 'unstated'

import { WorkoutModifierComponent } from '../components/WorkoutModifier'
import { WorkoutStore } from '../stores/Workout'
import { ExerciseModifierNavigationParams } from './ExeciseModifier'
import { ExerciseSelectorNavigationParams } from './ExerciseSelector'

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
          const workout = store.workoutHandler(selectedWorkout)

          return (
            <WorkoutModifierComponent
              onAddExercise={() => {
                const params: ExerciseSelectorNavigationParams = {
                  selectedWorkout,
                  onSelectExercise: async exercise => {
                    await workout.addExercise(exercise)

                    const index = workout.getWorkout().exercises.length - 1
                    const paramsModifier: ExerciseModifierNavigationParams = {
                      selectedWorkout,
                      exerciseName: workout.getExercise(index).name,
                      selectedExercise: index,
                      exerciseColor: workout.getExercise(index).color
                    }

                    this.props.navigation.navigate(
                      'ExerciseModifierScreen',
                      paramsModifier
                    )
                  }
                }
                this.props.navigation.navigate('ExerciseSelectorScreen', params)
              }}
              onModifyExercise={workout.modifyExercise}
              onDeleteExercise={workout.deleteExercise}
              onSelectExercise={index => {
                const params: ExerciseModifierNavigationParams = {
                  selectedWorkout,
                  exerciseName: workout.getExercise(index).name,
                  selectedExercise: index,
                  exerciseColor: workout.getExercise(index).color
                }

                this.props.navigation.navigate('ExerciseModifierScreen', params)
              }}
              exercises={workout.getWorkout().exercises}
            />
          )
        }}
      </Subscribe>
    )
  }
}
