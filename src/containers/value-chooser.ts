import { Container } from 'unstated';

export interface ValueChooserState {
  value: number
}

export class ValueChooserContainer extends Container<ValueChooserState> {
  state = {
    value: 0
  };

  setValue = (v: number) => {
    this.setState({ value: v });
  }
}

export default ValueChooserContainer;