import { combineReducers } from 'redux';
import Register from './register/register.reducers';

const rootReducer = combineReducers({
    register:Register
})

export default rootReducer;