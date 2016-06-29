import identity from 'lodash/identity';
import { nullReducer } from './nullReducer';

/**
 * Creates a reducer wrapper which maps state before and after passing to a
 * reducer
 * @param {function} [mapStateBefore=identity]
 *   A function with signature: (stateBefore) => newStateBefore
 *     where stateBefore is the original state
 *           newStateBefore is passed to the reducer
 * @param {function} [mapStateAfter=identity]
 *   A function with signature: (stateAfter) => newStateAfter
 *     where stateAfter is returned by the reducer
 *           newStateAfter is returned to the store
 * @param {[string]} [actionTypes]
 *   Action types to perform map state. Handles all actions by default.
 * @returns {function} a function of signature (reducer) => newReducer
 */
export const withMapStateReducer = (
  mapStateBefore = identity,
  mapStateAfter = identity,
  actionTypes
) => {
  const actionTypesDict = actionTypes && actionTypes.reduce(
    (actionType, dict) => ({ ...dict, [actionType]: true }), {}
  );

  return (reducer = nullReducer) => (state, action) => {
    if (actionTypes && !actionTypesDict[action.type]) {
      return reducer(state, action);
    }

    return mapStateAfter(reducer(mapStateBefore(state), action));
  };
};
