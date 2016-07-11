import { withActionFilterReducer as _withActionFilterReducer } from 'index';

describe('Reducers: extenders - withActionFilterReducer', () => {
  it('passes down action to reducer when predicate returns true', () => {
    const withActionFilterReducer = _withActionFilterReducer(() => true)(() => 'newState');

    expect(withActionFilterReducer(null, {})).toBe('newState');
  });

  it('does not pass down action when predicate returns false', () => {
    const withActionFilterReducer = _withActionFilterReducer(() => false)(() => 'newState');

    expect(withActionFilterReducer(null, {})).toBe(null);
  });

  it('passes down action to reducer when initializing state', () => {
    const withActionFilterReducer1 = _withActionFilterReducer(() => false)(() => 'initialState');
    const withActionFilterReducer2 = _withActionFilterReducer(() => true)(() => 'initialState');

    expect(withActionFilterReducer1(undefined, {})).toBe('initialState');
    expect(withActionFilterReducer2(undefined, {})).toBe('initialState');
  });
});
