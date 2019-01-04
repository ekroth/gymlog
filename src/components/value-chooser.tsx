import React from 'react';
import { View } from 'react-native';
import { Container, Subscribe } from 'unstated';
import NumericInput from 'react-native-numeric-input';

interface ValueChooserState {
  value: number
  step: number
}

class ValueChooserContainer extends Container<ValueChooserState> {
  state = {
    value: 0,
    step: 2.5
  };

  setValue = (v: number) => {
    this.setState({ value: v });
  }

  setStep = (d: number) => {
    this.setState({ step: d });
  }
}

function ValueChooser() {
  return (
    <Subscribe to={[ValueChooserContainer]}>
      {(chooser: ValueChooserContainer) => (
        <View style={{ padding: 100 }}>
          <NumericInput
            valueType={'real'}
            initValue={chooser.state.value}
            onChange={(value: number) => chooser.setValue(value)}
            minValue={0}
            step={chooser.state.step}
          />
        </View>
      )}
    </Subscribe>
  );
}

export default ValueChooser;