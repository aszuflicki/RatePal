import axios from 'axios';
import setAuthToken from './../../utils/setAuthToken'

const instance = axios.create({ baseURL: '/api' });

export const FETCH_SKILLS = "FETCH_SKILLS"
export function fetchSkills(user) {
    setAuthToken(localStorage.jwt)

    const request = instance.get(`/skills/${user}`);

    return {
        type: FETCH_SKILLS,
        payload: request
    }
}

export const UPDATE_SKILL_FIELD = "UPDATE_SKILL_FIELD"
export function updateSkillField(field) {
    return {
        type: UPDATE_SKILL_FIELD,
        payload: field
    }
}
export const ADD_SKILL = "ADD_SKILL"
export function addSkill(name, callback) {
    setAuthToken(localStorage.jwt)

    const request = instance.post(`/skills`, { _name: name })
        .then(() => callback())
    return {
        type: ADD_SKILL,
        payload: request
    }

}

export const DELETE_SKILL = "DELETE_SKILL";
export function deleteSkill(id, callback) {
    setAuthToken(localStorage.jwt);

     (id)
    const request = instance.delete(`/skills/${id}`)
        .then(() => callback())
    return {
        type: DELETE_SKILL,
        payload: request
    }
}