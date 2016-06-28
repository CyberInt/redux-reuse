"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Extends an existing reducer with additional handlers
 * @param {function} reducer - a reducer function
 * @param {object} handlers - handler object like used in createReducer()
 * @returns {function} returns a reducer
 */
var extendReducer = exports.extendReducer = function extendReducer(reducer, handlers) {
  return function (state, action) {
    var stateForReducer = handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state;

    return reducer(stateForReducer, action);
  };
};