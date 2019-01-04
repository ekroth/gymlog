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
import { Provider } from 'unstated';
import ValueChooser from './src/components/value-chooser';

export default class App extends React.Component {
  render() {
    return (
      <Provider>
        <ValueChooser />
      </Provider>
    );
  }
}
