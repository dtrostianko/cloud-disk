import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import userReducer from './userReducer';
import fileReducer from './fileReducer';
import appReducer from './appReducer'

const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer,
    app: appReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;