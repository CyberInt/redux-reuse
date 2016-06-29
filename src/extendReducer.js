/**
 * Extends an existing reducer with additional action type handlers
 * @param {function} reducer - a reducer function
 * @param {object} handlers
 *   handler object
 *     where key is the action type to be handled
 *           value is a reducer function with signature:
 *             (state, action) => newState
 * @returns {function} returns a reducer
 */
export const extendReducer = (reducer, handlers) => (state, action) => {
  const stateForReducer = handlers.hasOwnProperty(action.type)
    ? handlers[action.type](state, action)
    : state;

  return reducer(stateForReducer, action);
};
