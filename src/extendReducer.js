/**
 * Extends an existing reducer with additional action type handlers
 * @param {object} handlers - object, where keys are action types
 *   to be handled and values is a reducer function with signature:
 *     (state, action) => newState
 * @returns {function} a function of signature (reducer) => newReducer
 */
const _extendReducer = (handlers) => (reducer) => (state, action) => {
  const stateForReducer = handlers.hasOwnProperty(action.type)
    ? handlers[action.type](state, action)
    : state;

  return reducer(stateForReducer, action);
};

const extendReducer = (...args) => {
  if (args.length === 1) {
    return _extendReducer(args[0]);
  }

  return _extendReducer(args[1])(args[0]);
};

export default extendReducer;
