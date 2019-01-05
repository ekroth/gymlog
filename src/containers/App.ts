import { Container } from 'unstated';
import Set from '../model/Set';

export interface AppState {
  current: Set;
  sets: Set[];
}

export class AppContainer extends Container<AppState> {
  state = {
    current: { weight: 0, reps: 0 },
    sets: []
  }

  addCurrent = () =>
    this.setState((state) => ({ sets: [...state.sets, state.current] }));

  modifyCurrent = (set: Set) =>
    this.setState((state) => ({ current: set }));
}