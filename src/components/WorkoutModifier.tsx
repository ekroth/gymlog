import { Col, Grid, View } from 'native-base'
import React from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'

import { Exercise } from '../model/Exercise'
import { callback1 } from '../util/Callbacks'
import { keyExtractorIndex } from '../util/FlatListUtils'
import { ExercisePreviewComponent } from './ExercisePreview'

export type WorkoutModifierProps = {
  onAddExercise?: (name: string) => void
  onModifyExercise?: (index: number, exercise: Exercise) => void
  onDeleteExercise?: (index: number) => void
  onSelectExercise?: (index: number) => void
  exercises: ReadonlyArray<Exercise>
}

export const WorkoutModifierComponent = (props: WorkoutModifierProps) => {
  return (
    <Grid>
      <Col>
        <FlatList<Exercise>
          ItemSeparatorComponent={itemSeparator}
          data={props.exercises}
          keyExtractor={keyExtractorIndex}
          renderItem={info =>
            createExercisePreviewItem(info, () => {
              callback1(props.onSelectExercise)(info.index)
            })
          }
        />
      </Col>
    </Grid>
  )
}

const itemSeparator = () => <View style={{ height: 10 }} />

const createExercisePreviewItem = (
  info: ListRenderItemInfo<Exercise>,
  onPress: () => void
) => <ExercisePreviewComponent exercise={info.item} onPress={onPress} />
