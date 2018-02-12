import {FETCH_USERS, SELECT_USER, UPDATE_SEARCH_FIELD} from './users.actions'

const initial = {users:[], selected: "", msg:"", field:""}
export default function(state = initial, action) {

    switch(action.type) {

        case FETCH_USERS:
        return {...state, ...action.payload.data}

        case SELECT_USER:
        return {... state, selected:action.payload}

        case UPDATE_SEARCH_FIELD:
        return {... state, field: action.payload}

        default:
        return state;
    }
}