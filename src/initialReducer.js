/**
 * Creates a reducer which returns an initial state
 * @param {*} initialState
 * @returns {function} returns a reducer
 */
export const initialReducer = (initialState) =>
  (state) => typeof state === 'undefined' ? initialState : state;
