import React from 'react';
import { View } from 'react-native';
import { Subscribe } from 'unstated';
import NumericInput from 'react-native-numeric-input';
import ValueChooserContainer from '../containers/value-chooser';

interface ValueChooserProps {
  // TODO: validate that step is an integer if type is 'integer'
  type: 'integer' | 'real';
  step: number;
}

class ValueChooser extends React.Component<ValueChooserProps> {
  render() {
    return (
      <Subscribe to={[ValueChooserContainer]}>
        {(chooser: ValueChooserContainer) => (
          <View>
            <NumericInput
              valueType={this.props.type}
              initValue={chooser.state.value}
              onChange={(value: number) => chooser.setValue(value)}
              minValue={0}
              step={this.props.step}
            />
          </View>
        )}
      </Subscribe>
    );
  }
}

export default ValueChooser;