import React from 'react';
import { SetHandlerComponent } from './src/components/set-handler';
import { Provider } from 'unstated';

export default class App extends React.Component {
  render() {
    return (
      <Provider>
      <SetHandlerComponent />
      </Provider>
    );
  }
}
