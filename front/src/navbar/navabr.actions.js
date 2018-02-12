import axios from 'axios';
import decode from 'jwt-decode';
import setAuthToken from './../utils/setAuthToken';

const instance = axios.create({ baseURL: '/api' });



export const SET_USER = "SET_USER";
export function setUser(values) {
    console.log(12)
    return {
        type: SET_USER,
        values
    }
}

export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAIL = "LOG_IN_FAIL";
export const LOG_IN = "LOG_IN";



export function login(values) {

    let username = "", fullName = "", token = "", loggedIn = false;

    const request = instance.post(`/login`, values)

    return {
        payload: request,
        type: LOG_IN
    }


}
export const LOG_OUT = "LOG_OUT";
export function logout() {

    localStorage.removeItem("jwt")

    return {
        type: LOG_OUT
    }


}

export const UPDATE_LOGIN_FIELD = "UPDATE_LOGIN_FIELD"
export function updateLoginField(value) {
    return {
        payload: value,
        type: UPDATE_LOGIN_FIELD
    }
}

export const CHECK_LOGIN = "CHECK_LOGIN";
export function checkLogin() {
    if (localStorage.jwt) {

        return {
            type: LOG_IN,
            payload: {
                data: {
                    token: localStorage.jwt,
                    loggedIn: true
                }
            }
        }
    } else {
        return {
            type: LOG_IN_FAIL
        }
    }
}