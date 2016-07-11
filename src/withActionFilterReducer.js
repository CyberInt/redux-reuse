import nullReducer from './nullReducer';

/**
 * Creates a reducer wrapper which tests actions with a predicate before
 * passing to the reducer.
 * @param {function} predicate - function which is called with action as
 *   argument and should return truthy value in order to indicate that
 *   action should be passed to reducer.
 * @returns {function} a function of signature (reducer) => newReducer
 */
const withActionFilterReducer = (predicate) => (reducer = nullReducer) =>
  (state, action) => {
    if (typeof state === 'undefined' || predicate(action)) {
      return reducer(state, action);
    }

    return state;
  };

export default withActionFilterReducer;
