import { createReducer } from 'redux-create-reducer';
import { extendReducer } from 'index';

describe('extendReducer()', () => {
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

  afterEach(() => {
    spyForExtender.calls.reset();
    spyForBaseReducer.calls.reset();
  });

  describe('returned reducer', () => {
    const reducer = extendReducer(baseReducer, handlers);

    it('handles new action types', () => {
      const state = null;
      const action = { type: EXTENDER_ACTION_TYPE };

      expect(reducer(state, action)).toBe(RETURN_STATE_FROM_EXTENDER);
      expect(spyForExtender.calls.mostRecent().args).toEqual([state, action]);
    });

    it('returns initial state from base reducer', () => {
      expect(reducer(undefined, {})).toBe(BASE_REDUCER_INITIAL_STATE);
    });
  });

  describe('returned reducer in case when propagate = true', () => {
    const reducer = extendReducer(baseReducer, handlers, true);

    it('passes down unhandled action types to base reducer', () => {
      const state = null;
      const action = { type: BASE_REDUCER_ACTION_TYPE };

      expect(reducer(state, action)).toBe(RETURN_STATE_FROM_BASE_REDUCER);
      expect(spyForBaseReducer.calls.mostRecent().args).toEqual([state, action]);
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

  describe('returned reducer in case when propagate = false', () => {
    const reducer = extendReducer(baseReducer, handlers, false);

    it('passes down unhandled action types to base reducer', () => {
      const state = null;
      const action = { type: BASE_REDUCER_ACTION_TYPE };

      expect(reducer(state, action)).toBe(RETURN_STATE_FROM_BASE_REDUCER);
      expect(spyForBaseReducer.calls.mostRecent().args).toEqual([state, action]);
    });

    it('invokes extender and does not pass extender result to base reducer for common actions', () => {
      const state = null;
      const action = { type: COMMON_ACTION_TYPE };

      expect(reducer(state, action)).toBe(RETURN_STATE_FROM_EXTENDER);
      expect(spyForExtender.calls.mostRecent().args).toEqual([state, action]);
      expect(spyForExtender.calls.mostRecent().returnValue).toEqual(RETURN_STATE_FROM_EXTENDER);
      expect(spyForBaseReducer).not.toHaveBeenCalled();
    });
  });

  describe('returned higher-order reducer when 1 argument is passed', () => {
    const reducer = extendReducer(baseReducer, handlers);
    const reducer2 = extendReducer(handlers)(baseReducer);

    it('creates a reducer with the same function', () => {
      expect(reducer2.toString()).toBe(reducer.toString());
    });
  });

  describe('returned higher-order reducer when 2 arguments is passed', () => {
    const reducer = extendReducer(baseReducer, handlers, true);

    it('creates a reducer with the same function if curried API used', () => {
      const reducer2 = extendReducer(handlers, true)(baseReducer);
      expect(reducer2.toString()).toBe(reducer.toString());
    });

    it('creates a reducer with the same function if uncurried API used', () => {
      const reducer2 = extendReducer(baseReducer, handlers);
      expect(reducer2.toString()).toBe(reducer.toString());
    });
  });
});
