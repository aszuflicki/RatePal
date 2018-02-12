import { FETCH_SKILLS, UPDATE_SKILL_FIELD, DELETE_SKILL } from './skillsEdit.actions'

const initial = { skills: [], field:"" }
export default function (state = initial, action) {
    switch (action.type) {
        case FETCH_SKILLS:
            return { ...state, ...action.payload.data }

            case UPDATE_SKILL_FIELD:
            return {...state, field: action.payload}

            case DELETE_SKILL:
            return {...state, }

        default:
            return state;
    }
}