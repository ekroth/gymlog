import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { SetChooserComponent } from './SetChooser';
import Set from '../model/Set';

export interface SetHandlerProps {
    onAddCurrent: () => void;
    onModifyCurrent: (set: Set) => void;

    current: Set;
    sets: Set[];
}

export const SetHandlerComponent = (props: SetHandlerProps) => (
    <View style={{}}>
        <SetChooserComponent
            onSetReps={(reps) =>
                props.onModifyCurrent({ weight: props.current.weight, reps: reps })}
            onSetWeight={(weight) =>
                props.onModifyCurrent({ weight: weight, reps: props.current.reps })}
            onSave={props.onAddCurrent}
            initWeight={props.current.weight}
            initReps={props.current.reps}
        />
        <FlatList<Set>
            data={props.sets}
            keyExtractor={(_, index) => `${index}`}
            renderItem={({ item, index }) =>
                (<Text>{index + 1} - {item.weight} kgs and {item.reps} reps</Text>)}
        />
    </View>
);