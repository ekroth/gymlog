import React from 'react'
import { Subscribe } from 'unstated'
import { WorkoutStore } from '../stores/Workout'
import { ExerciseModifierComponent } from '../components/ExerciseModifier'
import { addSet, modifySet, deleteSet } from '../model/Exercise'

export class ExerciseModifierScreenContainer extends React.Component {
  public render() {
    return (
      <Subscribe to={[WorkoutStore]}>
        {(store: WorkoutStore) => <ExerciseModifierScreen store={store} />}
      </Subscribe>
    )
  }
}

type ExerciseModifierScreenProps = {
  store: WorkoutStore
}

class ExerciseModifierScreen extends React.Component<
  ExerciseModifierScreenProps
> {
  public render() {
    const store = this.props.store
    const selected = store.state.selectedExercise
    const exercise = store.state.exercises[selected]

    return (
      <ExerciseModifierComponent
        onAddSet={set => {
          store.modifyExercise(selected, addSet(exercise, set))
        }}
        onModifySet={(index, set) => {
          store.modifyExercise(selected, modifySet(exercise, index, set))
        }}
        onDeleteSet={index => {
          store.modifyExercise(selected, deleteSet(exercise, index))
        }}
        sets={exercise.sets}
      />
    )
  }
}
