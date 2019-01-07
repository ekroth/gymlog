import React from 'react'
import { FlatList } from 'react-native'
import Set from '../model/Set'
import { ListItem, View, Text, Grid, Subtitle, Col } from 'native-base'
import { SetChooserComponent } from './SetChooser'

type SetHandlerProps = {
  onAddCurrent: () => void
  onModifyCurrent: (set: Set) => void

  current: Set
  sets: Set[]
}

type SetItemProps = {
  index: number
  set: Set
}

const SetItemComponent = ({ index, set }: SetItemProps) => (
  <ListItem itemDivider={false}>
    <Grid>
      <Col size={20}>
        <Text style={{ fontWeight: 'bold' }}>{index}</Text>
      </Col>
      <Col size={60}>
        <Grid>
          <Col>
            <Text style={{ alignSelf: 'flex-end', fontWeight: 'bold' }}>
              {set.weight}
            </Text>
          </Col>
          <Col>
            <Subtitle style={{ alignSelf: 'flex-start' }}>kgs</Subtitle>
          </Col>
        </Grid>
      </Col>
      <Col size={10}>
        <Text style={{ alignSelf: 'flex-end', fontWeight: 'bold' }}>
          {set.reps}
        </Text>
      </Col>
      <Col size={10}>
        <Subtitle style={{ alignSelf: 'flex-start' }}>reps</Subtitle>
      </Col>
    </Grid>
  </ListItem>
)

export const SetHandlerComponent = (props: SetHandlerProps) => (
  <View
    style={{
      alignItems: 'stretch',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center'
    }}
  >
    <SetChooserComponent
      onSetReps={reps =>
        props.onModifyCurrent({ reps, weight: props.current.weight })
      }
      onSetWeight={weight =>
        props.onModifyCurrent({ weight, reps: props.current.reps })
      }
      onSave={props.onAddCurrent}
      initWeight={props.current.weight}
      initReps={props.current.reps}
    />
    <FlatList<Set>
      data={props.sets}
      keyExtractor={(_, index) => `${index}`}
      renderItem={({ item, index }) => (
        <SetItemComponent index={index} set={item} />
      )}
    />
  </View>
)
