import { ExercisePreviewComponent } from './ExercisePreview'
import Exercise, { modifySet } from '../model/Exercise'
import React from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'
import { keyExtractorIndex } from '../util/FlatListUtils'
import { callback2 } from '../util/Callbacks'
import { Grid, Col, View } from 'native-base'
import {
  createStackNavigator,
  createAppContainer,
  NavigationScreenProps,
  NavigationScreenComponent
} from 'react-navigation'
import {
  ExerciseModifierComponent,
  ExerciseModifierProps
} from './ExerciseModifier'

export type WorkoutModifierProps = {
  onAddExercise?: (name: string) => void
  onModifyExercise?: (index: number, exercise: Exercise) => void
  onDeleteExercise?: (index: number) => void
  exercises: ReadonlyArray<Exercise>
}

export const WorkoutModifierScreenComponent = (
  props: NavigationScreenProps<WorkoutModifierProps>
) => {
  const navProps = props.navigation.state.params
  if (navProps === undefined) {
    throw new Error('No parameters passed to screen.')
  }

  return (
    <Grid>
      <Col>
        <FlatList<Exercise>
          ItemSeparatorComponent={itemSeparator}
          data={navProps.exercises}
          keyExtractor={keyExtractorIndex}
          renderItem={info =>
            createExercisePreviewItem(info, () => {
              const params: ExerciseModifierProps = {
                onModifySet: (index, set) =>
                  callback2(navProps.onModifyExercise)(
                    info.index,
                    modifySet(info.item, index, set)
                  ),
                sets: info.item.sets
              }
              props.navigation.navigate(
                'ExerciseModifierScreenComponent',
                params
              )
            })
          }
        />
      </Col>
    </Grid>
  )
}

const itemSeparator = () => <View style={{ height: 10 }} />

const ExerciseModifierScreenComponent: NavigationScreenComponent<
  ExerciseModifierProps
> = props => {
  const navProps = props.navigation.state.params
  if (navProps === undefined) {
    throw new Error('No parameters passed to screen.')
  }

  return <ExerciseModifierComponent {...navProps} />
}

const createExercisePreviewItem = (
  info: ListRenderItemInfo<Exercise>,
  onPress: () => void
) => <ExercisePreviewComponent exercise={info.item} onPress={onPress} />

export const WorkoutNavigator = (props: WorkoutModifierProps) =>
  createAppContainer(
    createStackNavigator(
      {
        ExerciseModifierScreenComponent,
        WorkoutModifierScreenComponent
      },
      {
        initialRouteName: 'WorkoutModifierScreenComponent',
        initialRouteParams: props
      }
    )
  )
