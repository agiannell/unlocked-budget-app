import { createStore, combineReducers } from 'redux';
import userReducer from './userReducer';
import welcomeReducer from './welcomeReducer';

const rootReducer = combineReducers({
    userReducer,
    welcomeReducer
})

export default createStore(rootReducer);