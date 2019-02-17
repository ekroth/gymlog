import moment from 'moment'
import React from 'react'
import {
  NavigationScreenOptions,
  NavigationScreenProps
} from 'react-navigation'
import { Subscribe } from 'unstated'

import { WorkoutCalendarComponent } from '../components/WorkoutCalendar'
import { WorkoutStore } from '../stores/Workout'
import { DayModifierNavigationParams } from './DayModifier'

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
      <Subscribe to={[WorkoutStore]}>
        {(store: WorkoutStore) => (
          <WorkoutCalendarComponent
            onAddWorkout={async () => {
              const timestamp = new Date().getTime()
              await store.addWorkout({
                timestamp,
                exercises: []
              })

              const params: DayModifierNavigationParams = {
                date: moment(timestamp).format('YYYY-MM-DD')
              }

              this.props.navigation.navigate('DayModifierScreen', params)
            }}
            onSelectDay={date => {
              const params: DayModifierNavigationParams = {
                date: date.dateString
              }

              this.props.navigation.navigate('DayModifierScreen', params)
            }}
            days={store.getDays()}
          />
        )}
      </Subscribe>
    )
  }
}
