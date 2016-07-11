import identity from 'lodash/identity';
import extendReducer from './extendReducer';
import nullReducer from './nullReducer';

/**
 * Creates a reducer wrapper which return the payload of the action for the
 * given action type.
 * @param {string} actionType
 * @param {function} mapResult - function to be invoked with payload as argument
 *   before returning it.
 * @returns {function} a function of signature (reducer) => newReducer
 */
const withPayloadReducer = (actionType, mapResult = identity) => (reducer = nullReducer) =>
  extendReducer(reducer, {
    [actionType]: (_, { payload } = {}) => mapResult(payload)
  });

export default withPayloadReducer;
