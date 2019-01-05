import React from 'react';
import { View } from 'react-native';
import { Subscribe } from 'unstated';
import NumericInput from 'react-native-numeric-input';
import ValueChooserContainer from '../containers/value-chooser';

class ValueChooser extends React.Component {
  render() {
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
}

export default ValueChooser;