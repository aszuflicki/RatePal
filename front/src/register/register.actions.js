import axios from 'axios';

const instance = axios.create({baseURL: '/api'});



export const CREATE_USER = "CREATE_USER";
export function createUser(values) {
    //console.log(values);
    const request = instance.post(`/register`, values)
    
    
    
        return {
            type: CREATE_USER,
            payload: request
        };
}

export const UPDATE_USERNAME_FIELD = "UPDATE_USERNAME_FIELD"
export function updateUsernameField(value) {
    return {
        payload: value,
        type: UPDATE_USERNAME_FIELD
    }
}

export const UPDATE_FULLNAME_FIELD = "UPDATE_FULLNAME_FIELD"
export function updateFullNameField(value) {
    return {
        payload: value,
        type: UPDATE_FULLNAME_FIELD
    }
}

export const UPDATE_MSG_REGISTER = "UPDATE_MSG_REGISTER"
export function updateMsgRegister(value) {
    return {
        payload: value,
        type: UPDATE_MSG_REGISTER
    }
}