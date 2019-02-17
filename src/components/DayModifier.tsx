import moment from 'moment'
import { Col, Grid, Row, Text, View } from 'native-base'
import React from 'react'
import { Button, FlatList, ListRenderItemInfo } from 'react-native'

import { DayEntry } from '../model/DayEntry'
import { WorkoutEntry } from '../model/WorkoutEntry'
import { callback1 } from '../util/Callbacks'
import { keyExtractorIndex } from '../util/FlatListUtils'
import { WorkoutModifierComponent } from './WorkoutModifier'

export type DayModifierProps = {
  onAddWorkout?: () => void
  onSelectWorkout?: (workout: WorkoutEntry) => void
  day: DayEntry
}

export const DayModifierComponent = (props: DayModifierProps) => {
  return (
    <Grid style={{ alignItems: 'center' }}>
      <Col>
        {(props.onAddWorkout && (
          <Row size={0.1} style={{ alignItems: 'center' }}>
            <Button
              title={'Add Workout'}
              onPress={() => props.onAddWorkout!()}
            />
          </Row>
        )) ||
          null}
        <Row>
          <FlatList<WorkoutEntry>
            ItemSeparatorComponent={itemSeparator}
            data={props.day.workouts}
            keyExtractor={keyExtractorIndex}
            renderItem={info =>
              createExercisePreviewItem(info, () => {
                callback1(props.onSelectWorkout)(props.day.workouts[info.index])
              })
            }
          />
        </Row>
      </Col>
    </Grid>
  )
}

const itemSeparator = () => <View style={{ height: 40 }} />

const createExercisePreviewItem = (
  info: ListRenderItemInfo<WorkoutEntry>,
  onPress: () => void
) => (
  <Grid style={{ alignItems: 'center' }}>
    <Row>
      <Text onPress={onPress}>
        {moment(info.item.timestamp).format('hh:mm:ss')}
      </Text>
    </Row>
    <Row>
      <WorkoutModifierComponent
        exercises={info.item.exercises}
        onSelectExercise={onPress}
      />
    </Row>
  </Grid>
)
