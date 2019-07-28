import { Col, Grid, Row, View } from 'native-base'
import React from 'react'
import { Button, FlatList, ListRenderItemInfo } from 'react-native'

import { ExerciseEntry } from '../model/ExerciseEntry'
import { callback1 } from '../util/Callbacks'
import { keyExtractorIndex } from '../util/FlatListUtils'
import { ExercisePreviewComponent } from './ExercisePreview'

export type WorkoutModifierProps = {
  onAddExercise?: () => void
  onModifyExercise?: (index: number, exercise: ExerciseEntry) => void
  onDeleteExercise?: (index: number) => void
  onSelectExercise?: (index: number) => void
  onAddWorkout?: () => void
  exercises: ReadonlyArray<ExerciseEntry>
}

export const WorkoutModifierComponent = (props: WorkoutModifierProps) => {
  return (
    <Grid>
      {((props.onAddExercise || props.onAddWorkout) &&
        newWorkoutOrExercise(props)) ||
        null}
      <Row
        style={{
          flexDirection: 'column'
        }}
      >
        <FlatList<ExerciseEntry>
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

const newWorkoutOrExercise = (props: WorkoutModifierProps) => (
  <Row size={0.1}>
    {(props.onAddExercise && (
      <Col style={{ alignItems: 'center' }}>
        <Button title={'Add Exercise'} onPress={() => props.onAddExercise!()} />
      </Col>
    )) ||
      null}
    {(props.onAddWorkout && (
      <Col style={{ alignItems: 'center' }}>
        <Button title={'New Workout'} onPress={() => props.onAddWorkout!()} />
      </Col>
    )) ||
      null}
  </Row>
)

const itemSeparator = () => <View style={{ height: 10 }} />

const createExercisePreviewItem = (
  info: ListRenderItemInfo<ExerciseEntry>,
  onPress: () => void
) => <ExercisePreviewComponent exercise={info.item} onPress={onPress} />
