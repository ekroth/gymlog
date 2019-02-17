import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps
} from 'react-navigation'
import { Subscribe } from 'unstated'

import { ExerciseModifierComponent } from '../components/ExerciseModifier'
import { Exercise } from '../model/Exercise'
import { WorkoutEntry } from '../model/WorkoutEntry'
import { WorkoutStore } from '../stores/Workout'

export type ExerciseModifierNavigationParams = {
  exercise: Exercise
  selectedExercise: number
  selectedWorkout: WorkoutEntry
}

export class ExerciseModifierScreen extends React.Component<
  NavigationScreenProps<ExerciseModifierNavigationParams>
> {
  public static navigationOptions = (
    props: NavigationScreenProps<ExerciseModifierNavigationParams>
  ): NavigationScreenOptions => ({
    title: props.navigation.state.params!.exercise.name,
    headerTintColor: props.navigation.state.params!.exercise.color
  })

  public render() {
    const selectedExercise = this.props.navigation.state.params!
      .selectedExercise
    const selectedWorkout = this.props.navigation.state.params!.selectedWorkout

    return (
      <Subscribe to={[WorkoutStore]}>
        {(store: WorkoutStore) => {
          const workout = store.workoutHandler(selectedWorkout.id!)
          const exercise = workout.exerciseHandler(selectedExercise)

          return (
            <ExerciseModifierComponent
              onAddSet={exercise.addSet}
              onModifySet={exercise.modifySet}
              onDeleteSet={exercise.deleteSet}
              sets={exercise.getExercise().sets}
            />
          )
        }}
      </Subscribe>
    )
  }
}
