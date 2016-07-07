import { withPayloadReducer } from 'reduxReuse';

describe('withPayloadReducer()', () => {
  const ACTION = 'ACTION';
  const PAYLOAD = 'PAYLOAD';
  const action = {
    type: ACTION,
    payload: PAYLOAD
  };

  it('saves payload', () => {
    const reducer = withPayloadReducer(ACTION)();

    expect(reducer(null, action)).toBe(PAYLOAD);
  });

  it('invokes mapResult() function before saves payload', () => {
    const mapResult = (result) => `-${result}-`;
    const reducer = withPayloadReducer(ACTION, mapResult)();

    expect(reducer(null, action)).toBe(`-${PAYLOAD}-`);
  });
});
