import { Container } from 'unstated';

export interface Set {
    weight: number;
    reps: number;
  }
  
export interface SetHandlerState {
  sets: Set[];
}

export class SetHandlerContainer extends Container<SetHandlerState> {
  state = {
    sets: []
  }

  addSet = (weight: number, reps: number) =>
    this.setState((state) => ({sets: [...this.state.sets, {weight, reps}]}));
}