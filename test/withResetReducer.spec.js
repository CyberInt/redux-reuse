import { createReducer } from 'redux-create-reducer';
import { withResetReducer } from 'reduxReuse';

describe('Reducers: extenders - withResetReducer', () => {
  const ACTION = 'ACTION';
  const ACTION2 = 'ACTION2';
  const reducer = withResetReducer(ACTION, ACTION2)(createReducer('initialState', {}));

  it('resets state', () => {
    expect(reducer({}, { type: ACTION })).toBe('initialState');
    expect(reducer({}, { type: ACTION2 })).toBe('initialState');
  });
});
