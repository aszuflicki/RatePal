import axios from 'axios';
import setAuthToken from './../utils/setAuthToken'
import { UPDATE_FULLNAME_FIELD } from '../register/register.actions';

const instance = axios.create({ baseURL: '/api' });

export const FETCH_USERS = 'FETCH_USERS';
export function fetchUsers() {
    setAuthToken(localStorage.jwt);

    const request = axios.get('/api/users')

    return {
        type: FETCH_USERS,
        payload: request
    }

}

export const SELECT_USER = "SELECT_USER";
export function selectUser(username) {

    return {
        type: SELECT_USER,
        payload: username
    }
}

export const UPDATE_RATE = "UPDATE_RATE";
export function updateRate(id, rate, selected, callback) {

    const request = instance.post("/rate", { id, rate, user:selected.username })
    .then(() => callback())

    return {
        type: UPDATE_RATE,
        payload: request
    }
}

export const UPDATE_SEARCH_FIELD = "UPDATE_SEARCH_FIELD";
export function updateSearchField(value) {

    return {
        type: UPDATE_SEARCH_FIELD,
        payload: value
    }
}
