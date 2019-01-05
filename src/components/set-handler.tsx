import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { Subscribe } from 'unstated';
import { SetHandlerContainer, Set } from '../containers/set-handler';
import { SetChooserComponent } from '../components/set-chooser';
import { SetChooserContainer } from '../containers/set-chooser';

export const SetHandlerComponent = () => (
    <Subscribe to={[SetHandlerContainer, SetChooserContainer]}>
        {(handler: SetHandlerContainer, chooser: SetChooserContainer) => (
            <View style={{}}>
                <SetChooserComponent
                    onSet={() => { handler.addSet(chooser.state.weight, chooser.state.reps) }} />
                <FlatList<Set>
                    data={handler.state.sets}
                    keyExtractor={(_, index) => `${index}`}
                    renderItem={({ item, index }) =>
                        (<Text>{index + 1} - {item.weight} kgs and {item.reps} reps</Text>)}
                />
            </View>
        )}
    </Subscribe>
);