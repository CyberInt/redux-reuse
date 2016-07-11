import { initialReducer } from 'index';

describe('initialReducer', () => {
  const STATE = 'STATE';

  it('returns initial state when state is undefined', () => {
    const result = initialReducer(STATE)(undefined, {});

    expect(result).toBe(STATE);
  });

  it('returns original state when state is defined', () => {
    const result = initialReducer(null)(STATE, {});

    expect(result).toBe(STATE);
  });
});
