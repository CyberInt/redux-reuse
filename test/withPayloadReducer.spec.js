import { withPayloadReducer } from 'reduxReuse';

describe('withPayloadReducer()', () => {
  const ACTION = 'ACTION';
  const reducer = withPayloadReducer(ACTION)();

  it('saves payload', () => {
    expect(
      reducer(null, {
        type: ACTION,
        payload: 'payload'
      })
    ).toBe('payload');
  });
});
