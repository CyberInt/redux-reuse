import { nullReducer } from './nullReducer';

/**
 * Creates a reducer wrapper which tests actions with a predicate(to evaluate
 * to true) before passing to the reducer
 * @param {function} predicate
 * @returns {function} a function of signature (reducer) => newReducer
 */
export const withActionFilterReducer = (predicate) => (reducer = nullReducer) =>
  (state, action) => {
    if (typeof state === 'undefined' || predicate(action)) {
      return reducer(state, action);
    }

    return state;
  };
