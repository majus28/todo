import {combineReducers} from 'redux';

import {authentication} from './auth';
import {todos} from './todo';

const rootReducer = combineReducers({
    authentication,
    todos,
});

export default rootReducer;
