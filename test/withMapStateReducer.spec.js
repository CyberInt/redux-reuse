import { identity } from 'lodash';
import { createReducer } from 'redux-create-reducer';
import { withMapStateReducer as _withMapStateReducer} from 'reduxReuse';

describe('Reducers: extenders - withMapStateReducer', () => {
  const ACTION = 'ACTION';
  const mapStateBefore = (stateBefore) => ([stateBefore]);
  const mapStateAfter = (stateAfter) => stateAfter[0];

  it('maps state before passing to reducer', () => {
    const withMapStateReducer = _withMapStateReducer(mapStateBefore)(identity);

    expect(withMapStateReducer(null, {})).toEqual([null]);
  });

  it('maps state returned from reducer', () => {
    const withMapStateReducer = _withMapStateReducer(identity, mapStateAfter)(identity);

    expect(withMapStateReducer([null], {})).toEqual(null);
  });

  it('handles specified action types', () => {
    const baseReducer = createReducer(null, { [ACTION]: () => 'newState' });
    const withMapStateReducer = _withMapStateReducer(identity, identity, [ACTION])(baseReducer);

    expect(withMapStateReducer('initialState', { type: ACTION })).toBe('newState');
    expect(withMapStateReducer('initialState', { type: 'action2' })).toBe('initialState');
  });
});
