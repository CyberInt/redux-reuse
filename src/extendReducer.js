/**
 * Extends an existing reducer with additional action type handlers
 * @param {function} reducer - a reducer function
 * @param {object} handlers - object, where keys are action types
 *   to be handled and values is a reducer function with signature:
 *     (state, action) => newState
 * @returns {function} Reducer function
 */
export const extendReducer = (reducer, handlers) => (state, action) => {
  const stateForReducer = handlers.hasOwnProperty(action.type)
    ? handlers[action.type](state, action)
    : state;

  return reducer(stateForReducer, action);
};
