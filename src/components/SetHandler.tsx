import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { SetChooserComponent } from './SetChooser';
import Set from '../model/Set';

type SetHandlerProps = {
    onAddCurrent: () => void;
    onModifyCurrent: (set: Set) => void;

    current: Set;
    sets: Set[];
}

type SetItemProps = {
    index: number;
    set: Set;
}

const SetItemComponent = ({ index, set }: SetItemProps) => (
    <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch'
    }}>
        <Text style={{ flex: 1, flexDirection: 'row', fontSize: 30 }}>{index + 1}</Text>
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={{ fontSize: 25 }}>{set.weight}</Text>
            <Text style={{ fontSize: 10, alignSelf: 'center', marginLeft: 5, color: '#A9A9A9' }}>kgs</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={{ fontSize: 25 }}>{set.reps}</Text>
            <Text style={{ fontSize: 10, alignSelf: 'center', marginLeft: 5, color: '#A9A9A9'  }}>reps</Text>
        </View>
    </View>
);

export const SetHandlerComponent = (props: SetHandlerProps) => (
    <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    }}>
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
            renderItem={({ item, index }) => (<SetItemComponent index={index} set={item} />)}
        />
    </View>
);