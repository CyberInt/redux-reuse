import { extendReducer } from './extendReducer';

export const RESET_STATE = 'RESET_STATE';

export const withResetReducer = (...actionTypes) => (reducer) => extendReducer(
  reducer,
  actionTypes.reduce((handlers, actionType) => ({
    ...handlers,
    [actionType]: () => reducer(undefined, { type: RESET_STATE }),
  }), {})
);
