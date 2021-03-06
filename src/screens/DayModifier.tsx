import { WorkoutEntry } from 'model/WorkoutEntry'
import moment from 'moment'
import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps
} from 'react-navigation'
import { Subscribe } from 'unstated'

import { DayModifierComponent } from '../components/DayModifier'
import { WorkoutEntriesStore } from '../stores/WorkoutEntries'
import {
  WorkoutModifierNavigationParams,
  WorkoutModifierScreen
} from './WorkoutModifier'

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
            onAddWorkout={async () => {
              const insertedWorkout: WorkoutEntry = {
                timestamp: moment(date).valueOf(),
                exercises: []
              }

              const workoutId = await store.addWorkoutEntry(insertedWorkout)
              const params: WorkoutModifierNavigationParams = {
                selectedWorkoutId: workoutId,
                selectedWorkoutTimestamp: insertedWorkout.timestamp
              }

              return this.props.navigation.navigate(
                WorkoutModifierScreen.name,
                params
              )
            }}
            day={store.getDayEntry(date)}
            onSelectWorkout={workout => {
              const params: WorkoutModifierNavigationParams = {
                selectedWorkoutId: workout.id!,
                selectedWorkoutTimestamp: workout.timestamp
              }

              return this.props.navigation.navigate(
                WorkoutModifierScreen.name,
                params
              )
            }}
          />
        )}
      </Subscribe>
    )
  }
}
