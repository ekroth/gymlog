import React from 'react'
import { Button, Text, View } from 'react-native'
import NumericInput from 'react-native-numeric-input'

type SetChooserProps = {
  onSetWeight: (weight: number) => void
  onSetReps: (weight: number) => void
  onSave: () => void

  initWeight: number
  initReps: number
}

export const SetChooserComponent = (props: SetChooserProps) => (
  <View style={{}}>
    <Text>Weight (kgs)</Text>
    <NumericInput
      valueType={'real'}
      initValue={props.initWeight}
      onChange={props.onSetWeight}
      minValue={0}
      step={2.5}
    />
    <Text>Reps</Text>
    <NumericInput
      valueType={'integer'}
      initValue={props.initReps}
      onChange={props.onSetReps}
      minValue={0}
      step={1}
    />
    <Button title={'Add'} onPress={props.onSave} />
  </View>
)
