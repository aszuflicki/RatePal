import axios from 'axios';
import setAuthToken from './../utils/setAuthToken'

export const FETCH_USERS = 'FETCH_USERS';
export function fetchUsers() {
    setAuthToken(localStorage.jwt);

    const request = axios.get('/api/users') 

    return {
        type: FETCH_USERS,
        payload: request
    }

}