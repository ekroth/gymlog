import React, { PureComponent } from 'react'
import { Provider, Subscribe } from 'unstated'
import { Container, Content } from 'native-base'
import { SetHandlerComponent } from './src/components/SetHandler'
import { AppContainer } from './src/containers/App'

const testState = new AppContainer({
  current: { weight: 172.5, reps: 0 },
  sets: [
    { weight: 120, reps: 50 },
    { weight: 150, reps: 1 },
    { weight: 172.5, reps: 0 }
  ]
})

export default class App extends PureComponent {
  public render() {
    return (
      <Provider inject={[testState]}>
        <Subscribe to={[AppContainer]}>
          {(container: AppContainer) => (
            <Container>
              <Content>
                <SetHandlerComponent
                  onAddCurrent={container.addCurrent}
                  onModifyCurrent={container.modifyCurrent}
                  current={container.state.current}
                  sets={container.state.sets}
                />
              </Content>
            </Container>
          )}
        </Subscribe>
      </Provider>
    )
  }
}
