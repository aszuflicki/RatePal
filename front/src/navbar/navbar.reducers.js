import { LOG_IN, UPDATE_LOGIN_FIELD, SET_USER, LOG_IN_FAIL, LOG_IN_SUCCESS, LOG_OUT, LOG_IN_REQUEST } from "./navabr.actions"
import decode from 'jwt-decode';
const initial = { field: "", username: "", fullName: "", loggedIn: false, token: "" }

export default function (state = initial, action) {

    switch (action.type) {
        case LOG_IN_FAIL:
            console.log("hej")
            return { ...state, ...action.payload.data, ...decode(action.payload.data.token) }
        case LOG_IN_SUCCESS:
            console.log("hej")
            return { ...state, ...action.payload.data, ...decode(action.payload.data.token) }
        case LOG_IN:
            if (action.payload.data.token) {
                localStorage.setItem("jwt", action.payload.data.token);
                return { ...state, ...action.payload.data, ...decode(action.payload.data.token) }
            }
            return { ...state, ...action.payload.data }

        case LOG_IN_REQUEST:
            console.log("hej")
            return { ...state }

        case UPDATE_LOGIN_FIELD:
            return { ...state, field: action.payload }

        case LOG_OUT:
            return { ...state, ...initial, msg: "You successfully logout" }

        case SET_USER:

            return { ...state, ...action.payload.data }
        default:
            return state;
    }
}