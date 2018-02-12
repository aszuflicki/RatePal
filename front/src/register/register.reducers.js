import { CREATE_USER, UPDATE_FULLNAME_FIELD, UPDATE_USERNAME_FIELD, UPDATE_MSG_REGISTER } from './register.actions';

export default function (state = { username: "", fullName: "", msg: "", created: false }, action) {
    // (action.payload)
    switch (action.type) {
        case CREATE_USER:
             (action.payload.data)
            const { created, msg } = action.payload.data;
            return { ...state, msg, created };

        case UPDATE_FULLNAME_FIELD:
            return { ...state, fullName: action.payload }

        case UPDATE_USERNAME_FIELD:
            return { ...state, username: action.payload }

        case UPDATE_MSG_REGISTER:
            return { ...state, msg: action.payload }

        default:
            return state;
    }
}