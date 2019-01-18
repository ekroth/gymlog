import React from 'react'
import { Subscribe } from 'unstated'
import { WorkoutStore } from '../stores/Workout'
import { WorkoutModifierComponent } from '../components/WorkoutModifier'
import { NavigationScreenProps } from 'react-navigation'

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
