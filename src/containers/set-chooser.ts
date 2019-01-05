import { Container } from 'unstated';

export interface SetChooserState {
  weight: number,
  reps: number
}

export class SetChooserContainer extends Container<SetChooserState> {
  state = {
    weight: 0,
    reps: 0
  }

  setWeight = (v: number) => this.setState({ weight: v });
  setReps = (v: number) => this.setState({ reps: v });
}