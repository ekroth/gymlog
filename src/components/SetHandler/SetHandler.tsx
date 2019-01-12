import React, { PureComponent } from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'
import Set from '../../model/Set'
import { Grid, Row } from 'native-base'
import { SetChooserComponent } from '../SetChooser'
import { keyExtractorIndex } from '../../util/FlatListUtils'
import { SetItemComponent } from './SetItemComponent'
import { callback1, callback2 } from '../../util/Callbacks'

export type SetHandlerProps = {
  onAddSet?: (set: Set) => void
  onDeleteSet?: (index: number) => void
  onModifySet?: (index: number, set: Set) => void

  initSet?: Set
  sets: ReadonlyArray<Set>
  selected?: number
}

export type SetHandlerState = {
  current: Set
  selected?: number
}

export class SetHandlerComponent extends PureComponent<
  SetHandlerProps,
  SetHandlerState
> {
  constructor(props: SetHandlerProps) {
    super(props)
    this.state = {
      current: props.initSet || { weight: 0, reps: 0 },
      selected: props.selected
    }
  }

  public render() {
    return (
      <Grid>
        <Row size={40}>
          <SetChooserComponent
            onSetReps={this.onSetReps}
            onSetWeight={this.onSetWeight}
            onLeftButtonPress={this.onLeftButtonPress}
            onRightButtonPress={this.onRightButtonPress}
            leftButtonText={
              this.state.selected === undefined ? 'Add' : 'Modify'
            }
            rightButtonText={
              this.state.selected === undefined ? 'Clear' : 'Delete'
            }
            initWeight={this.state.current.weight}
            initReps={this.state.current.reps}
          />
        </Row>
        <Row size={60}>
          <FlatList<Set>
            data={this.props.sets}
            keyExtractor={keyExtractorIndex}
            renderItem={this.createSetItemComponent}
            extraData={this.state}
          />
        </Row>
      </Grid>
    )
  }

  private createSetItemComponent = (info: ListRenderItemInfo<Set>) => (
    <SetItemComponent
      index={info.index}
      set={info.item}
      selected={this.state.selected === info.index}
      onPress={() =>
        this.setState({
          current: info.item,
          selected: info.index
        })
      }
    />
  )

  private onSetReps = (reps: number) => {
    this.setState(state => ({
      current: { reps, weight: state.current.weight },
      selected: state.selected
    }))
  }

  private onSetWeight = (weight: number) => {
    this.setState(state => ({
      current: { weight, reps: state.current.reps },
      selected: this.state.selected
    }))
  }

  private onLeftButtonPress = () => {
    if (this.state.selected === undefined) {
      callback1(this.props.onAddSet, this.state.current)
    } else {
      this.setState({
        current: this.state.current,
        selected: undefined
      })
      callback2(this.props.onModifySet, this.state.selected, this.state.current)
    }
  }

  private onRightButtonPress = () => {
    if (this.state.selected === undefined) {
      this.setState({
        current: { weight: 0, reps: 0 },
        selected: undefined
      })
    } else {
      callback1(this.props.onDeleteSet, this.state.selected)
      this.setState({
        current: this.state.current,
        selected: undefined
      })
    }
  }
}
