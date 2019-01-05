/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import React from 'react';
import { Text, View, Button } from 'react-native';
import Unstated, { Provider, Subscribe } from 'unstated';
import ValueChooser from './src/components/value-chooser';
import { ValueChooserState, ValueChooserContainer } from './src/containers/value-chooser';

/*
interface SetRecorderState {
  weight: ValueChooserState,
  reps: ValueChooserState
}

class SetRecorderContainer extends Unstated.Container<SetRecorderState> {
  state = {
    weight: { value: 0 },
    reps: { value: 0 }
  }
}*/



class SetRecorderComponent extends React.Component {
  render() {
    const weight = new ValueChooserContainer();
    const reps = new ValueChooserContainer();

    return (
      <Provider>
      <Subscribe to={[weight, reps]}>
        {(weight: ValueChooserContainer, reps: ValueChooserContainer) => (
          <View style={{ padding: 100 }}>
            <Text>{weight.state.value} kg and {reps.state.value} reps</Text>
            <Text>Weight (kgs)</Text>
            <Provider inject={[weight]}>
              <ValueChooser type='real' step={2.5} />
            </Provider>
            <Text>Reps</Text>
            <Provider inject={[reps]}>
              <ValueChooser type='integer' step={1} />
            </Provider>
          </View>
        )
        }
      </Subscribe>
      </Provider>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
     <SetRecorderComponent/>
    );
  }
}
