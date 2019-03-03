import moment from 'moment'
import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps
} from 'react-navigation'
import { Subscribe } from 'unstated'

import { WorkoutModifierComponent } from '../components/WorkoutModifier'
import { WorkoutEntriesStore } from '../stores/WorkoutEntries'
import { ExerciseModifierNavigationParams } from './ExeciseModifier'
import { ExerciseSelectorNavigationParams } from './ExerciseSelector'

export type WorkoutModifierNavigationParams = {
  selectedWorkoutId: string
  // Convenience copy for Navigation title
  selectedWorkoutTimestamp: number
}

export class WorkoutModifierScreen extends React.Component<
  NavigationScreenProps<WorkoutModifierNavigationParams>
> {
  public static navigationOptions = (
    props: NavigationScreenProps<WorkoutModifierNavigationParams>
  ): NavigationScreenOptions => ({
    title: moment(
      moment(
        props.navigation.state.params!.selectedWorkoutTimestamp
      ).toISOString()
    ).format('hh:mm:ss')
  })

  public render() {
    const selectedWorkoutId = this.props.navigation.state.params!
      .selectedWorkoutId

    return (
      <Subscribe to={[WorkoutEntriesStore]}>
        {(store: WorkoutEntriesStore) => {
          const workout = store.workoutEntryHandler(selectedWorkoutId)

          return (
            <WorkoutModifierComponent
              onAddExercise={() => {
                const params: ExerciseSelectorNavigationParams = {
                  onSelectExercise: async exercise => {
                    await workout.addExercise(exercise)

                    const index = workout.getWorkoutEntry().exercises.length - 1
                    const paramsModifier: ExerciseModifierNavigationParams = {
                      selectedWorkoutId,
                      exercise: workout.getExerciseEntry(index).exercise,
                      selectedExercise: index
                    }

                    this.props.navigation.navigate(
                      'ExerciseModifierScreen',
                      paramsModifier
                    )
                  }
                }
                this.props.navigation.navigate('ExerciseSelectorScreen', params)
              }}
              onModifyExercise={workout.modifyExerciseEntry}
              onDeleteExercise={workout.deleteExerciseEntry}
              onSelectExercise={index => {
                const params: ExerciseModifierNavigationParams = {
                  selectedWorkoutId,
                  exercise: workout.getExerciseEntry(index).exercise,
                  selectedExercise: index
                }

                this.props.navigation.navigate('ExerciseModifierScreen', params)
              }}
              exercises={workout.getWorkoutEntry().exercises}
            />
          )
        }}
      </Subscribe>
    )
  }
}
