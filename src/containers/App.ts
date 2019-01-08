import { Container } from 'unstated'
import Set from '../model/Set'

type AppState = {
  sets: Set[]
}

type AppProps = {
  sets: Set[]
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
      sets: Object.assign([...state.sets, { [index]: set }])
    }))

  public deleteSet = (index: number) => {
    return
  }
}
