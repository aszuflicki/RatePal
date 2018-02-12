import {FETCH_USERS} from './users.actions'

const initial = {users:[], selected: "", msg:""}
export default function(state = initial, action) {

    switch(action.type) {

        case FETCH_USERS:
        return {...state, ...action.payload.data}



        default:
        return state;
    }
}