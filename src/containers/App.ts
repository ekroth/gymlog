import { Container } from 'unstated'
import Set from '../model/Set'
import { arrayRemove, arrayUpdate } from '../util/ReadonlyArrayUtils'

type AppState = {
  sets: ReadonlyArray<Set>
}

type AppProps = {
  sets: ReadonlyArray<Set>
}

export class AppContainer extends Container<AppState> {
  constructor(
    props: AppProps = {
      sets: []
    }
  ) {
    super()
    this.state = {
      sets: props.sets
    }
  }

  public addSet = (set: Set) =>
    this.setState(state => ({ sets: [...state.sets, set] }))

  public modifySet = (index: number, set: Set) =>
    this.setState(state => ({ sets: arrayUpdate(state.sets, set, index) }))

  public deleteSet = (index: number) =>
    this.setState(state => ({ sets: arrayRemove(state.sets, index) }))
}
