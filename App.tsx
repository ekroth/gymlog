import React, { PureComponent } from 'react'
import { Provider, Subscribe } from 'unstated'
import { Container, Content, Grid, Header, Text, Left } from 'native-base'
import { SetHandlerComponent } from './src/components/SetHandler'
import { AppContainer } from './src/containers/App'

const testState = new AppContainer({
  current: { weight: 172.5, reps: 0 },
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
                onAddCurrent={container.addCurrent}
                onModifyCurrent={container.modifyCurrent}
                current={container.state.current}
                sets={container.state.sets}
              />
            </Container>
          )}
        </Subscribe>
      </Provider>
    )
  }
}
