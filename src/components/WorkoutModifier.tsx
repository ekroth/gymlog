import { Grid, Row, View } from 'native-base'
import React from 'react'
import { Button, FlatList, ListRenderItemInfo } from 'react-native'

import { Exercise } from '../model/Exercise'
import { callback1 } from '../util/Callbacks'
import { keyExtractorIndex } from '../util/FlatListUtils'
import { ExercisePreviewComponent } from './ExercisePreview'

export type WorkoutModifierProps = {
  onAddExercise?: () => void
  onModifyExercise?: (index: number, exercise: Exercise) => void
  onDeleteExercise?: (index: number) => void
  onSelectExercise?: (index: number) => void
  exercises: ReadonlyArray<Exercise>
}

export const WorkoutModifierComponent = (props: WorkoutModifierProps) => {
  return (
    <Grid>
      {(props.onAddExercise && (
        <Row size={0.1} style={{ alignItems: 'center' }}>
          <Button
            title={'Add Exercise'}
            onPress={() => props.onAddExercise!()}
          />
        </Row>
      )) ||
        null}
      <Row
        style={{
          flexDirection: 'column'
        }}
      >
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
      </Row>
    </Grid>
  )
}

const itemSeparator = () => <View style={{ height: 10 }} />

const createExercisePreviewItem = (
  info: ListRenderItemInfo<Exercise>,
  onPress: () => void
) => <ExercisePreviewComponent exercise={info.item} onPress={onPress} />
