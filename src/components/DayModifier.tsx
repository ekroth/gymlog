import { Col, Grid, Row, Text, View } from 'native-base'
import React from 'react'
import { Button, FlatList, ListRenderItemInfo } from 'react-native'

import { Day } from '../model/Day'
import { Workout } from '../model/Workout'
import { callback1 } from '../util/Callbacks'
import { keyExtractorIndex } from '../util/FlatListUtils'
import { WorkoutModifierComponent } from './WorkoutModifier'

export type DayModifierProps = {
  onAddWorkout?: () => void
  onSelectWorkout?: (workout: Workout) => void
  day: Day
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
          <FlatList<Workout>
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
  info: ListRenderItemInfo<Workout>,
  onPress: () => void
) => (
  <Grid style={{ alignItems: 'center' }}>
    <Row>
      <Text onPress={onPress}>
        {new Date(info.item.timestamp).toLocaleTimeString()}
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
