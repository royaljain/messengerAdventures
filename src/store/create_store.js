import { createStore } from 'redux';
import rootReducer from './../reducers/root_reducer.js'


const initialState = {
  svg_components: []
};

const store = createStore(rootReducer, initialState);

export default store;