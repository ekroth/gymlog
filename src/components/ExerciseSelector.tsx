import { Col, Grid, Row, Text, View } from 'native-base'
import React from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'

import { Exercise } from '../model/Exercise'
import { callback1 } from '../util/Callbacks'
import { keyExtractorIndex } from '../util/FlatListUtils'

export type ExerciseSelectorProps = {
  onSelectExercise?: (exercise: Exercise) => void
  exercises: ReadonlyArray<Exercise>
}

export const ExerciseSelectorComponent = (props: ExerciseSelectorProps) => {
  return (
    <Grid style={{ alignItems: 'center' }}>
      <Col>
        <FlatList<Exercise>
          ItemSeparatorComponent={itemSeparator}
          data={props.exercises}
          keyExtractor={keyExtractorIndex}
          renderItem={info =>
            createExerciseItem(info, () => {
              callback1(props.onSelectExercise)(info.item)
            })
          }
        />
      </Col>
    </Grid>
  )
}

const itemSeparator = () => <View style={{ height: 40 }} />

const createExerciseItem = (
  info: ListRenderItemInfo<Exercise>,
  onPress: () => void
) => (
  <Grid style={{ alignItems: 'center' }}>
    <Row>
      <Text onPress={onPress}>{info.item.name}</Text>
    </Row>
  </Grid>
)
