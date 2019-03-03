import moment from 'moment'
import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps
} from 'react-navigation'
import { Subscribe } from 'unstated'

import { WorkoutCalendarComponent } from '../components/WorkoutCalendar'
import { WorkoutEntriesStore } from '../stores/WorkoutEntries'
import { DayModifierNavigationParams, DayModifierScreen } from './DayModifier'

export type WorkoutCalendarNavigationParams = {}

export class WorkoutCalendarScreen extends React.Component<
  NavigationScreenProps<WorkoutCalendarNavigationParams>
> {
  public static navigationOptions = (
    props: NavigationScreenProps<WorkoutCalendarNavigationParams>
  ): NavigationScreenOptions => ({
    title: 'Calendar'
  })

  public render() {
    return (
      <Subscribe to={[WorkoutEntriesStore]}>
        {(store: WorkoutEntriesStore) => (
          <WorkoutCalendarComponent
            onAddWorkout={async () => {
              const timestamp = new Date().getTime()
              await store.addWorkoutEntry({
                timestamp,
                exercises: []
              })

              const params: DayModifierNavigationParams = {
                date: moment(timestamp).format('YYYY-MM-DD')
              }

              this.props.navigation.navigate(DayModifierScreen.name, params)
            }}
            onSelectDay={date => {
              const params: DayModifierNavigationParams = {
                date: date.dateString
              }

              this.props.navigation.navigate(DayModifierScreen.name, params)
            }}
            days={store.getDayEntries()}
          />
        )}
      </Subscribe>
    )
  }
}
