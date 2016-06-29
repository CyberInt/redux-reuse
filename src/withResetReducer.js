import { extendReducer } from './extendReducer';
import { nullReducer } from './nullReducer';

/**
 * These are private action types reserved by redux-reuse.
 *
 * From redux:
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
export const actionTypes = {
  RESET: '@@reduxReuse/RESET'
};

/**
 * Creates a reducer wrapper which resets the state for the given action type(s)
 * @param {...string} actionTypes
 * @returns {function} a function of signature (reducer) => newReducer
 */
export const withResetReducer = (...actionTypes) => (reducer = nullReducer) =>
  extendReducer(reducer,
    actionTypes.reduce((handlers, actionType) => ({
      ...handlers,
      [actionType]: () => reducer(undefined, { type: actionTypes.RESET }),
    }), {})
  );
