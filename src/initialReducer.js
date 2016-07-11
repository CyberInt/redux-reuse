/**
 * Creates a reducer with passed value as initial state
 * @param {*} initialState
 * @returns {function} Reducer function
 */
const initialReducer = (initialState) =>
  (state) => typeof state === 'undefined' ? initialState : state;

export default initialReducer;
