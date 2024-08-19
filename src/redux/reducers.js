// reducer.js
const initialState = {
    input: '',
    result: '',
    history: [],
};

const calculatorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_INPUT':
            return { ...state, input: action.payload };
        case 'SET_RESULT':
            return { ...state, result: action.payload };
        case 'ADD_TO_HISTORY':
            return { ...state, history: [action.payload, ...state.history] };
        case 'CLEAR':
            return { ...state, input: '', result: '' };
        default:
            return state;
    }
};

export default calculatorReducer;
