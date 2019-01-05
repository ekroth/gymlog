import React from 'react';
import { View } from 'react-native';
import NumericInput from 'react-native-numeric-input';

export interface ValueChooserProps {
  // TODO: validate that step is an integer if type is 'integer'
  type: 'integer' | 'real';
  step: number;
  value: number;
  onChange: (value: number) => void;
}

export const ValueChooser = (props: ValueChooserProps) => (
  <View>
    <NumericInput
      valueType={props.type}
      initValue={props.value}
      onChange={props.onChange}
      minValue={0}
      step={props.step}
    />
  </View>
);