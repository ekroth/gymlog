import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps
} from 'react-navigation'
import { Subscribe } from 'unstated'

import { ExerciseSelectorComponent } from '../components/ExerciseSelector'
import { ExerciseCatalogStore } from '../stores/ExerciseCatalog'
import { WorkoutStore } from '../stores/Workout'

export type ExerciseSelectorNavigationParams = {
  selectedWorkout: number
}

export class ExerciseSelectorScreen extends React.Component<
  NavigationScreenProps<ExerciseSelectorNavigationParams>
> {
  public static navigationOptions = (
    props: NavigationScreenProps<ExerciseSelectorNavigationParams>
  ): NavigationScreenOptions => ({
    title: 'Select Exercise'
  })

  public render() {
    const selectedWorkout = this.props.navigation.state.params!.selectedWorkout

    return (
      <Subscribe to={[WorkoutStore, ExerciseCatalogStore]}>
        {(
          workoutStore: WorkoutStore,
          exerciseCatalogStore: ExerciseCatalogStore
        ) => {
          const workout = workoutStore.workoutHandler(selectedWorkout)

          return (
            <ExerciseSelectorComponent
              onSelectExercise={exercise => {
                workout.addExercise(exercise)
                this.props.navigation.goBack()
              }}
              exercises={exerciseCatalogStore.state.exercises}
            />
          )
        }}
      </Subscribe>
    )
  }
}
