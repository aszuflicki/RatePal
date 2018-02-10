import { CREATE_USER } from './register.actions';

export default function(state = {username:"", fullName:"", msg:""}, action) {
    //console.log(action.payload)
    switch(action.type) {
        case CREATE_USER:  
        console.log(action.payload)      
        return {...state, msg:action.payload };


        default:
        return state;
    }
}