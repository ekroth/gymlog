import { Container } from 'unstated'
import Set from '../model/Set'

type AppState = {
  current: Set
  sets: Set[]
}

type AppProps = {
  current: Set
  sets: Set[]
}

export class AppContainer extends Container<AppState> {
  constructor(
    props: AppProps = {
      current: { weight: 0, reps: 0 },
      sets: []
    }
  ) {
    super()
    this.state = {
      current: props.current,
      sets: props.sets
    }
  }

  public addCurrent = () =>
    this.setState(state => ({ sets: [...state.sets, state.current] }))

  public modifyCurrent = (set: Set) =>
    this.setState(state => ({ current: set }))
}
