import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import userReducer from './userReducer';
import fileReducer from './fileReducer';

const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;