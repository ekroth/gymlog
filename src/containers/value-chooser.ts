import { Container } from 'unstated';

interface ValueChooserState {
  value: number
  step: number
}

class ValueChooserContainer extends Container<ValueChooserState> {
  state = {
    value: 0,
    step: 2.5
  };

  setValue = (v: number) => {
    this.setState({ value: v });
  }

  setStep = (d: number) => {
    this.setState({ step: d });
  }
}

export default ValueChooserContainer;