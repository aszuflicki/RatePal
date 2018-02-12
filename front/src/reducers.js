import { combineReducers } from 'redux';
import Register from './register/register.reducers';
import navbar from "./navbar/navbar.reducers"
import users from "./users/users.redcers"
import skillsEdit from './profile/skillsEdit/skillsEdit.reducers';

const rootReducer = combineReducers({
    register: Register,
    navbar,
    users,
    skillsEdit,
    
})

export default rootReducer;