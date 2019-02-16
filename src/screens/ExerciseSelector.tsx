import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps
} from 'react-navigation'
import { Subscribe } from 'unstated'

import { ExerciseSelectorComponent } from '../components/ExerciseSelector'
import { ExerciseCatalogStore } from '../stores/ExerciseCatalog'
import { callback1 } from '../util/Callbacks'

export type ExerciseSelectorNavigationParams = {
  onSelectExercise?: (exercise: string) => void
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
    const onSelectExercise = this.props.navigation.state.params!
      .onSelectExercise

    return (
      <Subscribe to={[ExerciseCatalogStore]}>
        {(exerciseCatalogStore: ExerciseCatalogStore) => {
          return (
            <ExerciseSelectorComponent
              onSelectExercise={exercise => {
                this.props.navigation.goBack()
                callback1(onSelectExercise)(exercise)
              }}
              exercises={exerciseCatalogStore.state.exercises}
            />
          )
        }}
      </Subscribe>
    )
  }
}
