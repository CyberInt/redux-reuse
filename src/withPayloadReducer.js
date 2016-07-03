import { extendReducer } from './extendReducer';
import { nullReducer } from './nullReducer';

/**
 * Creates a reducer wrapper which return the payload of the action for the
 * given action type.
 * @param {string} actionType
 * @returns {function} a function of signature (reducer) => newReducer
 */
export const withPayloadReducer = (actionType) => (reducer = nullReducer) =>
  extendReducer(reducer, {
    [actionType]: (_, { payload } = {}) => payload
  });
