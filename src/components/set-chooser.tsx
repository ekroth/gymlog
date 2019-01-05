import React from 'react';
import { Text, View } from 'react-native';
import { Provider, Subscribe } from 'unstated';
import { SetChooserContainer } from '../containers/set-chooser';
import { ValueChooser } from '../components/value-chooser';

export class SetChooserComponent extends React.Component {
  render() {
    return (
      <Provider>
        <Subscribe to={[SetChooserContainer]}>
          {(container: SetChooserContainer) => (
            <View style={{ padding: 100 }}>
              <Text>{container.state.weight} kg and {container.state.reps} reps</Text>
              <Text>Weight (kgs)</Text>
              <ValueChooser type='real' step={2.5} value={container.state.weight} onChange={container.setWeight} />
              <Text>Reps</Text>
              <ValueChooser type='integer' step={1} value={container.state.reps} onChange={container.setReps} />
            </View>
          )}
        </Subscribe>
      </Provider>
    );
  }
}