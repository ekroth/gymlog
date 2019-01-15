import React from 'react'
import { Subscribe } from 'unstated'
import { WorkoutStore } from '../stores/Workout'
import { ExerciseModifierComponent } from '../components/ExerciseModifier'
import { NavigationScreenProps } from 'react-navigation'
import { addSet } from '../model/Exercise'

export type ExerciseModifierScreenProps = {
  selectedExercise: number
}

export class ExerciseModifierScreen extends React.Component<
  NavigationScreenProps<ExerciseModifierScreenProps>
> {
  public render() {
    return (
      <Subscribe to={[WorkoutStore]}>
        {(store: WorkoutStore) => {
          // See WorkoutModifierScreen
          const selected =
            store.state.selectedExercise! ||
            this.props.navigation.state.params!.selectedExercise
          const exercise = store.state.exercises[selected]

          return (
            <ExerciseModifierComponent
              onAddSet={set => {
                store.modifyExercise(selected, addSet(exercise, set))
                return
              }}
              sets={exercise.sets}
            />
          )
        }}
      </Subscribe>
    )
  }
}
