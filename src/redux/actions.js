// actions.js
import { SET_INPUT, SET_RESULT, CLEAR } from './actionTypes';

export const setInput = (input) => ({
    type: SET_INPUT,
    payload: input,
});

export const setResult = (result) => ({
    type: SET_RESULT,
    payload: result,
});

export const clear = () => ({
    type: CLEAR,
});