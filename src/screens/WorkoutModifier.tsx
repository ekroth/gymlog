import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { Subscribe } from 'unstated'

import { WorkoutModifierComponent } from '../components/WorkoutModifier'
import { WorkoutStore } from '../stores/Workout'

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
            onSelectExercise={async index => {
              await store.selectExercise(index)
              this.props.navigation.navigate('ExerciseModifierScreen')
            }}
            exercises={store.state.exercises}
          />
        )}
      </Subscribe>
    )
  }
}
