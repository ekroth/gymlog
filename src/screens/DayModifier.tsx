import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps
} from 'react-navigation'
import { Subscribe } from 'unstated'

import { DayModifierComponent } from '../components/DayModifier'
import { WorkoutEntriesStore } from '../stores/WorkoutEntries'
import { WorkoutModifierNavigationParams } from './WorkoutModifier'

export type DayModifierNavigationParams = {
  date: string
}

export class DayModifierScreen extends React.Component<
  NavigationScreenProps<DayModifierNavigationParams>
> {
  public static navigationOptions = (
    props: NavigationScreenProps<DayModifierNavigationParams>
  ): NavigationScreenOptions => ({
    title: props.navigation.state.params!.date
  })

  public render() {
    const date = this.props.navigation.state.params!.date

    return (
      <Subscribe to={[WorkoutEntriesStore]}>
        {(store: WorkoutEntriesStore) => (
          <DayModifierComponent
            onAddWorkout={undefined} // TODO: must supply time?
            day={store.getDayEntry(date)}
            onSelectWorkout={workout => {
              const params: WorkoutModifierNavigationParams = {
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
