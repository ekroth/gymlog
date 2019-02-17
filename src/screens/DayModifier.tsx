import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps
} from 'react-navigation'
import { Subscribe } from 'unstated'

import { DayModifierComponent } from '../components/DayModifier'
import { WorkoutStore } from '../stores/Workout'
import { WorkoutModifierNavigationParams } from './WorkoutModifier'

export type DayModifierNavigationParams = {
  date: Date
}

export class DayModifierScreen extends React.Component<
  NavigationScreenProps<DayModifierNavigationParams>
> {
  public static navigationOptions = (
    props: NavigationScreenProps<DayModifierNavigationParams>
  ): NavigationScreenOptions => ({
    title: props.navigation.state.params!.date.toLocaleDateString()
  })

  public render() {
    const date = this.props.navigation.state.params!.date

    return (
      <Subscribe to={[WorkoutStore]}>
        {(store: WorkoutStore) => (
          <DayModifierComponent
            onAddWorkout={undefined} // TODO: must supply time?
            day={store.getDay(date)}
            onSelectWorkout={workout => {
              const params: WorkoutModifierNavigationParams = {
                date: new Date(workout.timestamp),
                selectedWorkout: workout
              }

              return this.props.navigation.navigate(
                'WorkoutModifierScreen',
                params
              )
            }}
          />
        )}
      </Subscribe>
    )
  }
}
