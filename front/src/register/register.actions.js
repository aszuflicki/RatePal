import axios from 'axios';

const instance = axios.create({baseURL: '/api'});



export const CREATE_USER = "CREATE_USER";
export function createUser(values, callback) {
    console.log(values);
    const request = instance.post(`/api/REGISTER`, values)
    .then(() => callback());
    
        return {
            type: CREATE_USER,
            payload: request
        };
}