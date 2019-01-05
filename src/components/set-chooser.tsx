import React from 'react';
import { Text, View, Button } from 'react-native';
import { Subscribe } from 'unstated';
import { SetChooserContainer, SetChooserState } from '../containers/set-chooser';
import NumericInput from 'react-native-numeric-input';

export interface SetChooserProps {
    onSet: () => void;
}

export const SetChooserComponent = (props: SetChooserProps) => (
    <Subscribe to={[SetChooserContainer]}>
        {(container: SetChooserContainer) => (
            <View style={{ padding: 100 }}>
                <Text>{container.state.weight} kg and {container.state.reps} reps</Text>
                <Text>Weight (kgs)</Text>
                <NumericInput
                    valueType='real'
                    initValue={container.state.weight}
                    onChange={container.setWeight}
                    minValue={0}
                    step={2.5}
                />
                <Text>Reps</Text>
                <NumericInput
                    valueType='integer'
                    initValue={container.state.reps}
                    onChange={container.setReps}
                    minValue={0}
                    step={1}
                />
                <Button title='Add' onPress={props.onSet} />
            </View>
        )}
    </Subscribe>
);