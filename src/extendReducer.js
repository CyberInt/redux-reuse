/**
 * Extends an existing reducer with additional action type handlers
 * @param {object} handlers - object, where keys are action types
 *   to be handled and values is a reducer function with signature:
 *     (state, action) => newState
 * @param {boolean} propagate=true - Whenever or not invoke base reducer after
 *   handler execution. If action does not match any handler, then base reducer
 *   will be executed always.
 * @returns {function} a function of signature (reducer) => newReducer
 */
const _extendReducer = (handlers, propagate = true) => (reducer) =>
  (state, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      const newState = handlers[action.type](state, action);

      return propagate ? reducer(newState, action) : newState;
    }

    return reducer(state, action);
  };

const extendReducer = (...args) => {
  if (args.length === 1) {
    return _extendReducer(args[0]);
  }

  if (args.length === 2) {
    if (typeof args[0] === 'function') {
      return _extendReducer(args[1])(args[0]);
    }

    return _extendReducer(args[0], args[1]);
  }

  return _extendReducer(args[1], args[2])(args[0]);
};

export default extendReducer;
