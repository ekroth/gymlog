import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { Subscribe } from 'unstated'

import { WorkoutModifierComponent } from '../components/WorkoutModifier'
import { addExercise, deleteExercise, modifyExercise } from '../model/Workout'
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
            onAddExercise={exercise =>
              store.modifyWorkout(addExercise(store.state.workout, exercise))
            }
            onModifyExercise={(index, exercise) =>
              store.modifyWorkout(
                modifyExercise(store.state.workout, index, exercise)
              )
            }
            onDeleteExercise={index =>
              store.modifyWorkout(deleteExercise(store.state.workout, index))
            }
            onSelectExercise={index => {
              const params: ExerciseModifierNavigationParams = {
                exerciseName: store.state.workout.exercises[index].name,
                selectedExercise: index,
                exerciseColor: store.state.workout.exercises[index].color
              }

              this.props.navigation.navigate('ExerciseModifierScreen', params)
            }}
            exercises={store.state.workout.exercises}
          />
        )}
      </Subscribe>
    )
  }
}
