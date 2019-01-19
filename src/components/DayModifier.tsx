import { Col, Grid, Row, Text, View } from 'native-base'
import React from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'

import { Day } from '../model/Day'
import { Workout } from '../model/Workout'
import { callback1 } from '../util/Callbacks'
import { keyExtractorIndex } from '../util/FlatListUtils'
import { WorkoutModifierComponent } from './WorkoutModifier'

export type DayModifierProps = {
  onSelectWorkout?: (index: number) => void
  day: Day
}

export const DayModifierComponent = (props: DayModifierProps) => {
  return (
    <Grid style={{ alignItems: 'center' }}>
      <Col>
        <FlatList<Workout>
          ItemSeparatorComponent={itemSeparator}
          data={props.day.workouts}
          keyExtractor={keyExtractorIndex}
          renderItem={info =>
            createExercisePreviewItem(info, () => {
              callback1(props.onSelectWorkout)(info.index)
            })
          }
        />
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
      <Text>{info.item.date.toLocaleTimeString()}</Text>
    </Row>
    <Row>
      <WorkoutModifierComponent
        exercises={info.item.exercises}
        onSelectExercise={onPress}
      />
    </Row>
  </Grid>
)
