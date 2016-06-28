/**
 * Extends an existing reducer with additional handlers
 * @param {function} reducer - a reducer function
 * @param {object} handlers - handler object like used in createReducer()
 * @returns {function} returns a reducer
 */
export const extendReducer = (reducer, handlers) => (state, action) => {
  const stateForReducer = handlers.hasOwnProperty(action.type)
    ? handlers[action.type](state, action)
    : state;

  return reducer(stateForReducer, action);
};
