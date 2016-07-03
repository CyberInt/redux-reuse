/**
 * Creates a reducer with passed value as initial state
 * @param {*} initialState
 * @returns {function} Reducer function
 */
export const initialReducer = (initialState) =>
  (state) => typeof state === 'undefined' ? initialState : state;
