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
            onSelectExercise={index => {
              // The subscription is not reflected in the
              // new screen, so we need to send the index
              // to the next screen as well.
              // This is not pretty?!
              store.selectExercise(index)
              this.props.navigation.navigate('ExerciseModifierScreen', {
                selectedExercise: index
              })
            }}
            exercises={store.state.exercises}
          />
        )}
      </Subscribe>
    )
  }
}
