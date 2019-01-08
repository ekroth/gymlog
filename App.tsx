import React, { PureComponent } from 'react'
import { Provider, Subscribe } from 'unstated'
import { Container, Content, Grid, Header, Text, Left } from 'native-base'
import { SetHandlerComponent } from './src/components/SetHandler'
import { AppContainer } from './src/containers/App'

const testState = new AppContainer({
  sets: [
    { weight: 120, reps: 50 },
    { weight: 150, reps: 1 },
    { weight: 177.5, reps: 0 }
  ]
})

export default class App extends PureComponent {
  public render() {
    return (
      <Provider inject={[testState]}>
        <Subscribe to={[AppContainer]}>
          {(container: AppContainer) => (
            <Container>
              <Header>
                <Text style={{ alignSelf: 'center' }}>Add Sets</Text>
              </Header>
              <SetHandlerComponent
                onAddSet={container.addSet}
                onModifySet={container.modifySet}
                onDeleteSet={container.deleteSet}
                sets={container.state.sets}
                initSet={container.state.sets[container.state.sets.length - 1]}
              />
            </Container>
          )}
        </Subscribe>
      </Provider>
    )
  }
}
