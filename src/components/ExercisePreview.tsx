import React from 'react'
import { FlatList, ListRenderItemInfo, TouchableOpacity } from 'react-native'
import Set from '../model/Set'
import Exercise from '../model/Exercise'
import { Grid, Row, Text } from 'native-base'
import { keyExtractorIndex } from '../util/FlatListUtils'
import { SetItemComponent } from './SetItem'
import { callback0 } from '../util/Callbacks'

export type ExercisePreviewProps = {
  onPress?: () => void
  exercise: Exercise
}

export const ExercisePreviewComponent = (props: ExercisePreviewProps) => (
  <TouchableOpacity onPress={callback0(props.onPress)}>
    <Grid style={{ alignItems: 'center' }}>
      <Row size={10}>
        <Text>{props.exercise.name}</Text>
      </Row>
      <Row size={90}>
        <FlatList<Set>
          style={{ flex: 1 }}
          data={props.exercise.sets}
          keyExtractor={keyExtractorIndex}
          renderItem={info => createSetItemComponent(info, props.onPress)}
        />
      </Row>
    </Grid>
  </TouchableOpacity>
)

const createSetItemComponent = (
  info: ListRenderItemInfo<Set>,
  onPress?: () => void
) => (
  <SetItemComponent
    index={info.index}
    set={info.item}
    selected={false}
    onPress={onPress}
  />
)
