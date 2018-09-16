/*
 * @flow
 */

import type { State } from '../../utils/reducer';

import Button from '../Bootstrap/Button';
import Dropdown from '../Bootstrap/Dropdown';
import * as React from 'react';
import { connect } from 'react-redux';
import {
  ChangeExpandMode,
} from '../../utils/actions';

type StateProps = {
  expandMode: 'manual' | 'collapse-all' | 'expand-all',
};

type DispatchProps = {
  onChangedExpandMode: (mode: 'manual' | 'collapse-all' | 'expand-all') => void,
};

export type Props = StateProps & DispatchProps;

function ModeOption(props) {
  const isSetToTarget = props.nextMode === props.expandMode;

  return (
    <Button
      color="link"
      size="block"
      style={{textAlign: 'left'}}
      onClick={(e) => {
        e.preventDefault();
        props.onPickMode(props.nextMode);
      }}>
      <input type='checkbox' checked={isSetToTarget ? 'check' : ''} />
      {' '}
      {props.nextMode === 'expand-all' ? 'Expand' : 'Collapse'} All
    </Button>
  );
}

export function ToggleExpandModeButton(props: Props) {
  return (
    <Dropdown
      align='right'
      color='light'
      size='xs'
      getContent={(hideContent) => {
        const pickedMode = (mode) => {
          hideContent();
          props.onChangedExpandMode(mode);
        };

        return [
          <li key='expand-all'>
            <ModeOption
              expandMode={props.expandMode}
              nextMode={'expand-all'}
              onPickMode={pickedMode}
            />
          </li>,
          <li key='collapse-all'>
            <ModeOption
              expandMode={props.expandMode}
              nextMode={'collapse-all'}
              onPickMode={pickedMode}
            />
          </li>,
        ];
      }}>
      Unqiue Imports
      {' '}
      <span className="caret"></span>
    </Dropdown>
  );
}

const mapStateToProps = (state: State): StateProps => {
  return {
    expandMode: state.expandMode,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onChangedExpandMode: ChangeExpandMode(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToggleExpandModeButton);
