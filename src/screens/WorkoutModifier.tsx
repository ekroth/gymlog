import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { Subscribe } from 'unstated'

import { WorkoutModifierComponent } from '../components/WorkoutModifier'
import { WorkoutStore } from '../stores/Workout'
import { ExerciseModifierNavigationParams } from './ExeciseModifier'

export class WorkoutModifierScreen extends React.Component<
  NavigationScreenProps
> {
  public render() {
    return (
      <Subscribe to={[WorkoutStore]}>
        {(store: WorkoutStore) => (
          <WorkoutModifierComponent
            onAddExercise={store.addExercise}
            onModifyExercise={store.modifyExercise}
            onDeleteExercise={store.deleteExercise}
            onSelectExercise={index => {
              const params: ExerciseModifierNavigationParams = {
                exerciseName: store.state.exercises[index].name,
                selectedExercise: index,
                exerciseColor: store.state.exercises[index].color
              }

              this.props.navigation.navigate('ExerciseModifierScreen', params)
            }}
            exercises={store.state.exercises}
          />
        )}
      </Subscribe>
    )
  }
}
