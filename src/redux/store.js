import { createStore } from 'redux';
import calculatorReducer from './reducers';

const store = createStore(calculatorReducer);

export default store;
