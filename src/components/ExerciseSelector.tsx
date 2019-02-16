import { Col, Grid, Row, Text, View } from 'native-base'
import React from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'

import { callback1 } from '../util/Callbacks'
import { keyExtractorIndex } from '../util/FlatListUtils'

export type ExerciseSelectorProps = {
  onSelectExercise?: (exercise: string) => void
  exercises: ReadonlyArray<string>
}

export const ExerciseSelectorComponent = (props: ExerciseSelectorProps) => {
  return (
    <Grid style={{ alignItems: 'center' }}>
      <Col>
        <FlatList<string>
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
  info: ListRenderItemInfo<string>,
  onPress: () => void
) => (
  <Grid style={{ alignItems: 'center' }}>
    <Row>
      <Text onPress={onPress}>{info.item}</Text>
    </Row>
  </Grid>
)
