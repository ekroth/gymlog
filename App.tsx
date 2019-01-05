import React from 'react';
import { SetHandlerComponent } from './src/components/set-handler';
import { Provider, Subscribe } from 'unstated';
import { AppContainer } from './src/containers/app-state';

export default class App extends React.Component {
  render() {
    return (
      <Provider>
        <Subscribe to={[AppContainer]}>
          {(container: AppContainer) => (
            <SetHandlerComponent
              onAddCurrent={container.addCurrent}
              onModifyCurrent={container.modifyCurrent}
              current={container.state.current}
              sets={container.state.sets}
            />
          )}
        </Subscribe>
      </Provider>
    );
  }
}
