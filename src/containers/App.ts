import { Container } from 'unstated'
import Set from '../model/Set'

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
    this.setState(state => ({
      sets: state.sets.map((s, i) => (i === index ? set : s))
    }))

  public deleteSet = (index: number) =>
    this.setState(state => ({
      sets: state.sets.filter((_, i) => i !== index)
    }))
}
