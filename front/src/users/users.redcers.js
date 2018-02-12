import {FETCH_USERS, SELECT_USER} from './users.actions'

const initial = {users:[], selected: "", msg:""}
export default function(state = initial, action) {

    switch(action.type) {

        case FETCH_USERS:
        return {...state, ...action.payload.data}

        case SELECT_USER:
        return {... state, selected:action.payload}

        default:
        return state;
    }
}