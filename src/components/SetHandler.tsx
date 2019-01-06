import React from 'react'
import { FlatList, Text, View } from 'react-native'
import Set from '../model/Set'
import { SetChooserComponent } from './SetChooser'

type SetHandlerProps = {
  onAddCurrent: () => void
  onModifyCurrent: (set: Set) => void

  current: Set
  sets: Set[]
}

type SetItemProps = {
  index: number
  set: Set
}

const SetItemComponent = ({ index, set }: SetItemProps) => (
  <View
    style={{
      alignItems: 'stretch',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center'
    }}
  >
    <Text style={{ flex: 1, flexDirection: 'row', fontSize: 30 }}>
      {index + 1}
    </Text>
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Text style={{ fontSize: 25 }}>{set.weight}</Text>
      <Text
        style={{
          alignSelf: 'center',
          color: '#A9A9A9',
          fontSize: 10,
          marginLeft: 5
        }}
      >
        kgs
      </Text>
    </View>
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Text style={{ fontSize: 25 }}>{set.reps}</Text>
      <Text
        style={{
          alignSelf: 'center',
          color: '#A9A9A9',
          fontSize: 10,

          marginLeft: 5
        }}
      >
        reps
      </Text>
    </View>
  </View>
)

export const SetHandlerComponent = (props: SetHandlerProps) => (
  <View
    style={{
      alignItems: 'stretch',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center'
    }}
  >
    <SetChooserComponent
      onSetReps={reps =>
        props.onModifyCurrent({ reps, weight: props.current.weight })
      }
      onSetWeight={weight =>
        props.onModifyCurrent({ weight, reps: props.current.reps })
      }
      onSave={props.onAddCurrent}
      initWeight={props.current.weight}
      initReps={props.current.reps}
    />
    <FlatList<Set>
      data={props.sets}
      keyExtractor={(_, index) => `${index}`}
      renderItem={({ item, index }) => (
        <SetItemComponent index={index} set={item} />
      )}
    />
  </View>
)
