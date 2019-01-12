import { ExercisePreviewComponent } from './ExercisePreview'
import Exercise from 'model/Exercise'
import React from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'
import { keyExtractorIndex } from '../util/FlatListUtils'
import { Grid, Col, View } from 'native-base'

export type WorkoutModifierProps = {
  exercises: ReadonlyArray<Exercise>
}

export const WorkoutModifierComponent = (props: WorkoutModifierProps) => (
  <Grid>
    <Col>
      <FlatList<Exercise>
        ItemSeparatorComponent={itemSeparator}
        data={props.exercises}
        keyExtractor={keyExtractorIndex}
        renderItem={createExercisePreviewItem}
      />
    </Col>
  </Grid>
)

const itemSeparator = () => <View style={{ height: 10 }} />

const createExercisePreviewItem = (info: ListRenderItemInfo<Exercise>) => (
  <ExercisePreviewComponent exercise={info.item} />
)
