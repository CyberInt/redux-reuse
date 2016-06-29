import { createReducer } from 'redux-create-reducer';
import { extendReducer } from 'reduxReuse';

describe('extendReducer()', () => {
  describe('for the returned reducer', () => {
    const EXTENDER_ACTION_TYPE = 'EXTENDER_ACTION_TYPE';
    const BASE_REDUCER_ACTION_TYPE = 'BASE_REDUCER_ACTION_TYPE';
    const COMMON_ACTION_TYPE = 'COMMON_ACTION_TYPE';
    const RETURN_STATE_FROM_EXTENDER = 'RETURN_STATE_FROM_EXTENDER';
    const RETURN_STATE_FROM_BASE_REDUCER = 'RETURN_STATE_FROM_BASE_REDUCER';
    const BASE_REDUCER_INITIAL_STATE = 'BASE_REDUCER_INITIAL_STATE';

    const spyForExtender = jasmine.createSpy().and.returnValue(RETURN_STATE_FROM_EXTENDER);
    const spyForBaseReducer = jasmine.createSpy().and.returnValue(RETURN_STATE_FROM_BASE_REDUCER);
    const handlers = {
      [EXTENDER_ACTION_TYPE]: spyForExtender,
      [COMMON_ACTION_TYPE]: spyForExtender,
    };
    const baseReducer = createReducer(BASE_REDUCER_INITIAL_STATE, {
      [BASE_REDUCER_ACTION_TYPE]: spyForBaseReducer,
      [COMMON_ACTION_TYPE]: spyForBaseReducer,
    });

    const reducer = extendReducer(baseReducer, handlers);

    it('handles new action types', () => {
      const state = null;
      const action = { type: EXTENDER_ACTION_TYPE };

      expect(reducer(state, action)).toBe(RETURN_STATE_FROM_EXTENDER);
      expect(spyForExtender.calls.mostRecent().args).toEqual([state, action]);
    });

    it('passes down unhandled action types to base reducer', () => {
      const state = null;
      const action = { type: BASE_REDUCER_ACTION_TYPE };

      expect(reducer(state, action)).toBe(RETURN_STATE_FROM_BASE_REDUCER);
      expect(spyForBaseReducer.calls.mostRecent().args).toEqual([state, action]);
    });

    it('returns initial state from base reducer', () => {
      expect(reducer(undefined, {})).toBe(BASE_REDUCER_INITIAL_STATE);
    });

    it('invokes extender and pass extender result to base reducer for common actions', () => {
      const state = null;
      const action = { type: COMMON_ACTION_TYPE };

      expect(reducer(state, action)).toBe(RETURN_STATE_FROM_BASE_REDUCER);
      expect(spyForExtender.calls.mostRecent().args).toEqual([state, action]);
      expect(spyForExtender.calls.mostRecent().returnValue).toEqual(RETURN_STATE_FROM_EXTENDER);
      expect(
        spyForBaseReducer.calls.mostRecent().args
      ).toEqual([RETURN_STATE_FROM_EXTENDER, action]);
    });
  });
});
