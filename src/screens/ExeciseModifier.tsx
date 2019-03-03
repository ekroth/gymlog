import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps
} from 'react-navigation'
import { Subscribe } from 'unstated'

import { ExerciseModifierComponent } from '../components/ExerciseModifier'
import { Exercise } from '../model/Exercise'
import { WorkoutEntriesStore } from '../stores/WorkoutEntries'

export type ExerciseModifierNavigationParams = {
  exercise: Exercise
  selectedExercise: number
  selectedWorkoutId: string
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
    const selectedWorkoutId = this.props.navigation.state.params!
      .selectedWorkoutId

    return (
      <Subscribe to={[WorkoutEntriesStore]}>
        {(store: WorkoutEntriesStore) => {
          const workout = store.workoutEntryHandler(selectedWorkoutId)
          const exercise = workout.exerciseEntryHandler(selectedExercise)

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
