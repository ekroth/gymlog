import { Grid, Row } from 'native-base'
import React from 'react'
import { Button } from 'react-native'
import { Calendar, DateCallbackHandler } from 'react-native-calendars'

import { DayEntry } from '../model/DayEntry'
import { arrayFlatten, arrayToUnnamed, arrayUnique } from '../util/ArrayUtils'

export type WorkoutCalendarProps = {
  onAddWorkout?: () => void
  onSelectDay?: DateCallbackHandler
  days: ReadonlyArray<DayEntry>
}

export const WorkoutCalendarComponent = (props: WorkoutCalendarProps) => {
  const dateEntries = props.days.map(day => {
    const exercises = arrayFlatten(day.workouts.map(w => w.exercises))
    const exerciseColors = arrayUnique(exercises.map(e => e.color))

    return {
      [day.date]: {
        dots: exerciseColors.map((c, i) => ({
          key: `${i}`,
          color: c
        }))
      }
    }
  })

  return (
    <Grid>
      {(props.onAddWorkout && (
        <Row size={0.1} style={{ alignItems: 'center' }}>
          <Button
            title={'Add Workout Today'}
            onPress={() => props.onAddWorkout!()}
          />
        </Row>
      )) ||
        null}
      <Row
        style={{
          flexDirection: 'column'
        }}
      >
        <Calendar
          markingType={'multi-dot'}
          markedDates={arrayToUnnamed(dateEntries)}
          onDayPress={props.onSelectDay}
        />
      </Row>
    </Grid>
  )
}
