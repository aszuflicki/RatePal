import { combineReducers } from 'redux';
import Register from './register/register.reducers';
import navbar from "./navbar/navbar.reducers"

const rootReducer = combineReducers({
    register: Register,
    navbar
})

export default rootReducer;